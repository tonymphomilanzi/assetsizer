import { create } from "zustand";
import { saveAs } from "file-saver";
import {
  ACCEPTED_MIME_TYPES,
  FREE_ASSET_LIMIT,
  MAX_FILE_SIZE_BYTES,
} from "@/lib/constants";
import { platforms, getSelectedPlatforms } from "@/lib/platformSizes";
import type { AssetSize, Platform } from "@/lib/platformSizes";
import { resizeImage } from "@/lib/imageResizer";
import { buildZip } from "@/lib/zipBuilder";

export interface GeneratedAsset {
  platformId: string;
  folderName: string;
  label: string;
  filename: string;
  width: number;
  height: number;
  blobUrl: string;
  isLocked: boolean; // true if beyond free limit and user is not pro
}

interface AssetStore {
  // --- Upload state ---
  originalFile: File | null;
  originalPreviewUrl: string | null;
  originalWidth: number | null;
  originalHeight: number | null;
  setOriginalFile: (file: File) => void;
  clearOriginalFile: () => void;

  // --- Selection state ---
  selectedPlatformIds: string[];
  togglePlatform: (platformId: string) => void;
  selectAllPlatforms: () => void;
  deselectAllPlatforms: () => void;

  // --- Generation state ---
  isGenerating: boolean;
  generationProgress: number; // integer 0-100
  generatedAssets: GeneratedAsset[];
  generateAssets: () => Promise<void>;
  clearGeneratedAssets: () => void;

  // --- Export state ---
  isDownloading: boolean;
  downloadZip: () => Promise<void>;

  // --- Tier state ---
  isPro: boolean;
  setIsPro: (value: boolean) => void;

  // --- Error state ---
  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;
}

function revokeAssetBlobUrls(assets: GeneratedAsset[]): void {
  for (const asset of assets) {
    URL.revokeObjectURL(asset.blobUrl);
  }
}

export const useAssetStore = create<AssetStore>((set, get) => ({
  // --- Upload state ---
  originalFile: null,
  originalPreviewUrl: null,
  originalWidth: null,
  originalHeight: null,

  setOriginalFile: (file) => {
    if (!(ACCEPTED_MIME_TYPES as readonly string[]).includes(file.type)) {
      set({
        errorMessage: "Unsupported file type. Use PNG, JPG, WebP, or SVG.",
      });
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      set({ errorMessage: "File too large. Maximum size is 20MB." });
      return;
    }

    // Clear stale state from any previous upload.
    const store = get();
    if (store.originalPreviewUrl) {
      URL.revokeObjectURL(store.originalPreviewUrl);
    }
    revokeAssetBlobUrls(store.generatedAssets);

    const previewUrl = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      set({
        originalFile: file,
        originalPreviewUrl: previewUrl,
        originalWidth: image.naturalWidth,
        originalHeight: image.naturalHeight,
        generatedAssets: [],
        generationProgress: 0,
        errorMessage: null,
      });
    };
    image.onerror = () => {
      URL.revokeObjectURL(previewUrl);
      set({ errorMessage: `Failed to load image: ${file.name}` });
    };
    image.src = previewUrl;
  },

  clearOriginalFile: () => {
    const store = get();
    if (store.originalPreviewUrl) {
      URL.revokeObjectURL(store.originalPreviewUrl);
    }
    revokeAssetBlobUrls(store.generatedAssets);
    set({
      originalFile: null,
      originalPreviewUrl: null,
      originalWidth: null,
      originalHeight: null,
      generatedAssets: [],
      generationProgress: 0,
    });
  },

  // --- Selection state ---
  selectedPlatformIds: [],

  togglePlatform: (platformId) => {
    set((state) => ({
      selectedPlatformIds: state.selectedPlatformIds.includes(platformId)
        ? state.selectedPlatformIds.filter((id) => id !== platformId)
        : [...state.selectedPlatformIds, platformId],
    }));
    // Sizes changed: previously generated results are stale.
    if (get().generatedAssets.length > 0) {
      get().clearGeneratedAssets();
    }
  },

  selectAllPlatforms: () => {
    set({ selectedPlatformIds: platforms.map((platform) => platform.id) });
  },

  deselectAllPlatforms: () => {
    set({ selectedPlatformIds: [] });
  },

  // --- Generation state ---
  isGenerating: false,
  generationProgress: 0,
  generatedAssets: [],

  generateAssets: async () => {
    const { originalFile, selectedPlatformIds, isPro } = get();
    if (!originalFile || selectedPlatformIds.length === 0) return;

    get().clearGeneratedAssets();
    set({ isGenerating: true, generationProgress: 0 });

    const jobs: Array<{ platform: Platform; size: AssetSize }> = [];
    for (const platform of getSelectedPlatforms(selectedPlatformIds)) {
      for (const size of platform.sizes) {
        jobs.push({ platform, size });
      }
    }
    const totalCount = jobs.length;
    const generated: GeneratedAsset[] = [];

    for (let index = 0; index < jobs.length; index++) {
      const { platform, size } = jobs[index];
      try {
        const blob = await resizeImage(originalFile, size.width, size.height);
        generated.push({
          platformId: platform.id,
          folderName: platform.folderName,
          label: size.label,
          filename: size.filename,
          width: size.width,
          height: size.height,
          blobUrl: URL.createObjectURL(blob),
          isLocked: !isPro && index >= FREE_ASSET_LIMIT,
        });
      } catch (error) {
        set({
          errorMessage:
            error instanceof Error
              ? error.message
              : `Could not generate ${size.label}`,
        });
        break;
      }
      set({
        generationProgress: Math.round(((index + 1) / totalCount) * 100),
      });
    }

    set({ generatedAssets: generated, isGenerating: false });
  },

  clearGeneratedAssets: () => {
    revokeAssetBlobUrls(get().generatedAssets);
    set({ generatedAssets: [], generationProgress: 0 });
  },

  // --- Export state ---
  isDownloading: false,

  downloadZip: async () => {
    const { generatedAssets } = get();
    if (generatedAssets.length === 0) return;

    set({ isDownloading: true });
    try {
      const unlockedAssets = generatedAssets.filter(
        (asset) => !asset.isLocked
      );
      const zipEntries = await Promise.all(
        unlockedAssets.map(async (asset) => {
          const response = await fetch(asset.blobUrl);
          const blob = await response.blob();
          return {
            folderName: asset.folderName,
            filename: asset.filename,
            blob,
          };
        })
      );
      const zipBlob = await buildZip(zipEntries);
      saveAs(zipBlob, "assetsizer-export.zip");
    } finally {
      set({ isDownloading: false });
    }
  },

  // --- Tier state ---
  isPro: false,

  setIsPro: (value) => {
    set((state) => ({
      isPro: value,
      generatedAssets: state.generatedAssets.map((asset, index) => ({
        ...asset,
        isLocked: !value && index >= FREE_ASSET_LIMIT,
      })),
    }));
  },

  // --- Error state ---
  errorMessage: null,
  setErrorMessage: (message) => {
    set({ errorMessage: message });
  },
}));

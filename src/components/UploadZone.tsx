import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ACCEPTED_EXTENSIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAssetStore } from "@/store/useAssetStore";

function formatFileSize(bytes: number): string {
  const megabytes = bytes / (1024 * 1024);
  if (megabytes >= 1) {
    return `${megabytes.toFixed(1)} MB`;
  }
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function UploadZone() {
  const originalFile = useAssetStore((state) => state.originalFile);
  const originalPreviewUrl = useAssetStore(
    (state) => state.originalPreviewUrl
  );
  const originalWidth = useAssetStore((state) => state.originalWidth);
  const originalHeight = useAssetStore((state) => state.originalHeight);
  const errorMessage = useAssetStore((state) => state.errorMessage);
  const setOriginalFile = useAssetStore((state) => state.setOriginalFile);
  const clearOriginalFile = useAssetStore((state) => state.clearOriginalFile);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalFile(file);
    }
    // Allow picking the same file again.
    event.target.value = "";
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setOriginalFile(file);
    }
  };

  return (
    <div>
      {originalFile && originalPreviewUrl ? (
        <div className="border border-zinc-800 rounded-xl p-6 flex items-center gap-4">
          <img
            src={originalPreviewUrl}
            alt={originalFile.name}
            className="w-16 h-16 object-cover rounded-lg bg-zinc-900 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-zinc-200 text-sm font-medium truncate">
              {originalFile.name}
            </p>
            <p className="text-zinc-500 text-xs mt-0.5">
              {originalWidth} × {originalHeight}
            </p>
            <p className="text-zinc-600 text-xs mt-0.5">
              {formatFileSize(originalFile.size)}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={openFilePicker}
              className="text-zinc-400 hover:text-zinc-100 text-sm transition-colors"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={clearOriginalFile}
              aria-label="Remove image"
              className="text-zinc-500 hover:text-zinc-200 transition-colors"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={openFilePicker}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors",
            isDragging
              ? "border-zinc-400"
              : "border-zinc-700 hover:border-zinc-500"
          )}
        >
          <div className="pointer-events-none">
            <ArrowUpTrayIcon className="h-12 w-12 text-zinc-500 mx-auto" />
            <p className="text-zinc-300 font-medium mt-4">
              Drop your image here
            </p>
            <p className="text-zinc-500 text-sm mt-1">or click to browse</p>
            <p className="text-zinc-600 text-xs mt-3">
              PNG, JPG, WebP, SVG — max 20MB
            </p>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_EXTENSIONS}
        onChange={handleFileChange}
        className="hidden"
      />

      {errorMessage && (
        <p className="text-red-400 text-sm mt-2">{errorMessage}</p>
      )}
    </div>
  );
}

export default UploadZone;

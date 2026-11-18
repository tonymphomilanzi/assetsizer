import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { useAssetStore } from "@/store/useAssetStore";

interface ExportBarProps {
  onOpenPaywall: () => void;
}

function ExportBar({ onOpenPaywall }: ExportBarProps) {
  const generatedAssets = useAssetStore((state) => state.generatedAssets);
  const isPro = useAssetStore((state) => state.isPro);
  const isDownloading = useAssetStore((state) => state.isDownloading);
  const downloadZip = useAssetStore((state) => state.downloadZip);

  if (generatedAssets.length === 0) return null;

  const totalCount = generatedAssets.length;
  const unlockedCount = generatedAssets.filter(
    (asset) => !asset.isLocked
  ).length;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/90 backdrop-blur-sm border-t border-zinc-800 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="text-sm min-w-0">
          {isPro ? (
            <span className="text-zinc-300">{totalCount} images ready</span>
          ) : (
            <>
              <span className="text-zinc-300">
                {unlockedCount} of {totalCount} free
              </span>
              <span className="text-zinc-600">{" — "}</span>
              {/** <button
                type="button"
                onClick={onOpenPaywall}
                className="text-zinc-400 text-sm underline cursor-pointer hover:text-zinc-200 transition-colors"
              >
                Get all {totalCount} with Pro
              </button>**/}
            </>
          )}
        </div>
        <Button
          onClick={() => void downloadZip()}
          disabled={isDownloading}
          className="shrink-0"
        >
          <ArrowDownTrayIcon className="h-[18px] w-[18px]" />
          {isDownloading ? "Downloading…" : "Download ZIP"}
        </Button>
      </div>
    </div>
  );
}

export default ExportBar;

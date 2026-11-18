import { LockClosedIcon } from "@heroicons/react/24/outline";
import type { GeneratedAsset } from "@/store/useAssetStore";

interface PreviewCardProps {
  asset: GeneratedAsset;
}

function PreviewCard({ asset }: PreviewCardProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 relative overflow-hidden">
      <div className="w-full aspect-square bg-zinc-800 rounded flex items-center justify-center mb-2 overflow-hidden">
        <img
          src={asset.blobUrl}
          alt={asset.label}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <p className="text-zinc-300 text-xs font-medium truncate">
        {asset.label}
      </p>
      <p className="text-zinc-500 text-xs">
        {asset.width} × {asset.height}
      </p>
      {asset.isLocked && (
        <div className="absolute inset-0 bg-zinc-950/70 flex flex-col items-center justify-center rounded-lg">
          <LockClosedIcon className="h-5 w-5 text-zinc-500" />
          <span className="text-zinc-500 text-xs mt-1">Pro</span>
        </div>
      )}
    </div>
  );
}

export default PreviewCard;

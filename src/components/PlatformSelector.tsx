import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { platforms, getTotalSizeCount } from "@/lib/platformSizes";
import { useAssetStore } from "@/store/useAssetStore";

function PlatformSelector() {
  const originalFile = useAssetStore((state) => state.originalFile);
  const selectedPlatformIds = useAssetStore(
    (state) => state.selectedPlatformIds
  );
  const togglePlatform = useAssetStore((state) => state.togglePlatform);
  const selectAllPlatforms = useAssetStore(
    (state) => state.selectAllPlatforms
  );
  const deselectAllPlatforms = useAssetStore(
    (state) => state.deselectAllPlatforms
  );

  if (!originalFile) return null;

  const totalCount = getTotalSizeCount(selectedPlatformIds);

  return (
    <section>
      <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
        Select Platforms
      </h2>
      <div>
        {platforms.map((platform) => {
          const isChecked = selectedPlatformIds.includes(platform.id);
          return (
            <div
              key={platform.id}
              onClick={() => togglePlatform(platform.id)}
              className="flex items-center gap-3 py-3 cursor-pointer select-none"
            >
              <span
                className="flex items-center"
                onClick={(event) => event.stopPropagation()}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => togglePlatform(platform.id)}
                  aria-label={platform.name}
                />
              </span>
              <span className="text-zinc-200 text-sm">{platform.name}</span>
              <Badge
                variant="secondary"
                className="text-zinc-500 text-xs font-normal"
              >
                {platform.sizes.length} sizes
              </Badge>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-2">
        <button
          type="button"
          onClick={selectAllPlatforms}
          className="text-zinc-500 hover:text-zinc-300 text-xs transition-colors"
        >
          Select all
        </button>
        <button
          type="button"
          onClick={deselectAllPlatforms}
          className="text-zinc-500 hover:text-zinc-300 text-xs transition-colors"
        >
          Clear
        </button>
      </div>
      <p className="text-zinc-400 text-sm mt-3">{totalCount} images total</p>
    </section>
  );
}

export default PlatformSelector;

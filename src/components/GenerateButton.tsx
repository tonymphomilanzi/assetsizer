import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getTotalSizeCount } from "@/lib/platformSizes";
import { useAssetStore } from "@/store/useAssetStore";

function GenerateButton() {
  const originalFile = useAssetStore((state) => state.originalFile);
  const selectedPlatformIds = useAssetStore(
    (state) => state.selectedPlatformIds
  );
  const isGenerating = useAssetStore((state) => state.isGenerating);
  const generationProgress = useAssetStore(
    (state) => state.generationProgress
  );
  const generateAssets = useAssetStore((state) => state.generateAssets);

  if (!originalFile) return null;

  const totalCount = getTotalSizeCount(selectedPlatformIds);

  return (
    <div>
      <Button
        onClick={() => void generateAssets()}
        disabled={selectedPlatformIds.length === 0 || isGenerating}
        size="lg"
        className="w-full"
      >
        {isGenerating
          ? `Generating… ${generationProgress}%`
          : `Generate ${totalCount} Assets`}
      </Button>
      {isGenerating && (
        <div className="mt-3">
          <Progress value={generationProgress} className="h-0.5 bg-zinc-800" />
        </div>
      )}
    </div>
  );
}

export default GenerateButton;

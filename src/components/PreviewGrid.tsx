import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useAssetStore } from "@/store/useAssetStore";
import PreviewCard from "./PreviewCard";

function PreviewGrid() {
  const generatedAssets = useAssetStore((state) => state.generatedAssets);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const previousLengthRef = useRef(0);

  // Stagger-fade cards only when the grid transitions from empty to populated.
  useEffect(() => {
    const wasEmpty = previousLengthRef.current === 0;
    previousLengthRef.current = generatedAssets.length;

    if (wasEmpty && generatedAssets.length > 0) {
      const elements = cardRefs.current.filter(
        (element): element is HTMLDivElement => element !== null
      );
      if (elements.length > 0) {
        tweenRef.current = gsap.from(elements, {
          opacity: 0,
          y: 8,
          duration: 0.3,
          stagger: 0.02,
          ease: "power2.out",
        });
      }
    }
  }, [generatedAssets]);

  useEffect(() => {
    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  if (generatedAssets.length === 0) return null;

  return (
    <section>
      <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
        Preview
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {generatedAssets.map((asset, index) => (
          <div
            key={`${asset.folderName}/${asset.filename}`}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
          >
            <PreviewCard asset={asset} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default PreviewGrid;

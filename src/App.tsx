import { useRef, useState } from "react";
import Layout from "./components/Layout";
import HeroSection from "./components/HeroSection";
import UploadZone from "./components/UploadZone";
import PlatformSelector from "./components/PlatformSelector";
import GenerateButton from "./components/GenerateButton";
import PreviewGrid from "./components/PreviewGrid";
import ExportBar from "./components/ExportBar";
import PaywallDialog from "./components/PaywallDialog";
import { useAssetStore } from "./store/useAssetStore";

function App() {
  const generatedAssets = useAssetStore((state) => state.generatedAssets);
  const hasResults = generatedAssets.length > 0;
  const [paywallOpen, setPaywallOpen] = useState(false);
  const toolSectionRef = useRef<HTMLDivElement>(null);

  const openPaywall = () => setPaywallOpen(true);

  const scrollToTool = () => {
    toolSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout onOpenPaywall={openPaywall} padForExportBar={hasResults}>
      {/* ── Hero ── */}
      <HeroSection onScrollToTool={scrollToTool} onOpenPaywall={openPaywall} />

      {/* ── Tool ── */}
      <div
        ref={toolSectionRef}
        className="max-w-4xl mx-auto px-4 py-16"
      >
        {/* Section label */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-zinc-600 text-xs uppercase tracking-widest">
            The tool
          </span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        <UploadZone />
        <div className="mt-8">
          <PlatformSelector />
        </div>
        <div className="mt-6">
          <GenerateButton />
        </div>
        <div className="mt-10">
          <PreviewGrid />
        </div>
      </div>

      {hasResults && <ExportBar onOpenPaywall={openPaywall} />}
      <PaywallDialog
        isOpen={paywallOpen}
        onClose={() => setPaywallOpen(false)}
      />
    </Layout>
  );
}

export default App;

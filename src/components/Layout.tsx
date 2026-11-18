import type { ReactNode } from "react";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
  onOpenPaywall?: () => void;
  padForExportBar?: boolean;
}

function Layout({ children, onOpenPaywall, padForExportBar = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Sticky nav — sits on top of the hero */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="text-lg font-black tracking-tight text-zinc-100">
            {APP_NAME}
          </span>
          {/**<button
            type="button"
            onClick={onOpenPaywall}
            className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Get Pro
          </button>**/}
        </div>
      </header>

      {/* Main content — children are responsible for their own top padding */}
      <main className={cn(padForExportBar && "pb-20")}>{children}</main>

      <footer className="border-t border-zinc-800 mt-20">
        <div className="max-w-4xl mx-auto px-4 py-6 text-sm text-zinc-500">
          Built by Tony Milanzi
        </div>
      </footer>
    </div>
  );
}

export default Layout;

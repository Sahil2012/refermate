import { useEffect, useRef, useState } from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import DashboardImg from "@/assets/images/dashboard.png"

const TRAFFIC_LIGHTS = [
  { fill: "bg-[#ff5f57]", ring: "ring-[#e0443e]/60" },
  { fill: "bg-[#febc2e]", ring: "ring-[#dea123]/60" },
  { fill: "bg-[#28c840]", ring: "ring-[#1aab29]/60" },
] as const;

export default function Demo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <section className="pt-10 pb-20 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4">
        <div
          ref={containerRef}
          className={cn(
            "transition-all duration-1000 ease-out transform will-change-transform",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          )}
        >
          <div className="relative mx-auto flex max-w-6xl flex-col overflow-hidden rounded-xl border border-border bg-background shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),0_30px_80px_-24px_rgba(0,0,0,0.35)] ring-1 ring-black/5 dark:ring-white/10">
            <div className="flex shrink-0 items-center gap-2 border-b border-border bg-gradient-to-b from-muted/70 to-muted/30 px-4 py-3">
              <div className="flex items-center gap-[7px]">
                {TRAFFIC_LIGHTS.map(({ fill, ring }) => (
                  <span
                    key={fill}
                    className={cn(
                      "h-3 w-3 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] ring-1 ring-inset",
                      fill,
                      ring
                    )}
                  />
                ))}
              </div>
              <div className="flex flex-1 justify-center px-4">
                <div className="flex w-full max-w-xs items-center justify-center gap-1.5 rounded-md border border-border/60 bg-background/80 px-2.5 py-1 text-[11px] text-muted-foreground shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] sm:max-w-sm">
                  <Lock className="h-2.5 w-2.5 shrink-0" strokeWidth={2.5} />
                  <span className="truncate">refermate.novacraftsai.com/dashboard</span>
                </div>
              </div>
              <div className="w-[43px] shrink-0" aria-hidden="true" />
            </div>

            <div className="aspect-24/14 w-full bg-background flex items-center justify-center p-1">
              <div className="relative w-full h-full group">
                <img
                  src={DashboardImg}
                  alt="Dashboard Preview"
                  className="w-full h-full object-contain shadow-sm transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 opacity-40 mix-blend-overlay pointer-events-none" />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/5 rounded-lg pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

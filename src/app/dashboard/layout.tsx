import { SparklesCore } from "@/components/ui/sparkles";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SparklesCore
          id="dashboard-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={60}
          particleColor="#ffffff"
          speed={0.6}
          className="w-full h-full"
        />
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </>
  );
}

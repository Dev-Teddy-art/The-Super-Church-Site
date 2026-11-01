import Navbar from "@/components/Navbar";
import RoseScrollHero from "@/components/RoseScrollHero";
import HomeSections from "@/components/HomeSections";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#181916]">
      <Navbar />
      <RoseScrollHero totalFrames={240} />
      <HomeSections />
    </main>
  );
}
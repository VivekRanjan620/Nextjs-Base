import Carousel from "@/app/components/ui/Carousel";
import CategorySection from "@/app/components/home/CategorySection";
import TopPicks from "@/app/components/home/TopPicks";
import BlogSection from "@/app/components/home/BlogSection";
import YoutubeSection from "@/app/components/home/YoutubeSection";
import AboutSection from "./components/home/AboutSection";

export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Banner carousel + Elite strip */}
      <Carousel />

      <CategorySection />
      
      {/* Top Picks For You — horizontal scroll product cards */}
      <TopPicks />

      {/* Our Blog — 3 blog cards */}
      <BlogSection />

      {/* Youtube Videos — 4 video thumbnails */}
      <YoutubeSection />

      <AboutSection />

    </div>
  );
}
import Hero from "@/components/sections/Hero";
import FeaturedPets from "@/components/sections/FeaturedPets";
import CompanyInfo from "@/components/sections/CompanyInfo";
import AdoptionTips from "@/components/sections/AdoptionTips";
import FAQ from "@/components/sections/FAQ";
import SuccessStories from "@/components/sections/SuccessStories";
import Banner from "@/components/sections/Banner";
import Contact from "@/components/sections/Contact";
import BackgroundDecorations from "@/components/sections/BackgroundDecorations";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">      
      <BackgroundDecorations />

      <Hero />
      <FeaturedPets />
      <CompanyInfo />
      <AdoptionTips />
      <FAQ />      
      <SuccessStories />
      <Banner />
      <Contact />
                  
    </div>
  );
};

export default Index;
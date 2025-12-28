import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>بصمة تك | منصة إدارة الوقت والحضور الذكية</title>
        <meta 
          name="description" 
          content="منصة بصمة تك لإدارة الوقت والحضور والانصراف. تتبع GPS، إدارة المهام، تقارير شاملة. ابدأ تجربتك المجانية الآن." 
        />
        <meta name="keywords" content="إدارة الوقت، حضور وانصراف، تتبع الموظفين، GPS، إدارة المهام، تقارير الإنتاجية" />
        <link rel="canonical" href="https://basmatech.com" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Index;

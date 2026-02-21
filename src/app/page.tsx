import { Hero } from "@/components/Hero";
import { CaseStudy } from "@/components/CaseStudy";
import { Calculator } from "@/components/Calculator";
import { WhatYouGet, FinalCTA, Footer } from "@/components/Sections";
import { SocialProof } from "@/components/SocialProof";
import { FAQ } from "@/components/FAQ";

export default function Home() {
  return (
    <main>
      <Hero />
      <CaseStudy />
      <WhatYouGet />
      <Calculator />
      <SocialProof />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}

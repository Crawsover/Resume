import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import CaseStudies from "./components/CaseStudies";
import Tools from "./components/Tools";
import Roles from "./components/Roles";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

// Mock Data
import { portfolioData } from "./data/mock";

const Portfolio = () => {
  return (
    <div className="portfolio-wrapper">
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <Hero data={portfolioData.hero} />
      <Skills data={portfolioData.skillClusters} />
      <CaseStudies data={portfolioData.caseStudies} />
      <Tools data={portfolioData.tools} />
      <Roles data={portfolioData.roles} />
      <CTA />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

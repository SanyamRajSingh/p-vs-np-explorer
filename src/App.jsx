import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StoryAnalogy from "./components/StoryAnalogy";
import CoreIdea from "./components/CoreIdea";
import VisualDefinitions from "./components/VisualDefinitions";
import VennDiagram from "./components/VennDiagram";
import TSPSimulation from "./components/TSPSimulation";
import SudokuSimulation from "./components/SudokuSimulation";
import AlgorithmPlayground from "./components/AlgorithmPlayground";
import Misconceptions from "./components/Misconceptions";
import RealWorldCases from "./components/RealWorldCases";
import FunFacts from "./components/FunFacts";
import ResearchStatus from "./components/ResearchStatus";
import ComparisonTable from "./components/ComparisonTable";
import FinalInsight from "./components/FinalInsight";

function App() {
  return (
    <div
      className="App bg-black text-white min-h-screen overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Navbar />
      <Hero />
      <StoryAnalogy />
      <CoreIdea />
      <VisualDefinitions />
      <VennDiagram />
      <TSPSimulation />
      <SudokuSimulation />
      <AlgorithmPlayground />
      <Misconceptions />
      <RealWorldCases />
      <FunFacts />
      <ResearchStatus />
      <ComparisonTable />
      <FinalInsight />
    </div>
  );
}

export default App;

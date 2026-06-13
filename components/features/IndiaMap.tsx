"use client";

import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { Users, BookOpen, TrendingUp, CheckCircle2 } from "lucide-react";

// India TopoJSON from local assets
const GEO_URL = "/assets/india.topo.json";

interface StateData {
  id: string;
  name: string;
  programsRunning: number;
  beneficiaries: number;
  volunteers: number;
  successStories: number;
  activePrograms: string[];
  highlight: boolean;
}

interface IndiaMapProps {
  data: StateData[];
}

export default function IndiaMap({ data }: IndiaMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [activeState, setActiveState] = useState<StateData | null>(null);

  // Prevent Hydration Errors & CLS
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  // Normalization helper to match map-data.json id/name with TopoJSON properties
  const getMappedData = (geo: any /* eslint-disable-line @typescript-eslint/no-explicit-any */): StateData | undefined => {
    const geoName = geo.properties.name || geo.properties.ST_NM || geo.properties.st_nm || geo.id || "";
    // Match by exact name or normalized ID
    return data.find(
      (d) =>
        d.name.toLowerCase() === geoName.toLowerCase() ||
        d.id.toLowerCase() === geoName.toLowerCase().replace(/\s+/g, "-")
    );
  };

  const handleStateClick = (geo: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => {
    const matchedData = getMappedData(geo);
    if (matchedData) {
      setActiveState(matchedData);
    } else {
      // Create a dummy state if no data exists, so the UI still responds
      const name = geo.properties.name || geo.properties.ST_NM || geo.properties.st_nm || "Unknown State";
      setActiveState({
        id: name.toLowerCase().replace(/\s+/g, "-"),
        name: name,
        programsRunning: 0,
        beneficiaries: 0,
        volunteers: 0,
        successStories: 0,
        activePrograms: ["Planning phase"],
        highlight: false,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, geo: unknown) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleStateClick(geo);
    }
  };

  if (!isMounted) {
    // Explicit aspect-ratio skeleton to prevent CLS
    return (
      <div className="w-full h-full min-h-[500px] aspect-[4/5] md:aspect-square lg:aspect-[4/3] bg-gray-50 rounded-3xl animate-pulse flex items-center justify-center border border-border">
        <span className="font-body text-text-muted">Loading Interactive Map...</span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
      
      {/* MAP CONTAINER */}
      <div className="w-full lg:w-3/5 bg-white rounded-3xl shadow-xl border border-border p-4 relative overflow-hidden min-h-[400px] md:min-h-[500px] lg:h-[650px] flex items-center justify-center">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 1000,
            center: [80, 22] // Approximate center of India
          }}
          className="w-full h-full object-contain outline-none"
        >
          <ZoomableGroup center={[80, 22]} zoom={1} minZoom={1} maxZoom={4}>
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateData = getMappedData(geo);
                  const isHighlighted = stateData?.highlight;
                  const isActive = activeState?.name === (geo.properties.name || geo.properties.ST_NM || geo.properties.st_nm);

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      role="button"
                      tabIndex={0}
                      aria-label={geo.properties.name || geo.properties.ST_NM || geo.properties.st_nm}
                      onClick={() => handleStateClick(geo)}
                      onKeyDown={(e) => handleKeyDown(e, geo)}
                      className="outline-none"
                      style={{
                        default: {
                          fill: isActive ? "#F26522" : isHighlighted ? "#A7F3D0" : "#E2E8F0",
                          stroke: "#94A3B8",
                          strokeWidth: 0.75,
                          outline: "none",
                          transition: "all 0.3s ease",
                        },
                        hover: {
                          fill: isActive ? "#F26522" : "#1A6B3C",
                          stroke: "#94A3B8",
                          strokeWidth: 1,
                          outline: "none",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        },
                        pressed: {
                          fill: "#F26522",
                          stroke: "#94A3B8",
                          strokeWidth: 1,
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {/* Legend */}
        <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-border shadow-md flex flex-col gap-3 pointer-events-none z-10">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-[#E2E8F0] border border-gray-400" />
            <span className="font-body text-sm font-medium text-text-muted">Standard</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-[#A7F3D0] border border-gray-400" />
            <span className="font-body text-sm font-medium text-text-muted">High Activity</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-[#F26522]" />
            <span className="font-body text-sm font-medium text-text-muted">Selected</span>
          </div>
        </div>
      </div>

      {/* STATS PANEL */}
      <div className="w-full lg:w-2/5 lg:h-[650px]">
        <AnimatePresence mode="wait">
          {activeState ? (
            <motion.div
              key={activeState.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-xl border border-border p-8 h-full flex flex-col relative overflow-hidden"
            >
              {/* Decorative Banner */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-primary" />
              
              <h3 className="font-display font-bold text-3xl md:text-4xl text-text mb-2 mt-2">
                {activeState.name}
              </h3>
              <p className="font-body text-primary font-semibold mb-8 uppercase tracking-wider text-sm">
                Regional Impact Report
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-bg rounded-2xl p-4 border border-border">
                  <BookOpen className="w-6 h-6 text-primary mb-2" />
                  <p className="font-display font-bold text-2xl text-text">{activeState.programsRunning}</p>
                  <p className="font-body text-text-muted text-sm">Active Programs</p>
                </div>
                <div className="bg-bg rounded-2xl p-4 border border-border">
                  <Users className="w-6 h-6 text-primary mb-2" />
                  <p className="font-display font-bold text-2xl text-text">{activeState.beneficiaries.toLocaleString()}+</p>
                  <p className="font-body text-text-muted text-sm">Beneficiaries</p>
                </div>
                <div className="bg-bg rounded-2xl p-4 border border-border">
                  <CheckCircle2 className="w-6 h-6 text-primary mb-2" />
                  <p className="font-display font-bold text-2xl text-text">{activeState.volunteers.toLocaleString()}</p>
                  <p className="font-body text-text-muted text-sm">Volunteers</p>
                </div>
                <div className="bg-bg rounded-2xl p-4 border border-border">
                  <TrendingUp className="w-6 h-6 text-primary mb-2" />
                  <p className="font-display font-bold text-2xl text-text">{activeState.successStories}</p>
                  <p className="font-body text-text-muted text-sm">Success Stories</p>
                </div>
              </div>

              <div className="mt-auto">
                <h4 className="font-display font-bold text-lg text-text mb-4">Current Initiatives</h4>
                <ul className="space-y-3">
                  {activeState.activePrograms.map((program, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 shrink-0" />
                      <span className="font-body text-text-muted leading-relaxed">{program}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-bg rounded-3xl border-2 border-dashed border-border p-12 h-full flex flex-col items-center justify-center text-center"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                <Users className="w-10 h-10 text-primary/40" />
              </div>
              <h3 className="font-display font-bold text-2xl text-text mb-3">Explore Our Reach</h3>
              <p className="font-body text-text-muted text-lg max-w-sm">
                Click or tap on any state on the map to view detailed grassroots impact metrics and active programs for that region.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

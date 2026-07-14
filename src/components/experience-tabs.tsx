"use client";

import { useState } from "react";

const tabs = {
  work: "placeholder notes for projects, collaborations, and things built in the real world.",
  awards: "placeholder notes for scholarships, competitions, recognitions, and other pleasant eigenvalues.",
  research: "placeholder notes for investigations in theoretical physics, mathematics, and everything adjacent.",
} as const;

type Tab = keyof typeof tabs;

export function ExperienceTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("work");

  return (
    <div className="experience-subtabs">
      <div className="experience-tab-list" role="tablist" aria-label="Experience categories">
        {(Object.keys(tabs) as Tab[]).map((tab) => (
          <button
            className={activeTab === tab ? "is-active" : ""}
            key={tab}
            onClick={() => setActiveTab(tab)}
            role="tab"
            aria-selected={activeTab === tab}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="experience-notes" key={activeTab} role="tabpanel">
        <p className="experience-note-enter">
          <strong>{activeTab}</strong> — {tabs[activeTab]}
        </p>
      </div>
    </div>
  );
}

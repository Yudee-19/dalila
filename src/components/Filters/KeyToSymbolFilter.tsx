"use client";

import React, { useState } from "react";

const KEY_TO_SYMBOL_OPTIONS = [
  "ALL",
  "PINPOINT",
  "NEEDLE",
  "FEATHER",
  "CRYSTAL",
  "CLOUD",
  "INDENTED NATURAL",
  "CAVITY",
  "TWINNING WISP",
  "NATURAL",
  "CHIP",
  "EXTRA FACET",
  "KNOT",
  "SURFACE GRAINING",
];

export interface KeySymbolFilters {
  keyToSymbol: string[];
}

interface KeySymbolFilterProps {
  filters: KeySymbolFilters;
  onFiltersChange: (filters: KeySymbolFilters) => void;
  className?: string;
}

export default function KeySymbolFilter({
  filters,
  onFiltersChange,
  className = "",
}: KeySymbolFilterProps) {
  const toggleFilter = (category: keyof KeySymbolFilters, value: string) => {
    const currentValues = filters[category] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    onFiltersChange({ ...filters, [category]: newValues });
  };

  const isSelected = (category: keyof KeySymbolFilters, value: string) =>
    filters[category]?.includes(value) || false;

  // Chevron icon for dropdown
  const ChevronIcon = ({ open }: { open: boolean }) => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ml-1"
    >
      {open ? (
        <path d="M6 12l4-4 4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M6 8l4 4 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );

  // Desktop view (unchanged)
  const desktopView = (
    <div
      className={`mt-1 ${className} hidden lg:block`}
      style={{ width: "100%", fontFamily: "'Maven Pro', sans-serif" }}
    >
      {/* Main Header with Icon */}
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5"
        style={{ backgroundColor: "#000033" }}
      >
        <span className="text-base font-normal text-white">Key To Symbol</span>
      </div>

      {/* Key To Symbol Options */}
      <div
        className="bg-white"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "6px",
          padding: "6px",
          borderLeft: "1px solid #f9e8cd",
          borderRight: "1px solid #f9e8cd",
          borderBottom: "1px solid #f9e8cd",
        }}
      >
        {KEY_TO_SYMBOL_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => toggleFilter("keyToSymbol", option)}
            className={`font-normal transition-colors ${
              isSelected("keyToSymbol", option)
                ? "text-gray-800 bg-[#FAF6EB]"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            style={{
              minWidth: "65px",
              height: "28px",
              fontSize: "14px",
              padding: "4px 6px",
              border: isSelected("keyToSymbol", option)
                ? "0.25px solid #FAF6EB"
                : "0.25px solid #f9e8cd",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  // Mobile dropdown state
  const [open, setOpen] = useState(false);

  // Mobile view: dropdown with compact layout
  const mobileView = (
    <div
      className={`mt-1 ${className} block lg:hidden`}
      style={{ width: "100%", fontFamily: "'Maven Pro', sans-serif" }}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between px-2.5 py-1.5 focus:outline-none"
        style={{ backgroundColor: "#000033" }}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="keysymbol-filter-mobile-panel"
      >
        <span className="text-sm font-normal text-white">Key To Symbol</span>
        <div className="flex items-center ml-auto">
          <ChevronIcon open={open} />
        </div>
      </button>

      {open && (
        <div
          id="keysymbol-filter-mobile-panel"
          className="bg-white"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "4px",
            padding: "4px",
            borderLeft: "1px solid #f9e8cd",
            borderRight: "1px solid #f9e8cd",
            borderBottom: "1px solid #f9e8cd",
          }}
        >
          {KEY_TO_SYMBOL_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => toggleFilter("keyToSymbol", option)}
              className={`font-normal transition-colors ${
                isSelected("keyToSymbol", option)
                  ? "text-gray-800 bg-[#FAF6EB]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                minWidth: "50px",
                height: "24px",
                fontSize: "11px",
                padding: "2px 4px",
                border: isSelected("keyToSymbol", option)
                  ? "0.25px solid #FAF6EB"
                  : "0.25px solid #f9e8cd",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      {desktopView}
      {mobileView}
    </>
  );
}

"use client";

import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumber = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    setExpression(`${display} ${op}`);
    setShouldResetDisplay(true);
  };

  const handleEquals = () => {
    try {
      const result = eval(`${expression} ${display}`);
      setDisplay(String(result));
      setExpression("");
      setShouldResetDisplay(true);
    } catch {
      setDisplay("Error");
      setExpression("");
      setShouldResetDisplay(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setExpression("");
    setShouldResetDisplay(false);
  };

  const handlePercentage = () => {
    const num = parseFloat(display) / 100;
    setDisplay(String(num));
  };

  const handleToggleSign = () => {
    const num = parseFloat(display) * -1;
    setDisplay(String(num));
  };

  const buttons = [
    { label: "C", type: "function", onClick: handleClear },
    { label: "±", type: "function", onClick: handleToggleSign },
    { label: "%", type: "function", onClick: handlePercentage },
    { label: "÷", type: "operator", onClick: () => handleOperator("/") },
    { label: "7", type: "number", onClick: () => handleNumber("7") },
    { label: "8", type: "number", onClick: () => handleNumber("8") },
    { label: "9", type: "number", onClick: () => handleNumber("9") },
    { label: "×", type: "operator", onClick: () => handleOperator("*") },
    { label: "4", type: "number", onClick: () => handleNumber("4") },
    { label: "5", type: "number", onClick: () => handleNumber("5") },
    { label: "6", type: "number", onClick: () => handleNumber("6") },
    { label: "-", type: "operator", onClick: () => handleOperator("-") },
    { label: "1", type: "number", onClick: () => handleNumber("1") },
    { label: "2", type: "number", onClick: () => handleNumber("2") },
    { label: "3", type: "number", onClick: () => handleNumber("3") },
    { label: "+", type: "operator", onClick: () => handleOperator("+") },
    { label: "0", type: "zero", onClick: () => handleNumber("0") },
    { label: ".", type: "number", onClick: () => {
      if (!display.includes(".")) {
        setDisplay(display + ".");
      }
    }},
    { label: "=", type: "equals", onClick: handleEquals },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-xs">
        <div className="bg-slate-800 rounded-3xl shadow-2xl p-6">
          <h1 className="text-white text-center text-xl font-semibold mb-4">Calculator</h1>

          <div className="bg-slate-900 rounded-2xl p-4 mb-4">
            {expression && (
              <div className="text-slate-500 text-right text-sm mb-1 min-h-[1.5rem]">
                {expression}
              </div>
            )}
            <div className="text-white text-right text-4xl font-light truncate">
              {display}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {buttons.map((btn, index) => (
              <button
                key={index}
                onClick={btn.onClick}
                className={`
                  h-16 rounded-full text-xl font-semibold transition-all
                  ${
                    btn.type === "equals"
                      ? "bg-blue-500 text-white hover:bg-blue-600 col-span-2"
                      : btn.type === "operator"
                      ? "bg-slate-600 text-white hover:bg-slate-500"
                      : btn.type === "function"
                      ? "bg-slate-700 text-white hover:bg-slate-600"
                      : btn.type === "zero"
                      ? "bg-slate-700 text-white hover:bg-slate-600 col-span-2"
                      : "bg-slate-700 text-white hover:bg-slate-600"
                  }
                  active:scale-95
                `}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

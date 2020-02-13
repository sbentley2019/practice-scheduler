import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false) {
    !replace && setHistory(prev => [...prev, newMode]);
    setMode(newMode);
  };

  const back = function() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prev => prev.slice(0, prev.length - 1));
    }
  };

  return { mode, transition, back };
}

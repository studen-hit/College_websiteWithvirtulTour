import { useState, useCallback, useRef } from "react";

interface ToggleProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
  disabled?: boolean;
}

function playSnapSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(900, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
    setTimeout(() => ctx.close(), 200);
  } catch (_) {}
}

const sizeMap = {
  sm: { track: "w-9 h-5", knob: "w-4 h-4", translate: "translate-x-4", padding: "p-0.5" },
  md: { track: "w-12 h-7", knob: "w-5 h-5", translate: "translate-x-5", padding: "p-1" },
  lg: { track: "w-16 h-9", knob: "w-7 h-7", translate: "translate-x-7", padding: "p-1" },
};

export default function Toggle({
  defaultChecked = false,
  onChange,
  label,
  size = "md",
  color = "#1B3A6B",
  disabled = false,
}: ToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);
  const s = sizeMap[size];

  const handleToggle = useCallback(() => {
    if (disabled) return;
    const next = !checked;
    setChecked(next);
    playSnapSound();
    onChange?.(next);
  }, [checked, disabled, onChange]);

  return (
    <label className={`inline-flex items-center gap-3 ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} select-none`}>
      <button
        role="switch"
        aria-checked={checked}
        onClick={handleToggle}
        disabled={disabled}
        className={`
          relative inline-flex items-center ${s.track} ${s.padding}
          rounded-full transition-colors duration-300
          focus-visible:outline-2 focus-visible:outline-offset-2
          ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
          shadow-inner
        `}
        style={{
          backgroundColor: checked ? color : "#D1D5DB",
          outlineColor: color,
        }}
      >
        <span
          className={`
            toggle-knob ${s.knob} rounded-full bg-white shadow-md
            ${checked ? s.translate : "translate-x-0"}
            block
          `}
          style={{
            boxShadow: "0 1px 4px rgba(0,0,0,0.22), 0 0 0 0.5px rgba(0,0,0,0.06)",
          }}
        />
      </button>
      {label && (
        <span className="text-sm font-medium text-gray-700">{label}</span>
      )}
    </label>
  );
}

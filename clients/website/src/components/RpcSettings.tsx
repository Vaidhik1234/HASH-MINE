"use client";

import { useEffect, useState } from "react";

const KEY = "equium:rpc-override";

export function RpcSettings() {
  const [value, setValue] = useState("");
  const [stored, setStored] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (v) {
        setStored(v);
        setValue(v);
      }
    } catch {}
  }, []);

  const save = () => {
    const v = value.trim();
    if (!v) {
      try { localStorage.removeItem(KEY); } catch {}
      setStored(null);
      setSavedAt(Date.now());
      setErr(null);
      return;
    }
    if (!/^https?:\/\//.test(v)) {
      setErr("must start with http:// or https://");
      return;
    }
    try {
      localStorage.setItem(KEY, v);
      setStored(v);
      setSavedAt(Date.now());
      setErr(null);
    } catch {
      setErr("couldn't write to localStorage");
    }
  };

  const reset = () => {
    setValue("");
    try { localStorage.removeItem(KEY); } catch {}
    setStored(null);
    setSavedAt(Date.now());
    setErr(null);
  };

  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6">
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-rose)] mb-2 font-semibold">
        Your RPC URL
      </div>
      <div className="text-[13px] text-[var(--color-fg-dim)] mb-4">
        Pasted URLs are stored only in this browser. Leave empty to use our
        rate-limited public proxy.
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setErr(null);
          }}
          placeholder="https://mainnet.helius-rpc.com/?api-key=…"
          className="flex-1 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border-bright)] px-4 py-3 font-mono text-[13px] text-[var(--color-fg)] focus:border-[var(--color-rose)] outline-none"
        />
        <button
          onClick={save}
          className="px-5 py-3 rounded-2xl bg-[var(--color-rose)] text-[var(--color-bg)] text-[14px] font-bold hover:bg-[var(--color-rose-bright)] transition-colors"
        >
          Save
        </button>
        {stored && (
          <button
            onClick={reset}
            className="px-4 py-3 rounded-2xl border border-[var(--color-border-bright)] text-[13px] font-medium text-[var(--color-fg-soft)] hover:bg-white/[0.04]"
          >
            Clear
          </button>
        )}
      </div>
      {err && <p className="text-[13px] text-[var(--color-rose)] mt-3">{err}</p>}
      {savedAt && !err && (
        <p className="text-[13px] text-[var(--color-mint)] mt-3">
          {stored ? "✓ Saved. Refresh /mine to use it." : "✓ Reverted to default proxy."}
        </p>
      )}
      {stored && !savedAt && (
        <p className="text-[12px] text-[var(--color-fg-dim)] mt-3 font-mono">
          Active: <span className="text-[var(--color-teal)]">{maskKey(stored)}</span>
        </p>
      )}
    </div>
  );
}

function maskKey(url: string): string {
  return url.replace(/(api-key=)([^&]{4})[^&]+([^&]{4})/, "$1$2…$3");
}

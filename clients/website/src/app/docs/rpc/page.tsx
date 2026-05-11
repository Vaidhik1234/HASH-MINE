import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RpcSettings } from "@/components/RpcSettings";

export const metadata = {
  title: "Get an RPC endpoint",
  description:
    "How to grab a free Helius RPC endpoint for the Equium browser miner or CLI.",
};

export default function RpcDocsPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-rose)] mb-3 font-semibold">
            — Setup guide —
          </div>
          <h1 className="text-[44px] md:text-[60px] font-black tracking-[-0.03em] leading-[1] mb-5">
            Get your own RPC.
          </h1>
          <p className="text-[17px] leading-[1.6] text-[var(--color-fg-dim)] max-w-2xl mb-12">
            The Equium desktop miner runs against your own Solana RPC endpoint.
            The browser miner uses ours by default, but you can plug in a
            personal endpoint for unlimited throughput. Either way: free, 5
            minutes, no credit card.
          </p>

          <Step
            n={1}
            title="Make a free Helius account"
            body={
              <>
                Go to{" "}
                <a
                  href="https://www.helius.dev/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[var(--color-rose)] font-semibold hover:underline"
                >
                  helius.dev
                </a>{" "}
                and sign up. They have a free tier with{" "}
                <span className="font-mono font-bold">100,000 requests/day</span>{" "}
                — more than enough for a single laptop mining around the clock.
              </>
            }
          />

          <Step
            n={2}
            title="Create an API key"
            body={
              <>
                In the Helius dashboard, hit <Kbd>Endpoints</Kbd> → <Kbd>Create new</Kbd>{" "}
                or use the default project key. Select{" "}
                <span className="font-mono font-bold">Mainnet</span> (or{" "}
                <span className="font-mono font-bold">Devnet</span> while we're
                still pre-launch) and copy the full URL. It looks like:
              </>
            }
            code="https://mainnet.helius-rpc.com/?api-key=YOUR-KEY-HERE"
          />

          <Step
            n={3}
            title="Paste it below"
            body={
              <>
                Drop the URL in. It's stored only in your browser's
                localStorage and used for every RPC call the miner makes — we
                never see your key.
              </>
            }
          />

          <div className="mt-4 mb-16">
            <RpcSettings />
          </div>

          <Callout title="What about the desktop app?">
            The Mac/Windows installer ships with the same wizard inside —
            during onboarding you'll be asked to paste this URL, and it's saved
            in your local app settings (no server, no telemetry).
          </Callout>

          <Callout title="Why don't you provide RPC for everyone?" tone="dim">
            RPC providers charge per request. A single browser miner running
            for an hour can make ~10,000 RPC calls. At scale that's tens of
            millions of requests per day across all users — well past any free
            tier. Hosting our own proxy with strict per-IP limits is the
            compromise: it works for casual miners but rate-limits the heavy
            users into bringing their own.
          </Callout>
        </div>
      </div>
      <Footer />
    </main>
  );
}

function Step({
  n,
  title,
  body,
  code,
}: {
  n: number;
  title: string;
  body: React.ReactNode;
  code?: string;
}) {
  return (
    <div className="flex gap-6 mb-9">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-2xl border-2 border-[var(--color-rose)] bg-[var(--color-rose)]/10 flex items-center justify-center font-black text-[20px] text-[var(--color-rose)]">
          {n}
        </div>
      </div>
      <div className="flex-1 pt-1">
        <h3 className="text-[22px] font-bold tracking-[-0.01em] mb-2">
          {title}
        </h3>
        <div className="text-[15px] leading-[1.65] text-[var(--color-fg-soft)]">
          {body}
        </div>
        {code && (
          <pre className="mt-3 rounded-xl border border-[var(--color-border-bright)] bg-[var(--color-bg)] p-3 font-mono text-[12px] text-[var(--color-teal)] overflow-x-auto">
            {code}
          </pre>
        )}
      </div>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-2 py-0.5 rounded font-mono text-[12px] bg-[var(--color-bg-elev)] border border-[var(--color-border)] text-[var(--color-fg)]">
      {children}
    </span>
  );
}

function Callout({
  title,
  children,
  tone = "default",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "default" | "dim";
}) {
  return (
    <div
      className={`rounded-3xl p-6 mb-3 ${
        tone === "dim"
          ? "border border-[var(--color-border)] bg-[var(--color-bg-elev)]"
          : "border border-[var(--color-rose-soft)] bg-[var(--color-rose-soft)]/30"
      }`}
    >
      <h4
        className={`text-[16px] font-bold mb-2 ${
          tone === "dim" ? "text-[var(--color-fg-soft)]" : "text-[var(--color-rose-bright)]"
        }`}
      >
        {title}
      </h4>
      <p className="text-[14px] leading-[1.6] text-[var(--color-fg-dim)]">
        {children}
      </p>
    </div>
  );
}

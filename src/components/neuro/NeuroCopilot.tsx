import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { askCopilot } from "@/lib/ai.functions";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "How do I make a rural loan ad feel more trustworthy?",
  "Explain SST in one paragraph.",
  "What lowers digital anxiety in KYC flows?",
  "Best neuro-trigger for tractor loan creatives?",
];

export function NeuroCopilot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", content: "Namaste 👋 — I'm **NeuroCopilot**. Ask me anything about rural consumer psychology, campaign optimization, or neuromarketing methods." },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const ask = useServerFn(askCopilot);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 99999, behavior: "smooth" });
  }, [msgs, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next: Msg[] = [...msgs, { role: "user", content: trimmed }];
    setMsgs(next);
    setInput("");
    setLoading(true);
    try {
      const res = await ask({ data: { messages: next.slice(-12) } });
      if (res.ok) setMsgs([...next, { role: "assistant", content: res.reply }]);
      else setMsgs([...next, { role: "assistant", content: `⚠️ ${res.error}` }]);
    } catch (e) {
      setMsgs([...next, { role: "assistant", content: "⚠️ Could not reach AI. Please retry." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 grid place-items-center hover:scale-105 transition group"
          aria-label="Open NeuroCopilot"
        >
          <Sparkles className="h-6 w-6 group-hover:rotate-12 transition" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent pulse-glow ring-2 ring-background" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-40 w-[min(420px,calc(100vw-2rem))] h-[min(620px,calc(100vh-3rem))] soft-card rounded-2xl flex flex-col overflow-hidden fade-up">
          <div className="px-4 py-3 border-b border-border flex items-center gap-2.5 bg-primary/5">
            <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground grid place-items-center">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-sm font-semibold">NeuroCopilot</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">AI Behavioral Advisor</div>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto p-1.5 rounded-md hover:bg-secondary">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                }`}>
                  {m.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none [&_p]:my-1 [&_ul]:my-1 [&_strong]:text-primary">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-secondary rounded-2xl px-3.5 py-2.5 text-[13px] flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking…
                </div>
              </div>
            )}
            {msgs.length === 1 && (
              <div className="pt-2 space-y-1.5">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground px-1">Try asking</div>
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)} className="block w-full text-left text-[12px] px-3 py-2 rounded-lg bg-secondary/60 hover:bg-secondary text-foreground/80 hover:text-foreground transition">
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="border-t border-border p-3 flex items-center gap-2 bg-card"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask NeuroCopilot…"
              disabled={loading}
              className="flex-1 h-10 px-3 rounded-lg bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="h-10 w-10 grid place-items-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

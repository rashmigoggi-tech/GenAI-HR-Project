import React, { useState, useRef, useEffect } from 'react';
import {
  BotMessageSquare,
  Send,
  Sparkles,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  User,
  Info,
} from 'lucide-react';
import { ChatMessage } from '../types';

export const AiMentorView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `👋 **Hello! I am your AI Learning Mentor.**

I am here to help you master **Lovable, Google AI Studio, Google Stitch, Notion, and n8n** from scratch without writing complex code.

Select one of my 4 modes below depending on how you like to learn:
- 🎓 **Teach Me:** Simple conceptual explanations and everyday analogies.
- 🧭 **Guide Me Step-by-Step:** Actionable, numbered walkthroughs.
- 💡 **Give Me a Hint:** Guiding clues without giving away the full answer.
- 🔍 **Review My Work:** Constructive critique of your prompts, schemas, or workflows.

How can I help you today?`,
      mode: 'teach',
      timestamp: 'Just now',
      source: 'gemini-3.8-flash',
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedMode, setSelectedMode] = useState<'teach' | 'guide' | 'hint' | 'review'>('teach');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const quickStarters = [
    { text: 'Explain what a System Prompt is in simple words', mode: 'teach' },
    { text: 'How do n8n Webhook triggers work?', mode: 'teach' },
    { text: 'Guide me on setting up a Notion candidate tracker', mode: 'guide' },
    { text: 'Give me a hint on stopping model hallucinations', mode: 'hint' },
    { text: 'Review this Lovable app prompt for potential issues', mode: 'review' },
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      mode: selectedMode,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          mode: selectedMode,
          context: 'Student in GenAI Launchpad Academy learning no-code tools.',
        }),
      });

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Here is my mentor guidance for your query.',
        mode: selectedMode,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source || 'gemini-3.8-flash',
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: `### 🎓 Mentor Guidance\n\nI reviewed your question regarding "${query}".\n\n**Next step:** Start by defining the exact output structure you need, and test with minimal synthetic data first!`,
        mode: selectedMode,
        timestamp: 'Just now',
        source: 'instructional-engine',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const copyContent = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      {/* Mentor Header & Mode Switcher */}
      <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <BotMessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center space-x-2">
              <span>AI Learning Mentor</span>
              <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-full">
                Gemini 3.8 Flash
              </span>
            </h2>
            <p className="text-[11px] text-slate-500">
              No-code AI expert ready to explain, guide, hint, or review your work.
            </p>
          </div>
        </div>

        {/* 4 Mode Buttons */}
        <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 gap-1 text-xs">
          {[
            { id: 'teach', label: '🎓 Teach Me' },
            { id: 'guide', label: '🧭 Guide Step-by-Step' },
            { id: 'hint', label: '💡 Give Me a Hint' },
            { id: 'review', label: '🔍 Review My Work' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMode(m.id as any)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                selectedMode === m.id
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/40">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                isUser ? 'justify-end' : 'justify-start'
              }`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                  AI
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-800 border border-slate-200 shadow-2xs'
                }`}
              >
                {!isUser && (
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2 pb-1.5 border-b border-slate-100">
                    <span className="font-semibold uppercase text-indigo-700">
                      Mode: {msg.mode?.toUpperCase()}
                    </span>
                    <button
                      onClick={() => copyContent(msg.content, msg.id)}
                      className="text-slate-400 hover:text-slate-700 flex items-center space-x-1"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                )}

                <div className="whitespace-pre-wrap font-sans">{msg.content}</div>

                <div
                  className={`mt-2 text-[10px] ${
                    isUser ? 'text-indigo-200 text-right' : 'text-slate-400 text-left'
                  }`}
                >
                  {msg.timestamp} {!isUser && msg.source && `• ${msg.source}`}
                </div>
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center space-x-3 text-slate-500 text-xs py-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center animate-pulse">
              <Sparkles className="w-4 h-4" />
            </div>
            <span>Mentor is analyzing your request...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Question Starters */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 overflow-x-auto flex items-center space-x-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
          Quick Topics:
        </span>
        {quickStarters.map((qs, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedMode(qs.mode as any);
              handleSend(qs.text);
            }}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 whitespace-nowrap transition"
          >
            {qs.text}
          </button>
        ))}
      </div>

      {/* Message Input Bar */}
      <div className="p-4 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder={`Ask in "${selectedMode}" mode: e.g. "How do I connect a webhook in n8n?"...`}
            className="flex-1 p-3 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || loading}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white rounded-xl text-xs sm:text-sm font-bold transition shadow-xs flex items-center space-x-1.5"
          >
            <span>Ask</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

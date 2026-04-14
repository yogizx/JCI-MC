import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, RotateCcw, Info } from 'lucide-react';

// ─────────────────────────────────────────────
// JCI SITE KNOWLEDGE — used as system context
// ─────────────────────────────────────────────
const JCI_SYSTEM_PROMPT = `You are the official JCI Madurai Central AI Concierge — a friendly, knowledgeable, and professional assistant embedded on the JCI Madurai Central website. You help visitors and members with any questions about JCI India, JCI Madurai Central, membership, events, training, and more.

ORGANIZATION FACTS:
- JCI (Junior Chamber International) is a global nonprofit for young active citizens aged 18–40, active in 100+ countries with 200,000+ members across 5,000+ local organizations.
- JCI India has been active since 1949. It is a registered NGO under the Societies Registration Act, Bombay Public Trust Act, and Income Tax Act.
- JCI India is active in 28 states and 4 union territories, organized into 28 zones.
- 2026 National President: JFG Bharath N Acharya — theme: "The Year of Legacy Reimagined".
- JCI Mission: Provide development opportunities that empower young people to create positive change.
- JCI Vision: Be the foremost global network of young leaders.
- JCI Creed: We believe that faith in God gives meaning and purpose to human life; that the brotherhood of man transcends the sovereignty of nations; that economic justice can best be won by free men through free enterprise; that government should be of laws rather than of men; that earth's great treasure lies in human personality; and that service to humanity is the best work of life.

JCI MADURAI CENTRAL:
- Location: 12/4, Heritage Avenue, Bypass Road, Madurai, Tamil Nadu 625016, India
- Phone: +91 452 234 5678 | +91 98765 43210
- Email: info@jcimaduraicentral.org | president@jcimaduraicentral.org
- Office Hours: Monday – Saturday, 09:00 AM – 06:00 PM
- Established: 1974
- WhatsApp for urgent matters: +91 98765 43210

WEBSITE PAGES:
- Home (/): Overview, national president message, why join JCI, stats.
- About Us (/about): JCI global history, JCI India details, mission/vision.
- Verticals (/vertical): JCI's 5 verticals — Management, Training, Business Development, Community Development, and International Cooperation.
- Join Us / Membership (/membership): Membership application form, fees, process.
- Check Membership (/check-membership): Validate your membership ID online.
- Contact (/contact): Address, phone, email, contact form, Google Maps.
- Events portal (/portal/events): Member-only event listing, registration.
- Member Login (/login): Portal access for authenticated members.

MEMBERSHIP:
- Open to citizens aged 18–40, regardless of color, caste, or creed.
- Types: Regular Member, Associate Member, Permanent Member, Life Member.
- Annual fee varies by chapter — contact the Madurai Central office for current fees.
- To join: Visit /membership, fill the application, pay the fee, and get your member ID.
- To validate membership: Visit /check-membership and enter your JCI ID.
- Member ID format: #JC-MC-YYYY-XXX

TRAINING PROGRAMS:
- NALANDA: Leadership and personal development program.
- ABLE: A Better Leader Experience — entrepreneur-focused program.
- JCI Training Institute: Offers certified courses in management, public speaking, project management.
- Certifications are tracked in the member portal dashboard.

EVENTS:
- Regular events: Monthly meetups, flagship programs, community drives, networking events, workshops.
- Flagship annual events: Annual Convention, Regional Leadership Summit, Impact Networking Night.
- To register for events: Login to the member portal and go to the Events section.
- Events span all 5 JCI verticals.

PORTAL (Member Dashboard):
- Access via /login with your member credentials.
- Features: Dashboard with participation score and stats, Events browser and registration, Profile management (personal, family, business info), Accreditation certificates, Activity timeline, Announcements.
- Participation score tracks: events attended, trainings completed, projects led.
- QR-based digital member card is available in Profile.

JCI INDIA HQ:
- Address: 506 Windfall, Sahar Plaza, Andheri (E), Mumbai.
- Phone: (022)-71117112
- Email: info@jciindia.in
- Website: www.jciindia.in

RESPONSE RULES:
- Always be friendly, concise, and professional.
- For site navigation questions, always mention the exact URL path.
- For contact questions, provide the actual phone/email from above.
- If you don't know something specific about a local event or person, tell the user to contact the Madurai Central office.
- Never fabricate specific event dates, member names, or fees — say to contact the office for current details.
- Keep responses under 120 words unless the question genuinely requires more detail.
- Format key info with **bold** for emphasis.
- End with a helpful follow-up offer when appropriate.`;

// ─────────────────────────────────────────────
// QUICK PROMPTS
// ─────────────────────────────────────────────
const QUICK_PROMPTS = [
  'How do I join JCI?',
  'What is the membership fee?',
  'Who is the 2026 President?',
  'How to access the portal?',
  'What events are upcoming?',
  'Contact details',
];

// ─────────────────────────────────────────────
// CONVERSATION RULES (instant responses — no API)
// ─────────────────────────────────────────────
const CONVERSATION_RULES = [
  {
    regex: /^\s*(hi|hello|hey|greetings|namaste|good morning|good evening|good afternoon)\s*[!.?]?\s*$/i,
    response: "Hello! Welcome to **JCI Madurai Central**. I'm your official concierge. Ask me anything about our membership, events, training programs, or how to get involved!",
  },
  {
    regex: /\b(how to join|join jci|become a member|membership details)\b/i,
    response: "Joining is easy! Simply visit our **/membership** page to fill out the application form. Once submitted, our team will guide you through the induction process and fee payment. We welcome all young citizens aged 18-40!",
  },
  {
    regex: /\b(fee|cost|how much|payment|subscription)\b/i,
    response: "Membership fees are determined annually by the local chapter. To get the most accurate and up-to-date fee structure for **JCI Madurai Central**, please reach out to our treasurer via the **/contact** page or call us directly.",
  },
  {
    regex: /\b(president|who is the lead|chief|head)\b/i,
    response: "The 2026 National President of JCI India is **JFG Bharath N Acharya**, leading with the theme **'The Year of Legacy Reimagined'**. Our local chapter is also lead by a dedicated board of directors you can meet at our events!",
  },
  {
    regex: /\b(portal|dashboard|access|login|member area)\b/i,
    response: "You can access the Member Portal at **/login**. Once logged in with your credentials, you'll have access to your **Participation Score**, event registrations, digital ID card, and exclusive resources.",
  },
  {
    regex: /\b(event|upcoming|activities|projects|what is happening)\b/i,
    response: "We have a vibrant calendar! You can view ongoing public initiatives on our **Home** page, or if you're a member, log in to the **/portal/events** section for a full list of upcoming trainings and workshops.",
  },
  {
    regex: /\b(contact|phone|email|address|location|office)\b/i,
    response: "Our office is located at **12/4, Heritage Avenue, Madurai**. You can call us at **+91 452 234 5678** or email **info@jcimaduraicentral.org**. Visit **/contact** for a map and contact form!",
  },
  {
    regex: /\b(thank you|thanks|thx|appreciate|great help|helpful)\b/i,
    response: "You're most welcome! Is there anything else about **JCI Madurai Central** I can help you with?",
  },
  {
    regex: /^\s*(bye|goodbye|see you|later|take care)\s*[!.?]?\s*$/i,
    response: "Goodbye! We hope to see you at one of our upcoming events. Visit **jcimaduraicentral.org** anytime for more information!",
  },
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function createMessage(text, isBot) {
  return {
    id: `${Date.now()}-${Math.random()}`,
    text,
    isBot,
    timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
  };
}

function isDateOrTimeQuestion(q) {
  return /\b(date|today|time|clock|now|current time|what day)\b/i.test(q);
}

function buildDateTimeResponse() {
  const now = new Date();
  return `Today is **${now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}**, and the current time is **${now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}**.`;
}

// ─────────────────────────────────────────────
// CLAUDE API CALL
// ─────────────────────────────────────────────
async function callClaudeAPI(messages, signal) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal,
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      system: JCI_SYSTEM_PROMPT,
      messages: messages.map(m => ({
        role: m.isBot ? 'assistant' : 'user',
        content: m.text,
      })),
    }),
  });

  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();
  return data.content?.[0]?.text || "I'm sorry, I couldn't process that. Please try again.";
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    createMessage(
      "Greetings! I'm the **JCI Madurai Central** official concierge. Ask me anything about membership, events, training programs, or how to get involved with JCI!",
      true
    ),
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingText, setThinkingText] = useState('Thinking...');
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const resetChat = () => {
    abortRef.current?.abort();
    setIsTyping(false);
    setMessages([createMessage("Chat reset. How can I help you with JCI Madurai Central today?", true)]);
    setInput('');
  };

  const handleSend = async (presetQuestion = '') => {
    const userMsg = (presetQuestion || input).trim();
    if (!userMsg || isTyping) return;

    const userMessage = createMessage(userMsg, false);
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);
    setThinkingText('Consulting JCI records...');

    // 1. Check conversation rules (instant, no API)
    const rule = CONVERSATION_RULES.find(r => r.regex.test(userMsg));
    if (rule) {
      setTimeout(() => {
        setMessages(prev => [...prev, createMessage(rule.response, true)]);
        setIsTyping(false);
      }, 600);
      return;
    }

    // 2. Date/time (instant, no API)
    if (isDateOrTimeQuestion(userMsg)) {
      setTimeout(() => {
        setMessages(prev => [...prev, createMessage(buildDateTimeResponse(), true)]);
        setIsTyping(false);
      }, 400);
      return;
    }

    // 3. Call Claude API
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setThinkingText('Connecting to JCI knowledge base...');
      const replyText = await callClaudeAPI(updatedMessages, controller.signal);
      if (!controller.signal.aborted) {
        setMessages(prev => [...prev, createMessage(replyText, true)]);
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        // Graceful fallback — no Wikipedia
        setMessages(prev => [
          ...prev,
          createMessage(
            "I'm having a brief connection issue. For immediate assistance, please contact us at **info@jcimaduraicentral.org** or call **+91 452 234 5678**. You can also visit our Contact page at **/contact**.",
            true
          ),
        ]);
      }
    } finally {
      if (!controller.signal.aborted) setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderText = (text) => {
    return text.split('**').map((part, i) =>
      i % 2 === 1
        ? <strong key={i} className="text-[#A0813D] font-black">{part}</strong>
        : part
    );
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className={`fixed bottom-40 right-6 lg:bottom-52 lg:right-10 z-[70] p-4 lg:p-5 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-110 active:scale-95 border-2 ${
          isOpen
            ? 'bg-white text-[#00153D] border-[#00153D]/10'
            : 'bg-[#00153D] text-white border-white/20'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#A0813D] rounded-full ring-4 ring-white shadow-md animate-pulse" />
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 lg:bottom-28 lg:right-10 w-[94vw] sm:w-[420px] h-[78vh] max-h-[680px] bg-white rounded-[2.5rem] shadow-[0_30px_90px_-20px_rgba(0,18,61,0.4)] z-[80] flex flex-col overflow-hidden border border-slate-100 font-montserrat">

          {/* Header */}
          <div className="relative p-6 bg-[#00153D] overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#A0813D]/10 rounded-full blur-3xl transform translate-x-12 -translate-y-12 pointer-events-none" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#A0813D] to-[#8B6D31] flex items-center justify-center border-2 border-white/20 shadow-xl">
                    <Bot size={22} className="text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#00153D] animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#A0813D]">JCI Concierge</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Sparkles size={10} className="text-[#A0813D]" />
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">AI Powered · Always Available</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  title="Reset chat"
                  className="p-2 text-white/40 hover:text-[#A0813D] transition-colors rounded-lg hover:bg-white/5"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="p-2 text-white/40 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#FAF9F6] chat-scroll"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[88%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    m.isBot
                      ? 'bg-white text-[#00153D] border border-slate-100 rounded-bl-sm'
                      : 'bg-[#00153D] text-white rounded-br-sm'
                  }`}
                >
                  <p className="font-medium">{renderText(m.text)}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-tighter mt-2 opacity-30 ${m.isBot ? 'text-[#00153D]' : 'text-white'}`}>
                    {m.timestamp}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-bl-sm border border-slate-100 shadow-sm flex flex-col gap-2">
                  <p className="text-[11px] font-black text-[#A0813D] uppercase tracking-widest animate-pulse">
                    {thinkingText}
                  </p>
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#A0813D]/40 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-[#A0813D]/60 rounded-full animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1.5 h-1.5 bg-[#A0813D] rounded-full animate-bounce [animation-delay:0.3s]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="px-4 py-2.5 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
            {QUICK_PROMPTS.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                disabled={isTyping}
                className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-50 text-[11px] font-bold text-slate-500 hover:bg-[#F5F2EA] hover:text-[#A0813D] transition-all border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-100 shrink-0">
            <div className="flex items-end gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:border-[#A0813D] focus-within:ring-2 focus-within:ring-[#A0813D]/10 transition-all">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about JCI..."
                rows={1}
                className="flex-1 bg-transparent border-none px-3 py-2 text-sm font-medium text-[#00153D] outline-none resize-none placeholder:text-slate-400 max-h-24"
                style={{ lineHeight: '1.5' }}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="bg-[#00153D] text-white w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[#A0813D] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-md shrink-0"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="mt-2 flex items-center gap-1.5 px-1">
              <Info size={10} className="text-slate-400" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                Official JCI Concierge · Press Enter to send
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

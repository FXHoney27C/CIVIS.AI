import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, X, Send, Bot, User, Sparkles, AlertTriangle, 
  CheckCircle2, Ticket, Shield, Clock, MapPin, ChevronDown, 
  ExternalLink, Phone, RefreshCw, FileText
} from 'lucide-react';
import { ChatMessage, SupportTicket, IndianMetropolis } from '../types/index.ts';
import { analytics } from '../services/analyticsService.ts';

interface CivisChatbotProps {
  currentCity?: string;
}

export const CivisChatbot: React.FC<CivisChatbotProps> = ({ currentCity = 'Pune' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'tickets'>('chat');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Ticket Form modal state
  const [isRaisingTicket, setIsRaisingTicket] = useState(false);
  const [ticketErrors, setTicketErrors] = useState<{ title?: string; description?: string; contact?: string }>({});
  const [ticketForm, setTicketForm] = useState({
    title: '',
    description: '',
    category: 'unlit_street' as SupportTicket['category'],
    priority: 'medium' as SupportTicket['priority'],
    city: 'Pune' as IndianMetropolis,
    userContact: ''
  });

  const [raisedTickets, setRaisedTickets] = useState<SupportTicket[]>([
    {
      id: 'CIVIS-TKT-PUN-8102',
      title: 'Flickering streetlights on Fergusson College back lane',
      description: 'Lumen dropped below 45 lux after 10 PM. Pedestrians avoiding pathway.',
      category: 'unlit_street',
      priority: 'high',
      city: 'Pune',
      status: 'dispatched',
      createdAt: 'Today, 20:15 IST',
      assignedUnit: 'Pune Smart City Ward 4 Rapid Maintenance',
      userContact: '+91 98200 XXXXX'
    }
  ]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: 'Namaste! I am the CIVIS AI Urban Assistant for Indian smart cities (Pune, Mumbai, Delhi, Hyderabad, Bengaluru). Ask me any doubt about safe illuminated routes, accident choke points, or energy processors. If I cannot solve your problem, I will automatically raise an official Support & Dispatch Ticket for you!',
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // Pre-canned suggested questions
  const SUGGESTED_PROMPTS = [
    'Safe night route in Pune near FC Road',
    'How do energy processors work in India?',
    'Avoid Silk Board traffic in Bengaluru',
    'Report broken streetlight / Raise Ticket',
    'Marine Drive safety score in Mumbai'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      processBotAnswer(text);
    }, 700);
  };

  const processBotAnswer = (query: string) => {
    const q = query.toLowerCase();

    // Check if query explicitly asks for ticket or reports an issue that needs escalation
    const isEscalationTrigger = 
      q.includes('ticket') || 
      q.includes('complaint') || 
      q.includes('broken') || 
      q.includes('dark') || 
      q.includes('pothole') || 
      q.includes('accident') || 
      q.includes('danger') || 
      q.includes('not working') || 
      q.includes('blackout') ||
      q.includes('harassment') ||
      q.includes('unlit');

    if (isEscalationTrigger) {
      // Chatbot doesn't have local physical fix, so it raises a ticket!
      const botResponse: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: `I notice this issue requires physical municipal inspection or official team intervention. I don't have an immediate automatic resolution for this in my local database, so I have initiated an official CIVIS Support & Municipal Dispatch Ticket for you! Click the button below to review and dispatch your ticket.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isTicketPrompt: true
      };
      setMessages((prev) => [...prev, botResponse]);
      setTicketForm((prev) => ({
        ...prev,
        title: query.slice(0, 50),
        description: query
      }));
      return;
    }

    // Answers for Indian cities
    if (q.includes('pune') || q.includes('fc road') || q.includes('koregaon')) {
      const text = `In Pune, the highest-rated safe corridors are FC Road (118 Lux, active cafes, student foot traffic) and Koregaon Park North Main Road (120 Lux, German Bakery precinct). If you're heading toward Hinjewadi or Wakad, avoid the unlit Shivaji Chowk underpass choke point; instead take the Baner-Balewadi High Street bypass route.`;
      pushBotReply(text);
    } else if (q.includes('mumbai') || q.includes('marine drive') || q.includes('bandra')) {
      const text = `In Mumbai, Marine Drive promenade has a 98/100 Safeguard score with 24/7 Mumbai Police coastal patrols and 128 Lux LED illumination. For late evening transit between South Mumbai and suburbs, avoid the Dadar TT Circle 5-way junction; CIVIS reroutes via Senapati Bapat Marg or the Bandra-Worli Sea Link.`;
      pushBotReply(text);
    } else if (q.includes('bengaluru') || q.includes('silk board') || q.includes('koramangala')) {
      const text = `In Bengaluru, Koramangala 80ft Road and Indiranagar 100ft Road maintain high pedestrian activity and 112 Lux smart lighting. The notorious Silk Board Junction has an acute accident rate (5.2 crashes / 100k transits); our multi-variable algorithm detours through HSR Sector 2 and 14th Main, saving you 25 minutes of gridlock!`;
      pushBotReply(text);
    } else if (q.includes('delhi') || q.includes('connaught') || q.includes('cp')) {
      const text = `In Delhi, Connaught Place Inner Circle and India Gate promenade feature continuous Delhi Police booths, high-lux floodlighting, and underground metro security. For late night walks, stick to the Lutyens arterial corridors and avoid unsignalized ring road cuts near Dhaula Kuan.`;
      pushBotReply(text);
    } else if (q.includes('hyderabad') || q.includes('hitec') || q.includes('cyber')) {
      const text = `In Hyderabad, Cyber Towers and Hitec City are equipped with the Cyberabad Police high-definition CCTV network and 135 Lux illumination. The Gachibowli Outer Ring Road junction features dedicated biophilic green canopies and active patrol vans.`;
      pushBotReply(text);
    } else if (q.includes('energy') || q.includes('processor') || q.includes('solar') || q.includes('grid')) {
      const text = `CIVIS Urban Energy Processors coordinate renewable smart grids in Indian cities. For example: Pune Smart City Solar Grid in Baner powers 42 blocks of off-grid streetlights (120+ Lux), and Bengaluru Kinetic Pavements at Namma Metro stations harvest foot traffic vibrations to keep emergency SOS beacons powered 24/7.`;
      pushBotReply(text);
    } else if (q.includes('how it works') || q.includes('feature') || q.includes('civis')) {
      const text = `CIVIS AI uses three core technologies for Indian cities: (1) Computer Vision analyzing CCTV traffic feeds to predict optimal departure times, (2) Real-Time NLP sentiment engines classifying streets as 'Peaceful' vs 'Hectic', and (3) Multi-variable routing avoiding historical accident choke points.`;
      pushBotReply(text);
    } else {
      // General question not fully solved in DB -> offer to raise ticket
      const text = `I've analyzed your question: "${query}". I don't have a verified solution in my local knowledge base for this exact inquiry. Would you like me to raise an official Support Ticket so our municipal liaison and urban engineering team can review it?`;
      const botResponse: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isTicketPrompt: true
      };
      setMessages((prev) => [...prev, botResponse]);
      setTicketForm((prev) => ({
        ...prev,
        title: query.slice(0, 50),
        description: query
      }));
    }
  };

  const pushBotReply = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleConfirmRaiseTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { title?: string; description?: string; contact?: string } = {};

    if (!ticketForm.title.trim() || ticketForm.title.trim().length < 5) {
      errs.title = 'Title must be at least 5 characters.';
    }
    if (!ticketForm.description.trim() || ticketForm.description.trim().length < 10) {
      errs.description = 'Please provide at least 10 characters describing the issue location/defect.';
    }
    if (ticketForm.userContact.trim()) {
      const contactVal = ticketForm.userContact.trim();
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactVal);
      const isPhone = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(contactVal.replace(/[\s\-]/g, ''));
      if (!isEmail && !isPhone && contactVal.length < 8) {
        errs.contact = 'Please enter a valid Indian mobile number (e.g. +91 9876543210) or email address.';
      }
    }

    if (Object.keys(errs).length > 0) {
      setTicketErrors(errs);
      return;
    }

    setTicketErrors({});
    const cityCode = ticketForm.city.slice(0, 3).toUpperCase();
    const newTicketId = `CIVIS-TKT-${cityCode}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTicket: SupportTicket = {
      id: newTicketId,
      title: ticketForm.title,
      description: ticketForm.description || ticketForm.title,
      category: ticketForm.category,
      priority: ticketForm.priority,
      city: ticketForm.city,
      status: 'dispatched',
      createdAt: 'Just now',
      assignedUnit: `${ticketForm.city} Municipal Rapid Action Team`,
      userContact: ticketForm.userContact || '+91 User Registered Contact'
    };

    setRaisedTickets((prev) => [newTicket, ...prev]);
    setIsRaisingTicket(false);
    analytics.track('ticket_raised', { ticketId: newTicketId, city: ticketForm.city, category: ticketForm.category });

    // Bot message in chat showing ticket raised
    const confirmationMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'system',
      text: `Support Ticket Raised Successfully! ID: ${newTicket.id} has been logged and dispatched to the ${ticketForm.city} Municipal Support & Rapid Action Team. Estimated resolution within 4 hours.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ticketData: newTicket
    };

    setMessages((prev) => [...prev, confirmationMsg]);
  };

  return (
    <>
      {/* Floating Tactical Bot Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#00E5FF] to-[#00E676] text-[#0B0F19] font-bold text-sm shadow-2xl flex items-center gap-3 cursor-pointer hover:scale-105 active:scale-95 transition-all glow-cyan"
            aria-label="Open CIVIS AI Assistant"
          >
            <div className="relative">
              <Bot className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-700 animate-ping" />
            </div>
            
            <div className="text-left font-display">
              <div className="leading-tight text-xs font-black tracking-wide uppercase text-slate-900">
                CIVIS AI Bot
              </div>
              <div className="text-[10px] font-mono text-slate-800 font-semibold">
                Ask Doubt or Raise Ticket
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[94vw] sm:w-[440px] h-[600px] max-h-[85vh] tactical-glass-elevated rounded-3xl border border-[#00E5FF]/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Top Header */}
          <div className="p-4 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#00E5FF]/20 border border-[#00E5FF] flex items-center justify-center text-[#00E5FF] glow-cyan-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
                  <span>CIVIS Urban Assistant</span>
                  <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
                </h3>
                <div className="text-[10px] text-slate-400 font-mono">
                  India Hubs · Pune · Mumbai · Bengaluru · Delhi · Hyderabad
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
                title="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Sub-Tabs: Chat vs My Tickets */}
          <div className="flex border-b border-white/10 bg-slate-950/60 text-xs font-mono">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2.5 text-center transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'chat'
                  ? 'text-[#00E5FF] border-b-2 border-[#00E5FF] font-bold bg-white/5'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask Doubts</span>
            </button>
            
            <button
              onClick={() => setActiveTab('tickets')}
              className={`flex-1 py-2.5 text-center transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'tickets'
                  ? 'text-[#00E676] border-b-2 border-[#00E676] font-bold bg-white/5'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>Raised Tickets ({raisedTickets.length})</span>
            </button>
          </div>

          {/* Tab 1: Chat Stream */}
          {activeTab === 'chat' && (
            <>
              {/* Message History */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                {messages.map((msg) => {
                  const isBot = msg.sender === 'bot';
                  const isUser = msg.sender === 'user';
                  const isSystem = msg.sender === 'system';

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                          isUser
                            ? 'bg-[#00E5FF] text-[#0B0F19] font-medium shadow'
                            : isSystem
                            ? 'bg-emerald-950/70 border border-emerald-500/40 text-emerald-100 shadow'
                            : 'tactical-glass border border-white/10 text-slate-200'
                        }`}
                      >
                        <div className="text-[10px] font-mono opacity-60 mb-1 flex items-center gap-1">
                          {isUser ? <User className="w-3 h-3" /> : isBot ? <Bot className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                          <span>{isUser ? 'You' : isBot ? 'CIVIS AI' : 'Municipal Support Desk'}</span>
                          <span>·</span>
                          <span>{msg.timestamp}</span>
                        </div>

                        <div>{msg.text}</div>

                        {/* Interactive Ticket Raise Prompt from Bot */}
                        {msg.isTicketPrompt && (
                          <div className="mt-3 pt-2.5 border-t border-white/10">
                            <button
                              onClick={() => setIsRaisingTicket(true)}
                              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#FF3366] to-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 transition-opacity cursor-pointer shadow"
                            >
                              <Ticket className="w-4 h-4" />
                              <span>Raise Official Support Ticket Now</span>
                            </button>
                          </div>
                        )}

                        {/* Ticket Badge Display inside message */}
                        {msg.ticketData && (
                          <div className="mt-3 p-3 rounded-xl bg-black/40 border border-emerald-500/30 text-[11px] font-mono space-y-1">
                            <div className="text-emerald-400 font-bold flex items-center justify-between">
                              <span>Ticket ID: {msg.ticketData.id}</span>
                              <span className="uppercase text-[9px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">
                                {msg.ticketData.status}
                              </span>
                            </div>
                            <div className="text-slate-300 font-semibold">{msg.ticketData.title}</div>
                            <div className="text-slate-400 text-[10px]">City: {msg.ticketData.city} · Assigned to: {msg.ticketData.assignedUnit}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-mono pl-2">
                    <Bot className="w-3.5 h-3.5 animate-spin text-[#00E5FF]" />
                    <span>Analyzing urban records...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Carousel */}
              <div className="p-2 border-t border-white/10 bg-slate-900/50 flex gap-2 overflow-x-auto text-[11px] font-mono no-scrollbar">
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors shrink-0 cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 bg-slate-950 border-t border-white/10 flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  placeholder="Ask doubt about safe routes, or report an issue..."
                  className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5FF]"
                />

                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim()}
                  className="p-2.5 rounded-xl bg-[#00E5FF] text-[#0B0F19] font-bold hover:bg-white transition-colors cursor-pointer disabled:opacity-40"
                  title="Send query"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {/* Tab 2: Raised Tickets Dashboard */}
          {activeTab === 'tickets' && (
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="text-xs font-mono text-slate-300">
                  Municipal Dispatch Tickets ({raisedTickets.length})
                </div>
                <button
                  onClick={() => setIsRaisingTicket(true)}
                  className="px-3 py-1.5 rounded-xl bg-[#FF3366] text-white font-mono text-xs font-bold hover:bg-[#FF3366]/80 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>+ Raise New Ticket</span>
                </button>
              </div>

              {raisedTickets.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No tickets raised yet. Ask a question or report an issue!
                </div>
              ) : (
                raisedTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="tactical-glass p-3.5 rounded-2xl border border-white/10 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between font-mono">
                      <span className="font-bold text-[#00E5FF]">{ticket.id}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {ticket.status}
                      </span>
                    </div>

                    <div className="font-bold text-white text-sm font-display">
                      {ticket.title}
                    </div>

                    <p className="text-slate-300 text-xs leading-relaxed">
                      {ticket.description}
                    </p>

                    <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-400">
                      <div>City: <strong className="text-white">{ticket.city}</strong></div>
                      <div>Priority: <strong className="text-amber-400 uppercase">{ticket.priority}</strong></div>
                    </div>

                    <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#00E5FF]" />
                      <span>Assigned to: {ticket.assignedUnit}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      )}

      {/* Ticket Raising Modal Dialog */}
      {isRaisingTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-md tactical-glass-elevated rounded-3xl border border-[#FF3366]/40 p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF3366] uppercase font-bold">
                <Ticket className="w-4 h-4" />
                <span>Raise Municipal Support Ticket</span>
              </div>
              <button
                onClick={() => setIsRaisingTicket(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmRaiseTicket} className="space-y-3 text-left text-xs font-mono">
              <div>
                <label className="block text-slate-400 mb-1">Target Indian City</label>
                <select
                  value={ticketForm.city}
                  onChange={(e) => setTicketForm({ ...ticketForm, city: e.target.value as IndianMetropolis })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-[#00E5FF]"
                >
                  <option value="Pune">Pune, Maharashtra</option>
                  <option value="Mumbai">Mumbai, Maharashtra</option>
                  <option value="Bengaluru">Bengaluru, Karnataka</option>
                  <option value="Hyderabad">Hyderabad, Telangana</option>
                  <option value="Delhi">Delhi, NCR</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Issue Category</label>
                <select
                  value={ticketForm.category}
                  onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-[#00E5FF]"
                >
                  <option value="unlit_street">Unlit Street / Broken Lamp (&lt;50 Lux)</option>
                  <option value="accident_hazard">High-Collision Road Hazard / Blindspot</option>
                  <option value="technical_doubt">Technical Routing Doubt / App Issue</option>
                  <option value="energy_grid_issue">Micro-Grid Energy Processor Disconnect</option>
                  <option value="other">General Municipal Query / Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Issue Title / Summary <span className="text-rose-400">*</span></label>
                <input
                  type="text"
                  required
                  value={ticketForm.title}
                  onChange={(e) => {
                    setTicketForm({ ...ticketForm, title: e.target.value });
                    if (ticketErrors.title) setTicketErrors({ ...ticketErrors, title: undefined });
                  }}
                  placeholder="e.g. Broken streetlight on FC Road back alley"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-[#00E5FF]"
                />
                {ticketErrors.title && <div className="text-[11px] text-rose-400 mt-1 font-mono">{ticketErrors.title}</div>}
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Detailed Description <span className="text-rose-400">*</span></label>
                <textarea
                  rows={3}
                  value={ticketForm.description}
                  onChange={(e) => {
                    setTicketForm({ ...ticketForm, description: e.target.value });
                    if (ticketErrors.description) setTicketErrors({ ...ticketErrors, description: undefined });
                  }}
                  placeholder="Provide landmark or location details..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-[#00E5FF]"
                />
                {ticketErrors.description && <div className="text-[11px] text-rose-400 mt-1 font-mono">{ticketErrors.description}</div>}
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Phone or Email for SMS Ticket Updates</label>
                <input
                  type="text"
                  value={ticketForm.userContact}
                  onChange={(e) => {
                    setTicketForm({ ...ticketForm, userContact: e.target.value });
                    if (ticketErrors.contact) setTicketErrors({ ...ticketErrors, contact: undefined });
                  }}
                  placeholder="+91 98765 43210 or user@domain.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-[#00E5FF]"
                />
                {ticketErrors.contact && <div className="text-[11px] text-rose-400 mt-1 font-mono">{ticketErrors.contact}</div>}
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsRaisingTicket(false)}
                  className="flex-1 py-2.5 rounded-xl border border-white/15 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#FF3366] to-[#00E5FF] text-white font-bold hover:opacity-95 shadow cursor-pointer"
                >
                  Dispatch Ticket
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
};

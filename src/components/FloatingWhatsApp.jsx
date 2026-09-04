import React from 'react';
import { useStore } from '../context/StoreContext';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp = () => {
  const { getWhatsAppDirectUrl, settings } = useStore();

  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-6 right-6 z-40 flex items-center group">
      
      {/* Tooltip on hover */}
      <div className="hidden sm:block mr-3 bg-white/95 text-slate-900 text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg border border-yellow-200 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 pointer-events-none whitespace-nowrap">
        <span>Chat on WhatsApp: {settings.whatsappDisplay} 🪿</span>
      </div>

      {/* Floating Button */}
      <a
        href={getWhatsAppDirectUrl('Hello Batoot! 🪿 I have a question about your handmade crochet pieces 💛')}
        target="_blank"
        rel="noreferrer"
        className="relative w-14 h-14 bg-gradient-to-tr from-emerald-500 to-emerald-400 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white ring-4 ring-emerald-300/40"
        aria-label="Chat on WhatsApp with Batoot"
      >
        <span className="text-2xl">💬</span>
        
        {/* Goose Emoji Badge */}
        <span className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-300 border-2 border-white rounded-full flex items-center justify-center text-xs shadow-md animate-bounce-slow">
          🪿
        </span>
      </a>
    </aside>
  );
};

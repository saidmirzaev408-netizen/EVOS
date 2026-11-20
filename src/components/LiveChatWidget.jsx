import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';

export const LiveChatWidget = () => {
  const { isChatOpen, setIsChatOpen, t } = useApp();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Assalomu alaykum! EVOS xizmatiga xush kelibsiz. Qanday yordam bera olamiz?', time: '23:00' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const newMsg = { id: Date.now(), sender: 'user', text: query, time: '23:02' };
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    setTimeout(() => {
      let reply = "Mutaxassisimiz tez orada siz bilan bog'lanadi!";
      const q = query.toLowerCase();
      if (q.includes('buyurtma') || q.includes('kuryer') || q.includes('qayerda')) {
        reply = "Buyurtmangiz holatini bilish uchun yuqoridagi 'Mening buyurtmalarim' bo'limiga kiring yoki telefon raqamingizni qoldiring.";
      } else if (q.includes('aksiya') || q.includes('promokod')) {
        reply = "Hozirda EVOS2025 promokodi bilan 15% chegirma amal qilmoqda!";
      } else if (q.includes('yetkazish') || q.includes('narx')) {
        reply = "Toshkent bo'ylab 100 000 UZS dan yuqori buyurtmalar bepul yetkaziladi. Standart yetkazish — 12 000 UZS.";
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: reply,
        time: '23:02'
      }]);
    }, 700);
  };

  return (
    <>
      {/* Floating Bubble Button */}
      {!isChatOpen && (
        <button
          type="button"
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-20 md:bottom-6 right-5 z-40 w-14 h-14 rounded-full bg-gradient-to-tr from-evos-700 to-evos-600 text-white flex items-center justify-center shadow-2xl shadow-evos-600/40 hover:scale-105 active:scale-95 transition-all group"
          aria-label="Support Chat"
        >
          <Icon name="chat" className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
      )}

      {/* Chat Drawer Window */}
      {isChatOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-5 z-50 w-[340px] sm:w-[380px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-evos-700 to-evos-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                💬
              </div>
              <div>
                <h4 className="text-xs font-black">{t('supportChatTitle')}</h4>
                <p className="text-[10px] text-white/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> {t('supportOnline')}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsChatOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full text-white"
            >
              <Icon name="x" className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 h-72 overflow-y-auto space-y-3 bg-gray-50/50 dark:bg-gray-950/40 text-xs">
            {messages.map(m => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`p-3 rounded-2xl max-w-[80%] ${
                  m.sender === 'user'
                    ? 'bg-evos-600 text-white rounded-br-none'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-bl-none shadow-sm'
                }`}>
                  {m.text}
                </div>
                <span className="text-[9px] text-gray-400 mt-0.5">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-2 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex gap-1.5 overflow-x-auto no-scrollbar">
            {['Buyurtmam qayerda?', 'Aksiyalar bormi?', 'Yetkazish narxi?'].map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(chip)}
                className="text-[10px] whitespace-nowrap bg-gray-100 dark:bg-gray-800 hover:bg-evos-50 hover:text-evos-600 text-gray-600 dark:text-gray-300 font-semibold px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input box */}
          <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t('chatPlaceholder')}
              className="flex-1 text-xs p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:border-evos-500"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              className="bg-evos-600 text-white p-2.5 rounded-xl hover:bg-evos-700 transition-colors"
            >
              <Icon name="search" className="w-4 h-4 rotate-90" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};


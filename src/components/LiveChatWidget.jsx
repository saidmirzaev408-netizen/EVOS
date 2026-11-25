import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';

export const LiveChatWidget = () => {
  const { isChatOpen, setIsChatOpen, t, lang } = useApp();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Assalomu alaykum! ISTIQLOL xizmatiga xush kelibsiz. Qanday yordam bera olamiz?",
      time: '12:00'
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const quickChips = lang === 'ru'
    ? ['Где мой заказ?', 'Есть ли акции?', 'Стоимость доставки?']
    : lang === 'en'
    ? ['Where is my order?', 'Any promotions?', 'Delivery fee?']
    : ['Buyurtmam qayerda?', 'Aksiyalar bormi?', 'Yetkazish narxi?'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isChatOpen]);

  // Set greeting according to language if default
  useEffect(() => {
    if (t('chatWelcome')) {
      setMessages(prev => {
        if (prev.length === 1 && prev[0].sender === 'bot') {
          return [{
            ...prev[0],
            text: t('chatWelcome')
          }];
        }
        return prev;
      });
    }
  }, [t, lang]);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: currentTime
    };

    setMessages(prev => [...prev, newMsg]);
    setInput('');

    setTimeout(() => {
      let reply = "ISTIQLOL mutaxassisi tez orada siz bilan bog'lanadi!";
      const q = query.toLowerCase();

      if (lang === 'ru') {
        reply = "Специалист службы заботы ISTIQLOL скоро свяжется с вами!";
        if (q.includes('заказ') || q.includes('где') || q.includes('курьер') || q.includes('статус')) {
          reply = "Чтобы узнать статус заказа, перейдите в раздел «Мои заказы» или напишите номер телефона, оператор сразу проверит.";
        } else if (q.includes('акци') || q.includes('скидк') || q.includes('промо') || q.includes('promo')) {
          reply = "Сейчас действует промокод ISTIQLOL2025 со скидкой 15% на всё меню!";
        } else if (q.includes('доставк') || q.includes('стоимост') || q.includes('цен') || q.includes('курьер')) {
          reply = "Доставка по городу от 100 000 UZS бесплатная. Стандартная доставка — 12 000 UZS (25-35 минут).";
        }
      } else if (lang === 'en') {
        reply = "An ISTIQLOL representative will reply shortly!";
        if (q.includes('order') || q.includes('where') || q.includes('status') || q.includes('courier')) {
          reply = "To track your order, please open 'My Orders' or provide your phone number and our operator will assist right away.";
        } else if (q.includes('promo') || q.includes('discount') || q.includes('offer')) {
          reply = "Use promo code ISTIQLOL2025 for 15% off across all items!";
        } else if (q.includes('delivery') || q.includes('price') || q.includes('fee')) {
          reply = "Free delivery on orders over 100,000 UZS. Standard delivery is 12,000 UZS (25-35 min).";
        }
      } else {
        if (q.includes('buyurtma') || q.includes('kuryer') || q.includes('qayerda') || q.includes('заказ')) {
          reply = "Buyurtmangiz holatini bilish uchun 'Mening buyurtmalarim' bo'limiga kiring yoki telefon raqamingizni qoldiring, operatorimiz darhol tekshirib beradi.";
        } else if (q.includes('aksiya') || q.includes('promokod') || q.includes('скидк') || q.includes('promo')) {
          reply = "Hozirda ISTIQLOL2025 promokodi bilan barcha menyuga 15% chegirma amal qilmoqda!";
        } else if (q.includes('yetkazish') || q.includes('narx') || q.includes('dostavka') || q.includes('доставк')) {
          reply = "Toshkent bo'ylab 100 000 UZS dan yuqori buyurtmalar bepul yetkaziladi. Standart yetkazish narxi — 12 000 UZS (25-35 daqiqa).";
        }
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Chat Bubble Button */}
      {!isChatOpen && (
        <button
          type="button"
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-20 md:bottom-6 right-5 z-40 w-14 h-14 rounded-full bg-gradient-to-tr from-[#680C20] via-[#8E142C] to-[#B91C3C] text-white flex items-center justify-center shadow-2xl shadow-[#8E142C]/50 border-2 border-[#F3BE53]/40 hover:border-[#F3BE53] hover:scale-105 active:scale-95 transition-all group"
          aria-label="Support Chat"
        >
          <Icon name="chat" className="w-6 h-6 text-[#F3BE53] group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#18070E] animate-pulse"></span>
        </button>
      )}

      {/* Chat Drawer Window */}
      {isChatOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 w-[335px] sm:w-[380px] bg-[#16060D] text-white rounded-3xl shadow-2xl border border-[#521727] flex flex-col overflow-hidden animate-fadeIn backdrop-blur-xl">
          
          {/* Chat Header - Luxury Burgundy & Gold */}
          <div className="bg-gradient-to-r from-[#500A19] via-[#85142B] to-[#A31A37] p-4 text-white flex items-center justify-between border-b border-[#F3BE53]/20 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#28060F] to-[#500A19] border border-[#F3BE53]/50 flex items-center justify-center font-bold text-[#F3BE53] shadow-md">
                👑
              </div>
              <div>
                <h4 className="text-xs font-black tracking-wide text-white flex items-center gap-1.5">
                  {t('supportChatTitle')}
                </h4>
                <p className="text-[10px] text-[#F3BE53] flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400 animate-pulse"></span>
                  {t('supportOnline')}
                </p>
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => setIsChatOpen(false)}
              className="p-1.5 hover:bg-white/20 rounded-full text-white/90 hover:text-white transition-all active:scale-90"
              aria-label="Close Chat"
            >
              <Icon name="x" className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 h-72 sm:h-80 overflow-y-auto space-y-3 bg-gradient-to-b from-[#130408] via-[#17060D] to-[#120408] text-xs">
            {messages.map(m => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {m.sender === 'bot' && (
                  <span className="text-[10px] font-semibold text-[#F3BE53] mb-1 flex items-center gap-1">
                    <span>👑</span> ISTIQLOL Support
                  </span>
                )}
                <div className={`p-3.5 rounded-2xl max-w-[85%] text-[13px] leading-relaxed shadow-md ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-[#8E142C] to-[#B91C3C] text-white rounded-tr-none border border-[#B91C3C]/50 font-medium'
                    : 'bg-[#240C16] text-[#F5E6EC] border border-[#4F1727] rounded-tl-none'
                }`}>
                  {m.text}
                </div>
                <span className="text-[9px] text-[#9E7D87] mt-1 px-1">{m.time}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2.5 bg-[#17060D] border-t border-[#3A101C] flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(chip)}
                className="text-[11px] whitespace-nowrap bg-[#250C16] hover:bg-[#3D1424] text-[#E8D6DC] hover:text-[#F3BE53] font-semibold px-3 py-1.5 rounded-full border border-[#521828] hover:border-[#F3BE53]/60 transition-all shadow-sm active:scale-95"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input box */}
          <div className="p-3 bg-[#17060D] border-t border-[#3A101C] flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t('chatPlaceholder')}
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-[#4E1726] bg-[#220B15] text-white placeholder-[#8F707A] focus:outline-none focus:border-[#F3BE53] focus:ring-1 focus:ring-[#F3BE53]/40 transition-all"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              className="bg-gradient-to-r from-[#8E142C] to-[#BA1D3D] hover:from-[#A81734] hover:to-[#CF2044] text-[#F3BE53] p-2.5 rounded-xl transition-all shadow-md shadow-[#8E142C]/40 hover:scale-105 active:scale-95 flex items-center justify-center"
              aria-label="Send message"
            >
              <Icon name="send" className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};

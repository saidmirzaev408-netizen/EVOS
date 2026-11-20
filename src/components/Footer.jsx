import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white pt-14 pb-20 md:pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-evos-600 flex items-center justify-center text-white font-black text-xl">
                E
              </div>
              <span className="text-2xl font-black tracking-tight">EVOS</span>
            </div>
            <p className="text-xs text-gray-400 max-w-sm">
              EVOS — O'zbekistondagi eng yirik va mashhur fast-food restoranlar tarmog'i. 2006-yildan buyon xalqimizga sifatli, mazali va tezkor taomlarni taqdim etib kelmoqda.
            </p>
            <div className="flex items-center space-x-3 text-sm text-gray-400">
              <span className="p-2 rounded-full bg-gray-900 hover:text-white cursor-pointer">Telegram</span>
              <span className="p-2 rounded-full bg-gray-900 hover:text-white cursor-pointer">Instagram</span>
              <span className="p-2 rounded-full bg-gray-900 hover:text-white cursor-pointer">Facebook</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-gray-300 tracking-wider">Menyu</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#menu-section" className="hover:text-white">Lavashlar</a></li>
              <li><a href="#menu-section" className="hover:text-white">Burgerlar</a></li>
              <li><a href="#menu-section" className="hover:text-white">Shaurma</a></li>
              <li><a href="#menu-section" className="hover:text-white">Pitsa</a></li>
              <li><a href="#menu-section" className="hover:text-white">Kombo taomlar</a></li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-gray-300 tracking-wider">Kompaniya</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white">Biz haqimizda</a></li>
              <li><a href="#" className="hover:text-white">Filiallar xaritasi</a></li>
              <li><a href="#" className="hover:text-white">Karyera va Bo'sh ish o'rinlari</a></li>
              <li><a href="#" className="hover:text-white">Halal Sertifikati</a></li>
              <li><a href="#" className="hover:text-white">Ommaviy Oferta</a></li>
            </ul>
          </div>

          {/* Col 4: Contacts & App */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-gray-300 tracking-wider">Aloqa</h4>
            <p className="text-xs text-gray-400">Yagona Call-markaz:</p>
            <p className="text-sm font-black text-evos-400">+998 71 200 00 00</p>
            <p className="text-xs text-gray-400">24 soat xizmatingizdamiz</p>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 EVOS Fast Food Chain. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center space-x-4">
            <span>Maxfiylik siyosati</span>
            <span>Foydalanish shartlari</span>
          </div>
        </div>
      </div>
    </footer>
  );
};


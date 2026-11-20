import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';

export const FoodMenu = () => {
  const { products, selectedCategory, searchQuery, t, categories, lang } = useApp();

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const uzMatch = product.name?.uz?.toLowerCase().includes(q);
        const ruMatch = product.name?.ru?.toLowerCase().includes(q);
        const enMatch = product.name?.en?.toLowerCase().includes(q);
        const catMatch = product.category?.toLowerCase().includes(q);
        return uzMatch || ruMatch || enMatch || catMatch;
      }
      return true;
    });
  }, [products, selectedCategory, searchQuery]);

  const currentCategoryObj = categories.find(c => c.id === selectedCategory);
  const categoryTitle = currentCategoryObj
    ? `${currentCategoryObj.icon} ${currentCategoryObj.name[lang] || currentCategoryObj.name.uz}`
    : 'Barcha Taomlar';

  return (
    <section id="menu-section" className="py-12 bg-[#131512] text-[#F4F5F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center space-x-2 text-[#F3BE53] font-black text-xs uppercase tracking-wider mb-1">
              <span>⚡</span>
              <span>Recomendation & Special Menu</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {selectedCategory === 'all' ? 'Tavsiya etiladigan taomlar' : `${categoryTitle}`}
            </h2>
          </div>

          <div className="text-xs sm:text-sm font-bold text-gray-400 bg-[#1C1F18] border border-[#2F3528] px-3.5 py-1.5 rounded-full">
            {filteredProducts.length} ta mahsulot mavjud
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#1C1F18] rounded-3xl border border-[#32382B] p-8 max-w-md mx-auto">
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="text-lg font-black text-white">Hech narsa topilmadi</h3>
            <p className="text-xs text-gray-400 mt-1">
              Boshqa so'z bilan qidirib ko'ring yoki yuqoridagi toifalardan birini tanlang.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

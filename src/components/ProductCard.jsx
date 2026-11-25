import React from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';
import { formatUZS } from '../utils/formatters';

export const ProductCard = ({ product }) => {
  const {
    lang, addToCart, favorites, toggleFavorite,
    setActiveProductModal, setIsDetailsOpen, t,
    categoryFallbacks, categories
  } = useApp();

  const isFav = favorites.includes(product.id);

  const catObj = categories?.find(c => c.id === product.category);
  const categoryLabel = catObj ? (catObj.name[lang] || catObj.name.ru || catObj.name.uz) : product.category;

  // Localize badge text according to active language
  const getBadgeText = (badge) => {
    if (!badge) return null;
    const b = badge.toUpperCase();
    if (lang === 'ru') {
      if (b.includes('XIT') || b.includes('HIT')) return 'ХИТ';
      if (b.includes('POPULAR')) return 'ПОПУЛЯРНОЕ';
      if (b.includes('PISHLQOLI') || b.includes('CHEESE')) return 'С СЫРОМ';
      if (b.includes('MAVSUMIY') || b.includes('SEASON')) return 'СЕЗОННОЕ';
      if (b.includes('ENG SARA') || b.includes('BEST')) return 'ЛУЧШЕЕ';
      if (b.includes('PREMIUM')) return 'ПРЕМИУМ';
    } else if (lang === 'en') {
      if (b.includes('XIT') || b.includes('HIT')) return 'HOT';
      if (b.includes('POPULAR')) return 'POPULAR';
      if (b.includes('PISHLQOLI') || b.includes('CHEESE')) return 'CHEESY';
      if (b.includes('MAVSUMIY') || b.includes('SEASON')) return 'SEASONAL';
      if (b.includes('ENG SARA') || b.includes('BEST')) return 'BEST CHOICE';
      if (b.includes('PREMIUM')) return 'PREMIUM';
    }
    return badge;
  };

  const openDetails = () => {
    setActiveProductModal(product);
    setIsDetailsOpen(true);
  };

  return (
    <div className="group bg-[#22261E] rounded-[28px] overflow-hidden border border-[#32382B] hover:border-[#F3BE53]/60 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1D17] cursor-pointer" onClick={openDetails}>
          <img
            src={product.image}
            alt={product.name[lang] || product.name.uz}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = categoryFallbacks?.[product.category] || categoryFallbacks?.default || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80';
            }}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#22261E] via-transparent to-black/30"></div>

          {/* Top Badges & Rating */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {/* Rating Pill matching screenshot */}
            <div className="flex items-center space-x-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-bold shadow-md">
              <span className="text-[#F3BE53]">★</span>
              <span>{product.rating}</span>
              <span className="text-gray-400 text-[10px]">({product.reviewsCount})</span>
            </div>

            {product.badge && (
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase bg-[#F3BE53] text-[#131512] shadow-md">
                {getBadgeText(product.badge)}
              </span>
            )}
          </div>

          {/* Circular Favorite Heart Button (matching screenshot) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md flex items-center justify-center text-white shadow-md transition-transform active:scale-90"
            aria-label="Wishlist"
          >
            <Icon name="heart" className="w-4 h-4 text-[#F3BE53]" filled={isFav} />
          </button>

          {/* Weight & Calories Info */}
          <div className="absolute bottom-2.5 left-3 text-[11px] font-semibold text-white/90 drop-shadow-md flex items-center space-x-2">
            <span>{product.weight}</span>
            <span>•</span>
            <span>{product.calories}</span>
          </div>
        </div>

        {/* Content Info */}
        <div className="p-4 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#F3BE53] notranslate" translate="no">
              {categoryLabel}
            </span>
            <span className="text-[11px] text-gray-400">
              {t('startingPrice') || "Boshlang'ich narx"}
            </span>
          </div>

          <h3
            onClick={openDetails}
            className="text-base font-extrabold text-white hover:text-[#F3BE53] cursor-pointer line-clamp-1 transition-colors notranslate"
            translate="no"
          >
            {product.name[lang] || product.name.ru || product.name.uz}
          </h3>

          <p className="text-xs text-gray-400 line-clamp-2 h-8 leading-relaxed">
            {product.description[lang] || product.description.ru || product.description.uz}
          </p>
        </div>
      </div>

      {/* Pricing & Add to cart bar */}
      <div className="p-4 pt-1">
        <div className="flex items-center justify-between border-t border-[#4A1A27] pt-3">
          <div>
            <p className="text-base font-black text-white">
              {formatUZS(product.price)}
            </p>
            {product.oldPrice && (
              <p className="text-xs text-gray-500 line-through">
                {formatUZS(product.oldPrice)}
              </p>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="flex items-center space-x-1.5 bg-[#F3BE53] hover:bg-[#E5A934] text-[#131512] text-xs font-black px-4 py-2 rounded-full shadow-md shadow-[#F3BE53]/20 active:scale-95 transition-all"
          >
            <Icon name="plus" className="w-3.5 h-3.5 text-[#131512]" />
            <span>{t('addToCart') || 'Savatchaga'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

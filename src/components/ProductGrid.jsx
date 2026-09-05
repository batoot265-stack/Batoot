import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { categoriesList } from '../data/initialProducts';
import { Filter, SlidersHorizontal, Sparkles, Search, Palette } from 'lucide-react';

export const ProductGrid = () => {
  const { 
    products, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    setIsCustomModalOpen 
  } = useStore();

  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter(item => {
        // Category filter
        if (selectedCategory !== 'All Items' && item.category !== selectedCategory) {
          return false;
        }
        // Stock filter
        if (inStockOnly && !item.inStock) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchName = item.name.toLowerCase().includes(query);
          const matchDesc = (item.description || '').toLowerCase().includes(query);
          const matchCat = (item.category || '').toLowerCase().includes(query);
          return matchName || matchDesc || matchCat;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0; // featured default
      });
  }, [products, selectedCategory, inStockOnly, searchQuery, sortBy]);

  return (
    <section id="shop" className="py-16 bg-gradient-to-b from-white via-[#FFFDF5] to-yellow-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-yellow-200/60 gap-4">
          <div>
            <div className="flex items-center gap-2 text-yellow-700 text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Handmade Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Our Cozy Collection 🪿💛
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Every item is crafted with love. Enjoy <strong>Free Shipping</strong> on every single order!
            </p>
          </div>

          {/* Quick Custom Order Banner Button */}
          <button
            onClick={() => setIsCustomModalOpen(true)}
            className="self-start md:self-auto flex items-center gap-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-900 border border-yellow-300 font-bold px-4 py-2.5 rounded-2xl text-xs transition-all shadow-sm"
          >
            <Palette className="w-4 h-4 text-yellow-700" />
            <span>Have a custom idea? Request it here!</span>
          </button>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {categoriesList.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-yellow-400 text-yellow-950 shadow-md shadow-yellow-200 scale-105 border border-yellow-400'
                  : 'bg-white text-slate-600 hover:bg-yellow-50 hover:text-slate-900 border border-yellow-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Filters and Sorting Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 my-6 p-3 rounded-2xl bg-white border border-yellow-200 shadow-sm">
          
          {/* Stock Filter Checkbox */}
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 text-yellow-500 rounded border-yellow-300 focus:ring-yellow-400 focus:ring-offset-0 accent-yellow-500"
            />
            <span>🟢 In Stock items only</span>
          </label>

          {/* Result Count and Sort Dropdown */}
          <div className="flex items-center gap-3 text-xs font-medium text-slate-500 ml-auto">
            <span>Showing <strong>{filteredProducts.length}</strong> items</span>
            <div className="h-4 w-px bg-yellow-200" />
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-yellow-700" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-yellow-50 border border-yellow-200 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-yellow-400"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>

        </div>

        {/* Active Search / Category Status Bar */}
        {(searchQuery || selectedCategory !== 'All Items' || inStockOnly) && (
          <div className="flex items-center gap-2 mb-6 text-xs text-slate-600 bg-yellow-50/80 px-4 py-2 rounded-xl border border-yellow-200">
            <span>Filtering by:</span>
            {selectedCategory !== 'All Items' && (
              <span className="bg-yellow-200 text-yellow-950 font-bold px-2 py-0.5 rounded-md">
                Category: {selectedCategory}
              </span>
            )}
            {searchQuery && (
              <span className="bg-yellow-200 text-yellow-950 font-bold px-2 py-0.5 rounded-md">
                Keyword: "{searchQuery}"
              </span>
            )}
            {inStockOnly && (
              <span className="bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-md">
                In Stock Only
              </span>
            )}
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Items');
                setInStockOnly(false);
              }}
              className="ml-auto font-bold text-yellow-800 underline hover:text-yellow-950"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-yellow-200 p-8 max-w-md mx-auto my-8">
            <span className="text-5xl block mb-3 animate-bounce">🪿</span>
            <h3 className="text-lg font-black text-slate-900">No crochet treasures found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              We couldn't find matches for your search. But don't worry, we can hand-crochet any custom design for you!
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Items');
                  setInStockOnly(false);
                }}
                className="bg-yellow-100 text-yellow-900 font-bold text-xs px-4 py-2.5 rounded-xl border border-yellow-300 hover:bg-yellow-200 transition-colors"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setIsCustomModalOpen(true)}
                className="bg-yellow-400 text-yellow-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-md hover:bg-yellow-500 transition-colors"
              >
                Request Custom Piece 🎨
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

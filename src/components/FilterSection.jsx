import React, { useState } from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';

const FilterSection = ({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedPriceRange,
    setSelectedPriceRange,
    sortOption,
    setSortOption,
    categories,
    PRICE_RANGES,
    SORT_OPTIONS
}) => {
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    return (
        <div className="mb-8">
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                <div className="space-y-4">
                    <div className="flex gap-3">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-3  bg-gray-50 rounded-lg border-0 accent-pink-300 text-sm"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        </div>


                        <button
                            onClick={() => setShowMobileFilters(!showMobileFilters)}
                            className="md:hidden inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 "
                        >
                            <SlidersHorizontal className="h-4 w-4 mr-2" />
                            Filters
                        </button>
                    </div>


                    <div className={`${showMobileFilters ? 'block' : 'hidden'} md:block space-y-4 md:space-y-0 md:flex md:gap-4`}>
                        <div className="relative flex-1">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="appearance-none w-full bg-gray-50 px-4 py-3 rounded-lg text-sm text-gray-900 border-0 focus:ring-2 focus:ring-indigo-500"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                        </div>


                        <div className="relative flex-1">
                            <select
                                value={JSON.stringify(selectedPriceRange)}
                                onChange={(e) => setSelectedPriceRange(JSON.parse(e.target.value))}
                                className="appearance-none w-full bg-gray-50 px-4 py-3 rounded-lg text-sm text-gray-900 border-0 focus:ring-2 focus:ring-indigo-500"
                            >
                                {PRICE_RANGES.map(range => (
                                    <option key={range.label} value={JSON.stringify(range)}>
                                        {range.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                        </div>


                        <div className="relative flex-1">
                            <select
                                value={JSON.stringify(sortOption)}
                                onChange={(e) => setSortOption(JSON.parse(e.target.value))}
                                className="appearance-none w-full bg-gray-50 px-4 py-3 rounded-lg text-sm text-gray-900 border-0 focus:ring-2 focus:ring-indigo-500"
                            >
                                {SORT_OPTIONS.map(option => (
                                    <option key={option.value} value={JSON.stringify(option)}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterSection;
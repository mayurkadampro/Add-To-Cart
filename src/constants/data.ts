export const ITEMS_PER_PAGE = 8;

export const PRICE_RANGES = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Under $25', min: 0, max: 25 },
    { label: '$25 - $50', min: 25, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: 'Over $100', min: 100, max: Infinity },
];

export const SORT_OPTIONS = [
    { label: 'Latest', value: 'latest' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Name: A to Z', value: 'name-asc' },
    { label: 'Name: Z to A', value: 'name-desc' },
];

export const CART_KEY = "SAVED_CART";
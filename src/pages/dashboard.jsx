import React, { useState, useEffect, useContext } from "react";
import { ShoppingCart } from "lucide-react";
import {
    Toast,
    Pagination,
    FilterSection,
    ProductCard,
    Cart,
} from "../components";
import {
    ITEMS_PER_PAGE,
    PRICE_RANGES,
    PRODUCT_URL,
    SORT_OPTIONS,
} from "../constants";
import { CartContext, CartContextProvider } from "../contexts";

const Dashboard = () => {
    const { cart, updateCartData } = useContext(CartContext);
    const [toasts, setToasts] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCart, setShowCart] = useState(false);

    // Filter states
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedPriceRange, setSelectedPriceRange] = useState(PRICE_RANGES[0]);
    const [sortOption, setSortOption] = useState(SORT_OPTIONS[0]);
    const [categories, setCategories] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [products, searchQuery, selectedCategory, selectedPriceRange, sortOption]);

    useEffect(() => {
        setTotalPages(Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
        setCurrentPage(1);
    }, [filteredProducts]);

    const addToast = (type, message) => {
        const newToast = {
            id: Date.now(),
            type,
            message,
            duration: 3000,
        };

        setToasts((prevToasts) => [...prevToasts, newToast]);
    };

    const removeToast = (id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch(PRODUCT_URL);
            const data = await response.json();
            setProducts(data);

            const category = data.reduce((acc, item, index) => {
                if (!acc.includes(item.category)) {
                    acc.push(item.category);
                }
                return acc;
            }, []);

            setCategories(["all", ...category]);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch products");
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...products];

        if (searchQuery) {
            filtered = filtered.filter(
                (product) =>
                    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategory !== "all") {
            filtered = filtered.filter(
                (product) => product.category === selectedCategory
            );
        }

        if (selectedPriceRange.min && selectedPriceRange.max) {
            filtered = filtered.filter(
                (product) =>
                    product.price >= selectedPriceRange.min &&
                    product.price <= selectedPriceRange.max
            );
        }

        filtered.sort((a, b) => {
            switch (sortOption.value) {
                case "price-asc":
                    return a.price - b.price;
                case "price-desc":
                    return b.price - a.price;
                case "name-asc":
                    return a.title.localeCompare(b.title);
                case "name-desc":
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });

        setFilteredProducts(filtered);
    };

    const getCurrentPageProducts = () => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredProducts.slice(startIndex, endIndex);
    };

    const addToCart = (product) => {
        
        const existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
          updateCartData(
            cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          );
        } else {
            updateCartData([...cart, { ...product, quantity: 1 }]);
        }
        addToast("info", "Item added to cart");
    };

    const removeFromCart = (productId) => {
        updateCartData(cart.filter((item) => item.id !== productId));
        addToast("info", "Item removed from cart");
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;

        updateCartData(
            cart.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const ToastContainer = ({ toasts, removeToast }) => {
        return (
            <div className="fixed bottom-4 right-4 space-y-2">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        {...toast}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fixed bottom-4 right-4 space-y-2">
                <h1>{error}</h1>
            </div>
        );
    }

    return (
        <CartContextProvider>
            <div className="min-h-screen bg-gray-50">
                <ToastContainer toasts={toasts} removeToast={removeToast} />

                <header className="bg-white shadow-sm sticky top-0 z-40">
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">
                            <span className="text-indigo-600">Shop</span>Trade
                        </h1>
                        <button
                            onClick={() => setShowCart(!showCart)}
                            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ShoppingCart className="h-6 w-6 text-gray-700" />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                                    {cart.length}
                                </span>
                            )}
                        </button>
                    </div>
                </header>

                <main className="container mx-auto px-4 py-8">
                    {showCart && (
                        <>
                            <Cart
                                cart={cart}
                                setShowCart={setShowCart}
                                updateQuantity={updateQuantity}
                                removeFromCart={removeFromCart}
                                calculateTotal={calculateTotal}
                            />
                        </>
                    )}

                    <FilterSection
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        selectedPriceRange={selectedPriceRange}
                        setSelectedPriceRange={setSelectedPriceRange}
                        sortOption={sortOption}
                        setSortOption={setSortOption}
                        categories={categories}
                        PRICE_RANGES={PRICE_RANGES}
                        SORT_OPTIONS={SORT_OPTIONS}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {getCurrentPageProducts().map((product) => (
                            <ProductCard key={product.id} product={product} addToCart={addToCart} />
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                    />
                </main>
            </div>
        </CartContextProvider>
    );
};

export default Dashboard;

import React from 'react';

const ProductCard = ({ product, addToCart }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-4 h-48 bg-gray-50 flex items-center justify-center">
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-full object-contain"
                />
            </div>
            <div className="p-4">
                <div className="h-12">
                    <h3 className="text-gray-900 font-medium line-clamp-2">{product.title}</h3>
                </div>
                <p className="text-sm text-gray-500 mt-2 h-12 overflow-hidden line-clamp-2">
                    {product.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    <button
                        onClick={() => addToCart(product)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;
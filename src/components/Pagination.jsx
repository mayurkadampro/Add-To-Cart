import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    const getPageNumbers = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                range.push(i);
            }
        }

        range.forEach((i) => {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push("...");
                }
            }
            rangeWithDots.push(i);
            l = i;
        });

        return rangeWithDots;
    };

    return (
        <div className="mt-8 flex justify-center">
            <nav className="relative z-0 inline-flex gap-2 rounded-md">
                <button
                    onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center justify-center h-10 w-10 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
                >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="hidden sm:flex gap-2">
                    {getPageNumbers().map((pageNumber, index) =>
                        pageNumber === "..." ? (
                            <span
                                key={`dots-${index}`}
                                className="relative inline-flex items-center justify-center h-10 px-4 text-sm font-medium text-gray-700"
                            >
                                {pageNumber}
                            </span>
                        ) : (
                            <button
                                key={pageNumber}
                                onClick={() => setCurrentPage(pageNumber)}
                                className={`relative inline-flex items-center justify-center h-10 w-10 rounded-lg text-sm font-medium transition-colors
                    ${currentPage === pageNumber
                                        ? "z-10 bg-indigo-600 text-white"
                                        : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                {pageNumber}
                            </button>
                        )
                    )}
                </div>

                <span className="sm:hidden text-sm text-gray-700 px-4 h-10 flex items-center font-medium">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={() =>
                        setCurrentPage((page) => Math.min(page + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center justify-center h-10 w-10 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
                >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" />
                </button>
            </nav>
        </div>
    );
};

export default Pagination;

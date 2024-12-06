"use client";

import React from 'react'


interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}


const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange, totalPages }) => {
    return (
        <nav className="flex items-center justify-end space-x-1" aria-label="Pagination">
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    onPageChange(Math.max(1, currentPage - 1));
                }}
                className={`flex h-8 w-8 items-center justify-center rounded-full ${currentPage === 1 ? 'pointer-events-none text-gray-300' : 'text-gray-500 hover:bg-gray-100'
                    }`}
                aria-disabled={currentPage === 1}
            >
                <span aria-hidden="true">&lsaquo;</span>
                <span className="sr-only">Previous page</span>
            </a>
            {[...Array(totalPages)].map((_, i) => (
                <a
                    key={i + 1}
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onPageChange(i + 1);
                    }}
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${currentPage === i + 1
                            ? 'bg-green-500 text-white'
                            : 'text-gray-500 hover:bg-gray-100'
                        }`}
                    aria-current={currentPage === i + 1 ? 'page' : undefined}
                >
                    {i + 1}
                </a>
            ))}
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    onPageChange(Math.min(totalPages, currentPage + 1));
                }}
                className={`flex h-8 w-8 items-center justify-center rounded-full ${currentPage === totalPages ? 'pointer-events-none text-gray-300' : 'text-gray-500 hover:bg-gray-100'
                    }`}
                aria-disabled={currentPage === totalPages}
            >
                <span aria-hidden="true">&rsaquo;</span>
                <span className="sr-only">Next page</span>
            </a>
        </nav>
    )
}

export default Pagination

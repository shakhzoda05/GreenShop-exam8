"use client";

import React from "react";

interface SortType {
    handleSortChange:(event: React.ChangeEvent<HTMLSelectElement>) => void;
    sortOption: string;
}

const SortingDropdown:React.FC<SortType> = ({handleSortChange, sortOption}) => {

    return (
        <div className="sm:block hidden">
            <label htmlFor="sorting">Sort by: </label>
            <select
                id="sorting"
                value={sortOption}
                onChange={handleSortChange}
                className="border-none outline-none focus:none text-gray-700"
            >
                <option value="default">Default sorting</option>
                <option value="price">Price</option>
                <option value="name">Name</option>
            </select>
        </div>
    );
};

export default SortingDropdown;

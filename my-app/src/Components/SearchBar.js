import React, {useState } from 'react';

const SearchBar = ({searchQuery, setSearchQuery}) => (
    <form action="/" method="get">
        <input
            type="text"
            id="header-search"
            placeholder="Search Pokemon "
            name="s"
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
    </form>
);

export default SearchBar;

import React, { useState } from "react";
import logo from "../images/logo.png";

const Header = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Call the parent function to fetch search results
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <header>
      <div className="container  py-3">
        <img src={logo} alt="Company Logo" style={{ height: "70px", margin: "0", padding: "0" }} />
        <div className="float-end pt-4 search-bar">
          <input
            type="text"
            placeholder="⌕ Search by title and t..."
            className="form-control"
            value={query}
            onChange={handleSearch}
            aria-label="Search"
          />
        </div>
      </div>
      <hr />
    </header>
  );
};

export default Header;

import React from "react";
import "./Header.css";
import logo from "../assets/emarket-logo.png";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [query, setQuery] = React.useState("");

  const handleSearch = () => {
    onSearch?.(query); // call parent callback with current query
  };

  return (
    <header className="header">
      <img src={logo} alt="eMarket" className="logo" />

      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          🔍
        </button>
      </div>
    </header>
  );
};

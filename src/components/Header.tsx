import React from "react";
import "./Header.css";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="header">
      <div className="logo">eMarket</div>
      <input
        type="text"
        className="search-bar"
        placeholder="Search products..."
        onChange={(e) => onSearch?.(e.target.value)}
      />
    </header>
  );
};

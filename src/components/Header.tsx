import React from "react";
import "./Header.css";
import logo from "../assets/emarket-logo.png";

interface HeaderProps {
  onSearch?: (query: string) => void;
  cartCount?: number;
  onCartClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, cartCount = 0, onCartClick }) => {
  const [query, setQuery] = React.useState("");
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isLight, setIsLight] = React.useState(false);

  const handleSearch = () => {
    onSearch?.(query); // call parent callback with current query
  };

  const handleHome = () => {
    setQuery("");
    onSearch?.("");
    setMenuOpen(false);
  };

  const toggleView = () => {
    const isList = document.body.classList.toggle("list-view");
    localStorage.setItem("emarket:view", isList ? "list" : "grid");
    setMenuOpen(false);
  };

  const toggleTheme = () => {
    const newIsLight = !isLight;
    setIsLight(newIsLight);
    if(newIsLight) document.documentElement.classList.add("light-theme");
    else document.documentElement.classList.remove("light-theme");
    localStorage.setItem("emarket:theme", newIsLight ? "light" : "dark");
  };

  // initialize from saved prefs
  React.useEffect(() => {
    const view = localStorage.getItem("emarket:view");
    if (view === "list") document.body.classList.add("list-view");
    const theme = localStorage.getItem("emarket:theme");
    const isLt = theme === "light";
    setIsLight(isLt);
    if (isLt) document.documentElement.classList.add("light-theme");
  }, []);

  return (
    <header className="header">
      <div className="logo-wrap">
        <button
          className="logo-button"
          aria-haspopup="true"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <img src={logo} alt="eMarket" className="logo" />
        </button>

        {menuOpen && (
            <div className="logo-menu" role="menu">
            <button className="logo-menu-item menu-fill" onClick={handleHome} role="menuitem"><span>Home</span></button>
            <button className="logo-menu-item menu-fill" onClick={toggleView} role="menuitem"><span>View</span></button>
            <button className="logo-menu-item logo-menu-item-theme menu-fill" onClick={toggleTheme} role="menuitem">
              <span>Theme</span>
              <span className="theme-toggle">{isLight ? "☀️" : "🌙"}</span>
            </button>
          </div>
        )}
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="search-button" onClick={handleSearch}>
          🔍
        </button>
      </div>
      <div className="cart-container">
        <button className="cart-button" aria-label="Cart" onClick={onCartClick}>🛒
          <span className="cart-count">{cartCount}</span>
        </button>
      </div>
    </header>
  );
};

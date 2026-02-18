import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "./components/Header";
import { ProductCard } from "./components/ProductCard";
import "./App.css";

// Define Product type to match backend
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  inventoryQuantity: number;
  isAvailable: boolean;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<Record<number, number>>({});

  // Fetch products from backend
  useEffect(() => {
    axios
      .get<Product[]>("http://localhost:8080/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Filter products based on search and availability
  const filteredProducts = products
    .filter((p) => p.isAvailable)
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const addToCart = (productId: number) => {
    setCart((prev) => {
      const next = { ...prev };
      next[productId] = (next[productId] || 0) + 1;
      return next;
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const next = { ...prev };
      const cur = next[productId] || 0;
      if (cur <= 1) {
        delete next[productId];
      } else {
        next[productId] = cur - 1;
      }
      return next;
    });
  };

  const cartCount = Object.values(cart).reduce((s, q) => s + q, 0);

  return (
    <div>
      <Header onSearch={(query) => setSearchQuery(query)} cartCount={cartCount} />
      <div className="product-grid">
        {filteredProducts.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            price={`$${p.price}`} // format price as string
            imageUrl="https://via.placeholder.com/150" // replace with real images if available
            onAdd={() => addToCart(p.id)}
            onRemove={() => removeFromCart(p.id)}
            quantity={cart[p.id] || 0}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

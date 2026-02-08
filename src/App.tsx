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

  return (
    <div>
      <Header onSearch={(query) => setSearchQuery(query)} />
      <div className="product-grid">
        {filteredProducts.map((p) => (
          <ProductCard
            key={p.id}
            name={p.name}
            price={`$${p.price}`} // format price as string
            imageUrl="https://via.placeholder.com/150" // replace with real images if available
          />
        ))}
      </div>
    </div>
  );
}

export default App;

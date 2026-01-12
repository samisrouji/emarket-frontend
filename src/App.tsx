import { Header } from "./components/Header";
import { ProductCard } from "./components/ProductCard";
import "./App.css";

const products = [
  { name: "Product 1", price: "$10", imageUrl: "https://via.placeholder.com/150" },
  { name: "Product 2", price: "$20", imageUrl: "https://via.placeholder.com/150" },
  { name: "Product 3", price: "$30", imageUrl: "https://via.placeholder.com/150" },
  { name: "Product 4", price: "$40", imageUrl: "https://via.placeholder.com/150" },
  { name: "Product 5", price: "$50", imageUrl: "https://via.placeholder.com/150" },
  { name: "Product 6", price: "$60", imageUrl: "https://via.placeholder.com/150" },
  { name: "Product 7", price: "$70", imageUrl: "https://via.placeholder.com/150" },
  { name: "Product 8", price: "$80", imageUrl: "https://via.placeholder.com/150" },
  { name: "Product 9", price: "$90", imageUrl: "https://via.placeholder.com/150" },
];

function App() {
  return (
    <div>
      <Header />
      <div className="product-grid">
        {products.map((p, idx) => (
          <ProductCard key={idx} {...p} />
        ))}
      </div>
    </div>
  );
}

export default App;

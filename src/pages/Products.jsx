import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

const Products = () => {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
  const filtered = useMemo(
    () =>
      products
        .filter(
          (product) =>
            (category === "All" || product.category === category) &&
            product.name.toLowerCase().includes(query.toLowerCase()),
        )
        .sort((a, b) =>
          sort === "low"
            ? a.price - b.price
            : sort === "high"
              ? b.price - a.price
              : a.id - b.id,
        ),
    [category, query, sort],
  );
  return (
    <main className="container shop-page">
      <div className="shop-heading">
        <div>
          <span className="eyebrow">The collection</span>
          <h1>Shop all</h1>
          <p>Useful, beautiful things for every day.</p>
        </div>
        <label className="search-label">
          Search
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products..."
          />
        </label>
      </div>
      <div className="shop-controls">
        <div className="category-list">
          {categories.map((item) => (
            <button
              className={category === item ? "selected" : ""}
              key={item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          aria-label="Sort products"
        >
          <option value="featured">Featured</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
        </select>
      </div>
      {filtered.length ? (
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="notice">No products match your search.</div>
      )}
    </main>
  );
};

export default Products;

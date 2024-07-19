// src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([
    // { id: 1, name: 'Laptop', description: 'DELL Laptop', price: 59999 },
    // { id: 2, name: 'Mouse', description: 'Wireless Mouse', price: 400 }
  ]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleAddProduct = () => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    setNewProduct({ name: '', description: '', price: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditClick = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setNewProduct({ name: product.name, description: product.description, price: product.price });
  };

  const handleUpdateProduct = () => {
    setProducts(products.map(product => 
      product.id === currentProduct.id ? { ...newProduct, id: currentProduct.id } : product
    ));
    setNewProduct({ name: '', description: '', price: '' });
    setIsEditing(false);
    setCurrentProduct(null);
  };

  const handleDeleteClick = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Welcome to your Product Catalog</h1>
      <div className="product-form">
        <h2>Product Form</h2>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
          {isEditing ? (
            <button
              onClick={handleUpdateProduct}
              disabled={!newProduct.name || !newProduct.description || !newProduct.price}
            >
              Update Product
            </button>
          ) : (
            <button
              onClick={handleAddProduct}
              disabled={!newProduct.name || !newProduct.description || !newProduct.price}
            >
              Add Product
            </button>
          )}
        </div>
      </div>
      <div className="product-list">
        <h2>Products List</h2>
        <input
          type="text"
          placeholder="Filter by Name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <ul>
          {filteredProducts.map(product => (
            <li key={product.id}>
              <strong>Name:</strong> {product.name}<br />
              <strong>Description:</strong> {product.description}<br />
              <strong>Price:</strong> {product.price}<br />
              <button onClick={() => handleEditClick(product)}>Edit</button>
              <button onClick={() => handleDeleteClick(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

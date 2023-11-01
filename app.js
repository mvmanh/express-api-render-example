const express = require('express');
const app = express();

app.use(express.json());

// In-memory product data
let products = [
  { id: 1, name: 'Product 1', price: 10.99, color: 'Red' },
  { id: 2, name: 'Product 2', price: 19.99, color: 'Blue' },
];

app.get('/', (req, res) => {
    res.json({message: 'Please access /products to get data'});
  });

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Get a specific product by ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Create a new product
app.post('/products', (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length + 1;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update a product by ID
app.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;
  const index = products.findIndex((p) => p.id === productId);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    res.json(products[index]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Delete a product by ID
app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === productId);
  if (index !== -1) {
    products.splice(index, 1);
    res.json({ message: 'Product deleted' });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

const PORT = process.env.PORT || 8080;
const version = 1.0
app.listen(PORT, () => {
  console.log(`Server ${version} is running on port ${PORT}`);
});

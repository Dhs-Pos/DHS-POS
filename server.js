const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let db = {
  products: [],
  customers: [],
  sales: [],
  orders: [],
  users: []
};

app.get("/", (req, res) => {
  res.json({
    message: "DHS POS ONLINE API",
    status: "running"
  });
});

app.get("/api/data", (req, res) => {
  res.json(db);
});

app.get("/api/products", (req, res) => {
  res.json(db.products);
});

app.post("/api/products", (req, res) => {
  const product = {
    id: Date.now(),
    ...req.body
  };

  db.products.push(product);

  res.json({
    message: "Product added",
    product
  });
});

app.get("/api/orders", (req, res) => {
  res.json(db.orders);
});

app.post("/api/orders", (req, res) => {
  const order = {
    id: Date.now(),
    status: "pending",
    createdAt: new Date().toISOString(),
    ...req.body
  };

  db.orders.push(order);

  res.json({
    message: "Order request submitted",
    order
  });
});

app.get("/api/sales", (req, res) => {
  res.json(db.sales);
});

app.post("/api/sales", (req, res) => {
  const sale = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...req.body
  };

  db.sales.push(sale);

  res.json({
    message: "Sale saved",
    sale
  });
});

app.get("/api/dashboard", (req, res) => {
  const totalSales = db.sales.reduce(
    (sum, sale) => sum + Number(sale.total || 0),
    0
  );

  const lowStock = db.products.filter(
    product => Number(product.stock || 0) <= Number(product.low || 0)
  ).length;

  res.json({
    products: db.products.length,
    customers: db.customers.length,
    sales: db.sales.length,
    orders: db.orders.length,
    lowStock,
    totalSales
  });
});

app.listen(PORT, () => {
  console.log("================================");
  console.log("DHS POS ONLINE SERVER");
  console.log("Server running on port " + PORT);
  console.log("================================");
});
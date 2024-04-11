// import express from "express";
// import { connectDB } from "./utils/features.js";
// import { errorMiddleware } from "./middlewares/error.js";
// import NodeCache from "node-cache";
// import { config } from "dotenv";
// import morgan from "morgan";
// import Stripe from "stripe";
// import cors from "cors";

// // Importing Routes
// import userRoute from "./routes/user.js";
// import productRoute from "./routes/products.js";
// import orderRoute from "./routes/order.js";
// import paymentRoute from "./routes/payment.js";
// import dashboardRoute from "./routes/stats.js";

// config({
//   path: "./.env",
// });

// const port = process.env.PORT || 4000;
// const mongoURI = process.env.MONGO_URI || "";
// const stripeKey = process.env.STRIPE_KEY || "";

// connectDB(mongoURI);

// export const stripe = new Stripe(stripeKey);
// export const myCache = new NodeCache();

// const app = express();

// app.use(express.json());
// app.use(morgan("dev"));
// app.use(cors());

// app.get("/", (req, res) => {
//   res.send("API Working with /api/v1");
// });

// // Using Routes
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/product", productRoute);
// app.use("/api/v1/order", orderRoute);
// app.use("/api/v1/payment", paymentRoute);
// app.use("/api/v1/dashboard", dashboardRoute);

// app.use("/uploads", express.static("uploads"));

// app.use(errorMiddleware);

// app.listen(port, () => {
//   console.log(`Express is working on http://localhost:${port}`);
// });

import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from "morgan";
import Stripe from "stripe";
import cors from "cors";

// Importing Routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payment.js";
import dashboardRoute from "./routes/stats.js";

config({
  path: "./.env",
});

const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || "";
const stripeKey = process.env.STRIPE_KEY || "";

// Check if environment variables are properly loaded
if (!port || !mongoURI || !stripeKey) {
  console.error("Error: Missing environment variables.");
  process.exit(1);
}

// Connect to MongoDB
connectDB(mongoURI);

// Initialize Stripe
export const stripe = new Stripe(stripeKey);

// Initialize NodeCache
export const myCache = new NodeCache();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Using Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/dashboard", dashboardRoute);

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static("uploads"));

// Default route
app.get("/", (req, res) => {
  res.send("API Working with /api/v1");
});

// Error handling middleware
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Express is working on http://localhost:${port}`);
});

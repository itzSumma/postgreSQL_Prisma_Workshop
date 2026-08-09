import { Router } from "express";
import users from "../services/users";

// import products from "../services/products";
// import categories from "../services/categories";
// import cartItems from "../services/cartItems";
// import orders from "../services/orders";

const router = Router();

/**
 * User Routes Registration
 * Endpoint: /api/users
 */
router.use("/users", users);

// বাকিগুলো পরবর্তীতে এক এক করে আনব
// router.use("/products", products);
// router.use("/categories", categories);
// router.use("/cart-items", cartItems);
// router.use("/orders", orders);

export default router;

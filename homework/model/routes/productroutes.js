const express = require("express");
const { addProduct, getProducts, updateProduct, deleteProduct } = require("../controllers/productController");
const { authenticate, isAdmin } = require("../middleware/auth");
const router = express.Router();

router.post("/", authenticate, isAdmin, addProduct);
router.get("/", getProducts);
router.put("/:id", authenticate, isAdmin, updateProduct);
router.delete("/:id", authenticate, isAdmin, deleteProduct);

module.exports = router;

const express = require("express");
const router = express.Router();
const sejarahController = require("../controllers/sejarahController");

// Menambahkan data sejarah (POST request)
router.post("/sejarah", sejarahController.tambahSejarah);

// Mendapatkan semua data sejarah (GET request)
router.get("/sejarah", sejarahController.getAllSejarah);

// Mendapatkan data sejarah berdasarkan ID (GET request)
router.get("/sejarah/:id", sejarahController.getSejarahById);

// Memperbarui data sejarah berdasarkan ID (PUT request)
router.put("/sejarah/:id", sejarahController.updateSejarah);

// Menghapus data sejarah berdasarkan ID (DELETE request)
router.delete("/sejarah/:id", sejarahController.deleteSejarah);

module.exports = router;

// routes/newsRoutes.js
const express = require("express");

const router = express.Router();
const db = require("../config/database");

const newsController = require("../controllers/beritaController");

// Mendapatkan semua berita
router.get("/news", newsController.getAllNews);

// Mendapatkan berita berdasarkan ID
router.get("/news/:hashed_id", newsController.getNewsById);

// Mendapatkan berita berdasarkan ID di bagian admin
router.get("/news-admin/:id", newsController.getNewsByIdAdmin);

// Menambahkan berita baru
router.post("/news", newsController.addNews);

// Memperbarui berita berdasarkan ID
router.put("/news/:id", newsController.updateNews);

// Menghapus berita berdasarkan ID
router.delete("/news/:id", newsController.deleteNews);

module.exports = router;

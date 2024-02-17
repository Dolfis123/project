// Mengimpor modul express untuk membuat router
const express = require("express");
const router = express.Router();

// Mengimpor controller ucapan untuk menangani permintaan pada rute ini
const ucapanController = require("../controllers/ucapanController");

// Rute untuk mendapatkan semua ucapan
router.get("/lihat-ucapan", ucapanController.getAllUcapan);

// Rute untuk membuat ucapan baru
router.post("/ucapan", ucapanController.createUcapan);

// Rute untuk memperbarui ucapan berdasarkan ID
router.put("/edit-ucapan/:id", ucapanController.updateUcapan);

// Rute untuk menghapus ucapan berdasarkan ID
router.delete("/delete-ucapan/:id", ucapanController.deleteUcapan);

// Rute untuk mendapatkan ucapan berdasarkan ID
router.get("/ucapan/:id", ucapanController.getById);

// Mengekspor router untuk digunakan pada aplikasi utama
module.exports = router;

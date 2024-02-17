const express = require("express");
const router = express.Router();
const visiMisiController = require("../controllers/visimisiController");

// Menambahkan data visi dan misi (POST request)
router.post("/visi-misi", visiMisiController.tambahVisiMisi);

// Mendapatkan semua data visi dan misi (GET request)
router.get("/visi-misi", visiMisiController.getAllVisiMisi);

// Mendapatkan  data visi dan misi berdasarkan ID (GET request)
router.get("/visi-misi/:id", visiMisiController.getVisiMisiById);

// Memperbarui data visi dan misi berdasarkan ID (PUT request)
router.put("/visi-misi/:id", visiMisiController.updateVisiMisiById);

// Menghapus data visi dan misi berdasarkan ID (DELETE request)
router.delete("/visi-misi/:id", visiMisiController.deleteVisiMisiById);

module.exports = router;

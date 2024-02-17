const express = require("express");
const router = express.Router();
const db = require("../config/database");
const pegawaiController = require("../controllers/PegawaiController");

// Rute untuk mengambil data struktur organisasi
router.get("/struktur-organisasi", (req, res) => {
  // Query SQL untuk mengambil data pegawai dari database
  const sqlQuery = "SELECT * FROM pegawai"; // Sesuaikan dengan nama tabel Anda

  // Eksekusi query SQL
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Error executing SQL query" });
    }

    // Transformasi data ke struktur hierarkis menggunakan controller
    const strukturOrganisasi =
      pegawaiController.transformDataToHierarchy(result);

    // Kirim struktur organisasi sebagai respons JSON
    res.json(strukturOrganisasi);
  });
});

// Mengirim data sejarah (POST request)
router.post("/addpegawai", pegawaiController.tambahPegawai);

// Mendapatkan semua data sejarah (GET request)
router.get("/pegawai", pegawaiController.getAllPegawai);

// Hapus pegawai berdasarkan ID (DELETE request)
router.delete("/delete/:id", pegawaiController.deletePegawai);

// Perbarui data pegawai berdasarkan ID (PUT request)
router.put("/update/:id", pegawaiController.updatePegawai);

// Mendapatkan data pegawai berdasarkan ID (GET request)
router.get("/getbyid/:id", pegawaiController.getById);

module.exports = router;

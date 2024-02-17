const express = require("express"); // Import Express framework
const router = express.Router(); // Create a router instance
const surat_ket_domisili = require("../controllers/surat_ket_domisiliController"); // Import surat_ket_domisiliController module

// Define routes for handling various operations related to surat domisili

// Route to create a new surat domisili
router.post("/buat-surat-domisili", surat_ket_domisili.createDomisili);

// Route to view a surat domisili by hashed ID
router.get("/lihat-surat-domisili/:hashed_id", surat_ket_domisili.getDomisili);

// Route to view a surat domisili by its nomor surat
router.get(
  "/lihat-nomor-surat-domisili/:nomor_surat",
  surat_ket_domisili.getByNomorSurat
);

// Route to view a surat domisili by admin based on its ID
router.get(
  "/lihat-surat-domisili-admin/:id",
  surat_ket_domisili.getDomisiliAdmin
);

// Route to view all surat domisili waiting for admin approval
router.get(
  "/lihat-surat-menunggu-domisili",
  surat_ket_domisili.getDomisiliMenunggu
);

// Route to view all surat domisili that have been approved by admin
router.get(
  "/lihat-surat-diterima-domisili",
  surat_ket_domisili.getDomisiliTerima
);

// Route to delete a surat domisili by ID
router.delete("/hapus-surat-domisili/:id", surat_ket_domisili.deleteDomisili);

// Route to approve a surat domisili by ID
router.post(
  "/terima-surat-domisli/:id",
  surat_ket_domisili.updateStatusDomisilDiterima
);

// Route to update phone number and email of a surat domisili by hashed ID
router.put(
  "/update-nomor-email-domisil/:hashed_id",
  surat_ket_domisili.updateDomisili
);

// Route to update all details of a surat domisili by ID
router.put("/update-all-domisili/:id", surat_ket_domisili.updateDomisiliAll);

// Route to update all details of a surat domisili by hashed_id
router.put(
  "/update-all-domisili-user/:hashed_id",
  surat_ket_domisili.updateDomisiliAllUser
);

module.exports = router; // Export the router for use in other parts of the application

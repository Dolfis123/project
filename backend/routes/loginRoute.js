// Mengimpor modul express untuk membuat router
const express = require("express");
// Membuat instance router dari express
const router = express.Router();
// Mengimpor loginController untuk menangani permintaan login dan registrasi
const loginController = require("../controllers/loginControlle");
// Menetapkan handler loginPilih dari loginController untuk endpoint '/login' dengan metode POST
router.post("/login", loginController.loginPilih);
// Menetapkan handler register dari loginController untuk endpoint '/regis' dengan metode POST
router.post("/regis", loginController.register);
// Catatan: router.post("/loginn", loginController.loginAdd);, endpoint ini sedang dinonaktifkan atau tidak digunakan

// Mengekspor router agar dapat digunakan di modul lain
module.exports = router;

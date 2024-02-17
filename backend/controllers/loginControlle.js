// Mengimpor modul database untuk koneksi database
const db = require("../config/database");
// Mengimpor modul bcrypt untuk melakukan hashing kata sandi
const bcrypt = require("bcrypt");
// Mengimpor modul jsonwebtoken untuk menghasilkan token JWT
const jwt = require("jsonwebtoken");

// Handler untuk endpoint login
const loginPilih = (req, res) => {
  const { email, password } = req.body;

  // Mencari pengguna berdasarkan email di tabel "login" di database
  const sqlQuery = "SELECT * FROM login WHERE email = ?";
  db.query(sqlQuery, [email], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res
        .status(500)
        .json({ Status: "Error", Error: "Error in server" });
    }

    if (result.length === 0) {
      // Jika tidak ditemukan pengguna dengan email yang sesuai, kirim pesan error
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }

    const user = result[0];

    // Membandingkan kata sandi yang dikirim dengan kata sandi yang disimpan di database
    bcrypt.compare(password, user.password, (err, passwordMatches) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res
          .status(500)
          .json({ Status: "Error", Error: "Error in server" });
      }

      if (passwordMatches) {
        // Jika kata sandi cocok, hasilkan token JWT untuk otentikasi
        const token = jwt.sign({ userId: user.id }, "secretKey");
        // Simpan email pengguna di session
        req.session.email = user.email;
        return res.json({ Status: "Success", Token: token });
      } else {
        // Jika kata sandi tidak cocok, kirim pesan error
        return res.json({ Status: "Error", Error: "Wrong Email or Password" });
      }
    });
  });
};

// Handler untuk endpoint register
const register = (req, res) => {
  const { email, password } = req.body;

  // Melakukan hashing kata sandi sebelum menyimpannya di database
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res
        .status(500)
        .json({ Status: "Error", Error: "Error in server" });
    }

    // Menyimpan data pengguna baru ke dalam tabel "login" di database
    const insertUserQuery = "INSERT INTO login (email, password) VALUES (?, ?)";
    db.query(insertUserQuery, [email, hashedPassword], (err) => {
      if (err) {
        console.error("Error executing query:", err);
        return res
          .status(500)
          .json({ Status: "Error", Error: "Error in server" });
      }

      return res.json({ Status: "Success", Message: "User registered" });
    });
  });
};

// Ekspor fungsi loginPilih dan register agar dapat digunakan di modul lain
module.exports = {
  loginPilih,
  register,
};

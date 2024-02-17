// Mengimpor modul mysql untuk mengelola koneksi database MySQL
const mysql = require("mysql");

// Konfigurasi koneksi database
const dbConfig = {
  host: "localhost", // Nama host database, dalam hal ini, localhost
  user: "root", // Nama pengguna database, dalam hal ini, root
  password: "", // Kata sandi database, dalam hal ini, kosong (tidak ada kata sandi)
  database: "project_kp", // Nama database yang digunakan, dalam hal ini, project_kp
};

// Buat koneksi ke database menggunakan konfigurasi yang telah ditentukan
const connection = mysql.createConnection(dbConfig);

// Cek apakah koneksi berhasil atau tidak
connection.connect((err) => {
  if (err) {
    // Jika terjadi kesalahan saat melakukan koneksi, tampilkan pesan kesalahan
    console.error("Koneksi ke database gagal:", err.message);
  } else {
    // Jika koneksi berhasil, tampilkan pesan sukses
    console.log("Koneksi ke database berhasil!");
  }
});

// Ekspor objek koneksi agar dapat digunakan di modul lain
module.exports = connection;

// Mengimpor modul database untuk berinteraksi dengan database
const db = require("../config/database");
// Mengimpor multer untuk mengelola upload file
const multer = require("multer");
// Mengimpor modul path untuk mengelola path file
const path = require("path");
// Mengimpor modul moment-timezone untuk mengelola waktu dengan zona waktu tertentu
const moment = require("moment-timezone");
// Mengimpor modul crypto untuk menghasilkan hash acak
const crypto = require("crypto");

// Konfigurasi penyimpanan file dengan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Folder penyimpanan gambar
  },
  filename: (req, file, cb) => {
    // Membuat nama unik untuk file gambar
    const extname = path.extname(file.originalname);
    cb(null, "image_" + Date.now() + extname);
  },
});
const upload = multer({ storage: storage });

// Handler untuk mendapatkan semua berita dari database
exports.getAllNews = (req, res) => {
  // Menetapkan zona waktu default menjadi Asia/Jayapura
  moment.tz.setDefault("Asia/Jayapura");

  const query = "SELECT * FROM berita";
  // Mengambil data berita dari database
  db.query(query, (err, results) => {
    if (err) {
      console.error("Gagal mengambil berita: ", err);
      res.status(500).json({ error: "Gagal mengambil berita" });
    } else {
      res.json(results);
    }
  });
};

// Handler untuk mendapatkan berita berdasarkan ID
exports.getNewsById = (req, res) => {
  const hashed_id = req.params.hashed_id; // Mendapatkan hashed_id dari parameter URL
  const query = "SELECT * FROM berita WHERE hashed_id = ?";
  // Mengambil berita berdasarkan hashed_id
  db.query(query, [hashed_id], (err, results) => {
    if (err) {
      console.error("Gagal mengambil berita: ", err);
      res.status(500).json({ error: "Gagal mengambil berita" });
    } else if (results.length === 0) {
      res.status(404).json({ message: "Berita tidak ditemukan" });
    } else {
      res.json(results[0]);
    }
  });
};

// Handler untuk mendapatkan berita berdasarkan ID untuk admin
exports.getNewsByIdAdmin = (req, res) => {
  const id = parseInt(req.params.id);
  const query = "SELECT * FROM berita WHERE news_id = ?";
  // Mengambil berita berdasarkan ID untuk admin
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Gagal mengambil berita: ", err);
      res.status(500).json({ error: "Gagal mengambil berita" });
    } else if (results.length === 0) {
      res.status(404).json({ message: "Berita tidak ditemukan" });
    } else {
      res.json(results[0]);
    }
  });
};

// Fungsi untuk menghasilkan ID acak
function generateRandomId() {
  return crypto
    .createHash("sha256")
    .update(Date.now().toString())
    .digest("hex");
}

// Handler untuk menambahkan berita baru
exports.addNews = (req, res) => {
  // Menangani proses upload gambar dengan multer
  upload.single("news_image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: "Error uploading file" });
    }
    const {
      news_title,
      news_content,
      publication_date,
      news_source,
      category,
      publication_status,
    } = req.body;

    // Mendapatkan nama file gambar dari req.file
    const news_image = req.file ? req.file.filename : null;

    // Menyiapkan query untuk menyimpan data berita baru ke database
    const query =
      "INSERT INTO berita (news_title, news_content, publication_date, news_source, category, news_image, publication_status, hashed_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const newId = generateRandomId(); // Menghasilkan ID acak
    const hashedId = newId; // Menggunakan ID acak sebagai hashed_id
    db.query(
      query,
      [
        news_title,
        news_content,
        publication_date,
        news_source,
        category,
        news_image, // Menggunakan nama file gambar
        publication_status,
        hashedId,
      ],
      (err, result) => {
        if (err) {
          console.error("Gagal menambahkan berita: ", err);
          res.status(500).json({ error: "Gagal menambahkan berita" });
        } else {
          res.json({
            message: "Berita berhasil ditambahkan",
            newId,
            redirectUrl: `/download/${newId}`, // Contoh URL dengan ID acak
          });
        }
      }
    );
  });
};

// Handler untuk memperbarui berita berdasarkan ID
exports.updateNews = (req, res) => {
  const id = parseInt(req.params.id);
  // Menetapkan zona waktu default menjadi Asia/Jayapura
  moment.tz.setDefault("Asia/Jayapura");

  // Menangani proses upload gambar dengan multer
  upload.single("news_image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: "Error uploading file" });
    }

    const {
      news_title,
      news_content,
      news_source,
      category,
      publication_status,
    } = req.body;

    // Mendapatkan nama file gambar dari req.file
    const news_image = req.file ? req.file.filename : null;

    // Menyiapkan query untuk memperbarui data berita ke database
    const query =
      "UPDATE berita SET news_title=?, news_content=?, news_source=?, category=?, news_image=?, publication_status=? WHERE news_id=?";
    db.query(
      query,
      [
        news_title,
        news_content,
        news_source,
        category,
        news_image, // Menggunakan nama file gambar
        publication_status,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error("Gagal memperbarui berita: ", err);
          res.status(500).json({ error: "Gagal memperbarui berita" });
        } else {
          if (result.affectedRows === 0) {
            res.status(404).json({ message: "Berita tidak ditemukan" });
          } else {
            res.json({ message: "Berita berhasil diperbarui" });
          }
        }
      }
    );
  });
};

// Handler untuk menghapus berita berdasarkan ID
exports.deleteNews = (req, res) => {
  const id = parseInt(req.params.id);
  const query = "DELETE FROM berita WHERE news_id=?";
  // Menghapus berita dari database berdasarkan ID
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Gagal menghapus berita: ", err);
      res.status(500).json({ error: "Gagal menghapus berita" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Berita tidak ditemukan" });
      } else {
        res.json({ message: "Berita berhasil dihapus" });
      }
    }
  });
};

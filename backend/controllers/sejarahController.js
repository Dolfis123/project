// Mengimpor modul database untuk berinteraksi dengan database
const db = require("../config/database"); // Ganti dengan path sesuai dengan struktur folder Anda

// Fungsi untuk menyimpan data sejarah ke database
const tambahSejarah = (req, res) => {
  const { isi } = req.body;

  // Query untuk menyimpan data sejarah ke dalam tabel "sejarah"
  const query = "INSERT INTO sejarah (isi) VALUES (?)";
  db.query(query, [isi], (err, result) => {
    if (err) {
      console.error("Gagal menyimpan data sejarah:", err.message);
      return res.status(500).json({ message: "Gagal menyimpan data sejarah." });
    }

    return res.status(200).json({ message: "Data sejarah berhasil disimpan." });
  });
};

// Fungsi untuk mendapatkan semua data sejarah
const getAllSejarah = (req, res) => {
  // Query untuk mendapatkan semua data sejarah dari tabel "sejarah"
  const query = "SELECT * FROM sejarah";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Gagal mendapatkan data sejarah:", err.message);
      return res
        .status(500)
        .json({ message: "Gagal mendapatkan data sejarah." });
    }

    return res.status(200).json(result);
  });
};

// Fungsi untuk mendapatkan data sejarah berdasarkan ID
const getSejarahById = (req, res) => {
  const id = req.params.id;

  // Query untuk mendapatkan data sejarah berdasarkan ID dari tabel "sejarah"
  const query = "SELECT * FROM sejarah WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Gagal mendapatkan data sejarah:", err.message);
      return res
        .status(500)
        .json({ message: "Gagal mendapatkan data sejarah." });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Data sejarah tidak ditemukan." });
    }

    return res.status(200).json(result[0]);
  });
};

// Fungsi untuk memperbarui data sejarah berdasarkan ID
const updateSejarah = (req, res) => {
  const id = req.params.id;
  const { isi } = req.body;

  // Query untuk memperbarui data sejarah berdasarkan ID di tabel "sejarah"
  const query = "UPDATE sejarah SET isi = ? WHERE id = ?";
  db.query(query, [isi, id], (err, result) => {
    if (err) {
      console.error("Gagal memperbarui data sejarah:", err.message);
      return res
        .status(500)
        .json({ message: "Gagal memperbarui data sejarah." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Data sejarah tidak ditemukan." });
    }

    return res
      .status(200)
      .json({ message: "Data sejarah berhasil diperbarui." });
  });
};

// Fungsi untuk menghapus data sejarah berdasarkan ID
const deleteSejarah = (req, res) => {
  const id = req.params.id;

  // Query untuk menghapus data sejarah berdasarkan ID dari tabel "sejarah"
  const query = "DELETE FROM sejarah WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Gagal menghapus data sejarah:", err.message);
      return res.status(500).json({ message: "Gagal menghapus data sejarah." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Data sejarah tidak ditemukan." });
    }

    return res.status(200).json({ message: "Data sejarah berhasil dihapus." });
  });
};

// Mengekspor fungsi-fungsi yang didefinisikan di atas
module.exports = {
  tambahSejarah,
  getSejarahById,
  updateSejarah,
  deleteSejarah,
  getAllSejarah,
};

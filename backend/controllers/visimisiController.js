// Mengimpor modul database untuk koneksi ke database
const db = require("../config/database"); // Sesuaikan path dengan struktur folder Anda

// Fungsi untuk menambahkan data visi dan misi ke database
const tambahVisiMisi = (req, res) => {
  const { visi, misi } = req.body;

  // Query untuk menyimpan data visi dan misi ke database
  const query = "INSERT INTO visimisi (visi, misi) VALUES (?, ?)";
  db.query(query, [visi, misi], (err, result) => {
    if (err) {
      console.error("Gagal menyimpan data visi dan misi:", err.message);
      return res
        .status(500)
        .json({ message: "Gagal menyimpan data visi dan misi." });
    }

    // Mengembalikan respons berhasil jika data berhasil disimpan
    return res
      .status(200)
      .json({ message: "Data visi dan misi berhasil disimpan." });
  });
};

// Fungsi untuk mendapatkan semua data visi dan misi dari database
const getAllVisiMisi = (req, res) => {
  // Query untuk mendapatkan semua data visi dan misi
  const query = "SELECT * FROM visimisi";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Gagal mendapatkan data visi dan misi:", err.message);
      return res
        .status(500)
        .json({ message: "Gagal mendapatkan data visi dan misi." });
    }

    // Mengembalikan data visi dan misi dalam respons
    return res.status(200).json(result);
  });
};

// Fungsi untuk mendapatkan data visi dan misi berdasarkan ID dari database
const getVisiMisiById = (req, res) => {
  const id = req.params.id;

  // Query untuk mendapatkan data visi dan misi berdasarkan ID
  const query = "SELECT * FROM visimisi WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Gagal mendapatkan data visi dan misi:", err.message);
      return res
        .status(500)
        .json({ message: "Gagal mendapatkan data visi dan misi." });
    }

    // Mengembalikan data visi dan misi yang sesuai dengan ID dalam respons
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "Data visi dan misi tidak ditemukan." });
    }
    return res.status(200).json(result[0]);
  });
};

// Fungsi untuk menghapus data visi dan misi berdasarkan ID dari database
const deleteVisiMisiById = (req, res) => {
  const id = req.params.id;

  // Query untuk menghapus data visi dan misi berdasarkan ID
  const query = "DELETE FROM visimisi WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Gagal menghapus data visi dan misi:", err.message);
      return res
        .status(500)
        .json({ message: "Gagal menghapus data visi dan misi." });
    }

    // Mengembalikan respons berhasil jika data berhasil dihapus
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Data visi dan misi tidak ditemukan." });
    }
    return res
      .status(200)
      .json({ message: "Data visi dan misi berhasil dihapus." });
  });
};

// Fungsi untuk memperbarui data visi dan misi berdasarkan ID di database
const updateVisiMisiById = (req, res) => {
  const id = req.params.id;
  const { visi, misi } = req.body;

  // Query untuk memperbarui data visi dan misi berdasarkan ID
  const query = "UPDATE visimisi SET visi = ?, misi = ? WHERE id = ?";
  db.query(query, [visi, misi, id], (err, result) => {
    if (err) {
      console.error("Gagal memperbarui data visi dan misi:", err.message);
      return res
        .status(500)
        .json({ message: "Gagal memperbarui data visi dan misi." });
    }

    // Mengembalikan respons berhasil jika data berhasil diperbarui
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Data visi dan misi tidak ditemukan." });
    }
    return res
      .status(200)
      .json({ message: "Data visi dan misi berhasil diperbarui." });
  });
};

// Mengekspor fungsi-fungsi untuk digunakan di luar modul
module.exports = {
  tambahVisiMisi,
  getAllVisiMisi,
  getVisiMisiById,
  deleteVisiMisiById,
  updateVisiMisiById,
};

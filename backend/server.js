// Mengimpor modul eksternal yang dibutuhkan
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const moment = require("moment-timezone");
const sejarahRoutes = require("./routes/sejarahRoute");
const visimisRoutes = require("./routes/visimisiRoute");
const loginRoutes = require("./routes/loginRoute");
const pegawaiRoutes = require("./routes/pegawaiRoute");
const surat_tidak_mampRoute = require("./routes/surat_tidak_mampuRoute");
const surat_ket_domisili = require("./routes/surat_ket_domisiliRoutes");
const ucapanRoute = require("./routes/ucapanRoute");
const beritaRoute = require("./routes/beritaRoute");
const { Server } = require("socket.io");
const session = require("express-session");

// Membuat instance aplikasi Express
const app = express();

// Middleware untuk mengizinkan CORS dengan konfigurasi tertentu
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

// Menentukan port server
const port = 3040;

// Menggunakan middleware untuk parsing body dalam format JSON
app.use(bodyParser.json());

// Menggunakan express-session untuk manajemen sesi pengguna
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 100 * 60 * 60 * 24, // Maksimum umur sesi dalam milidetik
    },
  })
);

// Menggunakan middleware untuk parsing body dalam format URL-encoded
app.use(bodyParser.urlencoded({ extended: false }));

// Menyajikan file statis dari direktori 'public/images' dan 'public/uploads'
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/images", express.static(path.join(__dirname, "public/uploads")));

// Menetapkan zona waktu default menggunakan moment-timezone
moment.tz.setDefault("Asia/Jayapura");

// Middleware untuk menyesuaikan zona waktu berdasarkan header "Timezone" yang dikirimkan oleh klien
app.use((req, res, next) => {
  const clientTimezone = req.header("Timezone");

  if (clientTimezone) {
    moment.tz.setDefault(clientTimezone);
  }

  next();
});

// Menggunakan routing untuk setiap endpoint yang tersedia
app.use(surat_ket_domisili);
app.use(pegawaiRoutes);
app.use(sejarahRoutes);
app.use(visimisRoutes);
app.use(loginRoutes);
app.use(surat_tidak_mampRoute);
app.use(ucapanRoute);
app.use(beritaRoute);

// Membuat instance server Socket.IO pada port 3041
const io = new Server(3041, {
  cors: {
    origin: "*",
  },
});

// Menangani koneksi Socket.IO dari klien
io.on("connection", (socket) => {
  // Mengirim pesan sambutan saat klien terhubung
  socket.emit("welcome", "welcome to the channel");

  // Menangani peristiwa saat formulir dikirimkan
  socket.on("formSubmitted", (formData) => {
    // Mengirim notifikasi ke semua klien bahwa ada formulir baru masuk
    io.emit("newFormNotification", {
      message: "Ada formulir baru masuk",
      formData: formData,
    });
  });
});

// Menangani permintaan GET untuk '/dashboard' yang memeriksa keberadaan sesi pengguna
app.get("/dashboard", (req, res) => {
  if (req.session.email) {
    return res.json({ valid: true, email: req.session.email });
  } else {
    return res.json({ valid: false });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ error: "Error destroying session" });
    }
    res.clearCookie("token"); // Hapus cookie sesi
    return res.json({ Status: "Success" });
  });
});

// Memulai server pada port yang ditentukan
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});

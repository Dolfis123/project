import { BrowserRouter, Routes, Route } from "react-router-dom";
// Bagian Admin Start
import Dashboard from "./pages/admin/Dashboard";
import Profil from "./pages/admin/Profil";
import Pengumuman from "./pages/admin/Pengumuman";
import TambahPenduduk from "./pages/admin/TambahPenduduk";
import Location from "./pages/admin/Location";
import Sejarahvmedit from "./pages/admin/Sejarahvmedit";
import Tambahberita from "./pages/admin/Tambahberita";
import Penduduk from "./pages/admin/Penduduk";
import Setting from "./pages/admin/Setting";
import TambahLayanan from "./pages/admin/TambahLayanan";
import Login from "./pages/admin/Login";
import Editvisimisi from "./pages/admin/Editvisimisi";
import Berita from "./pages/admin/Berita";
import TambahPegawai from "./pages/admin/TambahPegawai";
import EditPegawai from "./pages/admin/EditPegawai";
import Beranda1 from "./pages/admin/Beranda1";
import EditUcapan from "./pages/admin/EditUcapan";

import Informasi from "./pages/public/Informasi";
import EditBerita from "./pages/admin/EditBerita";
import BeritaLihat from "./pages/admin/BeritaLihat";

// Bagian Admin End

// Test
import App1 from "./components/public/App1";
import TambahUcapan from "./pages/admin/TambahUcapan";
import SuratTidakMampuPermintaan from "./pages/admin/permintaan/SuratTidakMampuPermintaan";
import SuratDomisiliPermintaan from "./pages/admin/permintaan/SuratDomisiliPermintaan";
import SuratDomisiliArsip from "./pages/admin/arsip/SuratDomisiliArsip";
import DetailSuratDomisili from "./pages/admin/detailSurat/DetailSuratDomisili";
import Kontak from "./pages/public/Kontak";
import Beranda from "./pages//public/Beranda";
import Profil2 from "./pages/public/Profil2";
import Penduduk2 from "./pages/public/Penduduk2";
import Layanan2 from "./pages/public/Layanan2";
import BeritaDetail from "./pages/public/BeritaDetail";
// import Ber from "./pages/ber";
import Tesxt2 from "./pages/public/Tesxt2";
// Bagian Umum End
// UntuK test Start
import Test from "./components/public/laters/Test";
import Test2 from "./components/public/laters/Test2";
import DesailSuratTidakMampu from "./pages/admin/detailSurat/DesailSuratTidakMampu";
import SuratTidakMampuArsip from "./pages/admin/arsip/SuratTidakMampuArsip";
import FormatSuratTidakMampu from "./pages/admin/formats/FormatSuratTidakMampu";
import FormatSuratDomisili from "./pages/admin/formats/FormatSuratDomisili";
import PersyaratanSuratTidakMampu from "./pages/admin/Persyaratan/PersyaratanSuratTidakMampu";
import PersyaratanSuratDomisili from "./pages/admin/Persyaratan/PersyaratanSuratDomisili";
import Test1 from "./components/admin/laters/Test1";
import Test4 from "./pages/admin/Test4";
import React, { useEffect } from "react";
import BuktiSuratTidakMampu from "./pages/public/bukti/BuktiSuratTidakMampu";
import BuktiSuratDomisili from "./pages/public/bukti/BuktiSuratDomisili";
import { io } from "socket.io-client";
import MediaSosial from "./components/admin/MediaSosial";
const socket = io("http://localhost:3041");
import EditDomisili from "./pages/admin/editSurat/EditDomisili";
import EditTidakMampu from "./pages/admin/editSurat/EditTidakMampu";
import Test11 from "./pages/admin/latters/Test11";
import ConfirmasiDataDomisili from "./pages/admin/confirmasiData/ConfirmasiDataDomisili";
import ConfirmasiDataTidakMampu from "./pages/admin/confirmasiData/ConfirmasiDataTidakMampu";
function App() {
  useEffect(() => {
    socket.on("connect", () => {
      socket.on("welcome", (data) => {
        console.log("msg from server", data);
      });
      socket.emit("msg", "Thanks fro connecting!!");
    });
    return () => {
      socket.off("connect");
    };
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Bagian Pages Admin Start */}
          <Route path="/test" element={<Test />} />
          <Route path="/test11/:id" element={<Test11 />} />

          <Route path="/test5" element={<MediaSosial />} />
          <Route path="/test2/:id" element={<Test2 />} />
          <Route path="/edit-domisili/:hashed_id" element={<EditDomisili />} />
          <Route
            path="/edit-tidak-mampu/:hashed_id"
            element={<EditTidakMampu />}
          />

          <Route
            path="/persyaratan-surat-tidak-mampu/:hashed_id"
            element={<PersyaratanSuratTidakMampu />}
          />
          <Route
            path="/bukti-surat-tidak-mampu/:hashed_id"
            element={<BuktiSuratTidakMampu />}
          />
          <Route
            path="/bukti-surat-domisili/:hashed_id"
            element={<BuktiSuratDomisili />}
          />
          <Route
            path="/confir-data-domisili/:hashed_id"
            element={<ConfirmasiDataDomisili />}
          />
          <Route
            path="/confir-data-tidak-mampu/:hashed_id"
            element={<ConfirmasiDataTidakMampu />}
          />

          <Route
            path="/persyaratan-surat-ket-domisili/:hashed_id"
            element={<PersyaratanSuratDomisili />}
          />
          <Route path="test4" element={<Test4 />} />
          <Route path="/test1/:id" element={<Test1 />} />
          <Route
            path="/detail-surat-tidak-mampu/:id"
            element={<DesailSuratTidakMampu />}
          />
          <Route
            path="/detail-surat-domisili/:id"
            element={<DetailSuratDomisili />}
          />
          <Route
            path="/surat-tidak-mampu-arsip"
            element={<SuratTidakMampuArsip />}
          />
          <Route
            path="/format-surat-tidak-mampu/:id"
            element={<FormatSuratTidakMampu />}
          />
          <Route
            path="/format-surat-domisili/:id"
            element={<FormatSuratDomisili />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/text2" element={<Tesxt2 />} />
          <Route path="/beranda1" element={<Beranda1 />} />
          <Route path="/pengumuman" element={<Pengumuman />} />
          <Route path="/location" element={<Location />} />
          <Route path="/tambahpenduduk" element={<TambahPenduduk />} />
          <Route path="/penduduk" element={<Penduduk />} />
          <Route path="/tambahberita" element={<Tambahberita />} />
          <Route path="/sejarah/:id" element={<Sejarahvmedit />} />
          <Route path="/visi-misi/:id" element={<Editvisimisi />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/tambah-layanan" element={<TambahLayanan />} />
          <Route path="/tambahpegawai" element={<TambahPegawai />} />
          <Route path="/editpegawai/:id" element={<EditPegawai />} />
          <Route path="/editucapan/:id" element={<EditUcapan />} />
          <Route path="editberita/:id" element={<EditBerita />} />
          <Route path="/beritalihat/:id" element={<BeritaLihat />} />
          <Route path="/app1" element={<App1 />} />
          {/* Bagian Pages Admin End */}
          {/* -------------------------######------------------------------ */}
          {/* Bagian Pages Umum Start */}
          <Route path="/" element={<Beranda />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/profil12" element={<Profil2 />} />
          <Route path="/penduduk2" element={<Penduduk2 />} />
          <Route path="/layanan2" element={<Layanan2 />} />
          <Route path="/berita/:hashed_id" element={<BeritaDetail />} />
          <Route path="/informasi" element={<Informasi />} />
          {/* Untuk Test Start */}
          <Route path="/surat-tidak-mampu-pendidikan" />
          <Route path="/ucapan1" element={<TambahUcapan />} />
          <Route
            path="/permintaan-surat-tidak-mampu"
            element={<SuratTidakMampuPermintaan />}
          />
          <Route
            path="/permintaan-surat-domisili"
            element={<SuratDomisiliPermintaan />}
          />
          <Route
            path="/arsip-surat-domisili"
            element={<SuratDomisiliArsip />}
          />

          {/* Untuk Test End */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;

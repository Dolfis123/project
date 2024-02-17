import { useState } from "react";

import Footer from "../../components/public/Footer";
import Navbar2 from "../../components/public/Navbar2";
import SuratTidakMampuPendidikan from "../admin/latters/SuratTidakMampuPendidikan";
import SuratDomisili from "../admin/latters/SuratDomisili";
import "../../css/public/latters/surat-domisili.css";

function Layanan2() {
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceSelection = (event) => {
    setSelectedService(event.target.value);
  };

  // Berdasarkan layanan yang dipilih, tampilkan formulir yang sesuai
  const renderServiceForm = () => {
    if (selectedService === "surat_ket_tidak_mampu") {
      return <SuratTidakMampuPendidikan />;
    } else if (selectedService === "surat_ket_domisili") {
      return <SuratDomisili />;
    } else if (selectedService === "surat_nikah") {
      return (
        <div>
          <h3 className="text-center">Surat Nikah</h3>
        </div>
      );
    }
  };

  return (
    <div className="back">
      {/* Navbar Start */}
      <div className="container-fluid position-relative p-0">
        {/* Navbar */}
        <Navbar2 activeComponent="Layanan" />
        <div
          className="container-fluid bg-primary py-5 bg-header"
          style={{ marginBottom: "90px" }}
        >
          <div className="row py-5">
            <div className="col-12 pt-lg-5 mt-lg-5 text-center">
              <h2
                className="text-center mt-4 animated zoomIn"
                style={{
                  fontSize: "3rem",
                  color: "#F6F6F6",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Layanan
              </h2>
              <h3
                className="text-center mt-4  animated zoomIn"
                style={{ fontSize: "1.2rem", color: "#8BE8E5" }}
              >
                Di halaman ini kamu bisa membuat surat-surat secara online yang
                tersedia di sini
              </h3>
            </div>
          </div>
        </div>
      </div>
      {/* Navbar End */}

      <div className="container">
        <div className="card">
          <div className="card-body">
            {/* ...Kode lainnya... */}
            <h2>Daftar Layanan Online Yang Tersedia</h2>
            {/* Daftar layanan */}
            <br />
            <div>
              <h4>Pilih Layanan:</h4>
              <select value={selectedService} onChange={handleServiceSelection}>
                <option value="">Pilih Layanan</option>
                <option value="surat_ket_tidak_mampu">
                  Surat Ket Tidak Mampu
                </option>
                <option value="surat_ket_domisili">Surat Ket Domisili</option>
                {/* <option value="surat_tidak_mampu">Surat Tidak Mampu</option> */}
                <option value="surat_nikah">Surat Nikah</option>
                {/* Tambahkan layanan lain */}
              </select>
            </div>
            {/* Formulir sesuai dengan layanan yang dipilih */}
            {selectedService && renderServiceForm()}
            {/* ...Kode lainnya... */}
          </div>
          <br />
          <br />
        </div>
      </div>

      {/* Footer Start */}
      {/* <!-- Footer Start --> */}
      <Footer />
      {/* Footer End */}
    </div>
  );
}

export default Layanan2;

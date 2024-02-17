// src/Test.js
import React, { useState, useEffect } from "react";
import "../../../css/public/latters/SuratTidakMampu.css";
import { useParams, Link } from "react-router-dom";
import html2pdf from "html2pdf.js";

import axios from "axios";
function Test2() {
  const [skckData, setSKCKData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Ambil data SKCK berdasarkan ID saat komponen di-mount
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3040/lihat-surat-skck/${id}`
      );
      setSKCKData(response.data.data);
    } catch (error) {
      console.error("Error fetching SKCK data:", error);
    }
  };

  const generateSuratPDFK = async (skck) => {
    // Mendapatkan elemen HTML yang ingin Anda konversi
    const element = document.getElementById("my-content");

    // Mengonversi elemen HTML menjadi PDF
    const pdf = await html2pdf(element);

    // Menyimpan file PDF
    pdf.save(`data${data.id}.pdf`);
  };
  if (!skckData) {
    return <div>Loading...</div>; // Tampilkan pesan loading selama data diambil
  }

  return (
    <div>
      <div className="kopsurat" id="my-content">
        <table className="kop-surat">
          <tbody>
            <tr>
              <td>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Lambang_Kabupaten_Manokwari.png/524px-Lambang_Kabupaten_Manokwari.png"
                  style={{
                    width: "75px",
                    marginBottom: "20px",
                    marginLeft: "10px",
                  }}
                  alt="Logo Manokwari"
                />
              </td>
              <td className="tengah">
                <b className="font-kop">
                  <h4>PEMERINTAH KABUPATEN MANOKWARI</h4>
                  <h4>DISTRIK MANOKWARI BARAT</h4>
                  <h4>KELURAHAN AMBAN</h4>
                </b>
                <p style={{ marginRight: "30px", marginBottom: "0px" }}>
                  <span style={{ marginRight: "30px" }}>
                    JL Gunung Salju. Amban
                  </span>
                  <span>Kode : Pos 19314</span>
                </p>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="nomor">
          {/* Bagian setelah garis hitam */}
          <div className="h6-p-container">
            <h6 style={{ marginBottom: "0" }}>SURAT KETERANGAN TIDAK MAMPU</h6>
            <p className="border-line" style={{ marginBottom: "0" }}></p>
            <p>
              <span style={{ marginRight: "50px" }}>Nomor : 422.5 / </span>
              <span style={{ marginLeft: "50px" }}>/ 2023</span>
            </p>
          </div>
        </div>

        <p
          style={{
            marginLeft: "50px",
            marginBottom: "0",
            textTransform: "none",
          }}
        >
          Yang bertanda tangan dibawah ini, Kepala Kelurahan Amban Distrik
          Manokwari Barat
        </p>

        <p style={{ textTransform: "none" }}>Menerangkan bahwa :</p>

        <h6>
          <span style={{ marginLeft: "50px", textTransform: "none" }}>
            {" "}
            Nama{" "}
          </span>
          <span style={{ marginLeft: "160px", textTransform: "none" }}>
            {" "}
            : {skckData.nama}
          </span>
        </h6>

        <h6>
          <span style={{ marginLeft: "50px", textTransform: "none" }}>
            {" "}
            Tempat/Tanggal lahir{" "}
          </span>
          <span style={{ marginLeft: "42px", textTransform: "none" }}>
            {" "}
            : {skckData.tempat_tanggal_lahir}
          </span>
        </h6>

        <h6>
          <span style={{ marginLeft: "50px", textTransform: "none" }}>
            Jenis Kelamin{" "}
          </span>
          <span style={{ marginLeft: "105px" }}>
            {" "}
            : {skckData.jenis_kelamin}
          </span>
        </h6>

        <h6>
          <span style={{ marginLeft: "50px", textTransform: "none" }}>
            {" "}
            Agama{" "}
          </span>
          <span style={{ marginLeft: "150px" }}> : {skckData.agama}</span>
        </h6>

        <h6>
          <span style={{ marginLeft: "50px", textTransform: "none" }}>
            {" "}
            Pekerjaan{" "}
          </span>
          <span style={{ marginLeft: "130px" }}> : {skckData.pekerjaan}</span>
        </h6>

        <h6>
          <span style={{ marginLeft: "50px", textTransform: "none" }}>
            {" "}
            Alamat{" "}
          </span>
          <span style={{ marginLeft: "147px" }}> : {skckData.alamat}</span>
        </h6>

        <h6>
          <span style={{ marginLeft: "50px", textTransform: "none" }}>
            RT/RW{" "}
          </span>
          <span style={{ marginLeft: "147px" }}> : {skckData.rt_rw}</span>
        </h6>

        <p
          style={{
            marginLeft: "50px",
            marginBottom: "0",
            marginTop: "30px",
            textTransform: "none",
          }}
        >
          Dan sesuai pengamatan kami, nama yang terlampir di atas adalah
          benar-benar warga yang{" "}
        </p>

        <p style={{ marginBottom: "0", textTransform: "none" }}>
          <b> Tidak Mampu ( Ekonomi Lemah )</b> dan Berdomisili di Kelurahan
          Amban Distrik Manokwari Barat{" "}
        </p>

        <p style={{ marginBottom: "0", textTransform: "none" }}>
          Provinsi Papua Barat.
        </p>

        <p style={{ marginBottom: "0", textTransform: "none" }}>
          Untuk Keperluan : <b>Melengkapi Berkas Batuan Pendidikan</b>
        </p>

        <p style={{ marginBottom: "0", textTransform: "none" }}>
          Demikian surat keterangan ini, diberikan kepada yang bersangkutan
          untuk dapat dipergunakan{" "}
        </p>

        <p style={{ textTransform: "none" }}>sebagaimana mestinya.</p>

        <p
          style={{
            marginTop: "40px",
            marginLeft: "390px",
            textTransform: "none",
          }}
        >
          Manokwari, 18 Oktober 2023
        </p>

        <h6
          style={{
            marginLeft: "200px",
            textAlign: "center",
            textTransform: "none",
          }}
        >
          An. LURAH AMBAN
        </h6>

        <h6
          style={{
            marginLeft: "200px",
            textAlign: "center",
            textTransform: "none",
          }}
        >
          DISTRIK MANOKWARI BARAT
        </h6>

        <h6
          style={{
            marginLeft: "200px",
            textAlign: "center",
            textTransform: "none",
          }}
        >
          KASI PEMERINTAHAN
        </h6>

        <h6
          style={{
            marginTop: "50px",
            textAlign: "center",
            marginLeft: "200px",
            marginBottom: "0",
            textTransform: "none",
          }}
        >
          FREDERIK. C. AWOM
        </h6>

        <p className="border-bawa" style={{ marginBottom: "0" }}></p>

        <h6
          style={{
            textAlign: "center",
            marginLeft: "200px",
            marginBottom: "0",
            textTransform: "none",
          }}
        >
          NIP. 19690411 200701 1033
        </h6>
      </div>
      <button onClick={generateSuratPDFK}>Cetak</button>
    </div>
  );
}

export default Test2;

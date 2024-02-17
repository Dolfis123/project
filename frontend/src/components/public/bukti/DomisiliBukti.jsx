import React, { useEffect, useState } from "react";
import "../../../css/public/latters/SuratTidakMampu.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";

function DomisiliBukti() {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3040/lihat-surat-domisili/${id}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching SKCK data:", error);
    }
  };
  const generateSuratPDFK = async (skck) => {
    const element = document.getElementById("my-content");

    // Konfigurasi untuk format A4
    const options = {
      margin: 10,
      filename: `data${data.id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Mengonversi elemen HTML menjadi PDF dengan opsi konfigurasi
    const pdf = await html2pdf(element, options);

    // Menyimpan file PDF
    pdf.save();
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  return (
    <div>
      <div className="kopsurat" id="my-content">
        <table className="kop-surat">
          <tbody>
            <tr>
              <td
                style={{
                  width: "5px",
                }}
              >
                <img
                  src="/img/logo.jpg"
                  alt="logo"
                  style={{
                    width: "75px",
                    marginBottom: "20px",
                    marginLeft: "0px",
                  }}
                />
                <p
                  style={{
                    width: "152px",
                    textAlign: "left",
                    marginBottom: "0px",
                  }}
                >
                  <span className="test">JL Gunung Salju. Amban</span>
                </p>
              </td>
              <td
                className="tengah"
                style={{
                  marginRight: "150px",
                  marginLeft: "0px",
                }}
              >
                <b>
                  <h5 style={{ marginRight: "95px" }}>
                    PEMERINTAH KABUPATEN MANOKWARI
                  </h5>
                  <h5 style={{ marginRight: "100px" }}>
                    DISTRIK MANOKWARI BARAT
                  </h5>
                  <h5 style={{ marginRight: "100px" }}>KELURAHAN AMBAN</h5>
                </b>
                <p
                  style={{
                    padding: "0px",
                    textAlign: "right",
                    marginBottom: "0",
                    marginRight: "12px",
                  }}
                >
                  <span className="test">Kode : Pos 19314</span>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            border: "2px solid black",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <div className="nomor">
            {/* Bagian setelah garis hitam */}
            <div className="h6-p-container">
              <h6
                className="test"
                style={{
                  marginBottom: "0",
                  marginLeft: "60px",
                  fontFamily: "Times New Roman",
                }}
              >
                BUKTI PENDAFTARAN LAYANAN ONLINE
              </h6>
            </div>
          </div>
          <p className="test" style={{ marginBottom: "0" }}>
            Warga Yth,
          </p>
          <p className="test">
            Terima kasih telah mengunakan layanan kami data pendaftaran anda:
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "50px",
              fontFamily: "Times New Roman",
            }}
          >
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <span className="test" style={{ flex: "0 0 150px" }}>
                Tanggal
              </span>
              <span className="test">: {formatDate(data.tanggal)}</span>
            </div>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <span className="test" style={{ flex: "0 0 150px" }}>
                Nama
              </span>
              <span className="test">: {data.nama}</span>
            </div>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <span className="test" style={{ flex: "0 0 150px" }}>
                Keperluan
              </span>
              <span className="test">: {data.keperluan}</span>
            </div>
          </div>

          <div
            style={{
              fontFamily: "sans-serif",
              marginLeft: "60px",
              marginTop: "60px",
            }}
          >
            <h5>*Persyaratan</h5>
            <ol>
              <li className="test">Fotocopy KTP</li>
              <li className="test">Fotocopy Kartu Keluarga</li>
              <li className="test">Surat Pengantar dari RT/RW</li>
            </ol>
          </div>
          <br />
          <p className="test">
            *Silahkan download bukti pendaftaran ini, untuk di perlihatkan ke
            petugas kelurahan dan jagan lupa untuk membawa persyaratannya.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px", // Adjust the margin as needed
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            width: "135px", // Adjust the width as needed
            borderRadius: "5px",
          }}
          className="btn btn-primary"
          onClick={generateSuratPDFK}
        >
          <i className="material-icons" style={{ marginRight: "5px" }}>
            print
          </i>
          <span
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            Download
          </span>
        </button>
        <br />
        <br />
      </div>
    </div>
  );
}

export default DomisiliBukti;

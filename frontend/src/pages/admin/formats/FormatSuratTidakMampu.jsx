import React, { useEffect, useState } from "react";
import "../../../css/public/latters/SuratTidakMampu.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";

function FormatSuratTidakMampu() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3040/dashboard")
      .then((res) => {
        if (res.data.email) {
          setName(res.data.email);
        } else {
          navigate("/login");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3040/lihat-surat-tidak-mampu-admin/${id}`
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
      filename: `${data.nama} ${data.id}.pdf`,
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
              SURAT KETERANGAN TIDAK MAMPU
            </h6>
            <p className="border-line" style={{ marginBottom: "0" }}></p>
            <p>
              <span className="test" style={{ marginRight: "1px" }}>
                Nomor : 422.5 /{" "}
              </span>
              <span className="test" style={{ marginLeft: "50px" }}>
                / 2024
              </span>
            </p>
          </div>
        </div>
        <p className="test" style={{ marginLeft: "50px", marginBottom: "0" }}>
          Yang bertanda tangan dibawah ini, Kepala Kelurahan Amban Distrik
          Manokwari Barat
        </p>
        <p className="test">Menerangkan bahwa :</p>
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
              Nama
            </span>
            <span className="test">: {data.nama}</span>
          </div>
          <div style={{ display: "flex", marginBottom: "5px" }}>
            <span className="test" style={{ flex: "0 0 150px" }}>
              Tempat/Tanggal lahir
            </span>
            <span className="test">
              : {data.tempat_lahir}, {formatDate(data.tempat_tanggal_lahir)}
            </span>
          </div>
          <div style={{ display: "flex", marginBottom: "5px" }}>
            <span className="test" style={{ flex: "0 0 150px" }}>
              Jenis Kelamin
            </span>
            <span className="test">: {data.jenis_kelamin}</span>
          </div>
          <div style={{ display: "flex", marginBottom: "5px" }}>
            <span className="test" style={{ flex: "0 0 150px" }}>
              Agama{" "}
            </span>
            <span className="test">: {data.agama}</span>
          </div>
          <div style={{ display: "flex", marginBottom: "5px" }}>
            <span className="test" style={{ flex: "0 0 150px" }}>
              Pekerjaan{" "}
            </span>
            <span className="test">: {data.pekerjaan}</span>
          </div>
          <div style={{ display: "flex", marginBottom: "5px" }}>
            <span className="test" style={{ flex: "0 0 150px" }}>
              Alamat{" "}
            </span>
            <span className="test">: {data.alamat}</span>
          </div>
          <div style={{ display: "flex", marginBottom: "5px" }}>
            <span className="test" style={{ flex: "0 0 150px" }}>
              RT /RW
            </span>
            <span className="test">: {data.rt_rw}</span>
          </div>
        </div>
        <p
          style={{
            marginLeft: "50px",
            marginBottom: "0",
            marginTop: "30px",
            fontFamily: "Times New Roman",
          }}
          className="test"
        >
          Dan sesuai pengamatan kami, nama yang terlampir di atas adalah
          benar-benar warga yang{" "}
        </p>
        <p className="test" style={{ marginBottom: "0" }}>
          <b> Tidak Mampu ( Ekonomi Lemah )</b> dan Berdomisili di Kelurahan
          Amban Distrik Manokwari Barat{" "}
        </p>
        <p className="test" style={{ marginBottom: "0" }}>
          Provinsi Papua Barat.
        </p>
        <p className="test" style={{ marginBottom: "0" }}>
          Untuk Keperluan : <b>Melengkapi Berkas Batuan Pendidikan</b>
        </p>
        <p className="test" style={{ marginBottom: "0" }}>
          Demikian surat keterangan ini, diberikan kepada yang bersangkutan
          untuk dapat dipergunakan{" "}
        </p>
        <p className="test">sebagaimana mestinya.</p>
        <p
          className="test"
          style={{
            marginTop: "40px",
            marginLeft: "350px",
            fontFamily: "Times New Roman",
          }}
        >
          Manokwari, {formatDate(data.tanggal)}
        </p>
        <h6
          style={{
            marginLeft: "200px",
            textAlign: "center",
            fontFamily: "Times New Roman",
          }}
        >
          An. LURAH AMBAN
        </h6>
        <h6
          style={{
            marginLeft: "200px",
            textAlign: "center",
            fontFamily: "Times New Roman",
          }}
        >
          DISTRIK MANOKWARI BARAT
        </h6>
        <h6
          style={{
            marginLeft: "200px",
            textAlign: "center",
            fontFamily: "Times New Roman",
          }}
        >
          KASI PEMERINTAHAN
        </h6>
        <h6
          style={{
            marginTop: "70px",
            textAlign: "center",
            marginLeft: "200px",
            marginBottom: "0",
            fontFamily: "Times New Roman",
          }}
        >
          FREDERIK. C. AWOM
        </h6>
        <p className="border-bawa" style={{ marginBottom: "0" }}></p>
        <h6
          style={{
            textAlign: "center",
            marginLeft: "200px",
            fontFamily: "Times New Roman",
          }}
        >
          NIP. 19690411 200701 1033
        </h6>
      </div>
      <br />
      <br />
      <br />
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
            width: "180px", // Adjust the width as needed
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
            Download Surat
          </span>
        </button>
      </div>
      <br />
      <br />
    </div>
  );
}

export default FormatSuratTidakMampu;

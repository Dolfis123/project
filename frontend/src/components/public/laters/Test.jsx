import React from "react";
import "../../../css/public/latters/SuratTidakMampu.css";

function Test() {
  return (
    <div className="kopsurat">
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
              <b>
                <h5>PEMERINTAH KABUPATEN MANOKWARI</h5>
                <h5>DISTRIK MANOKWARI BARAT</h5>
                <h5>KELURAHAN AMBAN</h5>
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
      <p style={{ marginLeft: "50px", marginBottom: "0" }}>
        Yang bertanda tangan dibawah ini, Kepala Kelurahan Amban Distrik
        Manokwari Barat
      </p>
      <p>Menerangkan bahwa :</p>
      <h6>
        <span style={{ marginLeft: "50px" }}> Nama </span>
        <span style={{ marginLeft: "160px" }}> : HERMANUS WARMETAN</span>
      </h6>
      <h6>
        <span style={{ marginLeft: "50px" }}> Tempat/Tanggal lahir </span>
        <span style={{ marginLeft: "42px" }}> : SERUI, 23 JANUARI 1978</span>
      </h6>{" "}
      <h6>
        <span style={{ marginLeft: "50px" }}>Jenis Kelamin </span>
        <span style={{ marginLeft: "105px" }}> : LAKI-LAKI</span>
      </h6>{" "}
      <h6>
        <span style={{ marginLeft: "50px" }}> Agama </span>
        <span style={{ marginLeft: "150px" }}> : KRISTEN PROTESTAN</span>
      </h6>{" "}
      <h6>
        <span style={{ marginLeft: "50px" }}> Pekerjaan </span>
        <span style={{ marginLeft: "130px" }}>
          {" "}
          : PEGAWAI NEGERI SIPIL ( PNS ) UNIPA
        </span>
      </h6>
      <h6>
        <span style={{ marginLeft: "50px" }}> Alamat </span>
        <span style={{ marginLeft: "147px" }}> : JLN. GUNUNG SALJU AMBAN</span>
      </h6>
      <h6>
        <span style={{ marginLeft: "50px" }}>RT/RW </span>
        <span style={{ marginLeft: "147px" }}> : 001 / 002</span>
      </h6>
      <p style={{ marginLeft: "50px", marginBottom: "0", marginTop: "30px" }}>
        Dan sesuai pengamatan kami, nama yang terlampir di atas adalah
        benar-benar warga yang{" "}
      </p>
      <p style={{ marginBottom: "0" }}>
        <b> Tidak Mampu ( Ekonomi Lemah )</b> dan Berdomisili di Kelurahan Amban
        Distrik Manokwari Barat{" "}
      </p>
      <p style={{ marginBottom: "0" }}>Provinsi Papua Barat.</p>
      <p style={{ marginBottom: "0" }}>
        Untuk Keperluan : <b>Melengkapi Berkas Batuan Pendidikan</b>
      </p>
      <p style={{ marginBottom: "0" }}>
        Demikian surat keterangan ini, diberikan kepada yang bersangkutan untuk
        dapat dipergunakan{" "}
      </p>
      <p>sebagaimana mestinya.</p>
      <p style={{ marginTop: "40px", marginLeft: "390px" }}>
        Manokwari, 18 Oktober 2023
      </p>
      <h6 style={{ marginLeft: "200px", textAlign: "center" }}>
        An. LURAH AMBAN
      </h6>
      <h6 style={{ marginLeft: "200px", textAlign: "center" }}>
        DISTRIK MANOKWARI BARAT
      </h6>
      <h6 style={{ marginLeft: "200px", textAlign: "center" }}>
        KASI PEMERINTAHAN
      </h6>
      <h6
        style={{
          marginTop: "50px",
          textAlign: "center",
          marginLeft: "200px",
          marginBottom: "0",
        }}
      >
        FREDERIK. C. AWOM
      </h6>
      <p className="border-bawa" style={{ marginBottom: "0" }}></p>
      <h6
        style={{ textAlign: "center", marginLeft: "200px", marginBottom: "0" }}
      >
        NIP. 19690411 200701 1033
      </h6>
    </div>
  );
}

export default Test;

import React, { useEffect, useState } from "react";
import "../../../css/public/latters/SuratTidakMampu.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function ConfirmasiDataDomisili() {
  const [data, setData] = useState(null);
  const { hashed_id } = useParams(); // Menggunakan hashed_id sebagai parameter

  useEffect(() => {
    fetchData();
  }, [hashed_id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3040/lihat-surat-domisili/${hashed_id}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching SKCK data:", error);
    }
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
      <div className="container">
        <div className="card">
          <div className="card-header text-center">
            <h3 style={{ color: "#3468C0" }}>DETAIL BIODATA DIRI DOMISILI</h3>
          </div>
          <br />
          <br />
          <div className="card-body">
            <p>
              Mohon Untuk Periksa Kembali Biodata yang Telah di isi Sebelum
              Mengirim Ke admin.
            </p>
            {/* <div style={{ display: "flex", marginBottom: "5px" }}>
              <span style={{ flex: "0 0 150px" }}>No Pendaftaran</span>
              <span>: {data.nomor_surat}</span>
            </div> */}
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <span style={{ flex: "0 0 150px" }}>Nama</span>
              <span>: {data.nama}</span>
            </div>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <span style={{ flex: "0 0 150px" }}>KTP</span>
              <span>: {data.ktp}</span>
            </div>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <span style={{ flex: "0 0 150px" }}>Tempat Lahir</span>
              <span>: {data.tempat_lahir}</span>
            </div>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <span style={{ flex: "0 0 150px" }}>Tanggal lahir </span>
              <span>: {formatDate(data.ttl)}</span>
            </div>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <span style={{ flex: "0 0 150px" }}>Jenis Kelamin </span>
              <span>: {data.jk}</span>
            </div>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <span style={{ flex: "0 0 150px" }}>Agama </span>
              <span>: {data.agama}</span>
            </div>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <span style={{ flex: "0 0 150px" }}>Pekerjaan </span>
              <span>: {data.pekerjaan}</span>
            </div>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <span style={{ flex: "0 0 150px" }}>Keperluan</span>
              <span>: {data.keperluan}</span>
            </div>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <span style={{ flex: "0 0 150px" }}>Alamat </span>
              <span>: {data.alamat}</span>
            </div>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <span style={{ flex: "0 0 150px" }}>RT /RW</span>
              <span>: {data.rt_rw}</span>
            </div>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <span style={{ flex: "0 0 150px" }}>No Telepon</span>
              <span>: {data.no_telepon}</span>
            </div>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <span style={{ flex: "0 0 150px" }}>Email</span>
              <span>: {data.email}</span>
            </div>

            <div style={{ display: "flex", marginBottom: "5px" }}>
              <span style={{ flex: "0 0 150px" }}>Tanggal</span>
              <span>: {new Date(data.tanggal).toLocaleDateString()}</span>
            </div>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <span style={{ flex: "0 0 150px" }}>KTP Image</span>
              <div style={{ float: "right", maxWidth: "400px" }}>
                {data.ktp_image && (
                  <img
                    src={`http://localhost:3040/images/${data.ktp_image}`}
                    className="img-thumbnail"
                    alt={data.nama}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <Link
          style={{ marginLeft: "50px" }}
          to={`/edit-domisili/${data.hashed_id}`}
        >
          <button className="btn btn-success text-white">Edit</button>
        </Link>
        <Link
          style={{ marginLeft: "100px" }}
          to={`/bukti-surat-domisili/${data.hashed_id}`}
        >
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Link>
      </div>

      <br />

      <br />
    </div>
  );
}

export default ConfirmasiDataDomisili;

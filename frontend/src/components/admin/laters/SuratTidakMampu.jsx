// Permintaan.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../css/public/layanan2.css";
import Footer from "../../../components/admin/Footer";
import Navbar from "../../../components/admin/Navbar";
import Topnavbar from "../../../components/admin/Topnavbar";
import { Link } from "react-router-dom";

function SuratTidakMampu() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Ambil data dari server saat komponen di-mount
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3040/lihat-semua-skck"
      );
      setData(response.data.skckData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleViewClick = (id) => {
    // Lakukan aksi "lihat" sesuai kebutuhan, misalnya, navigasi ke halaman detail
    console.log("Lihat data dengan ID:", id);
  };

  // const handleDeleteClick = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:3040/hapus-surat-skck/${id}`);
  //     console.log("SKCK dengan ID", id, "berhasil dihapus.");
  //     fetchData(); // Refresh data setelah penghapusan
  //   } catch (error) {
  //     console.error("Error deleting SKCK:", error);
  //   }
  // };
  return (
    <div className="wrapper">
      <div className="body-overlay" />

      {/* Sidebar */}
      <Navbar activeComponent={"Dashboard"} />
      <div id="content">
        {/*  */}
        <Topnavbar />
        <div>
          <br />
          <h3
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Permintaan Surat Tidak Mampu
          </h3>
          <br />
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">Nama</th>
                <th scope="col">JK</th>
                <th scope="col">TTL</th>
                <th scope="col">RT/RW</th>
                <th scope="col">AKsi</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              {data.map((skck) => (
                <tr key={skck.id}>
                  <td>{skck.nama}</td>
                  <td>{skck.jenis_kelamin}</td>
                  <td>{skck.tempat_tanggal_lahir}</td>
                  <td>{skck.rt_rw}</td>

                  {/* Tambahkan sel-sel tabel lain sesuai kebutuhan */}
                  <td>
                    <Link to={`/li/${skck.id}`}>
                      <button onClick={() => handleViewClick(skck.id)}>
                        Lihat
                      </button>
                    </Link>
                    {/* <button onClick={() => handleDeleteClick(skck.id)}>
                      Hapus
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default SuratTidakMampu;

// Permintaan.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../css/public/layanan2.css";
import Footer from "../../../components/admin/Footer";
import Navbar from "../../../components/admin/Navbar";
import Topnavbar from "../../../components/admin/Topnavbar";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";

function SuratTidakMampuPermintaan() {
  const [data, setData] = useState([]);
  const [selectSurat, setSelectSurat] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State untuk menyimpan nilai pencarian

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
    // Ambil data dari server saat komponen di-mount
    fetchData();
  }, []);
  useEffect(() => {
    // Ambil data dari server saat komponen di-mount
    fetchData();
  }, [searchTerm]); // Panggil ulang fetchData ketika nilai searchTerm berubah

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3040/lihat-surat-menunggu"
      );
      setData(response.data.skckData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const showDeleteConfirmation = (data) => {
    setSelectSurat(data);
    setShowDeleteModal(true);
  };

  const handleViewClick = (id) => {
    // Lakukan aksi "lihat" sesuai kebutuhan, misalnya, navigasi ke halaman detail
    console.log("Lihat data dengan ID:", id);
  };
  const handleFormSubmit = async () => {
    // ... (kode lainnya)

    // Emit event Socket.io ketika formulir baru disubmit
    const socket = io("http://localhost:3040");
    socket.emit("formSubmitted", {
      no_telepon: nomor,
      email: email,
      keperluan: keperluan,
    });
  };
  const handleDeleteClick = () => {
    if (selectSurat) {
      const id = selectSurat.id;
      axios
        .delete(`http://localhost:3040/hapus-surat-skck/${id}`)
        .then((res) => {
          console.log("Data berhasil dihapus");
          setShowDeleteModal(false);
          window.location.reload(true);
        })
        .catch((err) => console.log(err));
    }
  };
  const filteredData = data.filter(
    (skck) =>
      skck.nomor_surat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skck.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            Permintaan
          </h3>
          <br />
          <input
            type="text"
            placeholder="Cari nomor surat"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Gambar</th>
                <th scope="col">No Pendafatran</th>
                <th scope="col">Nama</th>
                <th scope="col">Tanggal</th>
                <th scope="col">Jenis Surat</th>

                <th scope="col">RT/RW</th>
                <th scope="col">AKsi</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {filteredData
                .slice()
                .reverse()
                .map((skck, item) => (
                  <tr key={skck.id}>
                    <td>{item + 1}</td>
                    <td>
                      {skck.ktp_image && (
                        <img
                          src={`http://localhost:3040/images/${skck.ktp_image}`}
                          alt={skck.nama}
                          className="img-thumbnail bg-informasi"
                          style={{ maxWidth: "100px" }}
                        />
                      )}
                    </td>
                    <td>{skck.nomor_surat}</td>
                    <td>{skck.nama}</td>
                    <td>{new Date(skck.tanggal).toLocaleDateString()}</td>
                    <td>{skck.surat_tidak_mampu}</td>
                    <td>{skck.rt_rw}</td>
                    <td>
                      <Link
                        to={`/detail-surat-tidak-mampu/${skck.id}`}
                        className="btn btn-primary"
                        onClick={() => handleDeleteClick(skck.id)}
                      >
                        <FaEye />
                      </Link>
                      <button
                        onClick={() => showDeleteConfirmation(skck)}
                        className="btn btn-danger"
                      >
                        <FaTrash />
                      </button>
                      <Modal
                        show={showDeleteModal}
                        onHide={() => setShowDeleteModal(false)}
                        backdropClassName="custom-backdrop"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Konfirmasi Hapus Surat</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          Apakah Anda yakin ingin menghapus surat ini?
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={() => setShowDeleteModal(false)}
                          >
                            Batal
                          </Button>
                          <Button variant="danger" onClick={handleDeleteClick}>
                            Hapus
                          </Button>
                        </Modal.Footer>
                      </Modal>
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

export default SuratTidakMampuPermintaan;

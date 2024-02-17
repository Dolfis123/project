import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../css/public/layanan2.css";
import Footer from "../../../components/admin/Footer";
import Navbar from "../../../components/admin/Navbar";
import Topnavbar from "../../../components/admin/Topnavbar";
import Test3 from "../../../components/admin/laters/Test3";
import "../../../css/public/latters/SuratTidakMampu.css";
import { FaPlus, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function SuratTidakMampuArsip() {
  const [data, setData] = useState([]);
  const [selectSurat, setSelectSurat] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3040/lihat-surat-diterima"
      );
      console.log("Berhasil");
      setData(response.data.skckData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleCetakClick = (skckId) => {
    // Redirect atau tampilkan halaman cetak
    // Sesuaikan path sesuai struktur proyek Anda
    window.location.href = `/format-surat-tidak-mampu/${skckId}`;
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

  const showDeleteConfirmation = (data) => {
    setSelectSurat(data);
    setShowDeleteModal(true);
  };

  return (
    <div className="wrapper" id="my-content">
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
            Arsip
          </h3>
          <br />
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Gambar</th>
                <th scope="col">Tanggal</th>
                <th scope="col">Nama</th>
                <th scope="col">Jenis Surat</th>
                <th scope="col">Alamat</th>
                <th scope="col">Pekerjaan</th>
                <th scope="col">RT/RW</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {data
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
                    <td>{new Date(skck.tanggal).toLocaleDateString()}</td>
                    <td>{skck.nama}</td>
                    <td>{skck.surat_tidak_mampu}</td>
                    <td>{skck.alamat}</td>
                    <td>{skck.pekerjaan}</td>
                    <td>{skck.rt_rw}</td>

                    {/* Tambahkan sel-sel tabel lain sesuai kebutuhan */}
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleCetakClick(skck.id)}
                      >
                        <FaEye />
                      </button>

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

export default SuratTidakMampuArsip;

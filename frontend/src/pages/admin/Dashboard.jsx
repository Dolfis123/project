import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Navbar from "../../components/admin/Navbar";
import Topnavbar from "../../components/admin/Topnavbar";
import Footer from "../../components/admin/Footer";
import { Modal, Button } from "react-bootstrap";

function Dashboard() {
  const [pegawai, setPegawai] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const [selectedPegawai, setSelectedPagawai] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [name, setName] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3040/dashboard")
      .then((res) => {
        if (res.data.email) {
          // setName(res.data.email);
        } else {
          navigate("/login");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    // Cek status login pengguna di penyimpanan lokal
    const status = localStorage.getItem("isLoggedIn");
    if (status === "true") {
      setIsLoggedIn(true);
      setShowWelcomeModal(true); // Display the modal only on initial login
    }
    // Bersihkan penyimpanan lokal setelah mengambil status
    localStorage.removeItem("isLoggedIn");
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3040/pegawai")
      .then((res) => {
        if (res.data.Status === "Success") {
          setPegawai(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const showDeleteConfirmation = (pegawai) => {
    setSelectedPagawai(pegawai);
    setShowDeleteModal(true);
  };
  const handleDelete = () => {
    if (selectedPegawai) {
      const id = selectedPegawai.id;
      axios
        .delete(`http://localhost:3040/delete/${id}`)
        .then((res) => {
          if (res.data.Status === "Success") {
            window.location.reload(true);
          } else {
            alert("Error");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
  };
  return (
    <div className="wrapper">
      <div className="body-overlay" />

      {/* Sidebar */}
      <Navbar activeComponent={"Dashboard"} />
      <div id="content">
        {/*  */}
        <Topnavbar />
        <div className="main-content">
          {showWelcomeModal && (
            <div>
              {/* Vertically centered modal for welcome message */}
              <Modal
                show={showWelcomeModal}
                onHide={handleCloseWelcomeModal}
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>
                    <b>Welcome</b>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* Isi modal */}
                  <h4>Selamat Datang di Administrator </h4>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={handleCloseWelcomeModal}>
                    Ok
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          )}
        </div>

        <div className="main-content">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card card-stats">
                <div className="card-header">
                  <div className="icon icon-warning">
                    <span className="material-icons">family_restroom</span>
                  </div>
                </div>
                <div className="card-content text-center pb-2">
                  <p className="category">
                    <strong>Jumlah Keluarga</strong>
                  </p>
                </div>
                <div className="card-footer text-center pb-2">
                  <h5>Total : </h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card card-stats">
                <div className="card-header">
                  <div className="icon icon-rose">
                    <span className="material-icons">groups</span>
                  </div>
                </div>
                <div className="card-content text-center pb-2">
                  <p className="category">
                    <strong>Jumlah Penduduk</strong>
                  </p>
                </div>
                <div className="card-footer text-center pb-2">
                  <h5>Total : </h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card card-stats">
                <div className="card-header">
                  <div className="icon icon-success">
                    <span className="material-icons">man</span>
                  </div>
                </div>
                <div className="card-content text-center pb-2">
                  <p className="category">
                    <strong>Jumlah Laki-Laki</strong>
                  </p>
                </div>
                <div className="card-footer text-center pb-2">
                  <h5>Total : </h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card card-stats">
                <div className="card-header">
                  <div className="icon icon-info">
                    <span className="material-icons"> woman </span>
                  </div>
                </div>
                <div className="card-content text-center pb-2">
                  <p className="category">
                    <strong>Jumlah Perempuan</strong>
                  </p>
                </div>
                <div className="card-footer text-center pb-2">
                  <h5>Total : </h5>
                </div>
              </div>
            </div>
          </div>
          <br />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Chart
              type="pie"
              width={400}
              height={350}
              series={[28, 38]}
              options={{
                labels: ["Laki-Laki", "Perempuan"],
              }}
            />
            <Chart
              type="pie"
              width={400}
              height={350}
              series={[50, 35, 25]}
              options={{
                labels: ["SD", "SMP", "Mahasiswa"],
              }}
            />
          </div>

          <br />
          <div className="px-2 py-2">
            <div className="d-flex justify-content-center mt-2 ">
              <h3>
                <span className="bg-white">
                  <u>Daftar Pegawai Lurah Amban</u>
                </span>
              </h3>
            </div>
            <div>
              <span>
                <Link
                  to="/tambahpegawai"
                  className="btn btn-sm"
                  style={{
                    backgroundColor: "#185ADB",
                    fontSize: "21px",
                    color: "#ffffff",
                    border: "4px solid",
                    padding: "5px 25px",
                    borderRadius: "25px",
                    marginTop: "20px",
                  }}
                >
                  <FaPlus style={{ marginRight: "5px", marginBottom: "5px" }} />
                  Tambah
                </Link>
              </span>
            </div>
            <div className="mt-3 align-items-center bg-white">
              <table className="table text-bg-black">
                <thead>
                  <tr>
                    <th style={{ color: "#000000" }}>
                      <b>Jabatan</b>
                    </th>
                    <th style={{ color: "#000000" }}>
                      <b>Nama</b>
                    </th>
                    <th style={{ color: "#000000" }}>
                      <b>NIP</b>
                    </th>
                    <th style={{ color: "#000000" }}>
                      <b>Image</b>
                    </th>
                    <th style={{ color: "#000000" }}>
                      <b>Aksi</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pegawai.map((item, index) => {
                    return (
                      <tr key={index}>
                        {/* <td style={{ color: "#000000" }}>{item.id}</td> */}
                        <td style={{ color: "#000000" }}>{item.jabatan}</td>

                        <td style={{ color: "#000000" }}>{item.nama}</td>
                        <td style={{ color: "#000000" }}>{item.nip}</td>

                        <td>
                          {
                            <img
                              src={`http://localhost:3040/images/${item.image}`}
                              alt=""
                              className="empImg rounded-circle"
                              style={{ width: "55px", height: "60px" }}
                            />
                          }
                        </td>
                        <td>
                          <Link
                            to={`/editpegawai/` + item.id}
                            className="btn btn-sm m-2 btn-primary"
                            style={{}}
                          >
                            <FaEye />
                          </Link>
                          <Link
                            to={`/editpegawai/` + item.id}
                            className="btn btn-success btn-sm m-2"
                          >
                            <FaEdit />
                          </Link>
                          <Modal
                            show={showDeleteModal}
                            onHide={() => setShowDeleteModal(false)}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>
                                Konfirmasi Hapus Pegawai
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              Apakah Anda yakin ingin menghapus Pegawai ini?
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={() => setShowDeleteModal(false)}
                              >
                                Batal
                              </Button>
                              <Button variant="danger" onClick={handleDelete}>
                                Hapus
                              </Button>
                            </Modal.Footer>
                          </Modal>
                          <button
                            onClick={() => showDeleteConfirmation(item)}
                            className="btn btn-danger"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
export default Dashboard;

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { FaPlus, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Navbar from "../../components/admin/Navbar";
import Topnavbar from "../../components/admin/Topnavbar";
import Footer from "../../components/admin/Footer";
import { Modal, Button } from "react-bootstrap";
import "../../css/admin/berita.css";
function Berita() {
  const [berita, setBerita] = useState([]);
  const [selectedBerita, setSelectedBerita] = useState(null);
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
    axios
      .get("http://localhost:3040/news")
      .then((response) => {
        // Mengurutkan berita berdasarkan tanggal publikasi secara descending (terbaru dulu)
        const sortedBerita = [...response.data].sort((a, b) => {
          const dateA = new Date(b.publication_date);
          const dateB = new Date(a.publication_date);
          return dateB - dateA;
        });

        setBerita(sortedBerita);
        console.log(sortedBerita);
      })
      .catch((error) => {
        console.error("Error fetching news data:", error);
      });
  }, []);
  const showDeleteConfirmation = (berita) => {
    setSelectedBerita(berita);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (selectedBerita) {
      const id = selectedBerita.news_id;
      axios
        .delete(`http://localhost:3040/news/${id}`)
        .then((res) => {
          if (res.data.message === "Berita berhasil dihapus") {
            console.log("Data berhasil dihapus");
            setShowDeleteModal(false);
            window.location.reload(true);
          } else {
            alert("Error");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  return (
    //
    <div className="wrapper">
      <div className="body-overlay" />
      {/* Sidebar */}
      <Navbar activeComponent={"Berita"} />
      <div id="content">
        <Topnavbar />
        {/* Content Beranda Start*/}
        <div style={{ margin: "20px" }}>
          <Card>
            <Card.Body>
              <div
                className="container-fluid position-relative p-0"
                style={{ margin: "20px" }}
              >
                <h2>Berita/Informasi</h2>
                <div>
                  <span className="material-symbols-outlined">
                    <Link
                      to="/tambahberita"
                      className="btn btn-sm"
                      style={{
                        backgroundColor: "#185ADB",
                        fontSize: "17px",
                        color: "#ffffff",
                        border: "4px solid",
                        padding: "5px 25px",
                        borderRadius: "25px",
                        marginTop: "20px",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center", // Mengatur teks dan ikon secara vertikal
                      }}
                    >
                      <FaPlus style={{ marginRight: "10px" }} /> Tambah
                    </Link>
                  </span>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <b>Gambar</b>
                      </th>
                      <th>
                        <b>Judul Berita/Informasi</b>
                      </th>
                      <th>
                        <b>Tanggal Publikasi</b>
                      </th>
                      <th>
                        <b>Sumber Berita/Informasi</b>
                      </th>
                      <th>
                        <b>Kategori Berita/Informasi</b>
                      </th>
                      <th>
                        <b>Aksi</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {berita
                      .slice() // Buat salinan array untuk menghindari perubahan mutasi
                      .reverse() // Balik urutan item
                      .map((item, index) => (
                        <tr key={index}>
                          <td>
                            {item.news_image && (
                              <img
                                src={`http://localhost:3040/images/${item.news_image}`}
                                alt={item.news_title}
                                className="img-thumbnail bg-informasi"
                                style={{ maxWidth: "100px" }}
                              />
                            )}
                          </td>
                          <td>{item.news_title}</td>
                          <td>{formatDate(item.publication_date)}</td>
                          <td>{item.news_source}</td>
                          <td>{item.category}</td>
                          <td>
                            <Link
                              to={`/beritalihat/${item.news_id}`}
                              className="btn btn-primary"
                            >
                              <FaEye />
                            </Link>
                            <Link
                              to={`/editberita/${item.news_id}`}
                              className="btn btn-success"
                            >
                              <FaEdit />
                            </Link>
                            <button
                              onClick={() => showDeleteConfirmation(item)}
                              className="btn btn-danger"
                            >
                              <FaTrash />
                            </button>

                            {/* Modal for delete confirmation */}
                            <Modal
                              show={showDeleteModal}
                              onHide={() => setShowDeleteModal(false)}
                              backdropClassName="custom-backdrop"
                            >
                              <Modal.Header closeButton>
                                <Modal.Title>
                                  Konfirmasi Hapus Berita
                                </Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                Apakah Anda yakin ingin menghapus berita ini?
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
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </div>
        <br />
        <br />
        <Footer />
      </div>
    </div>
  );
}
export default Berita;

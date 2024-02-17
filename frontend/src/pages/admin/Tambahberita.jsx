import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Card } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import Navbar from "../../components/admin/Navbar";
import Footer from "../../components/admin/Footer";
import Topnavbar from "../../components/admin/Topnavbar";

function TambahBerita() {
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
  const [formData, setFormData] = useState({
    news_title: "",
    news_content: "",
    publication_date: "",
    news_source: "",
    category: "",
    news_image: null, // Menggunakan null untuk menginisialisasi file gambar
    publication_status: "Published",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0]; // Mengambil file gambar yang dipilih
    setFormData({
      ...formData,
      news_image: imageFile, // Menyimpan file gambar dalam state
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi form sebelum mengirim data
    if (
      !formData.news_title ||
      !formData.news_content ||
      !formData.publication_date ||
      !formData.news_source ||
      !formData.category ||
      !formData.news_image
    ) {
      alert("Mohon lengkapi semua field sebelum mengirimkan form.");
      return;
    }

    const formDataToSend = new FormData();
    // Menambahkan data lain ke FormData
    formDataToSend.append("news_title", formData.news_title);
    formDataToSend.append("news_content", formData.news_content);
    formDataToSend.append("publication_date", formData.publication_date);
    formDataToSend.append("news_source", formData.news_source);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("publication_status", formData.publication_status);
    formDataToSend.append("hashed_id", formData.hashed_id); // Menambahkan file gambar ke FormData

    formDataToSend.append("news_image", formData.news_image); // Menambahkan file gambar ke FormData

    axios
      .post("http://localhost:3040/news", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Berita berhasil ditambahkan:", response.data);
        navigate("/berita");
      })
      .catch((error) => {
        console.error("Gagal menambahkan berita:", error);
      });
  };
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"], // Tambahkan opsi bold, italic, underline, strike
      [{ color: [] }, { background: [] }], // Tambahkan opsi warna teks dan latar belakang
      [{ align: [] }],
      ["link", "image", "video"], // Tambahkan opsi link, image, dan video
      ["clean"],
      ["blockquote"], // Tambahkan opsi blockquote
      [{ script: "sub" }, { script: "super" }], // Tambahkan opsi subscript dan superscript
      [{ indent: "-1" }, { indent: "+1" }], // Tambahkan opsi indentasi
      [{ size: ["small", false, "large", "huge"] }], // Tambahkan opsi ukuran font
      ["code-block"], // Tambahkan opsi code block
    ],
  };

  return (
    <div className="wrapper">
      <div className="body-overlay" />
      {/* Sidebar */}
      <Navbar />
      <div id="content">
        <Topnavbar />
        {/* <Topna */}
        <div style={{ margin: "20px" }}>
          <Card>
            <Card.Body>
              <div style={{ margin: "50px" }}>
                <h2>Tambah Berita/Informasi Baru</h2>
                <br />
                <br />
                <form onSubmit={handleSubmit}>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <label>
                            <b>Judul Berita/Informasi:</b>
                          </label>
                        </td>
                        <td>
                          <input
                            type="text"
                            name="news_title"
                            value={formData.news_title}
                            onChange={handleChange}
                            placeholder="Tambahkan judul berita..."
                            style={{ width: "100%", height: "60px" }}
                          />
                        </td>
                      </tr>
                      <br />
                      <tr>
                        <td>
                          <label>
                            <b>Konten Berita/Informasi:</b>
                          </label>
                        </td>
                        <td>
                          <ReactQuill
                            name="news_content"
                            value={formData.news_content}
                            onChange={(value) =>
                              handleChange({
                                target: { name: "news_content", value },
                              })
                            }
                            modules={modules} // Tambahkan modules toolbar di sini
                            style={{ width: "100%", height: "400px" }}
                          />
                        </td>
                      </tr>
                      <br />
                      <br />
                      <br />
                      <tr>
                        <td>
                          <label>
                            <b>Tanggal Publikasi:</b>
                          </label>
                        </td>
                        <td>
                          <input
                            type="date"
                            name="publication_date"
                            value={formData.publication_date}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", height: "35px" }}
                          />
                        </td>
                      </tr>
                      <br />
                      <tr>
                        <td>
                          <label>
                            <b>Sumber Berita/Informasi:</b>
                          </label>
                        </td>
                        <td>
                          <input
                            type="text"
                            name="news_source"
                            value={formData.news_source}
                            onChange={handleChange}
                            style={{ width: "100%", height: "35px" }}
                          />
                        </td>
                      </tr>
                      <br />
                      <tr>
                        <td>
                          <label>
                            <b>Kategori Berita/Informasi:</b>
                          </label>
                        </td>
                        <td>
                          <select
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", height: "35px" }}
                          >
                            <option value="" />
                            <option value="berita">berita</option>
                            <option value="pengumuman">Pengumuman</option>
                            <option value="pelayanan publik">
                              Pelayanan Publik
                            </option>
                            <option value="Kegiatan Kelurahan">
                              Kegiatan Kelurahan
                            </option>
                            <option value="acara dan kegiatan">
                              Acara dan Kegiatan
                            </option>
                            <option value="pendidikan">pendidikan</option>
                            <option value="olahraga">Olahraga</option>
                          </select>
                        </td>
                      </tr>
                      <br />
                      <tr>
                        <td>
                          <label>
                            <b>Gambar Berita/Informasi:</b>
                          </label>
                        </td>
                        <td>
                          <input
                            type="file"
                            name="news_image"
                            onChange={handleImageChange}
                            accept="image/*"
                            style={{ width: "100%", height: "35px" }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                  <br />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ marginRight: "70px", marginLeft: "135px" }}
                  >
                    <FaPlus
                      style={{ marginRight: "5px", marginBottom: "5px" }}
                    />
                    Tambah
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success rounded btn-center order-2"
                    onClick={() => navigate("/berita")}
                  >
                    <IoIosArrowBack
                      style={{ marginRight: "5px", marginBottom: "5px" }}
                    />
                    Kembali
                  </button>
                </form>
              </div>
            </Card.Body>
          </Card>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default TambahBerita;

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Card } from "react-bootstrap";

function EditBerita() {
  const navigate = useNavigate();

  // Simpan tanggal asli saat tombol edit ditekan
  const [originalPublicationDate, setOriginalPublicationDate] = useState("");

  const [formData, setFormData] = useState({
    news_title: "",
    news_content: "",
    publication_date: "",
    news_source: "",
    category: "",
    news_image: null,
    publication_status: "Published",
  });

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
    const beritaId = window.location.pathname.split("/").pop();

    axios
      .get(`http://localhost:3040/news/${beritaId}`)
      .then((response) => {
        const beritaData = response.data;
        setFormData({
          news_title: beritaData.news_title || "",
          news_content: beritaData.news_content || "",
          publication_date: beritaData.publication_date || "",
          news_source: beritaData.news_source || "",
          category: beritaData.category || "",
          news_image: beritaData.news_image || null,
          publication_status: beritaData.publication_status || "Published",
        });

        // Simpan tanggal asli
        setOriginalPublicationDate(beritaData.publication_date || "");
      })
      .catch((error) => {
        console.error("Gagal mengambil data Berita:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({
      ...formData,
      news_image: imageFile,
    });
  };

  const handleContentChange = (value) => {
    setFormData({
      ...formData,
      news_content: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("news_title", formData.news_title);
    formDataToSend.append("news_content", formData.news_content);
    formDataToSend.append("publication_date", formData.publication_date);
    formDataToSend.append("news_source", formData.news_source);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("publication_status", formData.publication_status);
    formDataToSend.append("news_image", formData.news_image);

    const beritaId = window.location.pathname.split("/").pop();

    axios
      .put(`http://localhost:3040/news/${beritaId}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Berita berhasil diubah:", response.data);
        navigate("/berita");
      })
      .catch((error) => {
        console.error("Gagal mengubah berita:", error);
      });
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
      ["blockquote"],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ size: ["small", false, "large", "huge"] }],
      ["code-block"],
    ],
  };

  return (
    <div className="wrapper">
      <div className="body-overlay"></div>
      {/* Sidebar */}
      <nav id="sidebar">{/* ... Sidebar content ... */}</nav>
      {/* Page Content */}
      <div id="content">
        <div className="top-navbar">{/* ... Top navbar content ... */}</div>
        <div style={{ margin: "20px" }}>
          <Card>
            <Card.Body>
              <div style={{ margin: "50px" }}>
                <h2>Edit Berita/Informasi</h2>
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
                            style={{ width: "100%", height: "35px" }}
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
                            onChange={handleContentChange}
                            modules={modules}
                            style={{ width: "100%", height: "400px" }}
                          />
                        </td>
                      </tr>
                      <br />
                      <br />
                      <br />
                      {/* <tr>
                        <td>
                          <label>
                            <b>Tanggal Publikasi:</b>
                          </label>
                        </td>
                        <td>
                          <input
                            type="text" // Menggunakan input teks alih-alih input tanggal
                            name="publication_date"
                            value={formData.publication_date}
                            readOnly // Membuat input hanya bisa dibaca (non-editable)
                            style={{ width: "100%", height: "35px" }}
                          />
                        </td>
                      </tr> */}
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
                      <tr>
                        <td>
                          <label>
                            <b>Kategori Berita/Informasi:</b>
                          </label>
                        </td>
                        <td>
                          <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", height: "35px" }}
                          />
                        </td>
                      </tr>
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
                            style={{ display: "none" }}
                          />
                          {formData.news_image && (
                            <img
                              src={formData.news_image}
                              alt="News Image"
                              style={{
                                width: "100%",
                                height: "auto",
                                maxHeight: "200px",
                              }}
                            />
                          )}
                          <br />
                          <label>
                            <button
                              type="button"
                              className="btn btn-info"
                              onClick={() => {
                                const inputImage = document.querySelector(
                                  'input[name="news_image"]'
                                );
                                if (inputImage) inputImage.click();
                              }}
                            >
                              Pilih Gambar
                            </button>
                          </label>
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
                    Simpan
                  </button>
                  <button
                    type="button"
                    className="btn btn-success rounded btn-center order-2"
                    onClick={() => navigate("/berita")}
                  >
                    Batal
                  </button>
                </form>
              </div>
            </Card.Body>
          </Card>
        </div>
        {/* ... Footer ... */}
      </div>
    </div>
  );
}

export default EditBerita;

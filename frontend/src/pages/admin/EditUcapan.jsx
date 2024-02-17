import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/admin/Navbar";
import Topnavbar from "../../components/admin/Topnavbar";
import Footer from "../../components/admin/Footer";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditUcapan() {
  const navigate = useNavigate();
  const quillRefUcapan = useRef();

  const [ucapan, setUcapan] = useState("");

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
    const ucapanId = window.location.pathname.split("/").pop();

    axios
      .get(`http://localhost:3040/ucapan/${ucapanId}`)
      .then((response) => {
        // Set nilai awal dari state ucapan dengan data dari server
        setUcapan(response.data.Result[0].pesan);
      })
      .catch((error) => {
        console.error("Gagal mengambil data Ucapan:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mendapatkan isi Quill Editor
    const ucapanContent = quillRefUcapan.current.getEditorContents();
    // Menyiapkan data sesuai format yang diharapkan oleh server
    const data = {
      pesan: ucapanContent,
    };

    const ucapanId = window.location.pathname.split("/").pop();

    axios
      .put(`http://localhost:3040/edit-ucapan/${ucapanId}`, data)
      .then((response) => {
        console.log("Data ucapan berhasil diupdate:", response.data);
        navigate("/beranda1");
      })
      .catch((error) => {
        console.error("Gagal mengupdate data ucapan:", error);
      });
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Apakah Anda yakin ingin keluar dari halaman ini?"
    );
    if (confirmLogout) {
      axios
        .get("http://localhost:3040/logout", { withCredentials: true })
        .then(() => {
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
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
      [{ list: "check" }],
    ],
  };

  return (
    <div className="wrapper">
      <div className="body-overlay"></div>
      <Navbar activeComponent={"Dashboard"} />

      <div id="content">
        <Topnavbar />

        <div style={{ margin: "50px" }}>
          <div className="container">
            <div className="card mt-4">
              <div className="card-body">
                <h3 className="card-title">Edit Ucapan Lurah</h3>
                <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
                  <div>
                    <ReactQuill
                      ref={quillRefUcapan}
                      value={ucapan}
                      onChange={(content) => setUcapan(content)}
                      modules={modules}
                      style={{ height: "500px" }}
                    />
                  </div>
                  {/* <div className="mt-4">
                  <input
                    type="file"
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                  />
                </div> */}
                  <br />
                  <br />
                  <div className="mt-5 d-flex justify-content-between">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ marginRight: "100px" }}
                    >
                      Simpan
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => navigate("/beranda1")}
                      style={{ marginRight: "800px" }}
                    >
                      Kembali
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
export default EditUcapan;

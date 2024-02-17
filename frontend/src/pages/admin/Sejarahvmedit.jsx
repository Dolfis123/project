import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoIosArrowBack } from "react-icons/io";
import Navbar from "../../components/admin/Navbar";

import Footer from "../../components/admin/Footer";
import Topnavbar from "../../components/admin/Topnavbar";
function Sejarahvmedit() {
  const navigate = useNavigate();
  const [sejarah, setSejarah] = useState("");
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
    const sejarahId = window.location.pathname.split("/").pop();

    axios
      .get(`http://localhost:3040/sejarah/${sejarahId}`)
      .then((response) => {
        setSejarah(response.data.isi);
      })
      .catch((error) => {
        console.error("Gagal mengambil data sejarah:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      isi: sejarah,
    };
    const sejarahId = window.location.pathname.split("/").pop();
    // Mengirim permintaan PUT ke endpoint API di backend
    axios
      .put(`http://localhost:3040/sejarah/${sejarahId}`, data)
      .then((response) => {
        console.log("Data sejarah berhasil diupdate:", response.data);

        navigate("/profil");
      })
      .catch((error) => {
        console.error("Gagal mengupdate data sejarah:", error);
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
      <div className="body-overlay" />

      {/* Sidebar */}
      <Navbar />
      <div id="content">
        <Topnavbar />
        <div>
          <div
            className="d-flex flex-column pt-4 text-black"
            style={{ marginLeft: "20px" }}
          >
            <h3>Edit Sejarah</h3>
            <form onSubmit={handleSubmit} className="bg-white">
              <div>
                <label
                  htmlFor="sejarah"
                  className="d-flex flex-column pt-4 text-black"
                >
                  <b style={{ marginLeft: "300px" }}>SEJARAH</b>
                </label>
                {/* Mengganti textarea dengan komponen ReactQuill */}
                <ReactQuill
                  value={sejarah}
                  onChange={setSejarah}
                  // modules={{ toolbar: true }}
                  modules={modules}
                  style={{ width: "65%", height: "280px" }}
                />
              </div>
              <br />
              <br />
              <div className="col-md-6 d-flex justify-content-between mt-4">
                <button type="submit" className="btn btn-primary">
                  Simpan
                </button>
                <button
                  type="submit"
                  className="btn btn-success rounded"
                  onClick={() => navigate("/profil")}
                >
                  <IoIosArrowBack
                    style={{ marginRight: "5px", marginBottom: "5px" }}
                  />
                  Kembali
                </button>
              </div>
              <br />
              <br />
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
export default Sejarahvmedit;

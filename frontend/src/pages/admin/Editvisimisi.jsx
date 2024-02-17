/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoIosArrowBack } from "react-icons/io";
import Navbar from "../../components/admin/Navbar";
import Topnavbar from "../../components/admin/Topnavbar";
import Footer from "../../components/admin/Footer";

function Editvisimisi() {
  const navigate = useNavigate();
  const quillRefVisi = useRef();
  const quillRefMisi = useRef();

  const [visi, setVisi] = useState("");
  const [misi, setMisi] = useState("");
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
    const visiMisiId = window.location.pathname.split("/").pop();

    axios
      .get(`http://localhost:3040/visi-misi/${visiMisiId}`)
      .then((response) => {
        setVisi(response.data.visi);
        setMisi(response.data.misi);
      })
      .catch((error) => {
        console.error("Gagal mengambil data visi-misi:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const visiContent = quillRefVisi.current.getEditorContents();
    const misiContent = quillRefMisi.current.getEditorContents();

    const visiList = visiContent
      .split("\n")
      .filter((item) => item.trim() !== "");
    const misiList = misiContent
      .split("\n")
      .filter((item) => item.trim() !== "");

    const data = {
      visi: visiList,
      misi: misiList,
    };

    const visiMisiId = window.location.pathname.split("/").pop();

    axios
      .put(`http://localhost:3040/visi-misi/${visiMisiId}`, data)
      .then((response) => {
        console.log("Data visi dan misi berhasil diupdate:", response.data);
        navigate("/profil");
      })
      .catch((error) => {
        console.error("Gagal mengupdate data visi dan misi:", error);
      });
  };
  const [, setVisiMisi] = useState([]);

  useEffect(() => {
    // Panggil fungsi untuk mengambil data visi dan misi dari backend
    fetchDataVisiMisi();
  }, []);

  const fetchDataVisiMisi = () => {
    axios
      .get("http://localhost:3040/visi-misi")
      .then((response) => {
        setVisiMisi(response.data);
      })
      .catch((error) => {
        console.error("Error fetching visi dan misi data:", error);
      });
  };
  const getTest = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  // const navigate = useNavigate();
  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Apakah Anda yakin ingin keluar dari halaman ini?"
    );

    if (confirmLogout) {
      axios
        .get("http://localhost:3030/logout", { withCredentials: true })
        .then((res) => {
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
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
    // eslint-disable-next-line react/no-unknown-property
    <div calssName="wrapper bg-body-secondary">
      <div className="body-overlay"></div>
      <Navbar activeComponent={"Beranda"} />
      {/* Page Content */}
      <div id="content">
        <Topnavbar />

        {/* Content Start */}
        <Card className="bg-white">
          <Card.Body>
            <div
              className="d-flex flex-column pt-4 text-black"
              style={{ marginLeft: "30px" }}
            >
              <h3>Edit Visi & Misi</h3>
              <form onSubmit={handleSubmit}>
                <div>
                  <Form.Label
                    htmlFor="visi"
                    className="d-flex flex-column align-items-left pt-4 text-black"
                  >
                    <b>VISI</b>
                  </Form.Label>

                  <ReactQuill
                    ref={quillRefVisi}
                    value={visi}
                    onChange={(content) => setVisi(content)}
                    modules={modules}
                    style={{ width: "65%", height: "280px" }}
                  />
                </div>
                <div>
                  <br />
                  <br />
                  <Form.Label
                    htmlFor="misi"
                    className="d-flex flex-column align-items-left pt-4 text-black"
                  >
                    <b>MISI</b>
                  </Form.Label>
                  <ReactQuill
                    ref={quillRefMisi}
                    value={misi}
                    onChange={(content) => setMisi(content)}
                    modules={modules}
                    style={{ width: "65%", height: "280px" }}
                  />
                </div>
                <br />
                <br />
                <br />
                <div className="col-lg-3 d-flex justify-content-between">
                  <Button type="submit" className="btn btn-primary order-1">
                    Simpan
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-success rounded btn-center order-2"
                    onClick={() => navigate("/profil")}
                  >
                    <IoIosArrowBack />
                    Kembali
                  </Button>
                </div>
              </form>
              <br />
            </div>
          </Card.Body>
        </Card>
        {/* Content End */}
        <Footer />
      </div>
    </div>
  );
}
export default Editvisimisi;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card } from "react-bootstrap";
import "../../css/public/style2.css";
import { FaEdit } from "react-icons/fa";
import Navbar from "../../components/admin/Navbar";
import Topnavbar from "../../components/admin/Topnavbar";
import Footer from "../../components/admin/Footer";

function Beranda1() {
  const [ucapan, setUcapan] = useState([]);
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
      .get("http://localhost:3040/lihat-ucapan")
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.Result);
          setUcapan(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="wrapper">
      <div className="body-overlay" />
      {/* Sidebar */}
      <Navbar activeComponent={"Beranda"} />
      <div id="content">
        <Topnavbar />
        {/* Content Beranda Start*/}
        <div className="container mt-4">
          {ucapan.map((item, index) => (
            <Card key={index} className="mb-4">
              <Card.Body>
                <Card.Title>Ucapan Lurah</Card.Title>
                <div className="d-flex">
                  <div className="flex-grow-1">
                    {item.pesan &&
                      item.pesan
                        .split("\n")
                        .map((line, lineIndex) =>
                          line.startsWith("•") ? (
                            <li key={lineIndex}>{line.substring(1)}</li>
                          ) : (
                            <div
                              key={lineIndex}
                              dangerouslySetInnerHTML={{ __html: line }}
                            />
                          )
                        )}
                  </div>
                  <div className="flex-shrink-0">
                    {item.image && (
                      <img
                        src={`http://localhost:3040/images/${item.image}`}
                        alt=""
                        className="bg-informasi"
                        style={{
                          maxWidth: "500px", // Menambahkan properti maxWidth
                          maxHeight: "500px", // Menambahkan properti maxHeight
                          marginTop: "100px",
                        }}
                      />
                    )}
                  </div>
                </div>
                <br />
                <br />
                <div className="text-left">
                  <Link
                    to={`/editucapan/${item.id}`}
                    className="btn btn-primary btn-sm m-2"
                  >
                    <FaEdit
                      style={{ marginRight: "5px", marginBottom: "5px" }}
                    />
                    Edit Ucapan
                  </Link>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
        {/* ... Bagian footer ... */}
        <Footer />
      </div>
    </div>
  );
}
export default Beranda1;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import Navbar from "../../components/admin/Navbar";
import Topnavbar from "../../components/admin/Topnavbar";
import Footer from "../../components/admin/Footer";

function Profil() {
  const [sejarah, setSejarah] = useState([]);
  const [visiMisi, setVisiMisi] = useState([]);
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
    // Panggil fungsi untuk mengambil data sejarah dari backend
    fetchDataSejarah();
    // Panggil fungsi untuk mengambil data visi dan misi dari backend
    fetchDataVisiMisi();
  }, []);
  const fetchDataSejarah = () => {
    axios
      .get("http://localhost:3040/sejarah")
      .then((response) => {
        setSejarah(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sejarah data:", error);
      });
  };
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
  return (
    <div className="wrapper">
      <div className="body-overlay" />
      {/* Sidebar */}
      <Navbar activeComponent={"Profil"} />
      {/* Page Content */}
      <div id="content">
        <Topnavbar />
        <div>
          <div style={{ margin: "20px" }}>
            <Card>
              <Card.Body>
                <h2
                  className="text-center mt-4"
                  style={{ fontSize: "2rem", color: "#140303" }}
                >
                  Sejarah Kelurahan Amban
                </h2>
                <div style={{ margin: "20px" }}>
                  <div className="mt-3">
                    <Card className="card-stats">
                      <Card.Body>
                        <h4 className="text-center pb-1">
                          <b>SEJARAH</b>
                        </h4>
                        <div style={{ margin: "30px" }}>
                          {sejarah.map((item, index) => (
                            <div key={index}>
                              {item.isi.split("\n").map((line, lineIndex) =>
                                line.startsWith("•") ? (
                                  <li key={lineIndex}>{line.substring(1)}</li>
                                ) : (
                                  <div
                                    key={lineIndex}
                                    dangerouslySetInnerHTML={{
                                      __html: line,
                                    }}
                                  />
                                )
                              )}
                            </div>
                          ))}
                        </div>
                      </Card.Body>
                    </Card>
                    {sejarah.map((item, index) => (
                      // eslint-disable-next-line react/jsx-key
                      <Link to={`/sejarah/${item.id}`}>
                        <Button
                          variant="primary"
                          style={{
                            fontSize: "16px",
                            color: "#ffffff",
                            border: "4px solid",
                            padding: "5px 25px",
                            borderRadius: "25px",
                            marginTop: "0px",
                          }}
                        >
                          <FaEdit
                            style={{ marginBottom: "5px", marginRight: "5px" }}
                          />
                          Edit Sejarah
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              marginBottom: "20px",
              marginTop: "70px",
            }}
          >
            {" "}
            <Card>
              <Card.Body>
                <h2
                  className="text-center mt-4"
                  style={{ fontSize: "2rem", color: "#140303" }}
                >
                  Visi & Misi Kelurahan Amban
                </h2>
                <div className="mt-3">
                  <Card className="card-stats">
                    <Card.Body>
                      <h4 className="text-center pb-1">
                        <b>VISI</b>
                      </h4>
                      <div style={{ marginLeft: "30px", marginRight: "20px" }}>
                        {visiMisi.map((item, index) => (
                          <div key={index}>
                            {item.visi
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
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                  <Card className="card-stats">
                    <Card.Body>
                      <h4 className="text-center pb-1">
                        <b>MISI</b>
                      </h4>
                      <div style={{ marginRight: "20px" }}>
                        {visiMisi.map((item, index) => (
                          <div key={index}>
                            <ul>
                              {item.misi.split("\n").map((line, lineIndex) => (
                                <li
                                  key={lineIndex}
                                  dangerouslySetInnerHTML={{ __html: line }}
                                />
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                  {visiMisi.map((item, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <Link to={`/visi-misi/${item.id}`}>
                      <Button
                        variant="primary"
                        style={{
                          fontSize: "16px",
                          color: "#ffffff",
                          border: "4px solid",
                          padding: "3px 25px",
                          borderRadius: "25px",
                          marginTop: "0px",
                        }}
                      >
                        <FaEdit
                          style={{ marginBottom: "5px", marginRight: "5px" }}
                        />
                        Edit Visi & Misi
                      </Button>
                    </Link>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
        {/* ... Bagian footer ... */}
        <Footer />
      </div>
    </div>
  );
}
export default Profil;

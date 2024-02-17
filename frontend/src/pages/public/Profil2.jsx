import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import Footer from "../../components/public/Footer";
import Navbar2 from "../../components/public/Navbar2";
// import "../../css/public/latters/SuratTidakMampu.css";
function Profil2() {
  const [sejarah, setSejarah] = useState([]);
  const [visiMisi, setVisiMisi] = useState([]);
  const [pegawai, setPegawai] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataSejarah();
    // Panggil fungsi untuk mengambil data visi dan misi dari backend
    fetchDataVisiMisi();
    // Panggil fungsi untuk mengambil data pegawai dari backend
    fetchDataPegawai();
  }, []);
  const fetchDataSejarah = () => {
    axios
      .get("http://localhost:3040/sejarah")
      .then((response) => {
        setSejarah(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sejarah data:", error);
        setLoading(false);
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

  const fetchDataPegawai = () => {
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
  };
  return (
    <div style={{ backgroundColor: "#F0F0F0" }}>
      {/* <!-- Topbar Start --> */}
      {/* <Topbar /> */}
      {/* <!-- Topbar End --> */}
      {/* Navbar Start */}
      <div className="container-fluid position-relative p-0">
        <Navbar2 activeComponent={"Profil"} />
        <div
          className="container-fluid bg-primary py-5 bg-header"
          style={{ marginBottom: "90px" }}
        >
          <div className="row py-5">
            <div className="col-12 pt-lg-5 mt-lg-5 text-center">
              <h2
                className="text-center mt-4 animated zoomIn "
                style={{
                  fontSize: "3rem",
                  color: "#F6F6F6",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Profil Kami
              </h2>
              <h3
                className="text-center mt-4 animated zoomIn"
                style={{ fontSize: "1.2rem", color: "#8BE8E5" }}
              >
                Disini kamu akan melihat Profil singkat tentang Lurah Amban,
                <br />
                mulai dari sejarah, visi, misi, dan hal lainya yang mengenai
                lurah amban
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10 col-sm-12">
              {loading ? (
                <h3 style={{ textAlign: "center" }}>Loading....😁</h3>
              ) : (
                <div className="mt-3">
                  <Card className="card-stats">
                    <Card.Body>
                      <h4 className="text-center pb-1">
                        <b>Sejarah Kelurahan Amban</b>
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- About Start --> */}
      <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-7">
              <Card className="p-4">
                {" "}
                {/* Menggunakan Card untuk visi dan misi */}
                <h2
                  className="text-center mt-4 section-title position-relative pb-3 mb-5"
                  style={{ fontSize: "2rem", color: "#207DFF" }}
                >
                  VISI & MISI
                </h2>
                <div className="visi-misi-container">
                  <Card className="card-stats">
                    <Card.Body>
                      <h4 className="text-center pb-1 ">
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
                </div>
                <div className="visi-misi-container">
                  <h2
                    className="text-center pb-1"
                    style={{ fontSize: "1.5rem", color: "#140303" }}
                  >
                    MISI
                  </h2>
                  <ul className="jenis-huruf">
                    {visiMisi.map((item, index) => (
                      <div className="ukuran-huruf" key={index}>
                        {item.misi.split("\n").map((line, lineIndex) => (
                          <div
                            key={lineIndex}
                            dangerouslySetInnerHTML={{ __html: line }}
                          />
                        ))}
                      </div>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
            <div className="col-lg-5" style={{ minHeight: "500px" }}>
              <Card className="h-100">
                <div className="position-relative h-100">
                  <img
                    className="position-absolute w-100 h-100 rounded wow zoomIn"
                    data-wow-delay="0.9s"
                    src="/img/logo mkw 3.jpg"
                    alt="Gambar Sejarah"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center center",
                    }}
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- About End --> */}
      {/* <!-- About End --> */}
      {/* <!-- Team Start --> */}
      <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container py-5">
          <Card className="p-4">
            {" "}
            {/* Gunakan Card dari Bootstrap */}
            <div
              className="section-title text-center position-relative pb-3 mb-5 mx-auto"
              style={{ maxWidth: "600px" }}
            >
              <h5 className="fw-bold text-primary text-uppercase">
                Struktur Pegawai
              </h5>
            </div>
            <div className="container">
              <div className="row">
                <div className="tree">
                  <ul>
                    <li>
                      <a href="#">
                        <img
                          src="https://img2.pngdownload.id/20180225/cjq/kisspng-cartoon-illustration-bank-employee-5a925656ac95c6.7702391515195397987069.jpg"
                          alt="Lurah Amban"
                        />
                        <span>
                          <b>LURAH AMBAN</b>
                        </span>
                        <span>
                          <b>
                            <u>ALHEN SORBU, S.STP</u>
                          </b>
                        </span>
                        <span>
                          <b>NIP: 199304032017081002</b>
                        </span>
                      </a>
                      <ul>
                        <li>
                          <a href="#">
                            <img
                              src="https://img2.pngdownload.id/20180225/cjq/kisspng-cartoon-illustration-bank-employee-5a925656ac95c6.7702391515195397987069.jpg"
                              alt="Sekretaris"
                            />
                            <span>
                              <b>SEKRETARIS</b>
                            </span>
                            <span>
                              <b>
                                <u>RONNY TELENGGEN, S.STP</u>
                              </b>
                            </span>
                            <span>
                              <b>NIP: 199405122016091004</b>
                            </span>
                          </a>
                          <a href="#">
                            <img
                              src="https://img2.pngdownload.id/20180225/cjq/kisspng-cartoon-illustration-bank-employee-5a925656ac95c6.7702391515195397987069.jpg"
                              alt="Bendahara Lurah"
                            />
                            <span>
                              <b>BENDAHARA LURAH</b>
                            </span>
                            <span>
                              <b>
                                <u>YUNUS RUMEREK</u>
                              </b>
                            </span>
                            <span>
                              <b>NIP: 198006052015091001</b>
                            </span>
                          </a>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <a href="#">
                            <img
                              src="https://img2.pngdownload.id/20180225/cjq/kisspng-cartoon-illustration-bank-employee-5a925656ac95c6.7702391515195397987069.jpg"
                              alt="Kasi Pemerintahan & Perlindungan Masyarakat"
                            />
                            <span>
                              <b>
                                {" "}
                                KASI PEMERINTAHAN & PERLINDUNGAN MASYARAKAT
                              </b>
                            </span>
                            <span>
                              <b>
                                <u>HERCANUS YHUDA Y. WAROPEN</u>
                              </b>
                            </span>
                            <span>
                              <b>NIP: 196703102007011027</b>
                            </span>
                          </a>
                          <ul>
                            <li>
                              <a href="#">
                                <img
                                  src="https://img2.pngdownload.id/20180225/cjq/kisspng-cartoon-illustration-bank-employee-5a925656ac95c6.7702391515195397987069.jpg"
                                  alt="Fredrik C. Awom"
                                />
                                <span>
                                  <b>
                                    ⁕ <u>FREDERIK C. AWOM</u>
                                  </b>
                                </span>
                                <span>
                                  <b>NIP: 01010101010101001</b>
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img
                                  src="https://img2.pngdownload.id/20180225/cjq/kisspng-cartoon-illustration-bank-employee-5a925656ac95c6.7702391515195397987069.jpg"
                                  alt="Yustus Ikei"
                                />
                                <span>
                                  <b>
                                    ⁕ <u>YUSTUS IKEI</u>
                                  </b>
                                </span>
                                <span>
                                  <b>NIP: 19800808122015091001</b>
                                </span>
                              </a>
                            </li>
                          </ul>
                        </li>

                        <li>
                          <a href="#">
                            <img
                              src="https://img2.pngdownload.id/20180225/cjq/kisspng-cartoon-illustration-bank-employee-5a925656ac95c6.7702391515195397987069.jpg"
                              alt="Kasi Ekonomi & Pembangunan"
                            />
                            <span>
                              <b>KASI EKONOMI & PEMBANGUNAN</b>
                            </span>
                            <span>
                              <b>
                                ⁕<u>RACHMAD CAHYADI GOULAP</u>
                              </b>
                            </span>
                            <span>
                              <b>NIP: 198305242008011009</b>
                            </span>
                          </a>
                          <ul>
                            <li>
                              <a href="#">
                                <img
                                  src="https://www.pngmart.com/files/15/Female-office-Worker-PNG-Photos.png"
                                  alt="Mariangke Kadop"
                                />
                                <span>
                                  <b>
                                    ⁕<u> MARIANGKE KADOP</u>
                                  </b>
                                </span>
                                <span>
                                  <b>NIP: 197906102015092001</b>
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img
                                  src="https://img2.pngdownload.id/20180225/cjq/kisspng-cartoon-illustration-bank-employee-5a925656ac95c6.7702391515195397987069.jpg"
                                  alt="Yance R. Mandacan"
                                />
                                <span>
                                  <b>
                                    ⁕ <u>YANCE R.MANDACAN</u>
                                  </b>
                                </span>
                                <span>
                                  <b>NIP: 197904242005091009</b>
                                </span>
                              </a>
                            </li>
                          </ul>
                        </li>
                        {/* <li>
                          <a href="#">
                            <img
                              src="https://img2.pngdownload.id/20180225/cjq/kisspng-cartoon-illustration-bank-employee-5a925656ac95c6.7702391515195397987069.jpg"
                              alt="Kasi Ekonomi & Pembangunan"
                            />
                            <span>
                              <b>KASI EKONOMI & PEMBANGUNAN</b>
                            </span>
                            <span>
                              <b>
                                ⁕<u>RACHMAD CAHYADI GOULAP</u>
                              </b>
                            </span>
                            <span>
                              <b>NIP: 198305242008011009</b>
                            </span>
                          </a>
                          <ul>
                            <li>
                              <a href="#">
                                <img
                                  src="https://www.pngmart.com/files/15/Female-office-Worker-PNG-Photos.png"
                                  alt="Mariangke Kadop"
                                />
                                <span>
                                  <b>
                                    ⁕<u> MARIANGKE KADOP</u>
                                  </b>
                                </span>
                                <span>
                                  <b>NIP: 197906102015092001</b>
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img
                                  src="https://img2.pngdownload.id/20180225/cjq/kisspng-cartoon-illustration-bank-employee-5a925656ac95c6.7702391515195397987069.jpg"
                                  alt="Yance R. Mandacan"
                                />
                                <span>
                                  <b>
                                    ⁕ <u>YANCE R.MANDACAN</u>
                                  </b>
                                </span>
                                <span>
                                  <b>NIP: 197904242005091009</b>
                                </span>
                              </a>
                            </li>
                          </ul>
                        </li> */}
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* <!-- Team End --> */}
      {/* <!-- Footer Start --> */}
      <Footer />
      {/* <!-- Footer End --> */}
    </div>
  );
}
export default Profil2;

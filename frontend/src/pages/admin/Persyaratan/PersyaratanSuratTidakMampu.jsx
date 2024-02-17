import React, { useState, useEffect } from "react";
import Footer from "../../../components/public/Footer";
import "../../../css/public/latters/SuratTidakMampu.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io("http://localhost:3041");
import { useNavigate } from "react-router-dom";

function PersyaratanSuratDomisili() {
  const [nomor, setNomor] = useState("");
  const [email, setEmail] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { hashed_id } = useParams(); // Menggunakan hashed_id dari useParams

  useEffect(() => {
    fetchData();
  }, [hashed_id]);

  useEffect(() => {}, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3040/lihat-surat-tidak-mampu/${hashed_id}` // Menggunakan hashed_id dalam URL
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching SKCK data:", error);
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      socket.on("welcome", (data) => {
        console.log("msg from server", data);
      });
      socket.emit("msg", "Thanks for connecting!!");
    });

    socket.on("newFormSubmission", (formData) => {
      console.log("New form submission received:", formData);
    });

    return () => {
      socket.off("connect");
      socket.off("newFormSubmission");
    };
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3040/update-nomor-email/${hashed_id}`,
        {
          no_telepon: nomor,
          email: email,
          keperluan: keperluan,
        }
      );

      socket.emit("formSubmitted", {
        no_telepon: nomor,
        email: email,
        keperluan: keperluan,
      });

      setNomor("");
      setEmail("");
      setKeperluan("");

      console.log(response.data);

      navigate(`/confir-data-tidak-mampu/${hashed_id}`);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  return (
    <div className="back">
      <br />
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h3 style={{ textAlign: "center" }}>
              Permintaan Surat Keterangan Tidak Mampu
            </h3>
            <div
              style={{
                fontFamily: "sans-serif",
                marginLeft: "60px",
                marginTop: "60px",
              }}
            >
              <h4>Persyaratan</h4>
              <ol>
                <li>Fotocopy KTP</li>
                <li>Fotocopy Kartu Keluarga</li>
              </ol>
            </div>
            <br />
            <p
              style={{
                marginLeft: "50px",
                fontFamily: "Times New Roman",
                fontSize: "23px",
              }}
            >
              <b> Mohon untuk di isi data di bawa ini:</b>
            </p>

            <p
              style={{
                marginBottom: "0",
                marginLeft: "50px",
                fontFamily: "Times New Roman",
                fontSize: "17px",
              }}
            >
              Data ini akan kami gunakan untuk{" "}
            </p>
            <p
              className=""
              style={{
                marginBottom: "0",
                marginLeft: "50px",
                fontFamily: "Times New Roman",
                fontSize: "17px",
              }}
            >
              Mempermudah dalam menghubungi anda
            </p>
          </div>
          <br />
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <div className="row mb-3">
                <label htmlFor="telepon" className="col-sm-2 col-form-label">
                  <b> No Hp/WA</b>
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    id="telepon"
                    value={nomor}
                    onChange={(e) => setNomor(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="ktp" className="col-sm-2 col-form-label">
                  <b> Email</b>
                </label>
                <div className="col-sm-5">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label htmlFor="keperluan" className="col-sm-2 col-form-label">
                  <b> Keperluan</b>
                </label>
                <div className="col-sm-5">
                  <textarea
                    className="form-control"
                    name="keperluan"
                    id="keperluan"
                    rows="3"
                    value={keperluan}
                    onChange={(e) => setKeperluan(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <br />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <div className="card-footer text-muted"></div>
          <div className="container"></div>
        </div>
      </div>

      <br />

      <Footer />
    </div>
  );
}

export default PersyaratanSuratDomisili;

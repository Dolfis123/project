import React, { useState, useEffect } from "react";
import Footer from "../../../components/public/Footer";
import "../../../css/public/latters/SuratTidakMampu.css";
import ReactDatePicker from "react-datepicker";
import { format } from "date-fns";

import axios from "axios";

import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io("http://localhost:3041");
import { useNavigate } from "react-router-dom";
function EditDomisili() {
  const [nama, setName] = useState("");
  const [ttl, setTtl] = useState(null);
  const [jk, setJk] = useState("");
  const [ktp, setKtp] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [rt_rw, setRtRw] = useState("");
  const [agama, setAgama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [tempat_lahir, setTempatlahir] = useState("");
  const [nomor, setNomor] = useState("");
  const [email, setEmail] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { hashed_id } = useParams();
  const [ktpErrorMessage, setKtpErrorMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, [hashed_id]);
  const handleChange = (event) => {
    const inputValue = event.target.value;

    if (/^\d{0,16}$/.test(inputValue)) {
      setKtp(inputValue);
      setKtpErrorMessage("");
    } else {
      setKtpErrorMessage("Nomor KTP harus terdiri dari 16 digit.");
    }
  };
  const handleKtp = (event) => {
    const inputValue = event.target.value;

    if (!ktpErrorMessage) {
      setKtp(inputValue);
    }
  };
  const handleTanggalLahirChange = (date) => {
    setTtl(date);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3040/lihat-surat-domisili/${hashed_id}`
      );
      console.log("Data from server:", response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching domisili data:", error);
    }
  };

  useEffect(() => {
    if (data) {
      setName(data.nama);
      setTtl(data.ttl);
      setJk(data.jk);
      setKtp(data.ktp);
      setPekerjaan(data.pekerjaan);
      setRtRw(data.rt_rw);
      setAgama(data.agama);
      setAlamat(data.alamat);
      setTempatlahir(data.tempat_lahir);
      setNomor(data.no_telepon);
      setEmail(data.email);
      setKeperluan(data.keperluan);
    }
  }, [data]);

  useEffect(() => {
    socket.on("connect", () => {
      socket.on("welcome", (data) => {
        console.log("msg from server", data);
      });
      socket.emit("msg", "Thanks for connecting!!");
    });

    socket.on("newFormSubmission", (formData) => {
      // Tanggapi notifikasi formulir baru (opsional)
      console.log("New form submission received:", formData);
    });

    return () => {
      socket.off("connect");
      socket.off("newFormSubmission");
    };
  }, []);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = format(ttl, "yyyy-MM-dd");

    // Kirim permintaan ke backend untuk melakukan pengeditan
    try {
      const response = await axios.put(
        `http://localhost:3040/update-all-domisili-user/${hashed_id}`,
        {
          nama: nama,
          ttl: ttl,
          jk: jk,
          ktp: ktp,
          pekerjaan: pekerjaan,
          rt_rw: rt_rw,
          agama: agama,
          alamat: alamat,
          tempat_lahir: tempat_lahir,
          no_telepon: nomor,
          email: email,
          keperluan: keperluan,
        }
      );

      // Emit event socket.io ketika formulir dikirim
      socket.emit("formSubmitted", {
        no_telepon: nomor,
        email: email,
        keperluan: keperluan,
      });

      setNomor("");
      setEmail("");
      setKeperluan("");

      console.log(response.data); // Output respon dari server (opsional)

      // Arahkan pengguna ke halaman Confirmasi data setelah pembaruan berhasil
      alert("Data berhasil di update");
      navigate(`/confir-data-domisili/${hashed_id}`);
    } catch (error) {
      console.error("Error updating data:", error);
      // Handle error sesuai kebutuhan
    }
  };

  const handleJenisKelaminChange = (e) => {
    setJk(e.target.value);
  };
  const handleRtRwChnage = (e) => {
    setRtRw(e.target.value);
  };
  // const handleTanggalLahirChange = (e) => {
  //   setTtl(e.target.value);
  // };
  const handleAgamaChange = (e) => {
    setAgama(e.target.value);
  };
  // Add a function to format the date
  const formatBirthdate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };
  if (!data) {
    return <div>Loading...</div>; // Tampilkan pesan loading selama data diambil
  }
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  return (
    <div className="bg-body-secondary">
      {/* Navbar Start */}

      <br />
      <div className="container">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <div className="row mb-3">
                <label for="nama" className="col-sm-2 col-form-label">
                  <b> Nama</b>
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    id="nama"
                    value={nama}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label for="tempat_lahir" className="col-sm-2 col-form-label">
                  <b> Tempat Lahir</b>
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    id="tempat_lahir"
                    value={tempat_lahir}
                    onChange={(e) => setTempatlahir(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="ttl" className="col-sm-2 col-form-label">
                  <b> Tanggal Lahir</b>
                </label>
                <div className="col-sm-5">
                  <ReactDatePicker
                    selected={ttl ? new Date(ttl) : null}
                    onChange={handleTanggalLahirChange}
                    dateFormat="dd-MM-yyyy"
                    className="form-control"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={30}
                  />
                </div>
              </div>
              <div className="row mb-5">
                <label htmlFor="jk" className="col-sm-2 col-form-label">
                  <b> Jenis Kelamin</b>
                </label>
                <div className="col-sm-5">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="laki-laki"
                      value="Laki-laki"
                      checked={jk === "Laki-laki"}
                      onChange={handleJenisKelaminChange}
                    />
                    <label className="form-check-label" htmlFor="laki-laki">
                      Laki-Laki
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="perempuan"
                      value="Perempuan"
                      checked={jk === "Perempuan"}
                      onChange={handleJenisKelaminChange}
                    />
                    <label className="form-check-label" htmlFor="perempuan">
                      Perempuan
                    </label>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="ktp" className="col-sm-2 col-form-label">
                  <b> KTP</b>
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    id="ktp"
                    value={ktp}
                    onChange={handleChange}
                    onBlur={handleKtp}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label for="pekerjaan" className="col-sm-2 col-form-label">
                  <b> Pekerjaan</b>
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    id="pekerjaan"
                    value={pekerjaan}
                    onChange={(e) => setPekerjaan(e.target.value)}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label htmlFor="rt" className="col-sm-2 col-form-label">
                  <b> RT/RW</b>
                </label>
                <div className="col-sm-5">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    id="rt"
                    value={rt_rw}
                    onChange={handleRtRwChnage}
                  >
                    <option value="007/001">007/001</option>
                    <option value="006/002">006/002</option>
                    <option value="005/003">005/003</option>
                    <option value="004/004">004/004</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="agama" className="col-sm-2 col-form-label">
                  <b> Agama</b>
                </label>
                <div className="col-sm-5">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="agama"
                    id="agama"
                    value={agama}
                    onChange={handleAgamaChange}
                  >
                    <option value="" disabled defaultValue></option>
                    <option value="Kristen">Kristen</option>
                    <option value="Islam">Islam</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Budha">Budha</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <label for="keperluan" className="col-sm-2 col-form-label">
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

              <div className="row mb-3">
                <label for="telepon" className="col-sm-2 col-form-label">
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
                <label for="ktp" className="col-sm-2 col-form-label">
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
                <label for="alamat" className="col-sm-2 col-form-label">
                  <b> Alamat</b>
                </label>
                <div className="col-sm-5">
                  <textarea
                    className="form-control"
                    name="alamat"
                    id="alamat"
                    rows="3"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <br />
              <button type="submit" className="btn btn-primary">
                Edit
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

export default EditDomisili;

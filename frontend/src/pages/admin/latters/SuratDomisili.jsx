import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../css/public/layanan2.css";
import { useNavigate } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

import io from "socket.io-client";

function SuratDomisili() {
  const [nama, setNama] = useState("");
  const [tempat_lahir, setTempatLahir] = useState("");
  const [ttl, setTtl] = useState("");
  const [jk, setJk] = useState("");
  const [agama, setAgama] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [rt_rw, setRtRw] = useState("");
  const [ktp, setKtp] = useState("");
  const [ktpErrorMessage, setKtpErrorMessage] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);
  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setImage({
      ...image,
      ktp_image: imageFile,
    });
  };

  useEffect(() => {
    const socket = io("http://localhost:3040", {
      transports: ["websocket", "polling"],
    });

    socket.on("newFormNotification", (formData) => {
      setNotificationCount((prevCount) => prevCount + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        !nama ||
        !tempat_lahir ||
        !ttl ||
        !jk ||
        !agama ||
        !pekerjaan ||
        !alamat ||
        !rt_rw ||
        !ktp ||
        !image.ktp_image
      ) {
        alert("Data tidak boleh kosong");
        return;
      }

      if (ktpErrorMessage) {
        alert("Terjadi kesalahan pada kolom KTP. Periksa kembali input Anda.");
        return;
      }

      const formattedDate = format(
        new Date(ttl),
        "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
      );

      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("tempat_lahir", tempat_lahir);
      formData.append("ttl", formattedDate);
      formData.append("jk", jk);
      formData.append("agama", agama);
      formData.append("pekerjaan", pekerjaan);
      formData.append("alamat", alamat);
      formData.append("rt_rw", rt_rw);
      formData.append("ktp", ktp);
      formData.append("ktp_image", image.ktp_image);

      const response = await axios.post(
        "http://localhost:3040/buat-surat-domisili",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Data added successfully:", response.data);

      if (response.data.newId) {
        const newId = response.data.newId;
        alert("Surat domisili berhasil dibuat. Menunggu persetujuan admin.");

        setNama("");
        setTempatLahir("");
        setTtl("");
        setJk("");
        setAgama("");
        setPekerjaan("");
        setAlamat("");
        setRtRw("");
        setKtp("");

        // Redirect ke halaman persyaratan-surat-ket-domisili dengan menggunakan newId (hashed_id)
        navigate(`/persyaratan-surat-ket-domisili/${newId}`);
      } else {
        alert("Terjadi kesalahan dalam mendapatkan ID dari server.");
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleNamaLengkapChange = (event) => {
    setNama(event.target.value);
  };

  const handleTempatLahirChange = (event) => {
    setTempatLahir(event.target.value);
  };

  const handleTempatTangalLahir = (date) => {
    setTtl(date);
  };

  const handleJenisKelaminChange = (event) => {
    setJk(event.target.value);
  };

  const handleAgama = (event) => {
    setAgama(event.target.value);
  };

  const handlePekerjaan = (event) => {
    setPekerjaan(event.target.value);
  };

  const handleAlamat = (event) => {
    setAlamat(event.target.value);
  };

  const handleRtRw = (event) => {
    setRtRw(event.target.value);
  };

  return (
    <div>
      <div className="container">
        <div className="card">
          <div className="card-header text-center">
            <h2 style={{ color: "#3468C0" }}>
              FORM BIODATA DIRI KETERANGAN DOMISILI
            </h2>
          </div>
          <br />
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <label htmlFor="nama" className="col-sm-2 col-form-label">
                  <b> Nama</b>
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    id="nama"
                    value={nama}
                    onChange={handleNamaLengkapChange}
                  />
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
                  {ktpErrorMessage && (
                    <div className="text-danger">{ktpErrorMessage}</div>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label
                  htmlFor="tempat_lahir"
                  className="col-sm-2 col-form-label"
                >
                  <b> Tempat Lahir</b>
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    name="tempat_lahir"
                    id="tempat_lahir"
                    value={tempat_lahir}
                    onChange={handleTempatLahirChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="ttl" className="col-sm-2 col-form-label">
                  <b> Tanggal Lahir</b>
                </label>
                <div className="col-sm-5">
                  <ReactDatePicker
                    selected={ttl}
                    onChange={handleTempatTangalLahir}
                    dateFormat="dd/MM/yyyy"
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
                    onChange={handleAgama}
                  >
                    <option value="" disabled selected></option>
                    <option value="Kristen">Kristen</option>
                    <option value="Islam">Islam</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Budha">Budha</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="pekerjaan" className="col-sm-2 col-form-label">
                  <b>Pekerjaan</b>
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    name="pekerjaan"
                    id="pekerjaan"
                    value={pekerjaan}
                    onChange={handlePekerjaan}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="alamat" className="col-sm-2 col-form-label">
                  <b> Alamat</b>
                </label>
                <div className="col-sm-5">
                  <textarea
                    className="form-control"
                    name="alamat"
                    id="alamat"
                    rows="3"
                    value={alamat}
                    onChange={handleAlamat}
                  ></textarea>
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
                    onChange={handleRtRw}
                  >
                    <option value="" disabled selected></option>
                    <option value="007/001">007/001</option>
                    <option value="006/002">006/002</option>
                    <option value="005/003">005/003</option>
                    <option value="004/004">004/004</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="image" className="col-sm-2 col-form-label">
                  <b>Foto KTP</b>
                </label>
                <div className="col-sm-5">
                  <div className="input-group mb-3">
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                    <label
                      className="input-group-text"
                      htmlFor="inputGroupFile02"
                    >
                      Upload
                    </label>
                  </div>
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
    </div>
  );
}

export default SuratDomisili;

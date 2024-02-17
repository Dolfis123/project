import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Topnavbar from "../../../components/admin/Topnavbar";
import Footer from "../../../components/admin/Footer";
import { FaTrash } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import "../../../css/admin/detail/detail-surat.css";
function DetailSuratDomisili() {
  const [selectSurat, setSelectSurat] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [skckData, setSKCKData] = useState(null);

  // Bagian Edit start
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
  const [ktpErrorMessage, setKtpErrorMessage] = useState("");

  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { id } = useParams();

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

  useEffect(() => {
    fetchData2();
  }, [id]);

  const fetchData2 = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3040/lihat-surat-domisili-admin/${id}`
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
      setTtl(new Date(data.ttl).toString());
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Inside handleFormSubmit function, before making the API call
    const formattedDate = format(ttl, "yyyy-MM-dd");
    // Kirim permintaan ke backend untuk melakukan pengeditan
    try {
      const response = await axios.put(
        `http://localhost:3040/update-all-domisili/${id}`,
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
      alert("Data berhasil di update");
      console.log(response.data); // Output respon dari server (opsional)
      window.location.reload();
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
  // Bagian edit end

  useEffect(() => {
    // Ambil data surat ket domisili berdasarkan ID saat komponen di-mount
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3040/lihat-surat-domisili-admin/${id}`
      );
      setSKCKData(response.data.data);
    } catch (error) {
      console.error("Error fetching surat ket domisili  data:", error);
    }
  };
  const showDeleteConfirmation = (data) => {
    setSelectSurat(data);
    setShowDeleteModal(true);
  };

  const handleTerimaClick = async () => {
    try {
      await axios.post(`http://localhost:3040/terima-surat-domisli/${id}`);
      console.log("surat ket domisili dengan ID", id, "berhasil diterima.");
      fetchData(); // Refresh data setelah perubahan status
    } catch (error) {
      console.error("Error menerima ket domisili:", error);
    }
  };

  const handleDeleteClick = () => {
    if (selectSurat) {
      const id = selectSurat.id;
      axios
        .delete(`http://localhost:3040/hapus-surat-domisili/${id}`)
        .then((res) => {
          console.log("Data berhasil dihapus");
          setShowDeleteModal(false);
          // Redirect to Arsip page after successful deletion
          window.location.href = "/permintaan-surat-domisili";
        })
        .catch((err) => console.log(err));
    }
  };
  // Add a function to format the date
  const formatBirthdate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };
  if (!skckData) {
    return <div>Loading...</div>; // Tampilkan pesan loading selama data diambil
  }
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  return (
    <div>
      <div className="back">
        {/*  */}
        <Topnavbar />
        <br />

        <div className="container">
          <div className="card">
            <div className="card-header text-center">
              <h2 style={{ color: "#3468C0" }}>
                FORM EDIT BIODATA DIRI DOMISILI
              </h2>
            </div>
            <br />
            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
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
                      onChange={(e) => setName(e.target.value)}
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
                  <label
                    htmlFor="pekerjaan"
                    className="col-sm-2 col-form-label"
                  >
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
                  <label
                    htmlFor="keperluan"
                    className="col-sm-2 col-form-label"
                  >
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
                      onChange={(e) => setAlamat(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <br />
                <button type="submit" className="btn btn-success">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
        <br />

        <div className="container">
          <div className="card">
            <div className="card-header text-center">
              <h2 style={{ color: "#3468C0" }}>DETAIL BIODATA DIRI DOMISILI</h2>
            </div>
            <br />
            <div className="card-body">
              <div style={{ display: "flex", marginBottom: "5px" }}>
                <span style={{ flex: "0 0 150px" }}>No Pendaftaran</span>
                <span>: {skckData.nomor_surat}</span>
              </div>
              <div style={{ display: "flex", marginBottom: "5px" }}>
                <span style={{ flex: "0 0 150px" }}>Nama</span>
                <span>: {skckData.nama}</span>
              </div>
              <div style={{ display: "flex", marginBottom: "5px" }}>
                <span style={{ flex: "0 0 150px" }}>KTP</span>
                <span>: {skckData.ktp}</span>
              </div>
              <div style={{ display: "flex", marginBottom: "5px" }}>
                <span style={{ flex: "0 0 150px" }}>Tempat/Tanggal lahir </span>
                <span>
                  : {skckData.tempat_lahir}, {formatDate(skckData.ttl)}
                </span>
              </div>
              <div style={{ display: "flex", marginBottom: "5px" }}>
                <span style={{ flex: "0 0 150px" }}>Jenis Kelamin </span>
                <span>: {skckData.jk}</span>
              </div>
              <div style={{ display: "flex", marginBottom: "5px" }}>
                <span style={{ flex: "0 0 150px" }}>Agama </span>
                <span>: {skckData.agama}</span>
              </div>
              <div style={{ display: "flex", marginBottom: "5px" }}>
                <span style={{ flex: "0 0 150px" }}>Pekerjaan </span>
                <span>: {skckData.pekerjaan}</span>
              </div>
              <div style={{ display: "flex", marginBottom: "5px" }}>
                <span style={{ flex: "0 0 150px" }}>Alamat </span>
                <span>: {skckData.alamat}</span>
              </div>
              <div style={{ display: "flex", marginBottom: "5px" }}>
                <span style={{ flex: "0 0 150px" }}>RT /RW</span>
                <span>: {skckData.rt_rw}</span>
              </div>
              <div style={{ display: "flex", marginBottom: "5px" }}>
                <span style={{ flex: "0 0 150px" }}>No Telepon</span>
                <span>: {skckData.no_telepon}</span>
              </div>
              <div style={{ display: "flex", marginBottom: "5px" }}>
                <span style={{ flex: "0 0 150px" }}>Email</span>
                <span>: {skckData.email}</span>
              </div>
              <div style={{ display: "flex", marginBottom: "5px" }}>
                <span style={{ flex: "0 0 150px" }}>Keperluan</span>
                <span>: {skckData.keperluan}</span>
              </div>
              <div style={{ display: "flex", marginBottom: "5px" }}>
                <span style={{ flex: "0 0 150px" }}>Tanggal</span>
                <span>: {new Date(skckData.tanggal).toLocaleDateString()}</span>
              </div>
              <div style={{ display: "flex", marginBottom: "5px" }}>
                <span style={{ flex: "0 0 150px" }}>KTP Image</span>
                <div style={{ float: "right", maxWidth: "400px" }}>
                  {skckData.ktp_image && (
                    <img
                      src={`http://localhost:3040/images/${skckData.ktp_image}`}
                      className="img-thumbnail"
                      alt={skckData.nama}
                    />
                  )}
                </div>
              </div>
              <div style={{ display: "flex", marginBottom: "5px" }}>
                <span style={{ flex: "0 0 150px" }}>Status</span>
                <span>: {skckData.status_admin}</span>
              </div>

              <br />
              <br />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row", // Use row to align buttons horizontally
                  alignItems: "center",
                  // This will push the buttons to the ends
                  marginTop: "20px", // Adjust the margin as needed
                }}
              >
                <Link to={`/detail-surat-domisili/${skckData.id}`}>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "80px", // Adjust the width as needed
                      borderRadius: "5px",
                      marginLeft: "50px",
                    }}
                    className="btn btn-primary"
                    onClick={handleTerimaClick}
                  >
                    Terima
                  </button>
                </Link>
                <button
                  onClick={() => showDeleteConfirmation(skckData)}
                  className="btn btn-danger"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "80px", // Adjust the width as needed
                    borderRadius: "5px",
                    marginLeft: "50px",
                  }}
                >
                  Hapus
                  <FaTrash style={{ marginLeft: "5px" }} />
                </button>
              </div>

              <Modal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                backdropClassName="custom-backdrop"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Konfirmasi Hapus Surat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Apakah Anda yakin ingin menghapus surat ini?
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Batal
                  </Button>
                  <Button variant="danger" onClick={handleDeleteClick}>
                    Hapus
                  </Button>
                </Modal.Footer>
              </Modal>
              {/* <button onClick={() => handleDeleteClick(skckData.id)}>Hapus</button> */}

              <br />
              <br />
            </div>
          </div>
        </div>
        <br />
      </div>

      <Footer />
    </div>
  );
}

export default DetailSuratDomisili;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import "../../../css/admin/detail/detail-surat.css";

function Test11() {
  const [formData, setFormData] = useState({
    nama: "",
    ttl: null,
    jk: "",
    ktp: "",
    pekerjaan: "",
    rt_rw: "",
    agama: "",
    alamat: "",
    tempat_lahir: "",
    keperluan: "",
  });

  const { id } = useParams();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTanggalLahirChange = (date) => {
    setFormData((prevData) => ({ ...prevData, ttl: date }));
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3040/lihat-surat-domisili/${id}`
      );
      const fetchedData = response.data.data;

      setFormData({
        nama: fetchedData.nama,
        ttl: new Date(fetchedData.ttl),
        jk: fetchedData.jk,
        ktp: fetchedData.ktp,
        pekerjaan: fetchedData.pekerjaan,
        rt_rw: fetchedData.rt_rw,
        agama: fetchedData.agama,
        alamat: fetchedData.alamat,
        tempat_lahir: fetchedData.tempat_lahir,
        keperluan: fetchedData.keperluan,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = format(formData.ttl, "yyyy-MM-dd");

    try {
      const response = await axios.put(
        `http://localhost:3040/update-all-domisili/${id}`,
        formData
      );
      alert("Data berhasil diupdate");
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div>
      <div className="back">
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
                      value={formData.nama}
                      onChange={(e) => handleChange(e)}
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
                      value={formData.ktp}
                      onChange={(e) => handleChange(e)}
                      // onBlur={handleKtp}
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
                      value={formData.tempat_lahir}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="ttl" className="col-sm-2 col-form-label">
                    <b> Tanggal Lahir</b>
                  </label>
                  <div className="col-sm-5">
                    <ReactDatePicker
                      selected={formData.ttl ? new Date(formData.ttl) : null}
                      onChange={handleTanggalLahirChange}
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
                        checked={formData.jk === "Laki-laki"}
                        onChange={(e) => handleChange(e)}
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
                        checked={formData.jk === "Perempuan"}
                        onChange={(e) => handleChange(e)}
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
                      value={formData.pekerjaan}
                      onChange={(e) => handleChange(e)}
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
                      value={formData.agama}
                      onChange={(e) => handleChange(e)}
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
                  <label htmlFor="alamat" className="col-sm-2 col-form-label">
                    <b> Alamat</b>
                  </label>
                  <div className="col-sm-5">
                    <textarea
                      className="form-control"
                      name="alamat"
                      id="alamat"
                      rows="3"
                      value={formData.alamat}
                      onChange={(e) => handleChange(e)}
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
                      name="rt_rw"
                      id="rt_rw"
                      value={formData.rt_rw}
                      onChange={(e) => handleChange(e)}
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
                      value={formData.keperluan}
                      onChange={(e) => handleChange(e)}
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
      </div>
    </div>
  );
}

export default Test11;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddServiceForm = () => {
  const [serviceName, setServiceName] = useState("");
  const [serviceCode, setServiceCode] = useState("");
  const [serviceTemplate, setServiceTemplate] = useState(null); // Menggunakan null untuk menyimpan file template

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
  const handleSubmit = (e) => {
    e.preventDefault();

    // Kirim data ke backend menggunakan fetch atau library HTTP lainnya
    const formData = new FormData();
    formData.append("name", serviceName);
    formData.append("code", serviceCode);
    formData.append("template", serviceTemplate);

    // Ganti URL_API dengan URL endpoint Anda di server Node.js
    fetch("URL_API/add-service", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data berhasil disimpan:", data);
        // Tambahkan logika atau notifikasi sukses jika diperlukan
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
        // Tambahkan logika atau notifikasi kesalahan jika diperlukan
      });
  };

  const handleFileChange = (e) => {
    // Mengambil file dari input file dan menyimpannya ke state
    const file = e.target.files[0];
    setServiceTemplate(file);
  };

  return (
    <div className="wrapper">
      <div className="body-overlay"></div>

      {/* Sidebar */}
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>
            {/* <img src="./logo mkw 2" className="img-fluid" alt="logo" /> */}
            <img src="/img/logo mkw 2.png" alt="logo" />
            <span>Lurah Amban</span>
          </h3>
        </div>
        <ul className="list-unstyled components">
          <li>
            <a href="/dashboard" className="dashboard">
              <i className="material-icons">dashboard</i>
              <span>Dashboard</span>
            </a>
          </li>

          {/* Small Screen Navbar Display */}
          <div className="small-screen navbar-display">
            {/* Dropdown Menu */}
            <li className="dropdown d-lg-none d-md-block d-xl-none d-sm-block">
              <a
                href="#homeSubmenu0"
                data-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle"
              >
                <i className="material-icons">notifications</i>
                <span> 4 notification</span>
              </a>
            </li>

            <li className="d-lg-none d-md-block d-xl-none d-sm-block">
              <a href="#">
                <i className="material-icons">sms</i>
                <span>Pesan</span>
              </a>
            </li>

            <li className="d-lg-none d-md-block d-xl-none d-sm-block">
              <a href="#">
                <i className="material-icons">apps</i>
                <span>apps</span>
              </a>
            </li>

            <li className="d-lg-none d-md-block d-xl-none d-sm-block">
              <a href="#">
                <i className="material-icons">person</i>
                <span>user</span>
              </a>
            </li>
          </div>

          {/* Dropdown Menu */}
          <li className="dropdown">
            <a
              href="#pageSubmenu2"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="material-icons">auto_stories</i>
              <span>Halaman</span>
            </a>
            <ul className="collapse list-unstyled menu" id="pageSubmenu2">
              <li>
                <a href="/beranda1">
                  <i className="material-icons">cottage</i>
                  <span>Beranda</span>
                </a>
              </li>
              <li>
                <a href="/profil">
                  <i className="material-icons">person</i>
                  <span>Profil</span>
                </a>
              </li>
              <li>
                <a href="/berita">
                  <i className="material-icons">newspaper</i>
                  <span>Berita</span>
                </a>
              </li>
              <li>
                <a href="/pengumuman">
                  <i className="material-icons">campaign</i>
                  <span>Pengumuman</span>
                </a>
              </li>
            </ul>
          </li>

          {/* Dropdown Menu */}

          {/* <li className="dropdown">
          <a
            href="#pageSubmenu3"
            data-toggle="collapse"
            aria-expanded="false"
            className="dropdown-toggle"
          >
            <i className="material-icons">groups_2</i>
            <span>Penduduk</span>
          </a>
          <ul className="collapse list-unstyled menu" id="pageSubmenu3">
            <li>
              <a href="/tambahpenduduk">
                <i className="material-icons">person_add</i>
                <span>Tambah Penduduk</span>
              </a>
            </li>
            <li>
              <a href="#">Tambah Penduduk</a>
            </li>
            <li>
              <a href="#">Page 2</a>
            </li>
          </ul>
        </li> */}
          <li>
            <a href="/penduduk" className="dashboard">
              <i className="material-icons">groups_2</i>
              <span>Penduduk</span>
            </a>
          </li>

          {/* Dropdown Menu */}
          <li className="dropdown">
            <a
              href="#pageSubmenu6"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="material-icons">note</i>
              <span>Data Master</span>
            </a>
            <ul className="collapse list-unstyled menu" id="pageSubmenu6">
              <li className="active">
                <a href="/jenissurat">
                  <i className="material-icons">drafts</i>
                  <span>Jenis Surat</span>
                </a>
              </li>
              <li>
                <a href="#">Page 2</a>
              </li>
            </ul>
          </li>

          {/* Dropdown Menu */}
          <li className="dropdown">
            <a
              href="#pageSubmenu7"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="material-icons">email</i>
              <span>Persuratan</span>
            </a>
            <ul className="collapse list-unstyled menu" id="pageSubmenu7">
              <li>
                <a>
                  <i className="material-icons">mark_email_unread</i>
                  <span>Arsip</span>
                </a>
              </li>
              <li>
                <a>
                  <i className="material-icons">request_page</i>
                  <span>Permintaan</span>
                </a>
              </li>
            </ul>
          </li>

          {/* Other Menu Items */}
          <li className="">
            <a href="#">
              <i className="material-icons">date_range</i>
              <span>copy</span>
            </a>
          </li>

          <li className="">
            <a href="#">
              <i className="material-icons">library_books</i>
              <span>Kalender</span>
            </a>
          </li>
          <li className="">
            <a href="/location">
              <i className="material-icons">location_on</i>
              <span>Lokasi</span>
            </a>
          </li>
          <li className="">
            <a href="/setting">
              <i className="material-icons">settings</i>
              <span>Pengaturan</span>
            </a>
          </li>
          <li className="">
            <a href="#">
              <i className="material-icons">logout</i>
              <span>Keluar</span>
            </a>
          </li>
        </ul>
      </nav>
      {/* Page Content */}

      <div id="content">
        <div className="top-navbar">
          <nav className="navbar1 navbar-expand-lg">
            <div className="container-fluid">
              <button
                type="button"
                id="sidebarCollapse"
                className="d-xl-block d-lg-block d-md-mone d-none"
              >
                <span className="material-icons">arrow_back_ios</span>
              </button>
              <a className="navbar-brand" href="#">
                {" "}
                Administrator{" "}
              </a>

              <button
                className="d-inline-block d-lg-none ml-auto more-button"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="material-icons">more_vert</span>
              </button>

              <div
                className="collapse navbar-collapse d-lg-block d-xl-block d-sm-none d-md-none d-none"
                id="navbarSupportedContent"
              >
                <ul className="nav navbar-nav ml-auto">
                  {/* Dropdown Menu */}
                  <li className="dropdown nav-item active">
                    <a href="#" className="nav-link" data-toggle="dropdown">
                      <span className="material-icons">notifications</span>
                      <span className="notification">4</span>
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="#">You have 5 new messages</a>
                      </li>
                      <li>
                        <a href="#">You're now friend with Mike</a>
                      </li>
                      <li>
                        <a href="#">Wish Mary on her birthday!</a>
                      </li>
                      <li>
                        <a href="#">5 warnings in Server Console</a>
                      </li>
                    </ul>
                  </li>

                  {/* Other Menu Items */}
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <span className="material-icons">sms</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <span className="material-icons">apps</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <span className="material-icons">person</span>
                    </a>
                  </li>
                  {/* <li className="nav-item">
            <a className="nav-link" href="#">
              <span className="material-icons">settings</span>
            </a>
             </li> */}
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div>
          <div
            className="d-flex flex-column pt-4 text-black"
            style={{ marginLeft: "20px" }}
          >
            <form onSubmit={handleSubmit}>
              <div>
                <label>Nama Surat:</label>
                <input
                  type="text"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Kode Surat:</label>
                <input
                  type="text"
                  value={serviceCode}
                  onChange={(e) => setServiceCode(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Template Surat:</label>
                <input
                  type="file"
                  accept=".doc, .docx, .pdf" // Tentukan tipe file yang diperbolehkan untuk diunggah
                  onChange={handleFileChange}
                  required
                />
              </div>
              <div>
                <button type="submit">Tambah Layanan</button>
              </div>
            </form>
          </div>
        </div>
        <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <nav className="d-flex">
                  <ul className="m-0 p-0">
                    <li>
                      <a href="#"> Home </a>
                    </li>
                    <li>
                      <a href="#"> Kantor </a>
                    </li>
                    <li>
                      <a href="#"> Kelurahan </a>
                    </li>
                    <li>
                      <a href="#"> Blog </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-md-6">
                <p className="copyright d-flex justify-content-end">
                  &copy; 2023 By Dolfis Kareth || Dashboard Admin Lurah Amban
                  {/* <a href="#">Vishweb Design</a> BootStrap Admin Dashboard */}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AddServiceForm;

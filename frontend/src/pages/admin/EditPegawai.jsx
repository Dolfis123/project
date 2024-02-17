import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditPegawai() {
  const [data, setData] = useState({
    jabatan: "",
    nama: "",
    nip: "",
  });

  const navigate = useNavigate();
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
  useEffect(() => {
    axios
      .get(`http://localhost:3040/getbyid/${id}`)
      .then((res) => {
        setData({
          ...data,
          jabatan: res.data.Result[0].jabatan,
          nama: res.data.Result[0].nama,
          nip: res.data.Result[0].nip,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3040/update/${id}`, {
        jabatan: data.jabatan,
        nama: data.nama,
        nip: data.nip,
      })
      .then((res) => {
        console.log("Data Pegawai Berhasil di Edit:", res.data);
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  // const navigate = useNavigate();
  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Apakah Anda yakin ingin keluar dari halaman ini?"
    );

    if (confirmLogout) {
      axios
        .get("http://localhost:3040/logout", { withCredentials: true })
        .then((res) => {
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="wrapper">
      <div className="body-overlay"></div>

      {/* Sidebar */}
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>
            <img src="/img/logo mkw 2.png" alt="logo" />
            <span>Lurah Amban</span>
          </h3>
        </div>
        <ul className="list-unstyled components">
          <li className="active">
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
              <li>
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
          <li>
            <a href="/setting">
              <i className="material-icons">settings</i>
              <span>Pengaturan</span>
            </a>
          </li>
          <li className="" onClick={handleLogout}>
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
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div className="d-flex flex-column align-items-center loginPage pt-4">
          <h2>
            <span className="text-white">Edit Pegawai</span>
          </h2>
          <form className="row g-3 w-50 " onSubmit={handleSubmit}>
            <div className="col-12">
              <label htmlFor="inputJabatan" className="form-label text-white">
                Jabatan
              </label>
              <input
                type="text"
                className="form-control text-black"
                id="inputJabatan"
                placeholder="Masukan Jabatan"
                onChange={(e) => setData({ ...data, jabatan: e.target.value })}
                value={data.jabatan}
              />
            </div>
            <div className="col-12 ">
              <label htmlFor="inputNama" className="form-label text-white">
                Nama
              </label>
              <input
                type="text"
                className="form-control text-black"
                id="inputNama"
                placeholder="Masukan Nama"
                onChange={(e) => setData({ ...data, nama: e.target.value })}
                value={data.nama}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputNip" className="form-label text-white">
                NIP
              </label>
              <input
                type="text"
                className="form-control text-black"
                id="inputNip"
                placeholder="Masukan NIP"
                onChange={(e) => setData({ ...data, nip: e.target.value })}
                value={data.nip}
              />
            </div>
            <div className="col-15 text-white">
              <br />
              <div className="col-15 d-flex justify-content-between">
                <button type="submit" className="btn btn-primary order-1">
                  Edit
                </button>
                <button
                  type="submit"
                  className="btn btn-success rounded btn-center order-2"
                  onClick={(e) => navigate("/dashboard")}
                >
                  Kembali
                </button>
              </div>
            </div>
          </form>
          <br />
          <br />
          <br />
          <br />
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
}

export default EditPegawai;

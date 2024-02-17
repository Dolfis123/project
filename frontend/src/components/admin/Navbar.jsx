import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import io from "socket.io-client";

function Navbar({ activeComponent }) {
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // Menggunakan Socket.io untuk mendengarkan notifikasi baru
    const socket = io("http://localhost:3040");
    socket.on("newFormNotification", (formData) => {
      // Update jumlah notifikasi
      setNotificationCount((prevCount) => prevCount + 1);
    });

    // Cleanup ketika komponen unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Apakah Anda yakin ingin keluar dari halaman ini?"
    );

    if (confirmLogout) {
      axios
        .get("http://localhost:3040/logout", { withCredentials: true })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <nav id="sidebar">
      <div className="sidebar-header animated slideInDown">
        <h3>
          <img src="/img/logo mkw 1.png" alt="logo" />
          Lurah Amban
        </h3>
      </div>
      <ul className="list-unstyled components">
        {/* Dashboard */}
        <li className={`${activeComponent === "Dashboard" ? "active" : ""}`}>
          <Link to="/dashboard" className="dashboard">
            <span>
              <i className="material-icons">dashboard</i>
              <span>Dashboard</span>
            </span>
          </Link>
        </li>
        {/* Small Screen Navbar Display */}
        <div className="small-screen navbar-display">
          {/* Dropdown Menu */}
          <li className="dropdown d-lg-none d-md-block d-xl-none d-sm-block">
            <Link
              to="#homeSubmenu0"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="material-icons">notifications</i>
              <span> {notificationCount} notification</span>
            </Link>
          </li>
          <li className="d-lg-none d-md-block d-xl-none d-sm-block">
            <Link to="#">
              <i className="material-icons">sms</i>
              <span>Pesan</span>
            </Link>
          </li>
          <li className="d-lg-none d-md-block d-xl-none d-sm-block">
            <Link to="#">
              <i className="material-icons">apps</i>
              <span>apps</span>
            </Link>
          </li>
          <li className="d-lg-none d-md-block d-xl-none d-sm-block">
            <Link to="#">
              <i className="material-icons">person</i>
              <span>user</span>
            </Link>
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
            <li
              className={`beranda ${
                activeComponent === "Beranda" ? "active" : ""
              }`}
            >
              <Link to="/beranda1">
                <i className="material-icons">cottage</i>
                <span>Beranda</span>
              </Link>
            </li>

            <li
              className={`profil ${
                activeComponent === "Profil" ? "active" : ""
              }`}
            >
              <Link to="/profil">
                <i className="material-icons">person</i>
                <span>Profil</span>
              </Link>
            </li>

            <li
              className={`berira ${
                activeComponent === "Berita" ? "active" : ""
              }`}
            >
              <Link to="/berita">
                <i className="material-icons">newspaper</i>
                <span>Berita</span>
              </Link>
            </li>
            {/* <li
              className={`pengumuman ${
                activeComponent === "Pengumuman" ? "active" : ""
              }`}
            >
              <a href="/pengumuman">
                <i className="material-icons">campaign</i>
                <span>Pengumuman</span>
              </a>
            </li> */}
          </ul>
        </li>
        {/* Penduduk */}
        {/* <li
          className={`penduduk ${
            activeComponent === "Penduduk" ? "active" : ""
          }`}
        >
          <Link to="/penduduk" className="dashboard">
            <i className="material-icons">groups_2</i>
            <span>Penduduk</span>
          </Link>
        </li> */}

        <li className="dropdown">
          <a
            href="#pageSubmenu6"
            data-toggle="collapse"
            aria-expanded="false"
            className="dropdown-toggle"
          >
            <i className="material-icons">email</i>
            <span>Permintaan</span>
          </a>
          <ul className="collapse list-unstyled menu" id="pageSubmenu6">
            <li>
              <Link to="/permintaan-surat-domisili">
                <i className="material-icons">mark_email_unread</i>
                <span>Surat Ket Domisili</span>
              </Link>
            </li>
            <li>
              <Link to="/permintaan-surat-tidak-mampu">
                <i className="material-icons">email</i>
                <span>Surat Ket Tidak Mampu</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className="dropdown">
          <a
            href="#pageSubmenu7"
            data-toggle="collapse"
            aria-expanded="false"
            className="dropdown-toggle"
          >
            <i className="material-icons">email</i>
            <span>Arsip</span>
          </a>
          <ul className="collapse list-unstyled menu" id="pageSubmenu7">
            <li>
              <Link to="/arsip-surat-domisili">
                <i className="material-icons">mark_email_unread</i>
                <span>Surat Ket Domisili</span>
              </Link>
            </li>
            <li>
              <Link to="/surat-tidak-mampu-arsip">
                <i className="material-icons">email</i>
                <span>Surat Ket Tidak Mampu</span>
              </Link>
            </li>
          </ul>
        </li>

        <li
          className={`lokasi ${activeComponent === "Lokasi" ? "active" : ""}`}
        >
          <Link to="/location">
            <i className="material-icons">location_on</i>
            <span>Lokasi</span>
          </Link>
        </li>
        <li
          className={`setting ${
            activeComponent === "Pengaturan" ? "active" : ""
          }`}
        >
          <Link to="/setting">
            <i className="material-icons">settings</i>
            <span>Pengaturan</span>
          </Link>
        </li>
        <li className="" onClick={handleLogout}>
          <Link to="#">
            <i className="material-icons">logout</i>
            <span>Keluar</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

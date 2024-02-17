import React, { useState } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

function Sidebar({ activeComponent }) {
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
        .then((res) => {
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <nav id="sidebar">
      <div className="sidebar-header ">
        <h3>
          <img src="./public/img/logo mkw.png" alt="logo" />
          <span>Lurah Amban</span>
        </h3>
      </div>
      <ul className="list-unstyled components">
        <li>
          <a
            href="/dashboard"
            className={`dashboard ${
              activeComponent === "Dashboard" ? "active" : ""
            }`}
          >
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
              <span> {notificationCount} notification</span>
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
              <a
                href="/beranda1"
                className={`${activeComponent === "Beranda" ? "active" : ""}`}
              >
                <i className="material-icons">cottage</i>
                <span>Beranda</span>
              </a>
            </li>
            <li>
              <li>
                <a
                  href="/profil"
                  data-toggle="collapse"
                  className={`${activeComponent === "Profil" ? "active" : ""}`}
                >
                  <i className="material-icons">person</i>
                  <span>Profil</span>
                </a>
              </li>
            </li>
            <li>
              <a
                href="/berita"
                className={`${activeComponent === "Berita" ? "active" : ""}`}
              >
                <i className="material-icons">newspaper</i>
                <span>Berita</span>
              </a>
            </li>
            <li>
              <a
                href="/pengumuman"
                className={`${
                  activeComponent === "Pengumuman" ? "active" : ""
                }`}
              >
                <i className="material-icons">campaign</i>
                <span>Pengumuman</span>
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a
            href="/penduduk"
            className={`dashboard ${
              activeComponent === "Penduduk" ? "active" : ""
            }`}
          >
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
        <li>
          <a
            href="#"
            className={` ${activeComponent === "Kalender" ? "active" : ""}`}
          >
            <i className="material-icons">library_books</i>
            <span>Kalender</span>
          </a>
        </li>
        <li>
          <a
            href="/location"
            className={`${activeComponent === "Lokasi" ? "active" : ""}`}
          >
            <i className="material-icons">location_on</i>
            <span>Lokasi</span>
          </a>
        </li>
        <li>
          <a
            href="/setting"
            className={`${activeComponent === "Pengaturan" ? "active" : ""}`}
          >
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
  );
}

export default Sidebar;

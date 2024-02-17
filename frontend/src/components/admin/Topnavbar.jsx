import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3041");
function Topnavbar() {
  const [notificationCount, setNotificationCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Memasang event listener untuk notifikasi baru
    socket.on("newFormNotification", (notification) => {
      // Menginkrementasi jumlah notifikasi ketika mendapatkan notifikasi baru
      setNotificationCount((prevCount) => prevCount + 1);
      // Menambahkan notifikasi ke daftar notifikasi
      setNotifications((prevNotifications) => [
        notification,
        ...prevNotifications,
      ]);

      // Simpan notifikasi di localStorage
      localStorage.setItem(
        "notifications",
        JSON.stringify([
          notification,
          ...JSON.parse(localStorage.getItem("notifications") || "[]"),
        ])
      );
    });

    // Mengambil notifikasi dari localStorage saat komponen dimuat
    const storedNotifications = JSON.parse(
      localStorage.getItem("notifications") || "[]"
    );
    setNotificationCount(storedNotifications.length);
    setNotifications(storedNotifications);

    // Membersihkan event listener pada unmount
    return () => {
      socket.off("newFormNotification");
    };
  }, []);

  const handleNotificationsClick = () => {
    // Mengatur jumlah notifikasi menjadi 0 saat tombol notifikasi diklik
    setNotificationCount(0);
    // Menyembunyikan notifikasi setelah diklik
    setShowNotifications(false);

    // Menghapus notifikasi dari localStorage setelah diklik
    localStorage.removeItem("notifications");
  };
  return (
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
          <span className="text-black">Administrator</span>

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
              <li className="dropdown nav-item">
                <Link
                  to="#"
                  className="nav-link"
                  data-toggle="dropdown"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <span className="material-icons">notifications</span>
                  {notificationCount > 0 && (
                    <span className="notification">{notificationCount}</span>
                  )}
                </Link>
                {/* Dropdown Content */}
                {showNotifications && (
                  <ul className="dropdown-menu">
                    {/* Daftar notifikasi dapat ditambahkan di sini */}
                    {notifications.map((notification, index) => (
                      <li className="notification-item" key={index}>
                        <Link to="/permintaan-surat-domisili">
                          <span onClick={handleNotificationsClick}>
                            {notification.message}
                          </span>
                        </Link>
                      </li>
                    ))}
                    {/* ... (Tambahkan item notifikasi sesuai kebutuhan) */}
                  </ul>
                )}
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
  );
}

export default Topnavbar;

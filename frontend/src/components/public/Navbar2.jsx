// import React from "react";
import { Link } from "react-router-dom";
import "../../css/public/VideoComponent.css";
import "../../css/admin/profil2.css";
import "../../css/admin/style.css";
import "../../css/public/style2.css";

// eslint-disable-next-line react/prop-types
function Navbar2({ activeComponent }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark  px-3 py-3 py-lg-0">
      <a href="#" className="navbar-brand p-0">
        <pre>
          <h1 className="m-0 animated slideInDown">
            <img
              style={{
                justifyContent: "center",
                marginTop: "15px",
                width: "58px",
                height: "63px",
              }}
              src="/img/logo mkw 1.png"
              alt="logo"
            />
            <span> Kelurahan Amban</span>
          </h1>
        </pre>
      </a>
      {/* ... */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="fa fa-bars" />
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto py-0">
          <Link
            to="/"
            className={`nav-item nav-link ${
              activeComponent === "Beranda" ? "active" : ""
            }`}
          >
            Beranda
          </Link>
          <Link
            to="/profil12"
            className={`nav-item nav-link ${
              activeComponent === "Profil" ? "active" : ""
            }`}
          >
            Profil
          </Link>
          <Link
            to="/informasi"
            className={`nav-item nav-link ${
              activeComponent === "Informasi" ? "active" : ""
            }`}
          >
            Informasi
          </Link>
          {/* <Link
            to="/penduduk2"
            className={`nav-item nav-link ${
              activeComponent === "Penduduk" ? "active" : ""
            }`}
          >
            Penduduk
          </Link> */}
          <Link
            to="/layanan2"
            className={`nav-item nav-link ${
              activeComponent === "Layanan" ? "active" : ""
            }`}
          >
            Layanan
          </Link>
          <Link
            to="/kontak"
            className={`nav-item nav-link ${
              activeComponent === "Kontak" ? "active" : ""
            }`}
          >
            Kontak
          </Link>
        </div>
        {/* ... */}
        <div className="navbar-nav" style={{ marginLeft: "30px" }}>
          <a href="/login" className="nav-item nav-link">
            <span
              className=" btn btn-outline-info py-md-3 px-md-5 animated slideInRight "
              style={{
                borderRadius: "30px",
              }}
            >
              <b>Masuk</b>
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar2;

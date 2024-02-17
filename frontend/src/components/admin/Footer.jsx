import React from "react";

function Footer() {
  return (
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
  );
}

export default Footer;

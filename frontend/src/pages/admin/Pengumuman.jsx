import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/admin/Navbar";
import Topnavbar from "../../components/admin/Topnavbar";
import Footer from "../../components/admin/Footer";
import axios from "axios";
import { useEffect } from "react";
function Pengumuman() {
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
  return (
    <div className="wrapper">
      <div className="body-overlay" />

      {/* Sidebar */}
      <Navbar activeComponent={"Pengumuman"} />
      {/* Page Content */}
      <div id="content">
        <Topnavbar />
        <div className="mt-3">
          <Link to="/tambahberita" className="btn btn-success">
            Tambah Berita
          </Link>
          <div className="card card-stats">
            <table className="table">
              <thead>
                <tr>
                  <th className="text-center pb-1">
                    <b>BERITA 1</b>
                  </th>
                  <th className="text-center pb-1">
                    <b>BERITA 2</b>
                  </th>
                  <th className="text-center pb-1">
                    <b>BERITA 3</b>
                  </th>
                </tr>
              </thead>
              <tbody />
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
export default Pengumuman;

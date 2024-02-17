import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/admin/Navbar";
import Topnavbar from "../../components/admin/Topnavbar";
import Footer from "../../components/admin/Footer";
import axios from "axios";
import { useEffect } from "react";
function Penduduk() {
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
      <Navbar activeComponent={"Penduduk"} />
      <div id="content">
        <Topnavbar />
        <div className="mt-3" style={{ marginLeft: "20px" }}>
          <Link to="/tambahpenduduk" className="btn btn-success">
            Tambah Penduduk
          </Link>
          <div className="card card-stats">
            <table className="table">
              <thead>
                <tr>
                  <th className="text-center pb-1">
                    <b>Nama</b>
                  </th>
                  <th className="text-center pb-1">
                    <b>NIK</b>
                  </th>
                  <th className="text-center pb-1">
                    <b>Umur</b>
                  </th>
                  <th className="text-center pb-1">
                    <b>Alamat</b>
                  </th>
                  <th className="text-center pb-1">
                    <b>Prodi</b>
                  </th>
                  <th className="text-center pb-1">
                    <b>Fakultas</b>
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
export default Penduduk;

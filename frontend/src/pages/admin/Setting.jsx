import { useNavigate } from "react-router-dom";
import Footer from "../../components/admin/Footer";
import Navbar from "../../components/admin/Navbar";
import Topnavbar from "../../components/admin/Topnavbar";
import axios from "axios";
import { useEffect } from "react";
function Setting() {
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
      <Navbar activeComponent={"Pengaturan"} />
      <div id="content">
        <Topnavbar />
        <dir>
          <h3 style={{ textAlign: "center" }}>Content Setting</h3>
        </dir>
        <Footer />
      </div>
    </div>
  );
}
export default Setting;

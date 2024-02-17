import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../../components/admin/Footer";
import Navbar from "../../components/admin/Navbar";
import Topnavbar from "../../components/admin/Topnavbar";
import axios from "axios";
function Location() {
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
      <Navbar activeComponent={"Lokasi"} />
      <div id="content">
        <Topnavbar />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3371.2401128359197!2d134.06008187038327!3d-0.842123633396838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d540b025081f9eb%3A0x1cc8b5d44a4f1b0c!2sKantor%20Lurah%20Amban!5e1!3m2!1sid!2sid!4v1689553216107!5m2!1sid!2sid"
          width="1150"
          height="650"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <Footer />
      </div>
    </div>
  );
}
export default Location;

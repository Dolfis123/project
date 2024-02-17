import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { tr } from "date-fns/locale";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3040/dashboard")
      .then((res) => {
        if (res.data.email) {
          navigate("/dashboard");
        } else {
          navigate("/login");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    axios
      .post("http://localhost:3040/login", { email, password })
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log("Login berhasil");
          localStorage.setItem("isLoggedIn", "true");

          navigate("/dashboard");
        } else {
          setError("Email atau password salah");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div
      className="d-flex vh-100 align-items-center justify-content-center flex-column"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1622638989794-3c2dd13726ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="animated slideInDown">
        <img
          style={{ justifyContent: "center", marginTop: "15px" }}
          width="175px"
          height="185px"
          src="/img/logo mkw 1.png"
          alt="logo"
        />
      </div>
      <br />
      <div className="p-5 bg-white rounded w-50 animated zoomIn">
        {error && <div className="alert alert-danger">{error}</div>}
        <h3 className="animated slideInLeft" style={{ textAlign: "center" }}>
          Masuk Sebagai Admin
        </h3>
        <br />
        <form className="animated zoomIn" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Masukkan Email"
              name="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Kata Sandi</label>
            <input
              type="password"
              placeholder="Masukan Kata Sandi"
              name="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <div className="col-5 d-flex justify-content-between">
            <button type="submit" className="btn btn-primary order-1">
              Masuk
            </button>
            <button
              type="button"
              className="btn btn-success rounded btn-center order-2"
              onClick={() => navigate("/")}
            >
              Kembali
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

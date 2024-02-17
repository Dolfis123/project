import Chart from "react-apexcharts";
// import Topbar from '../../components/public/Topbar';
import Footer from "../../components/public/Footer";
import Navbar2 from "../../components/public/Navbar2";
function Penduduk2() {
  return (
    <div className="bg-body-secondary">
      {/* Navbar Start */}
      <div className="container-fluid position-relative p-0">
        <Navbar2 activeComponent={"Penduduk"} />
        <div
          className="container-fluid bg-primary py-5 bg-header"
          style={{ marginBottom: "90px" }}
        >
          <div className="row py-5">
            <div className="col-12 pt-lg-5 mt-lg-5 text-center">
              <h1 className="display-4 text-white animated zoomIn">
                Tentang Penduduk
              </h1>
            </div>
          </div>
        </div>
      </div>
      {/* Navbar End */}
      <div className="" style={{ textAlign: "center", color: "blue" }}>
        <h3>Jumlah Penduduk</h3>
      </div>

      <div
        className="main-content"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <div className="row bg-body-secondary">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-stats ">
              <div className="card-header">
                <div className="icon icon-warning">
                  <span className="material-icons">family_restroom</span>
                </div>
              </div>
              <div className="card-content text-center pb-2">
                <p className="category">
                  <strong>Jumlah Keluarga</strong>
                </p>
              </div>
              <div className="card-footer text-left pb-2">
                <h5>Total: </h5>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-stats">
              <div className="card-header">
                <div className="icon icon-rose">
                  <span className="material-icons">groups</span>
                </div>
              </div>
              <div className="card-content text-center pb-2">
                <p className="category">
                  <strong>Jumlah Penduduk</strong>
                </p>
              </div>
              <div className="card-footer text-left pb-2">
                <h5>Total: </h5>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-stats">
              <div className="card-header">
                <div className="icon icon-success">
                  <span className="material-icons">man</span>
                </div>
              </div>
              <div className="card-content text-center pb-2">
                <p className="category">
                  <strong>Jumlah Laki-Laki</strong>
                </p>
                {/* <h3 className="card-title">15</h3> */}
              </div>
              <div className="card-footer text-left pb-2">
                <h5>Total: </h5>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-stats">
              <div className="card-header">
                <div className="icon icon-info">
                  <span className="material-icons"> woman </span>
                </div>
              </div>
              <div className="card-content text-center pb-2">
                <p className="category">
                  <strong>Jumlah Perempuan</strong>
                </p>
                {/* <h3 className="card-title">12</h3> */}
              </div>
              <div className="card-footer text-left pb-2">
                <h5>Total: </h5>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Chart
            type="pie"
            width={400}
            height={350}
            series={[28, 38]}
            options={{
              labels: ["Laki-Laki", "Perempuan"],
            }}
          />
          <Chart
            type="pie"
            width={400}
            height={350}
            series={[50, 35, 25]}
            options={{
              labels: ["SD", "SMP", "Mahasiswa"],
            }}
          />
        </div>

        <br />
      </div>
      <Footer />
    </div>
  );
}
export default Penduduk2;

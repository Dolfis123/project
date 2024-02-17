import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
function Edit() {
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
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Update Employee</h2>
      <form className="row g-3 w-50">
        <div className="col-12">
          <label For="inputNama" className="form-label">
            Nama
          </label>
          <input
            type="text"
            className="form-control"
            id="inputNama"
            placeholder="Enter Nama"
            autoComplete="off"
            onChange={(e) => setData({ ...data, nama: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label For="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            placeholder="Enter Email"
            autoComplete="off"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            value={data.email}
          />
        </div>
        <div className="col-12">
          <label For="inputAddress4" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main"
            autoComplete="off"
            onChange={(e) => setData({ ...data, address: e.target.value })}
            value={data.address}
          />
        </div>
        <div className="col-12">
          <label For="inputSalary" className="form-label">
            Salary
          </label>
          <input
            type="text"
            className="form-control"
            id="inputSalary"
            placeholder="Enter Salary"
            autoComplete="off"
            // eslint-disable-next-line no-undef
            onChange={(e) => setData({ ...data, salary: e.target.value })}
            // eslint-disable-next-line no-undef
            value={data.salary}
          />
        </div>
        <div className="col-15 d-flex justify-content-between">
          <button type="submit" className="btn btn-primary order-1">
            Update
          </button>
          <button
            type="submit"
            className="btn btn-success rounded btn-center order-2"
            // eslint-disable-next-line no-undef
            onClick={() => navigate("/employee")}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;

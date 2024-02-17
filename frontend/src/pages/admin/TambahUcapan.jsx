import { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

function TambahUcapan() {
  const navigate = useNavigate();
  // const quillRefUcapan = useRef();

  const [data, setData] = useState({
    pesan: "",
    image: null,
  });

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

  const handleChangePesan = (value) => {
    setData({ ...data, pesan: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("pesan", data.pesan);
    formData.append("image", data.image);
    axios
      .post("http://localhost:3040/ucapan", formData)
      .then((res) => {
        console.log("Data berhasil ditambahkan: ", res.data);
        navigate("/beranda1");
      })
      .catch((err) => console.log(err));
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
      ["blockquote"],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ size: ["small", false, "large", "huge"] }],
      ["code-block"],
    ],
  };

  return (
    <div>
      <div className="d-flex flex-column align-items-center pt-4 text-black">
        <h2>
          <span className="text-black">Tambah Ucapan</span>
        </h2>
        <form className="row g-3 w-50" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputPesan" className="form-label ">
              Pesan
            </label>
            <ReactQuill
              id="inputPesan"
              value={data.pesan}
              onChange={handleChangePesan}
              modules={modules}
              theme="snow"
              style={{ width: "100%", height: "280px" }}
            />

            <br />
            <br />
          </div>
          <div className="col-12">
            <label htmlFor="inputImage" className="form-label text-white">
              Image
            </label>
            <input
              type="file"
              className="form-control"
              id="inputImage"
              onChange={(e) => setData({ ...data, image: e.target.files[0] })}
              style={{ width: "50%", height: "50px" }}
            />
          </div>
          <div className="col-15 text-white">
            <br />
            <div className="col-15 d-flex justify-content-between">
              <button type="submit" className="btn btn-primary order-1">
                Buat
              </button>
              <button
                type="button"
                className="btn btn-success rounded btn-center order-2"
                onClick={() => navigate("/beranda1")}
              >
                Kembali
              </button>
            </div>
          </div>
        </form>
        <br />
        <br />
      </div>
    </div>
  );
}

export default TambahUcapan;

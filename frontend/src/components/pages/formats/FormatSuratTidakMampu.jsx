import React from "react";
import jsPDF from "jspdf";
// import { storage } from "./firebaseConfig"; // Gantilah dengan implementasi penyimpanan Anda
import api from "./api"; // Gantilah dengan modul/api pengiriman HTTP di proyek Anda

function FormatSuratTidakMampu() {
  const generatePDF = async ({
    id, // Tambahkan id sebagai parameter
    nama,
    jenis_kelamin,
    tempat_tanggal_lahir,
    agama,
    pekerjaan,
    alamat,
    rt_rw,
  }) => {
    try {
      const pdf = new jsPDF();
      pdf.text(
        "Surat Keterangan Tidak Mampu",
        pdf.internal.pageSize.getWidth() / 2,
        10,
        "center"
      );

      const content = [
        `Nama              : ${nama}`,
        `Jenis Kelamin     : ${jenis_kelamin}`,
        `TTL               : ${tempat_tanggal_lahir}`,
        `Agama             : ${agama}`,
        `Pekerjaan         : ${pekerjaan}`,
        `Alamat            : ${alamat}`,
        `RT/RW             : ${rt_rw}`,
        // Tambahkan informasi lainnya sesuai kebutuhan
      ];

      pdf.text(content, 10, 30);

      // Simpan file PDF di server atau cloud storage
      const pdfBlob = pdf.output("blob");
      const pdfPath = `pdfs/${nama}-Surat_Keterangan_Tidak_Mampu.pdf`;

      // Simpan informasi ke database
      try {
        await api.post("/update-pdf-path", { id, pdfPath }); // Gantilah dengan endpoint dan payload yang sesuai
        console.log("PDF path updated in the database:", pdfPath);
      } catch (error) {
        console.error("Error updating PDF path in the database:", error);
      }

      console.log("PDF created successfully");

      // Kembalikan path file PDF
      return pdfPath;
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw new Error("Error generating PDF");
    }
  };
}

export default FormatSuratTidakMampu;

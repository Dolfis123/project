import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

function SKCK() {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [noKTP, setNoKTP] = useState("");

  const validateKTP = (noKTP) => {
    // Implement your backend validation logic here
    // Return true if noKTP is valid, otherwise return false
    return true; // Replace with actual validation result
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    if (validateKTP(noKTP)) {
      doc.text(`Nama: ${nama}`, 10, 10);
      doc.text(`No KTP: ${noKTP}`, 10, 20);
      // Add more content to the PDF
      doc.save("skck.pdf");
    } else {
      alert("No KTP tidak valid");
    }
  };

  return (
    <div>
      <div>
        <label>Nama:</label>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
      </div>
      <div>
        <label>No KTP:</label>
        <input
          type="text"
          value={noKTP}
          onChange={(e) => setNoKTP(e.target.value)}
        />
      </div>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
}

export default SKCK;

import React, { useState } from "react";
import "./DocumentUpload.css";
import { useNavigate } from "react-router-dom";

const DocumentUpload = () => {
  const navigate = useNavigate();
  const [aadhaarPreview, setAadhaarPreview] = useState(null);
  const [panPreview, setPanPreview] = useState(null);
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [aadhaarData, setAadhaarData] = useState(null);
  const [panData, setPanData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 📂 Handle File Change
  const handleFileChange = (e, setPreview, setFile) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (event) => setPreview(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  // 🧠 Aadhaar Extraction Handler
  const handleExtractAadhaar = async () => {
    if (!aadhaarFile) {
      alert("Please upload your Aadhaar card first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("aadhaar", aadhaarFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/extract_aadhaar", {
        method: "POST",
        body: formData,
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Failed to connect to backend: ${errText}`);
      }

      const result = await response.json();
      console.log("✅ Aadhaar Response:", result);

      if (result.extracted_data) {
        setAadhaarData(result.extracted_data);
      } else {
        alert("No data extracted. Try again with a clearer image.");
      }
    } catch (error) {
      console.error("❌ Error extracting Aadhaar data:", error);
      alert("Failed to extract Aadhaar details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🧠 PAN Extraction Handler
  const handleExtractPan = async () => {
    if (!panFile) {
      alert("Please upload your PAN card first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("pan", panFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/extract_pan", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Failed to connect to backend: ${errText}`);
      }

      const result = await response.json();
      console.log("✅ PAN Response:", result);

      if (result.extracted_data) {
        setPanData(result.extracted_data);
      } else {
        alert("No PAN data extracted. Try again with a clearer image.");
      }
    } catch (error) {
      console.error("❌ Error extracting PAN data:", error);
      alert("Failed to extract PAN details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      {/* 🔝 Navbar */}
      <nav>
        <div className="logo">🟡 SecureKYC</div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#" className="btn-yellow">
            KYC Upload
          </a>
          <a href="#">My Documents</a>
          <button className="btn-logout" onClick={() => navigate("/")}>
            Logout
          </button>
        </div>
      </nav>

      {/* 🧾 Main Upload Section */}
      <div className="container">
        <div className="section-title">Personal Information</div>
        <div className="form-grid">
          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="dd-mm-yyyy" />
          <select>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input type="text" placeholder="Mobile Number" />
        </div>

        {/* Aadhaar Upload */}
        <div className="section-title" style={{ marginTop: 25 }}>
          Aadhaar Card Upload
        </div>
        <div
          className="upload-box"
          onClick={() => document.getElementById("aadhaar").click()}
        >
          {aadhaarPreview ? (
            <>
              <p>Aadhaar Preview:</p>
              <img src={aadhaarPreview} alt="Aadhaar" />
            </>
          ) : (
            <>
              <p>📂 Drop Aadhaar here or click to upload</p>
              <small>JPEG/PNG • Max 2MB</small>
            </>
          )}
          <input
            type="file"
            id="aadhaar"
            hidden
            accept="image/*"
            onChange={(e) => handleFileChange(e, setAadhaarPreview, setAadhaarFile)}
          />
        </div>

        <div className="btn-row">
          <button className="btn btn-yellow2" onClick={handleExtractAadhaar}>
            {loading ? "Extracting..." : "Extract Aadhaar Data"}
          </button>
        </div>

        {/* ✅ Display Extracted Aadhaar Data */}
        {aadhaarData && (
          <div
            className="extracted-data"
            style={{
              marginTop: "30px",
              background: "#111",
              padding: "15px",
              borderRadius: "10px",
              color: "white",
            }}
          >
            <h3 style={{ color: "#ffd700" }}>✅ Extracted Aadhaar Details:</h3>
            <p>
              <strong>Name:</strong> {aadhaarData.name || "N/A"}
            </p>
            <p>
              <strong>Date of Birth:</strong> {aadhaarData.dob || "N/A"}
            </p>
            <p>
              <strong>Gender:</strong> {aadhaarData.gender || "N/A"}
            </p>
            <p>
              <strong>Aadhaar Number:</strong> {aadhaarData.aadhaar_number || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {aadhaarData.address || "N/A"}
            </p>

            <div style={{ marginTop: "15px" }}>
              <button
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  padding: "8px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
                onClick={() => alert("✅ Aadhaar data confirmed!")}
              >
                Confirm
              </button>

              <button
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "8px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setAadhaarFile(null);
                  setAadhaarPreview(null);
                  setAadhaarData(null);
                }}
              >
                Re-upload
              </button>
            </div>
          </div>
        )}

        {/* PAN Upload */}
        <div className="section-title" style={{ marginTop: 25 }}>
          PAN Card Upload
        </div>
        <div
          className="upload-box"
          onClick={() => document.getElementById("pan").click()}
        >
          {panPreview ? (
            <>
              <p>PAN Preview:</p>
              <img src={panPreview} alt="PAN" />
            </>
          ) : (
            <>
              <p>📂 Drop PAN here or click to upload</p>
              <small>JPEG/PNG • Max 2MB</small>
            </>
          )}
          <input
            type="file"
            id="pan"
            hidden
            accept="image/*"
            onChange={(e) => handleFileChange(e, setPanPreview, setPanFile)}
          />
        </div>

        <div className="btn-row">
          <button className="btn btn-yellow2" onClick={handleExtractPan}>
            {loading ? "Extracting..." : "Extract PAN Data"}
          </button>
        </div>

        {/* ✅ Display Extracted PAN Data */}
        {panData && (
          <div
            className="extracted-data"
            style={{
              marginTop: "30px",
              background: "#111",
              padding: "15px",
              borderRadius: "10px",
              color: "white",
            }}
          >
            <h3 style={{ color: "#ffd700" }}>✅ Extracted PAN Details:</h3>
            <p>
              <strong>Name:</strong> {panData.name || "N/A"}
            </p>
            <p>
              <strong>PAN Number:</strong> {panData.pan_number || "N/A"}
            </p>
            <p>
              <strong>Father's Name:</strong> {panData.father_name || "N/A"}
            </p>
            <p>
              <strong>Date of Birth:</strong> {panData.dob || "N/A"}
            </p>

            <div style={{ marginTop: "15px" }}>
              <button
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  padding: "8px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
                onClick={() => alert("✅ PAN data confirmed!")}
              >
                Confirm
              </button>

              <button
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "8px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setPanFile(null);
                  setPanPreview(null);
                  setPanData(null);
                }}
              >
                Re-upload
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;

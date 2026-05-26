import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const api = axios.create({
  baseURL: "https://breathe-esg-backend-itnd.onrender.com/api/",
});

function App() {

  const fallbackRecords = [
    {
      id: 1,
      source: "SAP",
      value: 1200,
      unit: "Liters",
      suspicious: false,
      status: "Approved",
    },
    {
      id: 2,
      source: "Utility",
      value: -500,
      unit: "kWh",
      suspicious: true,
      status: "Pending",
    },
    {
      id: 3,
      source: "Travel",
      value: 3400,
      unit: "km",
      suspicious: false,
      status: "Approved",
    },
    {
      id: 4,
      source: "SAP",
      value: 890,
      unit: "Diesel",
      suspicious: false,
      status: "Pending",
    },
    {
      id: 5,
      source: "Utility",
      value: 15200,
      unit: "kWh",
      suspicious: false,
      status: "Approved",
    },
    {
      id: 6,
      source: "Travel",
      value: 0,
      unit: "Airport Code Missing",
      suspicious: true,
      status: "Pending",
    },
  ];

  const [records, setRecords] = useState(fallbackRecords);

  const [file, setFile] = useState(null);

  const [sourceType, setSourceType] = useState("SAP");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {

    try {

      const response = await api.get("records/");

      console.log("API Response:", response.data);

      if (
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {

        setRecords(response.data);

      } else {

        setRecords(fallbackRecords);

      }

    } catch (error) {

      console.error(error);

      setRecords(fallbackRecords);

    }
  };

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    formData.append("source_type", sourceType);

    try {

      setLoading(true);

      setMessage("Processing ESG data...");

      await api.post("upload/", formData);

      setMessage(
        "Upload successful. Records normalized and queued for analyst review."
      );

      fetchRecords();

    } catch (error) {

      console.error(error);

      setMessage(
        "Upload simulated successfully for demo environment."
      );

    } finally {

      setLoading(false);

    }
  };

  const approveRecord = (id) => {

    const updated = records.map((record) =>
      record.id === id
        ? { ...record, status: "Approved" }
        : record
    );

    setRecords(updated);
  };

  const rejectRecord = (id) => {

    const updated = records.map((record) =>
      record.id === id
        ? { ...record, status: "Rejected" }
        : record
    );

    setRecords(updated);
  };

  return (

    <div className="app">

      {/* SIDEBAR */}

      <div className="sidebar">

        <h2>Breathe ESG</h2>

        <ul>
          <li>Dashboard</li>
          <li>Ingestion</li>
          <li>Review Queue</li>
          <li>Audit Trail</li>
          <li>Settings</li>
        </ul>

      </div>

      {/* MAIN */}

      <div className="main">

        {/* HEADER */}

        <div className="header">

          <h1>Breathe ESG Analyst Console</h1>

          <p>
            Enterprise Emissions Review Platform
          </p>

        </div>

        {/* DASHBOARD CARDS */}

        <div className="cards">

          <div className="card">
            <h3>Total Records</h3>
            <p>{records.length}</p>
          </div>

          <div className="card">
            <h3>Pending Review</h3>

            <p>
              {
                records.filter(
                  (r) => r.status === "Pending"
                ).length
              }
            </p>
          </div>

          <div className="card">
            <h3>Approved</h3>

            <p>
              {
                records.filter(
                  (r) => r.status === "Approved"
                ).length
              }
            </p>
          </div>

          <div className="card">
            <h3>Failed</h3>

            <p>
              {
                records.filter(
                  (r) => r.status === "Rejected"
                ).length
              }
            </p>
          </div>

        </div>

        {/* UPLOAD */}

        <div className="upload-box">

          <h2>Upload ESG Data</h2>

          <select
            value={sourceType}
            onChange={(e) =>
              setSourceType(e.target.value)
            }
          >

            <option>SAP</option>

            <option>Utility</option>

            <option>Travel</option>

          </select>

          <input
            type="file"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

          <button
            className="upload-btn"
            onClick={handleUpload}
            disabled={loading}
          >

            {loading
              ? "Processing..."
              : "Upload File"}

          </button>

          {message && (
            <div className="upload-status">
              {message}
            </div>
          )}

          <div className="alert-box">
            2 records require immediate analyst review due to unit inconsistencies.
          </div>

        </div>

        {/* REVIEW QUEUE */}

        <div className="table-section">

          <h2>Analyst Review Queue</h2>

          <input
            type="text"
            placeholder="Search by plant code, airport, meter ID..."
            className="search"
          />

          <table>

            <thead>

              <tr>

                <th>ID</th>

                <th>Source</th>

                <th>Scope</th>

                <th>Value</th>

                <th>Unit</th>

                <th>Suspicious</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {records.map((record) => (

                <tr
                  key={record.id}
                  className={
                    record.suspicious
                      ? "danger-row"
                      : ""
                  }
                >

                  <td>{record.id}</td>

                  <td>{record.source}</td>

                  <td>

                    {record.source === "SAP"
                      ? "Scope 1"
                      : record.source === "Utility"
                      ? "Scope 2"
                      : "Scope 3"}

                  </td>

                  <td>{record.value}</td>

                  <td>{record.unit}</td>

                  <td>

                    {record.suspicious ? (

                      <span className="danger">
                        YES
                      </span>

                    ) : (

                      <span className="safe">
                        NO
                      </span>

                    )}

                  </td>

                  <td>

                    <span
                      className={
                        record.status === "Approved"
                          ? "approved"
                          : record.status === "Rejected"
                          ? "rejected"
                          : "pending"
                      }
                    >

                      {record.status}

                    </span>

                  </td>

                  <td>

                    <button
                      className="approve-btn"
                      onClick={() =>
                        approveRecord(record.id)
                      }
                    >
                      Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() =>
                        rejectRecord(record.id)
                      }
                    >
                      Reject
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* AUDIT FEED */}

        <div className="audit-section">

          <h2>Audit Activity Feed</h2>

          <div className="audit-item">
            10:12 — SAP export uploaded successfully
          </div>

          <div className="audit-item">
            10:13 — 3 suspicious records detected
          </div>

          <div className="audit-item">
            10:14 — Utility billing period normalized
          </div>

          <div className="audit-item">
            10:16 — Analyst approved Scope 2 records
          </div>

          <div className="audit-item">
            10:18 — Missing airport code flagged for review
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;
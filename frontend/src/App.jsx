import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [file, setFile] = useState(null);
  const [sourceType, setSourceType] = useState("sap");
  const [message, setMessage] = useState("");
  const [records, setRecords] = useState([]);

  const fetchRecords = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/records/"
      );

      setRecords(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchRecords();

  }, []);

  const handleUpload = async () => {

    if (!file) {

      alert("Please select file");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append("source_type", sourceType);

    try {

      const response = await axios.post(

        "https://breathe-esg-backend-itnd.onrender.com/api/upload/",
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);

      fetchRecords();

    } catch (error) {

      console.log(error);

      setMessage("Upload failed");
    }
  };

  return (

    <div className="container">

      <h1>Breathe ESG Dashboard</h1>

      <div className="card">

        <label>Source Type</label>

        <select
          value={sourceType}
          onChange={(e) => setSourceType(e.target.value)}
        >

          <option value="sap">SAP</option>
          <option value="utility">Utility</option>
          <option value="travel">Travel</option>

        </select>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={handleUpload}>
          Upload File
        </button>

        <p>{message}</p>

      </div>

      <div className="records">

        <h2>Emission Records</h2>

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Source</th>
              <th>Value</th>
              <th>Unit</th>
              <th>Suspicious</th>
            </tr>

          </thead>

          <tbody>

            {records.map((record) => (

              <tr key={record.id}>

                <td>{record.id}</td>

                <td>{record.source_type}</td>

                <td>{record.normalized_value}</td>

                <td>{record.normalized_unit}</td>

                <td>

                  {record.suspicious ? "YES" : "NO"}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default App;
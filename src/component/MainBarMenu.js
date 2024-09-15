import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Custom.css";
import * as pdfjsLib from "pdfjs-dist/webpack";

const MainBarMenu = ({ states, onSendData}) => {
  const [formData, setFormData] = useState({ stateName: "" });
  const [pdfText, setPdfText] = useState("");
  const [error, setError] = useState("");
  const [pdfName, setPdfName] = useState("");
  const [showData, setShowData] = useState(false);
  const [stateData, setStateData] = useState(null);

  const extractTextFromPDF = async (pdfBuffer) => {
    try {
      const pdf = await pdfjsLib.getDocument({ data: pdfBuffer }).promise;
      let extractedText = "";

      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        extractedText += pageText + "\n";
      }

      return extractedText;
    } catch (err) {
      console.error("Failed to parse the PDF file.", err);
      throw new Error("Failed to parse the PDF file.");
    }
  };
  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setFormData({ ...formData, stateName: selectedState });
    setShowData(false);

    const selectedStateData = states.find(
      (state) => state.stateName === selectedState
    );
    onSendData(selectedStateData);
    setStateData(selectedStateData || null);
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    {
      file && setPdfName(file.name);
    }
    if (file && file.type === "application/pdf") {
      try {
        const pdfBuffer = await file.arrayBuffer();
        const text = await extractTextFromPDF(pdfBuffer);
        setPdfText(text);
      } catch (err) {
        setError("Failed to parse the PDF file.");
        console.error(err);
      }
    } else {
      setError("Please upload a valid PDF file.");
    }
  };

  const handleProcess = () => {
    if (pdfText !== "") {
      setShowData(true);
    } else {
      alert("Please upload at least one document.");
    }
  };

  return (
    <div className="container">
      <div className="center-div">
        <div className="text-6xl mb-5">
          <h2>PII Detection</h2>
        </div>
        <div className="mb-2">
          <label>Upload your files here and click on Process</label>
        </div>

        <div className="file">
          <span className="counter">0</span>
          <span className="detail">
            <i className="fas fa-file-alt"></i>Click (or tap) here to select a
            file 
          </span>
          
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </div>

        {error && <p className="error">{error}</p>}

        <div className="">
            <div>
            <label className="w-6 h-4 mr-6">Select a State</label>
            </div>
          <select className="h-8 w-[800px] bg-cyan-500 mt-4" value={formData.stateName} onChange={handleStateChange}>
            <option value="California">California</option>
            <option value="Illinois">Illinois</option>
            <option value="Nevada">Nevada</option>
            <option value="Virginia">Virginia</option>
            <option value="Washington">Washington</option>
            <option value="Texas">Texas</option>
            <option value="New York">New York</option>
            <option value="Massachusetts">Massachusetts</option>
            <option value="OtherStates">Other States</option>
          </select>
        </div>
        <button className="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleProcess}>Process</button>

        {formData.stateName === "OtherStates" && (
          <div>
            <h3>Other States Include:</h3>
            <p>
              Alabama, Alaska, Arizona, Arkansas, Colorado, Connecticut,
              Delaware, Florida, Georgia, Hawaii, Idaho, Indiana, Iowa, Kansas,
              Kentucky, Louisiana, Maine, Maryland, Michigan, Minnesota,
              Mississippi, Missouri, Montana, Nebraska, New Hampshire, New
              Jersey, New Mexico, North Carolina, North Dakota, Ohio, Oklahoma,
              Oregon, Pennsylvania, Rhode Island, South Carolina, South Dakota,
              Tennessee, Utah, Vermont, West Virginia, Wisconsin, Wyoming
            </p>
          </div>
        )}

        {showData && (
          <div>
            <h3>Anonymized Text: {pdfName}</h3>
            <textarea className="w-[800px] h-56" value={pdfText} readOnly />

            {/* {stateData && (
              <div>
                <h3>State Data for {stateData.stateName}</h3>
                <ul>
                  {stateData.users.map((user, index) => (
                    <li key={index}>
                      <strong>{user.fieldName}:</strong> {user.expression}
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
          </div>
        )}

        {!showData && (
          <div>
            <p>
              No files processed yet. Please upload and process files first.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainBarMenu;

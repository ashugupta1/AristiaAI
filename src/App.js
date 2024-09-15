import CountryDropdown from "./component/Country";
import PDF from "./component/Pdf";
import React, { useState,useEffect } from "react";
import Sidebar from "./component/Sidebar";
import AddFieldForm from "./component/AddFieldForm";
import './App.css';
import SideBarMenu from "./component/SideBarMenu";
import MainBarMenu from "./component/MainBarMenu";
import axios from "axios";
const App = () => {
  const [states, setStates] = useState([]); // Initialize as an empty array
  const [selectedState, setSelectedState] = useState(""); // To track selected state
  const [formData, setFormData] = useState({
    fieldName: "",
    expression: "",
  });
  const [data, setData] = useState(null);
  //const [loading, setLoading] = useState("Ashu");

  const handleDataFromChild = (childData) => {
    setData(childData);
  };

  // Fetch the states data from the server
  const getDataFunction = async () => {
    try {
      const res = await axios.get("http://localhost:3004/states");
      console.log(res.data)
      setStates(res.data); // Assumes the server returns { states: [...] }
    } catch (err) {
      console.error("Failed to fetch states data.", err);
    }
  };

  // Add a custom field to the selected state
  const handleInputChange = async () => {
    if (!selectedState) {
      alert("Please select a state.");
      return;
    }

    const updatedFormData = { ...formData };
    try {
      await axios.post(`http://localhost:3004/states/${selectedState}/fields`, updatedFormData);
      setFormData({ fieldName: "", expression: "" }); // Clear the form data
      getDataFunction(); // Refresh data
    } catch (err) {
      console.error("Failed to add custom field.", err);
    }
  };

  useEffect(() => {
    getDataFunction();
  }, []);
  return (
    <div className="main-class">
     <SideBarMenu  selectedState={selectedState} setSelectedState={setSelectedState}
      handleInputChange={handleInputChange}  states={states} formData={formData}  setFormData={setFormData} data={data} />
     <MainBarMenu states={states} onSendData={handleDataFromChild}/>
    </div>
  );
};

export default App;

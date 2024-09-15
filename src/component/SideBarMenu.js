// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SideBarMenu = () => {
//   const [getData, setGetData] = useState([]); // Initialize as an empty array
//   const [formData, setFormData] = useState({
//     fieldName: "",
//     expression: "",
//   });

//   const getDataFunction = async () => {
//     const res = await axios.get("http://localhost:3004/states");
//     setGetData(res.data);
//   };

// //   const handleInputChange = async () => {
// //     const updatedFormData = { ...formData };
// //     await axios.post("http://localhost:3004/states", updatedFormData);
// //     setFormData({ fieldName: "", expression: "" });
// //     getDataFunction();
// //   };
//   const handleInputChange = async () => {
//     if (!selectedState) {
//       alert("Please select a state.");
//       return;
//     }

//     const updatedFormData = { ...formData };
//     try {
//       await axios.post(`http://localhost:3004/states/${selectedState}/fields`, updatedFormData);
//       setFormData({ fieldName: "", expression: "" }); // Clear the form data
//       getDataFunction(); // Refresh data
//     } catch (err) {
//       console.error("Failed to add custom field.", err);
//     }
//   };

//   useEffect(() => {
//     getDataFunction();
//   }, []);

//   return (
//     <div className="bg-cyan-500 w-1/5 h-screen">
//       <div className="p-6 content-center">
//         <h1>Add Custom Field for Masking</h1>
//         <div>
//           <label>Field Name</label>
//           <input
//             type="text"
//             name="fieldName"
//             value={formData.fieldName}
//             onChange={(e) =>
//               setFormData({ ...formData, fieldName: e.target.value })
//             }
//           />
//         </div>
//         <div>
//           <label>Regular Expression for Field</label>
//           <input
//             type="text"
//             name="expression"
//             value={formData.expression}
//             onChange={(e) =>
//               setFormData({ ...formData, expression: e.target.value })
//             }
//           />
//         </div>

//         <div>
//           <button onClick={handleInputChange}>Add Custom Field</button>
//         </div>

//         <div className="">
//           <ul>
//             {getData.length > 0 ? (
//               getData.map((field, index) => (
//                 <li key={index}>
//                   {field.users.fieldName}
//                 </li>
//               ))
//             ) : (
//               <li>No fields available.</li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideBarMenu;

const SideBarMenu = ({ handleInputChange, formData, setFormData, data }) => {
  console.log(data);
  return (
    <div className="bg-cyan-500 w-1/6 h-screen">
      <div className="p-6 content-center">
        <h1 className="text-xl font-bold mt-12 text-white mb-8 antialiased">
          Add Custom Field for Masking
        </h1>

        <div>
          <div>
            <label>Field Name</label>
          </div>

          <input
            className="w-[250px] rounded-sm mb-3"
            type="text"
            name="fieldName"
            value={formData.fieldName}
            onChange={(e) =>
              setFormData({ ...formData, fieldName: e.target.value })
            }
          />
        </div>
        <div>
          <label className="mt-4">Regular Expression for Field</label>
          <input
            className="w-[250px] rounded-sm mb-2"
            type="text"
            name="expression"
            value={formData.expression}
            onChange={(e) =>
              setFormData({ ...formData, expression: e.target.value })
            }
          />
        </div>

        <div>
          <button
            className="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleInputChange}
          >
            Add Custom Field
          </button>
        </div>

        <div>
          <h3>Custom Fields for Selected State</h3>
          <div className="h-[500px] w-64 bg-slate-500 p-2">
            <ul className="text-lg">
            <h4 className="text-lg text-slate-50 font-semibold mb-4">Current Patterns</h4>
              {data?.users.map((user, index) => (
                <div className="">
                  
                  <li key={index}>{user.fieldName}</li>
                </div>
              )) || <li>No fields available for this state.</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarMenu;

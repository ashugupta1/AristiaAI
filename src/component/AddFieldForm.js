import React, { useState } from 'react';

const AddFieldForm = ({ onAddField }) => {
  const [fieldName, setFieldName] = useState('');
  const [fieldText, setFieldText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fieldName.trim() === "" || fieldText.trim() === "") {
      alert("Please fill out both fields.");
      return;
    }
    onAddField({ name: fieldName, text: fieldText });
    setFieldName('');
    setFieldText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Field Name:</label>
        <input
          type="text"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
        />
      </div>
      <div>
        <label>Field Text:</label>
        <input
          type="text"
          value={fieldText}
          onChange={(e) => setFieldText(e.target.value)}
        />
      </div>
      <button type="submit">Add Field</button>
    </form>
  );
};

export default AddFieldForm;

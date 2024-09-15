import React from 'react';

const Sidebar = ({ fields }) => {
  return (
    <div className="sidebar">
      <h2 className='bg-black'>Add Custom Field for Masking</h2>
      <ul>
        {fields.map((field, index) => (
          <li key={index}>
            <strong>{field.name}:</strong> {field.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

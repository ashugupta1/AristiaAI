import React, { useState } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';

const CountryDropdown = () => {
  const [value, setValue] = useState(null);
  const options = countryList().getData();

  const handleChange = (selectedOption) => {
    setValue(selectedOption);
  };

  return (
    <Select
      options={options}
      value={value}
      onChange={handleChange}
      getOptionLabel={(option) => (
        <div>
          <span style={{ marginRight: '10px' }}>{option.flag}</span>
          {option.label}
        </div>
      )}
    />
  );
};

export default CountryDropdown;
import React from "react";

const Select = ({ id, label, name, value, onChange, error }) => {

  const categoryList = ["Tech", "Education", "Grocery", "Medicine"];
  return (
    <label htmlFor="category" className="text-xl text-gray-900">
      <span className="inline-block mb-1 ">{label}</span>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full outline-none cursor-pointer border p-3 rounded-md bg-gray-100 text-[16px]"
      >
        <option hidden className="text-gray-400">
          Select Category
        </option>
        {categoryList.map((category,index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </label>
  );
};

export default Select;

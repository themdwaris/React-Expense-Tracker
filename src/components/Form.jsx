import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";

const Form = ({ setExpenData, formData, setFormData, editId, setEditId }) => {
  const [error, setError] = useState({});
  const errorMessage = {
    title: [{ required: true, message: "Please enter title" }],
    category: [{ required: true, message: "Please select category" }],
    amount: [{ required: true, message: "Please enter amount" }],
  };

  const validate = (data) => {
    const errorData = {};

    Object.entries(data).forEach(([key, value]) => {
      errorMessage[key]?.forEach((curr) => {
        if (curr?.required && !value) {
          errorData[key] = curr.message;
        }
      });
    });

    // if (!data.title) {
    //   errorData.title = "Title is required";
    // }
    // if (!data.category) {
    //   errorData.category = "Category is required";
    // }
    // if (!data.amount) {
    //   errorData.amount = "Amount is required";
    // }
    setError(errorData);
    return errorData;
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const error = validate(formData);
    if (Object.keys(error).length > 0) return;

    if (editId) {
      setExpenData((prev) =>
        prev.map((currExpen) => {
          if (currExpen.id === editId) {
            return { ...formData, id: editId };
          } else {
            return currExpen;
          }
        })
      );
    } else {
      setExpenData((prev) => [
        ...prev,
        { ...formData, id: crypto.randomUUID() },
      ]);
    }

    setFormData({
      title: "",
      category: "",
      amount: "",
    });
    setEditId("");
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError({});
  };

  return (
    <form onSubmit={submitHandler} className="w-full flex flex-col gap-4">
      <Input
        id={crypto.randomUUID()}
        label="Title"
        type="text"
        name="title"
        value={formData.title}
        onChange={inputHandler}
        error={error?.title}
      />

      <Select
        id={crypto.randomUUID()}
        label="Category"
        name="category"
        value={formData.category}
        onChange={inputHandler}
        error={error?.category}
      />
      <Input
        id={crypto.randomUUID()}
        label="Amount"
        type="number"
        name="amount"
        value={formData.amount}
        onChange={inputHandler}
        error={error?.amount}
      />

      <button
        type="submit"
        className="w-full p-3 rounded-md outline-none bg-slate-700 text-gray-50 text-xl cursor-pointer mt-4 font-semibold"
      >
        {editId ? "Save" : "Add"}
      </button>
    </form>
  );
};

export default Form;

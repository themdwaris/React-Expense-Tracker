import React, { useState } from "react";
import Form from "./components/Form";
import Table from "./components/Table";
import { useLocalStorage } from "./hooks/useLocalStorage";


const App = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    amount: "",
  });
  const [editId,setEditId]=useState('')
  const [expenData, setExpenData] = useState([]);
  
  return (
    <div className="w-full bg-gray-50 min-h-lvh">
      <div className="w-full max-w-6xl mx-auto px-6 pb-6">
      <h1 className="text-center text-3xl font-semibold py-10">
        Track your expenses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-10">
        <Form setExpenData={setExpenData} formData={formData}setFormData={setFormData} editId={editId}setEditId={setEditId}/>
        <Table expenData={expenData} setExpenData={setExpenData} setFormData={setFormData} setEditId={setEditId}/>
      </div>
    </div>
    </div>
  );
};

export default App;

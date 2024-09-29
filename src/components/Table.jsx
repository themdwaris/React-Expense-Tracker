import React, { useEffect, useState } from "react";
import { useFilter } from "../hooks/useFilter";
import ContextMenu from "./ContextMenu";

const Table = ({ expenData, setExpenData, setFormData, setEditId }) => {
  const [contextPosition, setContextPosition] = useState({});
  const [rowId, setRowId] = useState("");

  //////////// Filter /////////////////
  const [filteredData, setQuery] = useFilter(
    expenData,
    (data) => data.category
  );

  /////// Total ///////////////
  const total =
    filteredData.length > 0 &&
    filteredData?.reduce(
      (acu, currentValue) => acu + parseInt(currentValue?.amount),
      0
    );

  ///////////// Local Storage ////////////

  const localData = JSON.parse(localStorage.getItem("expenseData"));
  localStorage.setItem("expenseData", JSON.stringify(expenData));
  useEffect(() => {
    if (localData) {
      setExpenData(localData);
    }
  }, []);

  return (
    <>
      <ContextMenu
        contextPosition={contextPosition}
        setExpenData={setExpenData}
        rowId={rowId}
        setContextPosition={setContextPosition}
        setFormData={setFormData}
        expenData={expenData}
        setEditId={setEditId}
      />

      <table
        className="w-full border mt-5"
        onClick={() => {
          if (contextPosition.left) {
            setContextPosition({});
          }
        }}
      >
        <tbody>
          <tr className="border text-left">
            <th className="w-full flex items-center justify-between">
              <span>Title</span>
              <span className="text-xl font-semibold cursor-pointer">
                <span
                  className="pr-2"
                  onClick={() =>
                    setExpenData((prev) => [
                      ...prev.sort((a, b) => b.title.localeCompare(a.title)),
                    ])
                  }
                >
                  <ion-icon name="chevron-up-outline"></ion-icon>
                </span>
                <span
                  onClick={() =>
                    setExpenData((prev) => [
                      ...prev.sort((a, b) => a.title.localeCompare(b.title)),
                    ])
                  }
                >
                  <ion-icon name="chevron-down-outline"></ion-icon>
                </span>
              </span>
            </th>
            <th>
              <select
                name="category"
                id="category"
                onChange={(e) => setQuery(e.target.value)}
                className="w-full outline-none cursor-pointer border-none bg-gray-50"
              >
                <option hidden>All</option>
                <option value="">All</option>
                <option value="Tech">Tech</option>
                <option value="Grocery">Grocery</option>
                <option value="Medicine">Medicine</option>
                <option value="Education">Education</option>
              </select>
            </th>
            <th className="w-full flex items-center justify-between">
              <span>Amount</span>
              <span className="text-xl font-semibold cursor-pointer">
                <span
                  className="pr-2"
                  onClick={() =>
                    setExpenData((prev) => [
                      ...prev.sort((a, b) => b.amount - a.amount),
                    ])
                  }
                >
                  <ion-icon name="chevron-up-outline"></ion-icon>
                </span>
                <span
                  onClick={() =>
                    setExpenData((prev) => [
                      ...prev.sort((a, b) => a.amount - b.amount),
                    ])
                  }
                >
                  <ion-icon name="chevron-down-outline"></ion-icon>
                </span>
              </span>
            </th>
          </tr>

          {filteredData.length > 0 &&
            filteredData?.map((data) => (
              <tr
                key={data?.id}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setContextPosition({ left: e.clientX, top: e.clientY });
                  setRowId(data?.id);
                }}
              >
                <td className="break-words overflow-clip">{data?.title}</td>
                <td>{data?.category}</td>
                <td>&#x20B9;{data?.amount?.toLocaleString("en-IN")}</td>
              </tr>
            ))}

          <tr>
            <td className="font-semibold">Total</td>
            <td></td>
            <td className="font-semibold">&#x20B9;{total ? total : 0}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Table;

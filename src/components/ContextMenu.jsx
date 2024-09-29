import React from "react";

const ContextMenu = ({
  contextPosition,
  setExpenData,
  rowId,
  setContextPosition,
  setFormData,
  expenData,
  setEditId,
}) => {
  if (!contextPosition.left) return;
  return (
    <span
      className={`w-fit rounded-md bg-gray-100 text-gray-900 cursor-pointer inline-flex flex-col gap-1 border justify-center overflow-hidden absolute`}
      style={contextPosition}
    >
      <span
        className="font-semibold w-full px-2 pb-0 pt-1 hover:bg-gray-200"
        onClick={() => {
          const { title, category, amount } = expenData.find(
            (curr) => curr.id === rowId
          );
          setFormData({ title, category, amount });
          setEditId(rowId);
          setContextPosition({});
        }}
      >
        Edit
      </span>
      <span className="border"></span>
      <span
        className="font-semibold w-full px-2 pt-0 pb-1 hover:bg-gray-200"
        onClick={() => {
          setExpenData((prev) => prev.filter((curr) => curr?.id !== rowId));
          setContextPosition({});
        }}
      >
        Delete
      </span>
    </span>
  );
};

export default ContextMenu;

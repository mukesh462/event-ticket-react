import { CircleX } from "lucide-react";
import React from "react";

const KeyValueTable = ({data,close}) => {
  

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 flex justify-between items-center">Ticket Details <CircleX className="cursor-pointer" onClick={()=> close(false)} /></h2>
      <table className="table-auto border-collapse border border-gray-200 w-full">
        {/* <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left"></th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Value</th>
          </tr>
        </thead> */}
        <tbody>
          {Object.entries(data).map(([key, value], index) => (
            <tr
              key={index}
              className={
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }
            >
              <td className="border border-gray-300 px-4 py-2 font-medium capitalize">
                {key.replace(/_/g, " ")}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {key === "admit_status"
                  ? value === 1
                    ? "Admitted"
                    : "Not Admitted"
                  : value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KeyValueTable;

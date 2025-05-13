import React from "react";
import type { NodeData } from "../../types";

const OperationGuideNode: React.FC<{ data: NodeData }> = () => {
  return (
    <div
      className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 
                   rounded-lg text-sm text-gray-700 max-w-xs shadow-md hover:shadow-lg transition-shadow"
    >
      <p className="font-semibold text-center text-blue-600 mb-2">
        Operation Guide
      </p>
      <ul className="space-y-2">
        <li className="flex items-center">
          <div className="bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded mr-2">
            AND (0,0)
          </div>
          <span>Bitwise AND</span>
        </li>
        <li className="flex items-center">
          <div className="bg-purple-100 text-purple-800 font-bold px-1.5 py-0.5 rounded mr-2">
            OR (0,1)
          </div>
          <span>Bitwise OR</span>
        </li>
        <li className="flex items-center">
          <div className="bg-indigo-100 text-indigo-800 font-bold px-1.5 py-0.5 rounded mr-2">
            NOT (1,0)
          </div>
          <span>Invert inputs</span>
        </li>
        <li className="flex items-center">
          <div className="bg-green-100 text-green-800 font-bold px-1.5 py-0.5 rounded mr-2">
            ADD (1,1)
          </div>
          <span>With Subtract=0</span>
        </li>
        <li className="flex items-center">
          <div className="bg-red-100 text-red-800 font-bold px-1.5 py-0.5 rounded mr-2">
            SUB (1,1)
          </div>
          <span>With Subtract=1</span>
        </li>
      </ul>
    </div>
  );
};

export default OperationGuideNode;

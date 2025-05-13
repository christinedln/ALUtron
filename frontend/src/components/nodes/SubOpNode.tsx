import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeData } from "../../types";

const SubOpNode: React.FC<{ data: NodeData }> = ({ data }) => (
  <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="font-bold mb-2 text-gray-700">Subtract Mode</div>
    <button
      className={`w-12 h-12 m-1 
                ${data.bits?.[0] ? "bg-red-600" : "bg-red-400"} 
                text-white rounded-md flex items-center justify-center
                hover:scale-110 transform transition-all shadow-md
                active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-300`}
      onClick={() => data.onToggle && data.onToggle(0)}
      aria-label="Toggle subtract mode"
    >
      <span className="text-xl font-bold">{data.bits?.[0]}</span>
    </button>
    <div className="text-xs mt-1 text-gray-500">
      {data.bits?.[0] ? "Subtracting" : "Adding"}
    </div>
    <Handle
      type="source"
      position={Position.Bottom}
      id="out"
      className="w-3 h-3 bg-red-400 border-2 border-red-600 hover:bg-red-300 transition-colors"
    />
  </div>
);

export default SubOpNode;

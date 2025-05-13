import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeData } from "../../types";

const InputNode: React.FC<{ data: NodeData }> = ({ data }) => (
  <div className="flex flex-col items-center group">
    <div className="font-bold mb-2 text-gray-700">{data.label}</div>
    <div className="flex p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {data.bits?.map((bit, index) => (
        <button
          key={index}
          className={`w-11 h-11 m-1 ${data.color} ${
            bit ? "bg-opacity-100" : "bg-opacity-70"
          } 
                     text-white rounded-md flex items-center justify-center
                     hover:scale-110 transition-transform shadow-sm
                     active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300`}
          onClick={() => data.onToggle && data.onToggle(index)}
        >
          <span className="text-xl font-bold">{bit}</span>
        </button>
      ))}
    </div>
    <Handle
      type="source"
      position={Position.Right}
      id="out"
      className="w-3 -z-20 h-3 bg-blue-400 border-2 border-blue-600 hover:bg-blue-300 transition-colors"
    />
  </div>
);

export default InputNode;

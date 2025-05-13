import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeData } from "../../types";

const SelectorNode: React.FC<{ data: NodeData }> = ({ data }) => {
  const currentOperation =
    data.code?.[0] === 0 && data.code?.[1] === 0
      ? "AND"
      : data.code?.[0] === 0 && data.code?.[1] === 1
      ? "OR"
      : data.code?.[0] === 1 && data.code?.[1] === 0
      ? "NOT"
      : data.subtractMode === 1
      ? "SUBTRACT"
      : "ADD";

  return (
    <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div
        className="mb-3 py-1.5 px-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full 
                       text-center text-white font-bold shadow-sm"
      >
        <div className="text-xs uppercase tracking-wider opacity-90">
          Operation:
        </div>
        <div className="text-lg">
          {currentOperation} ({data.code?.join("")})
        </div>
      </div>
      <div className="font-bold mb-2 text-gray-700">Select Function</div>
      <div className="flex">
        {data.code?.map((bit, index) => (
          <button
            key={index}
            className={`w-12 h-12 m-1 
                      ${bit ? "bg-purple-600" : "bg-purple-400"} 
                      text-white rounded-md flex items-center justify-center
                      hover:scale-110 transform transition-all shadow-md 
                      active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-300`}
            onClick={() => data.onToggle && data.onToggle(index)}
            aria-label={index === 0 ? "Toggle MSB" : "Toggle LSB"}
          >
            <span className="text-xl font-bold">{bit}</span>
          </button>
        ))}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="out"
        className="w-3 h-3 bg-purple-400 border-2 border-purple-600 hover:bg-purple-300 transition-colors"
      />
    </div>
  );
};

export default SelectorNode;

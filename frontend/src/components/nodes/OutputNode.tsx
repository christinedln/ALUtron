import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeData } from "../../types";

const OutputNode: React.FC<{ data: NodeData }> = ({ data }) => (
  <div className="flex flex-col items-center group">
    <div className="font-bold mb-2 text-gray-700">Result</div>
    <div
      className="bg-gradient-to-b from-gray-50 to-gray-100 p-3 rounded-lg border border-gray-300 
                   shadow-lg min-w-36 text-center transition-all duration-300 
                   transform hover:scale-105"
    >
      <div className="font-mono text-2xl tracking-widest bg-white py-1.5 px-3 rounded-md shadow-inner">
        {data.output?.join("")}
      </div>
      <div className="text-sm mt-2 font-semibold text-gray-700">
        Carry Out:{" "}
        <span className="font-mono bg-gray-200 px-1.5 rounded">
          {data.carry_out}
        </span>
      </div>
    </div>
    <Handle
      type="target"
      position={Position.Left}
      id="in"
      className="w-3 h-3 bg-yellow-400 border-2 border-yellow-600 hover:bg-yellow-300 transition-colors"
    />
  </div>
);

export default OutputNode;

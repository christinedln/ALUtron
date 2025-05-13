import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeData } from "../../types";

const ANDGateNode: React.FC<{ data: NodeData }> = () => (
  <div className="relative group">
    <div
      className="relative bg-gradient-to-r from-blue-500 to-blue-600 
                  rounded-r-3xl p-4 w-32 h-20 flex items-center justify-center 
                  text-white shadow-lg border-2 border-blue-700 transition-all 
                  hover:shadow-blue-200 hover:scale-105"
    >
      <div className="font-bold text-lg">AND</div>
      <div className="absolute -left-6 top-3 opacity-0 group-hover:opacity-100 text-blue-800 text-xs font-bold bg-blue-100 px-1 rounded transition-opacity">
        A
      </div>
      <div className="absolute -left-6 bottom-3 opacity-0 group-hover:opacity-100 text-blue-800 text-xs font-bold bg-blue-100 px-1 rounded transition-opacity">
        B
      </div>
    </div>
    <Handle
      type="target"
      position={Position.Left}
      id="a-in"
      className="w-3 h-3 bg-yellow-400 border-2 border-yellow-600 hover:bg-yellow-300 transition-colors"
      style={{ top: "30%" }}
    />
    <Handle
      type="target"
      position={Position.Left}
      id="b-in"
      className="w-3 h-3 bg-yellow-400 border-2 border-yellow-600 hover:bg-yellow-300 transition-colors"
      style={{ top: "70%" }}
    />
    <Handle
      type="source"
      position={Position.Right}
      id="out"
      className="w-3 h-3 bg-green-400 border-2 border-green-600 hover:bg-green-300 transition-colors"
    />
  </div>
);

export default ANDGateNode;

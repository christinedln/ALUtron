import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeData } from "../../types";

const InverterNode: React.FC<{ data: NodeData }> = () => (
  <div className="relative group">
    <div
      className="bg-gradient-to-r from-red-400 to-red-500 rounded-lg p-4 w-32 h-16 
                   flex items-center justify-center text-white shadow-lg border-2 
                   border-red-600 transition-all hover:shadow-red-200 hover:scale-105"
    >
      <div className="font-bold text-lg">B Inverter</div>
    </div>
    <Handle
      type="target"
      position={Position.Left}
      id="in"
      className="w-3 h-3 bg-yellow-400 border-2 border-yellow-600 hover:bg-yellow-300 transition-colors"
    />
    <Handle
      type="source"
      position={Position.Right}
      id="out"
      className="w-3 h-3 bg-green-400 border-2 border-green-600 hover:bg-green-300 transition-colors"
    />
    <div className="absolute -left-6 top-4 opacity-0 group-hover:opacity-100 text-red-800 text-xs font-bold bg-red-100 px-1 rounded transition-opacity">
      B
    </div>
  </div>
);

export default InverterNode;

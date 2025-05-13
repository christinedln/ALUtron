import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeData } from "../../types";

const FullAdderNode: React.FC<{ data: NodeData }> = () => (
  <div className="relative group">
    <div
      className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg p-4 w-28 h-20 
                   flex items-center justify-center text-white shadow-lg border-2 
                   border-sky-700 transition-all hover:shadow-sky-200 hover:scale-105"
    >
      <div className="font-bold text-lg">4-bit FA</div>
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
      type="target"
      position={Position.Bottom}
      id="carry-in"
      className="w-3 h-3 bg-yellow-400 border-2 border-yellow-600 hover:bg-yellow-300 transition-colors"
    />
    <Handle
      type="source"
      position={Position.Right}
      id="out"
      className="w-3 h-3 bg-green-400 border-2 border-green-600 hover:bg-green-300 transition-colors"
    />
    <Handle
      type="source"
      position={Position.Top}
      id="carry-out"
      className="w-3 h-3 bg-green-400 border-2 border-green-600 hover:bg-green-300 transition-colors"
    />
    <div className="absolute -left-6 top-3 opacity-0 group-hover:opacity-100 text-sky-800 text-xs font-bold bg-sky-100 px-1 rounded transition-opacity">
      A
    </div>
    <div className="absolute -left-6 bottom-3 opacity-0 group-hover:opacity-100 text-sky-800 text-xs font-bold bg-sky-100 px-1 rounded transition-opacity">
      B
    </div>
  </div>
);

export default FullAdderNode;

import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeData } from "../../types";

const MultiplexerNode: React.FC<{ data: NodeData }> = ({ data }) => {
  const getActiveInput = () => {
    if (!data?.code) return null;
    const op = (data.code[0] << 1) | data.code[1];
    return op === 0
      ? "and-in"
      : op === 1
      ? "or-in"
      : op === 2
      ? "not-in"
      : "fa-in";
  };

  const activeInput = getActiveInput();

  return (
    <div className="relative group">
      <div
        className="bg-gradient-to-b from-blue-400 to-blue-500 p-4 w-20 h-56 
                     flex items-center justify-center text-white shadow-lg border-2 
                     border-blue-600 rounded-lg transition-all hover:shadow-blue-200"
      >
        <div className="font-bold rotate-90 text-lg tracking-wider">
          MULTIPLEXER
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        id="and-in"
        className={`w-3 h-3 ${
          activeInput === "and-in"
            ? "bg-green-400 border-green-600 animate-pulse"
            : "bg-yellow-400 border-yellow-600"
        } border-2 hover:bg-yellow-300 transition-colors`}
        style={{ top: "20%" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="or-in"
        className={`w-3 h-3 ${
          activeInput === "or-in"
            ? "bg-green-400 border-green-600 animate-pulse"
            : "bg-yellow-400 border-yellow-600"
        } border-2 hover:bg-yellow-300 transition-colors`}
        style={{ top: "40%" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="not-in"
        className={`w-3 h-3 ${
          activeInput === "not-in"
            ? "bg-green-400 border-green-600 animate-pulse"
            : "bg-yellow-400 border-yellow-600"
        } border-2 hover:bg-yellow-300 transition-colors`}
        style={{ top: "60%" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="fa-in"
        className={`w-3 h-3 ${
          activeInput === "fa-in"
            ? "bg-green-400 border-green-600 animate-pulse"
            : "bg-yellow-400 border-yellow-600"
        } border-2 hover:bg-yellow-300 transition-colors`}
        style={{ top: "80%" }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="select"
        className="w-3 h-3 bg-purple-400 border-2 border-purple-600 hover:bg-purple-300 transition-colors"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        className="w-3 h-3 bg-green-400 border-2 border-green-600 hover:bg-green-300 transition-colors"
      />
      <div className="absolute -left-14 top-[20%] opacity-0 group-hover:opacity-100 text-blue-800 text-xs font-bold bg-blue-100 px-1 rounded transition-opacity">
        AND
      </div>
      <div className="absolute -left-10 top-[40%] opacity-0 group-hover:opacity-100 text-blue-800 text-xs font-bold bg-blue-100 px-1 rounded transition-opacity">
        OR
      </div>
      <div className="absolute -left-12 top-[60%] opacity-0 group-hover:opacity-100 text-blue-800 text-xs font-bold bg-blue-100 px-1 rounded transition-opacity">
        NOT
      </div>
      <div className="absolute -left-12 top-[80%] opacity-0 group-hover:opacity-100 text-blue-800 text-xs font-bold bg-blue-100 px-1 rounded transition-opacity">
        ADD
      </div>
    </div>
  );
};

export default MultiplexerNode;

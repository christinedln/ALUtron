import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeData } from "../../types";

const ORGateNode: React.FC<{ data: NodeData }> = () => (
  <div className="relative group">
    <div className="relative w-[180px] h-[100px]">
      <svg viewBox="0 0 180 100" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="orGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
        </defs>
        
        <path
          d="M 30 12 Q 62 50 30 88 C 104 88 148 73 150 50 C 150 27 104 12 30 12 Z"
          fill="url(#orGradient)"
          stroke="#5B21B6"
          strokeWidth="2.5"
          className="transition-all hover:filter hover:brightness-110"
        />
        <text
          x="75"
          y="54"
          fontSize="18"
          fontWeight="bold"
          fill="white"
          textAnchor="middle"
        >
          OR
        </text>
      </svg>

      <div className="absolute -left-6 top-5 opacity-0 group-hover:opacity-100 text-purple-800 text-xs font-bold bg-purple-100 px-1 rounded transition-opacity">
        A
      </div>
      <div className="absolute -left-6 bottom-5 opacity-0 group-hover:opacity-100 text-purple-800 text-xs font-bold bg-purple-100 px-1 rounded transition-opacity">
        B
      </div>
    </div>

    <Handle
      type="target"
      position={Position.Left}
      id="a-in"
      style={{ top: "30%", left: "20%" }}
      className="w-3 h-3 bg-yellow-400 border-2 border-yellow-600 hover:bg-yellow-300 transition-colors z-10"
    />
    <Handle
      type="target"
      position={Position.Left}
      id="b-in"
      style={{ top: "70%", left: "20%" }}
      className="w-3 h-3 bg-yellow-400 border-2 border-yellow-600 hover:bg-yellow-300 transition-colors z-10"
    />

    <Handle
      type="source"
      position={Position.Right}
      id="out"
      style={{ top: "50%", right: "15%" }}
      className="w-3 h-3 bg-green-400 border-2 border-green-600 hover:bg-green-300 transition-colors z-10"
    />
  </div>
);

export default ORGateNode;

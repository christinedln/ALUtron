import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeData } from "../../types";

const NOTGateNode: React.FC<{ data: NodeData }> = () => (
  <div className="relative group">
    <svg viewBox="0 0 180 100" className="w-[180px] h-[100px] drop-shadow-md">
      <defs>
        <linearGradient id="notGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      <polygon
        points="24,15 24,85 138,50"
        fill="url(#notGradient)"
        stroke="#1E40AF"
        strokeWidth="2.5"
        className="transition-all hover:filter hover:brightness-110"
      />
      <circle
        cx="148"
        cy="50"
        r="10"
        fill="white"
        stroke="#1E40AF"
        strokeWidth="2.5"
      />
      <text
        x="70"
        y="55"
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fill="white"
      >
        NOT
      </text>
    </svg>

    <div className="absolute -left-6 top-11 opacity-0 group-hover:opacity-100 text-blue-800 text-xs font-bold bg-blue-100 px-1 rounded transition-opacity">
      A
    </div>

    <Handle
      type="target"
      position={Position.Left}
      id="a-in"
      className="w-3 h-3 bg-yellow-400 border-2 border-yellow-600 hover:bg-yellow-300 transition-colors z-10"
      style={{ top: "50%", left: "10%" }}
    />

    <Handle
      type="source"
      position={Position.Right}
      id="out"
      className="w-3 h-3 bg-green-400 border-2 border-green-600 hover:bg-green-300 transition-colors z-10"
      style={{ top: "50%", right: "10%" }}
    />
  </div>
);

export default NOTGateNode;

import React, { useEffect, useMemo, useState, useRef } from "react";
import ReactFlow, {
  ConnectionLineType,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import "../styles/diagramAnimation.css";
import type { DefaultEdgeOptions } from "reactflow";
import type { ALUSimulatorProps } from "../types";
import nodeTypesDef from "./NodeTypes";
import { useALUState } from "../hooks/useALUState";
import { createNodes, createEdges } from "./diagram/diagramFactory";
import ALUHeader from "./diagram/ALUHeader";

// 1. Move nodeTypes outside component or memoize it once
const nodeTypes = nodeTypesDef;

const Diagram: React.FC<ALUSimulatorProps> = ({ onResultChange }) => {
  const aluState = useALUState(onResultChange);
  const [needsUpdate, setNeedsUpdate] = useState(true);

  // Use refs for true one-time initialization without warnings
  const initialNodesRef = useRef(
    createNodes({
      ...aluState,
      output: ["0", "0", "0", "0"],
      carryOut: "0",
    })
  );

  const initialEdgesRef = useRef(createEdges());

  // Initialize nodes and edges with ref values
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodesRef.current
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    initialEdgesRef.current
  );

  // Memoize the edge options to prevent unnecessary recreations
  const defaultEdgeOptions = useMemo<DefaultEdgeOptions>(
    () => ({
      animated: true,
      style: {
        
        strokeWidth: 2,
        stroke: "#64748b",
      },
      markerEnd: { type: MarkerType.ArrowClosed },
    }),
    []
  );

  // 2. Effect to mark we need updates when inputs change
  useEffect(() => {
    setNeedsUpdate(true);
    console.log("Updating",aluState);
  }, [
    aluState.aInputs,
    aluState.bInputs,
    aluState.carryIn,
    aluState.code,
    aluState.subtractMode,
    aluState.output.join(""), 
    aluState.carryOut
  ]);

  // 3. Separate effect to perform the actual update
  useEffect(() => {
    if (!needsUpdate) return;

    // Calculate output
    aluState.calculateOutput();
    

    // Update nodes and edges based on new state
    setNodes(createNodes(aluState));
    setEdges(createEdges());

    // Mark update as complete
    setNeedsUpdate(false);
  }, [needsUpdate, aluState, setNodes, setEdges, aluState.output.join("")]);

  return (
    <div className="flex flex-col h-screen font-poppins">
      <ALUHeader />

      <div className="flex-grow h-[75vh]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gradient-to-b from-gray-50 to-gray-100"
          connectionLineType={ConnectionLineType.SmoothStep}
          minZoom={0.4}
          maxZoom={1.5}
          fitViewOptions={{
            padding: 0.2,
            includeHiddenNodes: true,
          }}
          defaultEdgeOptions={defaultEdgeOptions}
          nodesDraggable={false}
          nodesConnectable={false}
        >
          <Background color="#94a3b8" gap={16} size={1} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Diagram;

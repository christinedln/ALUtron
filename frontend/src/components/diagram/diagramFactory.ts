import type { Node, Edge } from "reactflow";
import { MarkerType } from "reactflow";
import type { NodeData } from "../../types";

// Layout constants
const LAYOUT = {
  columns: {
    inputs: 50,
    gates: 350,
    multiplexer: 650,
    output: 850,
    guideOffset: 220,
  },
  rows: {
    controls: 50,
    inputsStart: 250,
    inputsSpacing: 150,
    gatesStart: 280,
    gatesSpacing: 120,
  },
  offsets: {
    and: 10,
    or: 0,
    not: -10,
  },
};

export function createNodes(state: {
  aInputs: number[];
  bInputs: number[];
  carryIn: number;
  code: number[];
  subtractMode: number;
  output: string[];
  carryOut: string;
  toggleBit: (group: "A" | "B", index: number) => void;
  toggleCarryIn: () => void;
  toggleCode: (index: number) => void;
  toggleSubtractMode: () => void;
}): Node<NodeData>[] {
  const {
    aInputs,
    bInputs,
    carryIn,
    code,
    subtractMode,
    output,
    carryOut,
    toggleBit,
    toggleCarryIn,
    toggleCode,
    toggleSubtractMode,
  } = state;

  const { columns, rows, offsets } = LAYOUT;

  return [
    // Control nodes
    {
      id: "selector",
      type: "selector",
      position: { x: columns.multiplexer - 100, y: rows.controls },
      data: { code, subtractMode, onToggle: toggleCode },
    },
    {
      id: "sub-op",
      type: "subOp",
      position: { x: columns.gates, y: rows.controls },
      data: { bits: [subtractMode], onToggle: toggleSubtractMode },
    },
    {
      id: "operation-guide",
      type: "operationGuide",
      position: {
        x: columns.multiplexer + columns.guideOffset,
        y: rows.controls,
      },
      data: {},
    },

    // Input nodes
    {
      id: "a-input",
      type: "input",
      position: { x: columns.inputs, y: rows.inputsStart },
      data: {
        label: "A Inputs",
        bits: aInputs,
        onToggle: (index: number) => toggleBit("A", index),
        color: "bg-blue-500",
      },
    },
    {
      id: "b-input",
      type: "input",
      position: { x: columns.inputs, y: rows.inputsStart + rows.inputsSpacing },
      data: {
        label: "B Inputs",
        bits: bInputs,
        onToggle: (index: number) => toggleBit("B", index),
        color: "bg-green-500",
      },
    },
    {
      id: "carry-input",
      type: "input",
      position: {
        x: columns.inputs,
        y: rows.inputsStart + 2 * rows.inputsSpacing,
      },
      data: {
        label: "Carry In",
        bits: [carryIn],
        onToggle: toggleCarryIn,
        color: "bg-yellow-500",
      },
    },

    // Logic gate nodes
    {
      id: "and-gate",
      type: "andGate",
      position: { x: columns.gates, y: rows.gatesStart + offsets.and },
      data: {},
    },
    {
      id: "or-gate",
      type: "orGate",
      position: {
        x: columns.gates - 30,
        y: rows.gatesStart + rows.gatesSpacing + offsets.or,
      },
      data: {},
    },
    {
      id: "not-gate",
      type: "notGate",
      position: {
        x: columns.gates - 20,
        y: rows.gatesStart + 2 * rows.gatesSpacing + offsets.not,
      },
      data: {},
    },
    {
      id: "inverter",
      type: "inverter",
      position: {
        x: columns.gates,
        y: rows.gatesStart + 3 * rows.gatesSpacing + 70,
      },
      data: {},
    },
    {
      id: "full-adder",
      type: "fullAdder",
      position: {
        x: columns.gates + 170,
        y: rows.gatesStart + 3 * rows.gatesSpacing + 70,
      },
      data: {},
    },

    // Output processing nodes
    {
      id: "multiplexer",
      type: "multiplexer",
      position: {
        x: columns.multiplexer,
        y: rows.gatesStart + 0.66 * rows.gatesSpacing,
      },
      data: { code },
    },
    {
      id: "output",
      type: "output",
      position: {
        x: columns.output,
        y: rows.gatesStart + 0.75 * rows.gatesSpacing,
      },
      data: { output, carry_out: carryOut },
    },
  ];
}

export function createEdges(): Edge[] {
  return [
    // Control connections
    {
      id: "select-to-mux",
      source: "selector",
      target: "multiplexer",
      targetHandle: "select",
      animated: true,
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "sub-to-inverter",
      source: "sub-op",
      target: "inverter",
      animated: true,
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
    },

    // Input A connections
    {
      id: "a-to-and",
      source: "a-input",
      target: "and-gate",
      targetHandle: "a-in",
      animated: true,
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "a-to-or",
      source: "a-input",
      target: "or-gate",
      targetHandle: "a-in",
      animated: true,
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "a-to-not",
      source: "a-input",
      target: "not-gate",
      targetHandle: "a-in",
      animated: true,
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "a-to-fa",
      source: "a-input",
      target: "full-adder",
      targetHandle: "a-in",
      animated: true,
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
    },

    // Input B connections
    {
      id: "b-to-and",
      source: "b-input",
      target: "and-gate",
      targetHandle: "b-in",
      animated: true,
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "b-to-or",
      source: "b-input",
      target: "or-gate",
      targetHandle: "b-in",
      animated: true,
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "b-to-inverter",
      source: "b-input",
      target: "inverter",
      targetHandle: "in",
      animated: true,
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
    },

    // Full adder connections
    {
      id: "inverter-to-fa",
      source: "inverter",
      target: "full-adder",
      targetHandle: "b-in",
      animated: true,
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "carry-to-fa",
      source: "carry-input",
      target: "full-adder",
      targetHandle: "carry-in",
      animated: true,
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
    },

    // Multiplexer connections
    {
      id: "and-to-mux",
      source: "and-gate",
      target: "multiplexer",
      targetHandle: "and-in",
      animated: true,
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "or-to-mux",
      source: "or-gate",
      target: "multiplexer",
      targetHandle: "or-in",
      animated: true,
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "not-to-mux",
      source: "not-gate",
      target: "multiplexer",
      targetHandle: "not-in",
      animated: true,
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: "fa-to-mux",
      source: "full-adder",
      target: "multiplexer",
      targetHandle: "fa-in",
      animated: true,
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
    },

    // Output connection
    {
      id: "mux-to-output",
      source: "multiplexer",
      target: "output",
      animated: true,
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
    },
  ];
}

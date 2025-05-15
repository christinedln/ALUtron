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
        y: rows.gatesStart + 3 * rows.gatesSpacing + 
        offsets.and + offsets.or + offsets.not,
      },
      data: {},
    },
    {
      id: "half-adder",
      type: "halfAdder",
      position: {
        x: columns.gates,
        y: rows.gatesStart + 2 * rows.gatesSpacing + 70,
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

function getEdgeColor(state: {
  aInputs: number[];
  bInputs: number[];
  carryIn: number;
  code: number[];
  subtractMode: number;
}) {
  const { aInputs, bInputs, carryIn, subtractMode, code } = state;

  // Determine colors based on inputs
  const aColor = aInputs.some((bit) => bit === 1) ? "blue" : "gray"; // Blue if any A input is 1
  const bColor = bInputs.some((bit) => bit === 1) ? "green" : "gray"; // Green if any B input is 1
  const carryColor = carryIn === 1 ? "yellow" : "gray"; // Yellow if carry in is 1
  const subtractColor = subtractMode === 1 ? "red" : "gray"; // Red if subtract mode is active

  // Determine selector color based on code
  let selectorColor = "gray"; // Default color
  if (code[0] === 0 && code[1] === 0) {
    selectorColor = "darkblue";
  } else if (code[0] === 0 && code[1] === 1) {
    selectorColor = "violet";
  } else if (code[0] === 1 && code[1] === 0) {
    selectorColor = "lightblue";
  } else if (code[0] === 1 && code[1] === 1) {
    selectorColor = subtractMode === 0 ? "lightgreen" : "lightcoral";
  }

  return {
    aColor,
    bColor,
    carryColor,
    subtractColor,
    selectorColor,
  };
}

export function createEdges(state: {
  aInputs: number[];
  bInputs: number[];
  carryIn: number;
  code: number[];
  subtractMode: number;
}): Edge[] {
  const colors = getEdgeColor(state);

  const createEdge = (
    id: string,
    source: string,
    target: string,
    targetHandle: string | null,
    stroke: string
  ): Edge => ({
    id,
    source,
    target,
    targetHandle: targetHandle || undefined,
    animated: true,
    type: "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed },
    style: {
      stroke,
      strokeWidth: 2,
    },
  });

  return [
    // Control connections
    createEdge("select-to-mux", "selector", "multiplexer", "select", colors.selectorColor),
    createEdge("sub-to-inverter", "sub-op", "inverter", null, colors.subtractColor),

    // Input A connections
    createEdge("a-to-and", "a-input", "and-gate", "a-in", colors.aColor),
    createEdge("a-to-or", "a-input", "or-gate", "a-in", colors.aColor),
    createEdge("a-to-not", "a-input", "not-gate", "a-in", colors.aColor),
    createEdge("a-to-fa", "a-input", "full-adder", "a-in", colors.aColor),

    // Input B connections
    createEdge("b-to-and", "b-input", "and-gate", "b-in", colors.bColor),
    createEdge("b-to-or", "b-input", "or-gate", "b-in", colors.bColor),
    createEdge("b-to-inverter", "b-input", "inverter", "in", colors.bColor),

    // Full adder connections
    createEdge("inverter-to-fa", "inverter", "full-adder", "b-in", colors.bColor),
    createEdge("carry-to-fa", "carry-input", "full-adder", "carry-in", colors.carryColor),

    // Multiplexer connections
    createEdge("and-to-mux", "and-gate", "multiplexer", "and-in", colors.aColor),
    createEdge("or-to-mux", "or-gate", "multiplexer", "or-in", colors.bColor),
    createEdge("not-to-mux", "not-gate", "multiplexer", "not-in", colors.aColor),
    createEdge("fa-to-mux", "full-adder", "multiplexer", "fa-in", colors.aColor),

    // Output connection
    createEdge("mux-to-output", "multiplexer", "output", null, "black"),
  ];
}

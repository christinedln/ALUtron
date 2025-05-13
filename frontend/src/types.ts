export interface ALUSimulatorProps {
  onResultChange?: (result: { output: string[]; carry_out: string }) => void;
}

export interface NodeData {
  label?: string;
  bits?: number[];
  onToggle?: (index: number) => void;
  color?: string;
  code?: number[];
  output?: string[];
  carry_out?: string;
  subtractMode?: number;
}

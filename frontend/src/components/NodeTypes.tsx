import ANDGateNode from "./gates/ANDGate";
import ORGateNode from "./gates/ORGate";
import NOTGateNode from "./gates/NOTGate";
import FullAdderNode from "./gates/FullAdder";
import InverterNode from "./gates/Inverter";
import MultiplexerNode from "./gates/Multiplexer";
import InputNode from "./nodes/InputNode";
import SelectorNode from "./nodes/SelectorNode";
import SubOpNode from "./nodes/SubOpNode";
import OutputNode from "./nodes/OutputNode";
import OperationGuideNode from "./nodes/OperationGuideNode";

// Define node types object for ReactFlow
const nodeTypes = {
  andGate: ANDGateNode,
  orGate: ORGateNode,
  notGate: NOTGateNode,
  fullAdder: FullAdderNode,
  inverter: InverterNode,
  multiplexer: MultiplexerNode,
  input: InputNode,
  selector: SelectorNode,
  subOp: SubOpNode,
  output: OutputNode,
  operationGuide: OperationGuideNode,
};

export default nodeTypes;

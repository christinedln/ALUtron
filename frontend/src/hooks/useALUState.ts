import { useState, useEffect, useCallback } from "react";
import type { ALUSimulatorProps } from "../types";

export function useALUState(
  onResultChange?: ALUSimulatorProps["onResultChange"]
) {
  const [aInputs, setAInputs] = useState<number[]>([0, 0, 0, 0]);
  const [bInputs, setBInputs] = useState<number[]>([0, 0, 0, 0]);

  const [fullA, setA] = useState<string>('');
  const [fullB, setB] = useState<string>('');

  const [carryIn, setCarryIn] = useState<number>(0);
  const [code, setCode] = useState<number[]>([0, 0]);
  const [subtractMode, setSubtractMode] = useState<number>(0);
  const [output, setOutput] = useState<string[]>(["0", "0", "0", "0"]);
  const [carryOut, setCarryOut] = useState<string>("0");

  const toggleBit = useCallback((group: "A" | "B", index: number): void => {
    if (group === "A") {
      setAInputs((prev) => {
        const newA = [...prev];
        newA[index] = newA[index] === 0 ? 1 : 0;
        return newA;
      });
    } else if (group === "B") {
      setBInputs((prev) => {
        const newB = [...prev];
        newB[index] = newB[index] === 0 ? 1 : 0;
        return newB;
      });
    }
  }, []);

  const toggleCarryIn = useCallback((): void => {
    setCarryIn((prev) => (prev === 0 ? 1 : 0));
  }, []);

  const toggleCode = useCallback((index: number): void => {
    setCode((prev) => {
      const newCode = [...prev];
      newCode[index] = newCode[index] === 0 ? 1 : 0;
      return newCode;
    });
  }, []);

  const toggleSubtractMode = useCallback((): void => {
    setSubtractMode((prev) => (prev === 0 ? 1 : 0));
  }, []);

  const calculateOutput = useCallback(() => {
    const result: number[] = [0, 0, 0, 0];
    let completeResultA: string = '';
    let completeResultB: string = '';
    let carryOutValue: number = 0;
    const fullA = aInputs.join('');
    const fullB = bInputs.join('');
    const select = code.join('');

    fetch("/calculate/circuit2", { // paltan port depende san magrun back
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        a: fullA,
        b: fullB,
        select: select,
        carry_in: carryIn,
        subtract_mode: subtractMode
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend ddebug:", data);
    
      setOutput(data.output.split("")); // output
      setCarryOut(data.carry_out);

      if (onResultChange) {
        onResultChange({
          output: data.output,
          carry_out: data.carry_out,
        });
      }
    })
    .catch((err) => console.error("Error:", err));
    const operation: number = (code[0] << 1) | code[1];

    
    switch (operation) {
      case 0:
        for (let i = 0; i < 4; i++) {
          result[i] = aInputs[i] & bInputs[i];
        }
        for (let i = 0; i < 4; i++) {
          completeResultB = '' + completeResultB + bInputs[i];
          completeResultA = '' + completeResultA + aInputs[i];
        }

        console.log("Updating in AND", result);
        console.log("Updating in AND", completeResultA);
        console.log("Updating in AND", completeResultB);
        break;

      case 1:
        for (let i = 0; i < 4; i++) {
          result[i] = aInputs[i] | bInputs[i];
        }
        console.log("Updating in OR", result);
        break;

      case 2:
        for (let i = 0; i < 4; i++) {
          result[i] = aInputs[i] === 0 ? 1 : 0;
        }
        console.log("Updating in NOT", result);
        break;

      case 3: {
        let carry: number = subtractMode ? 1 : carryIn;

        for (let i = 3; i >= 0; i--) {
          const effectiveB = subtractMode
            ? bInputs[i] === 0
              ? 1
              : 0
            : bInputs[i];

          const sum = aInputs[i] + effectiveB + carry;
          result[i] = sum % 2;
          carry = Math.floor(sum / 2);
        }

        carryOutValue = carry;
        console.log("Updating in ADD", result);
        break;
      }
    }
  }, [aInputs, bInputs, carryIn, code, subtractMode, onResultChange]);

  return {
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
    calculateOutput,
  };
}

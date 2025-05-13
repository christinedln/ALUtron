import { useState, useCallback } from "react";
import type { ALUSimulatorProps } from "../types";

export function useALUState(
  onResultChange?: ALUSimulatorProps["onResultChange"]
) {
  const [aInputs, setAInputs] = useState<number[]>([0, 0, 0, 0]);
  const [bInputs, setBInputs] = useState<number[]>([0, 0, 0, 0]);
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
    let carryOutValue: number = 0;

    const operation: number = (code[0] << 1) | code[1];

    switch (operation) {
      case 0:
        for (let i = 0; i < 4; i++) {
          result[i] = aInputs[i] & bInputs[i];
        }
        break;

      case 1:
        for (let i = 0; i < 4; i++) {
          result[i] = aInputs[i] | bInputs[i];
        }
        break;

      case 2:
        for (let i = 0; i < 4; i++) {
          result[i] = aInputs[i] === 0 ? 1 : 0;
        }
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
        break;
      }
    }

    setOutput(result.map(String));
    setCarryOut(String(carryOutValue));

    if (onResultChange) {
      onResultChange({
        output: result.map(String),
        carry_out: String(carryOutValue),
      });
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

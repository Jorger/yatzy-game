import type { DiceValue } from "../../../../interfaces";

// Debido a que es una acción que no cambia nada en el render del componete
// es posible usar una variable global y no mantenerla en un estado...
let counterRollingDice: number[] = [];

/**
 * Función que valida que todos los dados que no estén seleccionados,
 * hayan terminado de girar...
 * @param value
 * @param values
 * @param handleDoneDices
 */
export const handleAllDiceComplete = (
  value: number,
  values: DiceValue[],
  handleDoneDices: () => void
) => {
  // Se valida que el valor del dado que ha terminado no este en el array
  if (!counterRollingDice.includes(value)) {
    counterRollingDice.push(value);

    // Se extrae el total de dados que no están seleccionados
    // y de esta forma se obtiene el total de dados que se deben validar
    const totalStopDice = values.filter((v) => !v.selected).length;

    // Se valida que ya hayan terminado de girar todos los dados requeridos...
    if (totalStopDice !== 0 && counterRollingDice.length === totalStopDice) {
      // Se limpia la variable global
      counterRollingDice = [];
      // Se indica al componente padre que los dados han terminado de girar...
      handleDoneDices();
    }
  }
};

/**
 * Calcula el IVA y el total a partir de un monto neto
 * @param {number} montoNeto - Monto neto antes de IVA
 * @returns {{iva: number, total: number}} Objeto con el IVA calculado y el total
 */
export const calcularIVA = (montoNeto) => {
  const iva = Math.round(montoNeto * 0.19);
  const total = montoNeto + iva;
  return { iva, total };
};

/**
* Calcula el monto neto a partir de un total con IVA incluido
* @param {number} montoTotal - Monto total con IVA incluido
* @returns {{neto: number, iva: number}} Objeto con el monto neto y el IVA
*/
export const calcularNetoDesdeTotal = (montoTotal) => {
  const neto = Math.round(montoTotal / 1.19);
  const iva = montoTotal - neto;
  return { neto, iva };
};

/**
* Valida que un monto sea válido para cálculos
* @param {number} monto - Monto a validar
* @returns {boolean} True si el monto es válido
*/
export const validarMonto = (monto) => {
  return (
    typeof monto === 'number' &&
    !isNaN(monto) &&
    monto >= 0 &&
    monto <= Number.MAX_SAFE_INTEGER
  );
};
export const calcularIVA = (montoNeto) => {
    const iva = Math.round(montoNeto * 0.19);
    const total = montoNeto + iva;
    return { iva, total };
  };
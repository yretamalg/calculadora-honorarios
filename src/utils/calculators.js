export const calcularIVA = (montoNeto) => {
    const iva = Math.round(montoNeto * 0.19);
    const total = montoNeto + iva;
    return { iva, total };
};

export const calcularRetencion = (monto, tasaPorcentaje) => {
    const tasa = tasaPorcentaje / 100;
    const retencion = Math.round(monto * tasa);
    const liquido = monto - retencion;
    return { retencion, liquido };
};

export const calcularBrutoDesdeNeto = (montoNeto, tasaPorcentaje) => {
    const tasa = tasaPorcentaje / 100;
    return Math.round(montoNeto / (1 - tasa));
};
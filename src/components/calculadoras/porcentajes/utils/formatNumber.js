// src/components/calculadoras/porcentajes/utils/formatNumber.js
export const formatNumber = (number) => {
  const parsed = parseFloat(number);
  if (isNaN(parsed)) return '0';
  if (Number.isInteger(parsed)) return parsed.toString();
  return parsed.toFixed(2);
};
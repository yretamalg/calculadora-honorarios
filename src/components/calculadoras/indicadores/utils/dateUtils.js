// src/utils/dateUtils.js

const CHILE_TZ = 'America/Santiago';

export const getChileDateTime = () => {
  try {
    return new Date().toLocaleString('es-CL', { timeZone: CHILE_TZ });
  } catch (error) {
    console.error('Error getting Chile datetime:', error);
    return new Date().toISOString();
  }
};

export const isBusinessDay = (date) => {
  if (!date) return false;
  try {
    const chileDate = new Date(date.toLocaleString('en-US', { timeZone: CHILE_TZ }));
    const day = chileDate.getDay();
    return day !== 0 && day !== 6;
  } catch (error) {
    console.error('Error checking business day:', error);
    return false;
  }
};

export const getLastBusinessDay = () => {
  try {
    const chileDate = new Date(getChileDateTime());
    chileDate.setHours(0, 0, 0, 0);
    
    while (!isBusinessDay(chileDate)) {
      chileDate.setDate(chileDate.getDate() - 1);
    }
    
    return chileDate.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error getting last business day:', error);
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
};

export const getCurrentDate = () => {
  try {
    const chileDate = new Date(getChileDateTime());
    chileDate.setHours(0, 0, 0, 0);
    return chileDate.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error getting current date:', error);
    return new Date().toISOString().split('T')[0];
  }
};
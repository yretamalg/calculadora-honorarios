// src/components/shared/ErrorTracking.jsx
import { useErrorTracking } from '../../hooks/useErrorTracking';

const ErrorTracking = ({ errorType, errorDetails }) => {
  useErrorTracking(errorType, errorDetails);
  return null;
};

export default ErrorTracking;
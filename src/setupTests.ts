import './polyfills';
import '@testing-library/jest-dom';

// Add structuredClone polyfill
if (typeof structuredClone === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  global.structuredClone = (obj: any) => JSON.parse(JSON.stringify(obj));
}

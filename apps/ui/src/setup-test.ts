import '@testing-library/jest-dom';

declare var global: any;

if (typeof global.IntersectionObserver === 'undefined') {
  global.IntersectionObserver = class MockIntersectionObserver {
    observe() {
      return null;
    }
    unobserver() {
      return null;
    }
    disconnect() {
      return null;
    }
  };
}

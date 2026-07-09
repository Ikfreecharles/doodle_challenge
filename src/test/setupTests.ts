import '@testing-library/jest-dom';

class ResizeObserverMock implements ResizeObserver {
  disconnect = jest.fn();
  observe = jest.fn();
  unobserve = jest.fn();
}

global.ResizeObserver = ResizeObserverMock;

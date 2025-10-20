import '@testing-library/jest-dom';

if (globalThis.bootstrap === undefined) {
  globalThis.bootstrap = {
    Modal: class MockModal {
      show = () => {}; // Simula el método show()
      hide = () => {}; // Simula el método hide()
    }
  };
}
export default class KeyboardManager {
  constructor(bus) {
    this.bus = bus;
    this.listen();
  }

  listen() {
    const maps = {
      49: 1,
      50: 2,
      51: 3,
      52: 4,
      53: 5,
      54: 6,
      55: 7,
      56: 8,
      57: 9,
      82: 'reset',
    };
    document.addEventListener('keydown', (e) => {
      const modifier = e.ctrlKey || e.altKey || e.shiftKey || e.metaKey;
      const map = maps[e.keyCode];

      if (!modifier && map) {
        this.bus.$emit('inputNum', map);
        e.preventDefault();
      }
    });
  }
}
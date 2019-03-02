class localStorageManager {
  constructor() {
    this.originGrid = 'originGrid';
    this.gameGrid   = 'gameGrid';
    this.gamingGrid = 'gamingGrid';
    this.markGrid   = 'markGrid';
    this.settings   = 'settings';
    this.gameID     = 'gameID';
    this.books = 'books';
    this.timer = 'timer';
  }

  getGameState(item) {
    const gameState = JSON.parse(window.localStorage.getItem(this[item]));
    return gameState;
  }

  setGameState(item, state) {
    const gameState = JSON.stringify(state);
    window.localStorage.setItem(this[item], gameState);
  }

  removeGameState(item) {
    if (!this[item]) return;
    window.localStorage.removeItem(item);
  }

  clearGameState() {
      // 不清除设置缓存
    for (let key in this) {
      if ((typeof this[key]) === 'function') continue;
      if (key === 'settings') continue;
      if (key === 'books') continue;

      window.localStorage.removeItem(key);
    }
  }
}

export default new localStorageManager();
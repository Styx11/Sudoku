import { mapState, mapGetters } from 'vuex';

export default {
  name: 'GameKeyboard',
  computed: {
    ...mapState({
      disableSolved: state => state.settings.disableSolved,
      numDisabled: state => state.gameStore.kbStore.numDisabled,
      numberSolved: state => state.gameStore.kbStore.numberSolved,
      checkDisabled: state => state.gameStore.kbStore.checkDisabled,
      operateDisabled: state => state.gameStore.kbStore.operateDisabled,
    }),
    ...mapGetters({
      keyRange: 'size'
    })
  },
  methods: {
    inputNum (n) {
      if (n <= this.keyRange && !this.numberSolved[n] && !this.numDisabled) {
        this.bus.$emit('inputNum', n);
      }
    },
    markTile () {
      if (!this.operateDisabled) {
        this.bus.$emit('markTile');
      }
    },
    delNum () {
      if (!this.operateDisabled) {
        this.bus.$emit('delNum');
      }
    },
    checkGrid () {
      if (!this.checkDisabled) {
        this.bus.$emit('checkGrid');
      }
    },
    // 由是否可用，返回相应的样式与类
    operateClass (disabled, delBtn) {
      return {
        'mdui-ripple': delBtn ? false : !disabled,// 取消清除按钮的涟漪效果，修复禁用后涟漪动画错位bug
        'keyboard-tile-abled': !disabled,
        'keyboard-tile-disabled': disabled
      };
    },
    numClass (num) {
      const keyRange = this.keyRange;// 数字量若达到上限，则禁用
      const disabled = this.numDisabled || num > keyRange || this.numberSolved[num];
      return {
        'mdui-ripple': !disabled || this.disableSolved,// 开启数字量禁用时，开启涟漪
        'keyboard-tile-abled': !disabled,
        'keyboard-tile-disabled': disabled
      };
    },
  },
  render () {
    const numKeys = () => {
      return Array.apply(null, {length: 9})
        .map((n, i) => {
          return (
            <span
              onClick={this.inputNum.bind(this, i + 1)}
              class='keyboard-tile mdui-shadow-1'
              {...{class: this.numClass(i + 1)}}
            >{ i + 1 }</span>
          );
        });
    };

    return (
      <div class='keyboard'>
        <div class='keyboard-input'>
          {numKeys()}
        </div>
        <div class='keyboard-operate'>
          <span
          class='keyboard-tile mdui-shadow-1'
          {...{class: this.operateClass(this.operateDisabled)}}
          onClick={this.markTile.bind(this)}
          >标记</span>
          <span
          class='keyboard-tile mdui-shadow-1'
          {...{class: this.operateClass(this.operateDisabled, true)}}
          onClick={this.delNum.bind(this)}
          >清除</span>
          <span
          class='keyboard-tile mdui-shadow-1'
          {...{class: this.operateClass(this.checkDisabled)}}
          onClick={this.checkGrid.bind(this)}
          >查错</span>
        </div>
      </div>
    );
  }
};
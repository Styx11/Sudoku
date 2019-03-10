export default {
  name: 'GameKeyboard',
  props: {
    keyRange: {
      type: Number,
      require: true
    },
    disableSolved: {
      type: Boolean,
      require: false
    }
  },
  data () {
    return {
      numDisabled: true,
      checkDisabled: true,
      operateDisabled: true,
      numberSolved: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false 
      }
    };
  },
  mounted () {
    // 监听操作键是否可用
    this.bus.$on('operateDisabled', disabled => this.operateDisabled = disabled);

    // 监听查错按钮是否可用
    this.bus.$on('checkDisabled', disabled => this.checkDisabled = disabled);

    // 监听数字键盘是否可用
    this.bus.$on('numDisabled', disabled => this.numDisabled = disabled);

    // 监听数字完成量
    this.bus.$on('numberSolved', this.handleNums);
  },
  beforeDestroy () {
    // 解除事件绑定
    this.bus.$off('operateDisabled');
    this.bus.$off('checkDisabled');
    this.bus.$off('numDisabled');
    this.bus.$off('numberSolved');
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
    // 处理数字完成量
    handleNums (nums) {
      for (let n in nums) {
        this.numberSolved[n] = this.disableSolved && nums ? (nums[n] >= this.keyRange) : false;
      }
    }
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
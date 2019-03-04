export default {
  name: 'MduiDialog',
  props: {
    id: {
      type: String,
      require: true
    },
    close: {
      type: Boolean
    },
    confirm: {
      type: Function
    },
    title: {
      type: String
    },
    content: {
      type: String
    }
  },
  methods: {
    handleConfirm() {
      if (this.confirm) {
        this.confirm();
      }
    }
  },
  render() {
    // 标题
    const titleSection = () => {
      if (this.title) {
        return (
          <div class='mdui-dialog-title'>{this.title}</div>
        );
      }
    };
    // 内容
    const contentSection = () => {
      if (this.content) {
        return (
          <div class='mdui-dialog-content'>{this.content}</div>
        );
      }
    };
    // 关闭按钮
    const closeBtn = () => {
      if (this.close) {
        return (
          <button class='mdui-btn mdui-ripple' mdui-dialog-close>取消</button>
        );
      }
    };
    return(
      <div class='mdui-dialog' id={this.id}>
        {titleSection()}
        {contentSection()}
        <div class='mdui-dialog-actions'>
          {closeBtn()}
          <button class='mdui-btn mdui-ripple' onClick={this.handleConfirm.bind(this)} mdui-dialog-confirm>确定</button>
        </div>
      </div>
    );
  }
};
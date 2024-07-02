// import { ScrollEvent } from "./modules/_scrollEvent";

/**
 * スクロールイベントを管理する
 */
export class ScrollEvent {
  constructor() {
    this.pre = [];
    this.up = [];
    this.down = [];
    this.post = [];
    this.top = [];
    this.nottop = [];
    this.prop = {
      nowY: window.scrollY,
      nowX: window.scrollX,
      oldY: window.scrollY,
      oldX: window.scrollX,
      btmY: document.body.offsetHeight - window.innerHeight
    };
    this.throttleTimer = null;
  }

  /**
   * 関数をキューイングする
   * @param {Function} func キューイングする関数
   * @param {String} when default: pre; pre, up, down, postから選択
   * @param {String} method default: push; push, unsfhitから選択
   */
  enqueue(func, when = "pre", method = "push") {
    let targetQueue = null;

    switch (when) {
      case "pre": {
        targetQueue = this[when];
        break;
      }
      case "up": {
        targetQueue = this[when];
        break;
      }
      case "down": {
        targetQueue = this[when];
        break;
      }
      case "post": {
        targetQueue = this[when];
        break;
      }
      case "top": {
        targetQueue = this[when];
        break;
      }
      case "nottop": {
        targetQueue = this[when];
        break;
      }
      default: {
        const error = new Error(
          'You can only set 2nd argument "pre", "up", "down", "post", "top" or "nottop".'
        );
        throw error;
      }
    }

    switch (method) {
      case "push": {
        targetQueue.push(func);
        break;
      }
      case "unshift": {
        targetQueue.unshift(func);
        break;
      }
      default: {
        const error = new Error(
          'You can only set 3rd argument "push" or "unshift".'
        );
        throw error;
      }
    }
  }

  update() {
    this.prop.oldY = window.pageYOffset;
    this.prop.oldX = window.pageXOffset;
    this.prop.btmY = document.body.offsetHeight - window.innerHeight;
  }

  activate() {
    window.addEventListener(
      "scroll",
      evt => {
        if (this.throttleTimer) {
          return;
        } else {
          // throttle
          this.throttleTimer = window.setTimeout(() => {
            // execute post
            this.pre.reduce((acc, cur) => {
              return cur(acc);
            }, evt);

            if (window.pageYOffset < 1) {
              this.top.reduce((acc, cur) => {
                return cur(acc);
              }, evt);
            } else {
              this.nottop.reduce((acc, cur) => {
                return cur(acc);
              }, evt);
            }

            window.clearTimeout(this.throttleTimer);
            this.throttleTimer = null;
          }, 100);

          // main thread
          this.prop.nowY = window.pageYOffset;
          this.prop.nowX = window.pageXOffset;

          // execute pre
          this.post.reduce((acc, cur) => {
            return cur(acc);
          }, evt);

          // // @DEBUG
          // console.log(
          //   this.prop.oldY,
          //   this.prop.nowY,
          //   this.prop.btmY,
          //   this.prop.oldY > this.prop.nowY && this.prop.nowY < this.prop.btmY,
          //   this.prop.oldY < this.prop.nowY && this.prop.oldY > 0
          // );

          // execute up or down
          if (
            this.prop.oldY > this.prop.nowY &&
            this.prop.nowY < this.prop.btmY
          ) {
            // safari は ページ最下部で上スクロールすると行き過ぎてから最下部に戻るスクロールイベントを発火するので nowY が btmYより小さい時は無視する。
            document.body.classList.add("js-scroll-up");
            document.body.classList.remove("js-scroll-down");

            this.up.reduce((acc, cur) => {
              return cur(acc);
            }, evt);
          } else if (this.prop.oldY < this.prop.nowY && this.prop.oldY > 0) {
            // safari は ページ上部で上スクロールするとマイナスから0に戻るスクロールイベントを発火するので oldY がマイナスの時は無視する。
            document.body.classList.remove("js-scroll-up");
            document.body.classList.add("js-scroll-down");

            this.down.reduce((acc, cur) => {
              return cur(acc);
            }, evt);
          }
        }
        this.update();
      },
      false
    );
  }
}

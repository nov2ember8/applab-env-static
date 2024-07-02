// import { AriaModal, AriaTab } from "./library/_aria";

import { convertKeycodeToKeygroup } from "./_keyboard";
const focusableSelector = "a, button, input, select, textarea, [tabindex]";
/**
 * button[aria-haspopup="menu/listbox/dialog"][aria-expanded="false"][aria-label="open"][aria-controls="modal"]
 * div#modal[role="dialog?"][aria-labeledby="modalLabel"][aria-hidden="true"]
 *   ul[role="menu/listbox"]
 *     li[role="none/option"]
 *       a
 *     li[role="none/option"]
 *       button[aria-expanded="false"][aria-label="open"][tabindex="-1"][aria-controls="modal"]
 */
export class AriaModal {
  /**
   * ハンバーガーやモーダルウィンドウ等のARIAを実装する（スタイルは別途作成）
   * @param {Object} target 操作対象要素
   * @param {?Object} param1 オプション { className, expandLabel, shrinkLabel }
   */
  constructor(
    target,
    { className = "is-active", expandedLabel = null, shrinkedLabel = null } = {}
  ) {
    this.target = target;
    this.buttons = document.querySelectorAll(`*[aria-controls="${target.id}"]`);
    this.className = className;
    this.expandedLabel = expandedLabel;
    this.shrinkedLabel = shrinkedLabel;
    if (!this.target) {
      console.error("there is no element specified by aria-controls.");
      return null;
    }

    // フォーカス不可にする
    this.target.querySelectorAll(focusableSelector).forEach(elem => {
      elem.setAttribute("tabIndex", -1);
    });
  }

  /**
   * 要素を表示する
   * @param {Funciton} callback コールバック関数 第一引数に{target, buttons, className}を持つ
   */
  expand(callback) {
    // console.log(`expand:${this.target.id}`);
    for (let button of this.buttons) {
      // console.log(button);
      button.setAttribute("aria-expanded", "true");
      if (this.expandedLabel)
        button.setAttribute("aria-label", this.expandedLabel);
      button.classList.add(this.className);
    }
    this.target.setAttribute("aria-hidden", "false");
    this.target.classList.add(this.className);
    this.focustrap();

    if (typeof callback == "function") callback(this);
    return this;
  }

  /**
   * 要素を非表示にする
   * @param {Function} callback コールバック関数 第一引数に{target, buttons, className}を持つ
   */
  shrink(callback) {
    // console.log(`shrink:${this.target.id}`);
    this.target.setAttribute("aria-hidden", "true");
    for (let button of this.buttons) {
      // console.log(button);
      button.setAttribute("aria-expanded", "false");
      if (this.shrinkedLabel)
        button.setAttribute("aria-label", this.shrinkedLabel);
      button.classList.remove(this.className);
    }
    this.target.classList.remove(this.className);
    this.focusuntrap();
    if (typeof callback == "function") callback(this);
    return this;
  }

  /**
   * トグルスイッチを一括設定する
   * @param {String} eventType eventタイプ clickなど
   * @param {Funciton} expandCallback expandの後に実行する関数 第一引数に{target, buttons, className}を持つ
   * @param {Function} shrinkCallback shrinkの後に実行する関数  第一引数に{target, buttons, className}を持つ
   */
  setToggle(eventType, expandCallback, shrinkCallback) {
    let initiator = null; // expand をトリガーした Elementを保持する

    for (let button of this.buttons) {
      // 指定されたイベントでの処理
      button.addEventListener(
        eventType,
        () => {
          if (this.target.getAttribute("aria-hidden") == "true") {
            initiator = button;
            this.expand(expandCallback);
          } else {
            initiator = null;
            this.shrink(shrinkCallback);
          }
        },
        false
      );

      // ボタンでnegativeキーコードをキャッチした時
      button.addEventListener("keydown", evt => {
        const keygroups = convertKeycodeToKeygroup(evt.keyCode);
        if (keygroups.includes("negative")) {
          initiator = null;
          this.shrink(shrinkCallback);
        }
      });
    }

    // ターゲット内でnegativeキーコードをキャッチした時
    this.target.addEventListener("keydown", evt => {
      const keygroups = convertKeycodeToKeygroup(evt.keyCode);
      if (keygroups.includes("negative")) {
        initiator?.focus();
        this.shrink(shrinkCallback);
      }
    });

    // listboxの時はaria-selectedを操作する
    if (this.target.getAttribute("role") === "listbox") {
      const options = this.target.querySelectorAll('[role="option"]');
      options.forEach((option, index) => {
        option.addEventListener("click", () => {
          options.forEach(item => {
            if (item != option) {
              item.removeAttribute("aria-selected");
            } else {
              item.setAttribute("aria-selected", "true");
              // 値受け渡し（HTML API）
              this.target.setAttribute("data-label", item.innerText);
              this.target.setAttribute(
                "data-value",
                item.getAttribute("data-value")
              );
            }
          });
          this.target.blur(); // フォーカスを外す
          this.shrink(shrinkCallback);
        });

        // option上でキーコードをキャッチした時
        option.addEventListener("keydown", evt => {
          if (Number(evt.currentTarget.getAttribute("tabindex")) < 0) return;
          // console.log(evt.keyCode, evt.currentTarget);
          const keygroups = convertKeycodeToKeygroup(evt.keyCode);
          if (keygroups.includes("positive")) {
            evt.currentTarget.click();
            // console.log("positive", evt.keyCode, evt.currentTarget);
          } else if (keygroups.includes("next")) {
            options[index + 1]?.focus();
          } else if (keygroups.includes("prev")) {
            options[index - 1]?.focus();
          }
        });
      });
    }

    return this;
  }

  /**
   * フォーカストラップを実行する
   */
  focustrap() {
    document.querySelectorAll(focusableSelector).forEach(elem => {
      const tabindex = elem.getAttribute("tabindex");
      if (tabindex > 0) elem.setAttribute("data-tabindex", tabindex);
      elem.setAttribute("tabindex", -1);
    });
    this.buttons.forEach(elem => {
      elem.setAttribute("tabindex", 0);
    });
    this.target.querySelectorAll(focusableSelector).forEach((elem) => {
      elem.setAttribute("tabIndex", 0);
      if (elem.getAttribute("aria-selected") === "true") elem.focus();
    });
  }

  /**
   * フォーカストラップを解除する
   */
  focusuntrap() {
    document.querySelectorAll(focusableSelector).forEach(elem => {
      const tabindex = elem.getAttribute("data-tabindex") || 0;
      if (!elem.hidden) elem.setAttribute("tabindex", tabindex);
    });
    this.target.querySelectorAll(focusableSelector).forEach(elem => {
      elem.setAttribute("tabIndex", -1);
    });
  }
}

/**
 * ul[role="tablist"]
 *   li[role="tab"][aria-selected="true"][aria-controls="panel1"][data-state="st1"][tabindex="0"]
 *   li[role="tab"][aria-selected="false"][aria-controls="panel2"][data-state="st2"][tabindex="0"]
 *   li[role="tab"][aria-selected="false"][aria-controls="panel3"][data-state="st2"][tabindex="0"]
 * div
 *   div#panel1[aria-hidden="false"]
 *   div#panel2[aria-hidden="true"]
 *   div#panel3[aria-hidden="true"]
 */
export class AriaTab {
  /**
   * タブ切り替えのARIA実装する（スタイルは別途作成）
   * @param {Object} tablistElement role=tablist, 子にrole=tab,aria-selected,aria-controlsが必要
   */
  constructor(tablistElement, { className = "is-active" } = {}) {
    this.tabs = [...tablistElement.querySelectorAll("*[aria-selected]")];
    if (!this.tabs) {
      console.error("there is no element specified by aria-selected.");
      return null;
    }
    this.tabpairs = this.tabs.map(
      elem => new TabPair(elem, { className: className })
    );
  }

  /**
   * IDを指定して特定のタブを活性化する
   * @param {String} id 対象とするtabpanel要素のID
   * @param {Function} activateCallback タブが活性化したときに実行する関数 第一引数に{id, tab, tabpanel}を持つ
   * @param {Function} disactivateCallback タブが非活性化したときに実行する関数 第一引数に{id, tab, tabpanel}を持つ
   */
  select(id, activateCallback, disactivateCallback) {
    this.tabpairs.forEach(tabpair => {
      if (tabpair.id === id) {
        tabpair.activate(activateCallback);
      } else {
        tabpair.disactivate(disactivateCallback, {
          enableHide: tabpair.id !== id
        });
      }
    });
    return this;
  }

  /**
   * タブ切り替えを一括設定する
   * @param {String} eventType eventタイプ clickなど
   * @param {Function} activateCallback タブが活性化したときに実行する関数 第一引数に{id, tab, tabpanel}を持つ
   * @param {Function} disactivateCallback タブが非活性化したときに実行する関数 第一引数に{id, tab, tabpanel}を持つ
   */
  setRadio(eventType, activateCallback, disactivateCallback) {
    this.tabpairs.forEach(tabpair => {
      tabpair.tab.addEventListener(
        eventType,
        () => {
          this.select(
            tabpair.id,
            activateCallback,
            disactivateCallback
          );
        },
        false
      );
      tabpair.tab.addEventListener("keydown", evt => {
        const keygroups = convertKeycodeToKeygroup(evt.keyCode);
        if (keygroups.includes("positive")) {
          this.select(
            tabpair.id,
            activateCallback,
            disactivateCallback
          );
        }
      });
    });
    return this;
  }

  /**
   * tabpaiersが特定のIDを持つか調べる
   * @param {String} id
   * @return {Boolean} 持っていればtrue
   */
  hasId(id) {
    for (let tabpair of this.tabpairs) {
      if (tabpair.id === id) return true;
    }
    return false;
  }
}

class TabPair {
  constructor(tab, { className = "is-active" } = {}) {
    this.id = tab.getAttribute("aria-controls");
    this.state = tab.getAttribute("data-state");
    this.tab = tab;
    this.tabpanel = document.getElementById(this.id);
    this.className = className;
  }

  activate(callback) {
    // console.log("activate", this.tab);
    this.tab.setAttribute("aria-selected", "true");
    this.tabpanel.setAttribute("aria-hidden", "false");
    this.tab.classList.add(this.className);
    this.tabpanel.classList.add(this.className);
    if (typeof callback == "function") callback(this);
    return this;
  }

  disactivate(callback, { enableHide = true } = {}) {
    // console.log("disactivate", this.tab);
    this.tab.setAttribute("aria-selected", "false");
    if (enableHide) this.tabpanel.setAttribute("aria-hidden", "true");
    this.tab.classList.remove(this.className);
    this.tabpanel.classList.remove(this.className);
    if (typeof callback == "function") callback(this);
    return this;
  }
}

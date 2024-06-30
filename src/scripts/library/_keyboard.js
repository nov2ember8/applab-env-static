// import { convertKeycodeToKeygroup } from "../library/_keyboard";

const keyGroups = [
  {
    groupName: "positive",
    keycodes: [13, 32] // enter, space
  },
  {
    groupName: "negative",
    keycodes: [27, 46, 8] // esc, delete, backspace
  },
  {
    groupName: "tab",
    keycodes: [9] // tab
  },
  {
    groupName: "enter",
    keycodes: [13] // enter
  },
  {
    groupName: "space",
    keycodes: [32] // space
  },
  {
    groupName: "escape",
    keycodes: [27] // escape
  },
  {
    groupName: "delete",
    keycodes: [46] // delete
  },
  {
    groupName: "backspace",
    keycodes: [8] // backspace
  },
  {
    groupName: "arrow",
    keycodes: [37, 38, 29, 40] // left, up, right, down
  },
  {
    groupName: "left",
    keycodes: [37] // left
  },
  {
    groupName: "up",
    keycodes: [38] // up
  },
  {
    groupName: "right",
    keycodes: [39] // right
  },
  {
    groupName: "down",
    keycodes: [40] // down
  },
  {
    groupName: "prev",
    keycodes: [37, 28] // left, up
  },
  {
    groupName: "next",
    keycodes: [39, 40] // right, down
  }
];

export function convertKeycodeToKeygroup(keycode) {
  /**
   * キーコードの属性を配列で返す
   * @param {interger} keycode 判定対象となるキーコード
   * @returns {array} ["positive", "enter", ...]
   */
  const keycodeGroups = [];
  keyGroups.forEach(group => {
    if (group.keycodes.includes(keycode)) keycodeGroups.push(group.groupName);
  });
  return keycodeGroups;
}

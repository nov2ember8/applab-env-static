import {AriaModal} from "../library/_aria"
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

window.addEventListener("DOMContentLoaded", () => {
  const drawerPanel = document.querySelector("#drawer-panel");
  if (drawerPanel) {
    const drawerAria = new AriaModal(drawerPanel, {
      expandedLabel: "メニューを閉じる",
      shrinkedLabel: "メニューを開く"
    });
    drawerAria.setToggle("click", disableBodyScroll, enableBodyScroll);
    drawerPanel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        drawerAria.shrink(enableBodyScroll);
      })
    });
    drawerPanel.addEventListener('click', () => {
      drawerAria.shrink(enableBodyScroll);
    })
  }
});


import { AriaTab } from "../library/_aria";

window.addEventListener("DOMContentLoaded", evt => {
  const tabs = document.querySelectorAll(".m-tab");

  if (tabs.length) {
    tabs.forEach(tab => {
      const tabAria = new AriaTab(tab.querySelector(".m-tab__list"));
      tabAria.setRadio("click");
    });
  }
});

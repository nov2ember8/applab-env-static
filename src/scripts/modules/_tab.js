import { AriaTab } from "../library/_aria";

window.addEventListener("DOMContentLoaded", evt => {
  const url = new URL(location.href);
  const tabs = document.querySelectorAll(".m-tab");

  if (tabs.length) {
    tabs.forEach(tab => {
      const activeTabId = url.searchParams.get(tab.id);

      const tabAria = new AriaTab(tab.querySelector(".m-tab__list"));
      tabAria.setRadio("click", (tabPair)=>{
        history.pushState(null, "", `?${tab.id}=${tabPair.id}`)
      });
      if(activeTabId) {
        tabAria.tabpairs.forEach((tabpair) => {
          if(tabpair.id === activeTabId) {
            tabpair.activate();
          } else {
            tabpair.disactivate();
          }
        });
      }
    });
  }
});

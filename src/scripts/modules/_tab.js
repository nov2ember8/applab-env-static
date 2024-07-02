import { AriaTab } from "../library/_aria";

window.addEventListener("DOMContentLoaded", () => {
  const url = new URL(location.href);
  const tabPanels = document.querySelectorAll(".m-tab__panels");

  if (tabPanels.length) {
    tabPanels.forEach(tabPanel => {
      const activeTabId = url.searchParams.get(tabPanel.id);
      const tablists = document.querySelectorAll(".m-tab__list");
      const tabArias = [];

      tablists.forEach((tablist) => {
        const tabAria = new AriaTab(tablist);
        tabArias.push(tabAria);
        if(activeTabId) {
          tabAria.tabpairs.forEach((tabpair) => {
            if(tabpair.id === activeTabId) {
              tabpair.activate();
            } else {
              tabpair.disactivate();
            }
          });
        }
      })
      // タブリストが複数ある場合を想定
      tabArias.forEach((tabAria, index, all) => {
        tabAria.setRadio("click", (tabPair)=>{
          history.pushState(null, "", `?${tabPanel.id}=${tabPair.id}`);
          all.forEach((oneOftabAria)=>{
            oneOftabAria.tabpairs.forEach((oneOfTabPair)=>{
              if(oneOfTabPair.id === tabPair.id) {
                oneOfTabPair.activate();
              } else {
                oneOfTabPair.disactivate();
              }
            });
          })
        });
      });
    });
  }
});

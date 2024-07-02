import { AriaModal } from "../library/_aria";

window.addEventListener("DOMContentLoaded", evt => {
  const accordionPanels = document.querySelectorAll('.m-accordion__panel');
  if(accordionPanels.length) {
    accordionPanels.forEach((accordion)=>{
      const accordionAria = new AriaModal(accordion, {
        expandedLabel: "閉じる",
        shrinkedLabel: "開く"
      });
      accordionAria.setToggle('click');
    });
  }
});
import {ScrollEvent} from "../library/_scrollEvent";

window.addEventListener('DOMContentLoaded', () => {
  const threshold = 500;
  const appear = document.querySelector('.m-appear');
  const className = "is-appeared";

  if(!appear) return;

  const scrollEvent = new ScrollEvent();
  scrollEvent.enqueue(()=>{
    if(scrollEvent.prop.nowY > threshold) {
      appear.classList.add(className);
    } else {
      appear.classList.remove(className);
    }
  },"post")
  scrollEvent.activate();
})
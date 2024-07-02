import {gsap} from "gsap";
import Splide from "@splidejs/splide";
import "./modules/_drawer";
import "./modules/_tab";
import "./modules/_accordion";
import "./modules/_appear";
import loadStatus from "./library/_loadStatus";
loadStatus();

// 動作検証用、削除して構いません
window.addEventListener('DOMContentLoaded', ()=>{

  // gsap
  const gsapTest = document.querySelector('.gsap-test');
  if(gsapTest) {
    gsap.to(gsapTest, {
      duration: 2,
      x:100,
      repeat: -1,
      yoyo: true
    })
  }

  // splide
  new Splide('.splide', {
    type: 'loop',
    padding: '5rem',
    gap: '2rem',
  }).mount();
})

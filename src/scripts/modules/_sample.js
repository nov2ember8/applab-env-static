// 動作検証用
import {gsap} from "gsap";
import Splide from "@splidejs/splide";

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


// 스와이퍼 플러그인
var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const btnCall = document.querySelector(".btnCall");
const gnbMo = document.querySelector("#gnbMo");

const sections = document.querySelectorAll(".section");
const scrollBtn = document.querySelector(".scrollBtn");
const scrollBtnLis = scrollBtn.querySelectorAll("li");
const base = -300;

const vidBtn = document.querySelector(".vidBtn");

let posArr = [];
for (let el of sections) {
  posArr.push(el.offsetTop);
}

// 햄버거 버튼 클릭 이벤트
btnCall.addEventListener("click", (e) => {
  e.preventDefault();

  btnCall.classList.toggle("on");
  gnbMo.classList.toggle("on");
})

// 스크롤 이벤트
window.addEventListener("scroll", () => {
  let scroll = window.scrollY || window.pageYOffset;

  // 스크롤 네비 컨텐츠영역에서 나타나게 
  if (scroll >= posArr[0] + base) { scrollBtn.style.opacity = "1" } else {
    scrollBtn.style.opacity = "0"
  }

  // 스크롤 네비 클릭시 활성화, 섹션 진입시 모션 나타나게
  sections.forEach((el, index) => {
    if (scroll >= posArr[index] + base) {
      scrollBtnLis.forEach((el, index) => {
        el.classList.remove('on');
      })
      scrollBtnLis[index].classList.add('on');
      sections[index].classList.add('show');
    }
  })

  // 스크롤 네비 클릭시 해당 섹션으로 이동
  scrollBtnLis.forEach((el, index) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();

      new Anim(window, {
        prop: 'scroll',
        value: posArr[index] + base,
        duration: 500,
      })
    })
  })
})

// 비디오 클릭시 유튜브 팝업
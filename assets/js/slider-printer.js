let global = "https://assest.allreview.io/comments.js";
let globalCss = "https://assest.allreview.io/style.css";
let localCss = "./assets/css/blueslider.css";
let local = "./assets/js/blueslider.js";
let newRun = document.createElement("script");
let newCss = document.createElement("link");
let swiperCss = document.createElement("link");
let swiperJs = document.createElement("script");
swiperCss.rel = "stylesheet";
swiperCss.href = "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css";
swiperJs.src = "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js";
newCss.rel = "stylesheet";
newCss.href = `${localCss}?v=${new Date().getTime()}`;
newRun.src = `${local}?v=${new Date().getTime()}`;
newRun.type = "module";
document.body.append(swiperJs);
document.body.append(newRun);
document.head.append(swiperCss);
document.head.append(newCss);

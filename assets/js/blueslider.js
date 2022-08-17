import digitNonValue from "./Parts/digitNonValue.js";

(function () {
  document.querySelectorAll(".js--blueSlider").forEach(function (el) {
    let com = el.dataset.comid;
    let project = el.dataset.projectid;
    let widget = el.dataset.widgetid;
    com = digitNonValue(com);
    project = digitNonValue(project);
    widget = digitNonValue(widget);
    fetch(`https://json.blueslider.com/${com}-${project}-${widget}.json`)
      .then(res => res.text())
      .then(response => {
        let data = response;
        const decode = (b64)=>{return decodeURIComponent(escape(window.atob(b64)));}
        data = JSON.parse(decode(data))
        let dataId = data.list[0].id;
        let dataList = data.list[0];
        let dataSettings = data.settings;
        let date = Date.now()

        
        let dateStart = settingValueReturn(dataSettings,"ViewDateBs");
        dateStart = dateStart.split("-")
        dateStart = `${dateStart[1]}-${dateStart[0]}-${dateStart[2]}`
        dateStart = new Date(dateStart)
        let dateEnd = settingValueReturn(dataSettings,"ViewDateBt")
        dateEnd = dateEnd.split("-")
        dateEnd = `${dateEnd[1]}-${dateEnd[0]}-${dateEnd[2]}`
        dateEnd = new Date(dateEnd)
        
        if(dateEnd.getTime() < date < dateStart.getTime()) {
          el.innerHTML += swiperSlider(dataId,dataSettings);
          sliderItems(dataId,dataList.content,dataSettings);
          swiperSliderSetting(dataId,dataSettings);
          sliderMouseOnStop(dataSettings,dataId);
        } else {
          //console.log("slider süresi sonlanmış")
        }
        
        
        
      })
  })
  
  function swiperSlider(id,settings) {
    return `<!-- Slider main container -->
<div class="swiper" id="blueSlider${id}">
  <!-- Additional required wrapper -->
  <div class="swiper-wrapper"></div>
  <!-- If we need navigation buttons -->
  ${sliderItemButtons(settings)}
</div>`;
  
  }
  function swiperSliderSetting(id,setting) {
    let autoplayDelay = settingValueReturn(setting,"settings_03")
    let swiperItemJs = document.createElement("script");
    let effect = fadeEffect(setting)
    swiperItemJs.type =  "text/javascript";
    swiperItemJs.innerHTML = `
    const slider${id} = new Swiper(\`#blueSlider${id}\`, {
    autoplay: {
          delay: ${autoplayDelay},
          disableOnInteraction: false,
        },
    
    navigation: {
      nextEl: '#blueSlider${id} .swiper-button-next',
      prevEl: '#blueSlider${id} .swiper-button-prev',
    },
  });
    `;
    document.body.append(swiperItemJs);
  }
  function sliderMouseOnStop(settings,id) {
    let control = settingValueReturn(settings,"settings_05")
    switch(Number(control.value)) {
      case 1:
        let sliderItemSettingScript = document.createElement("script");
        sliderItemSettingScript.innerHTML = `let sliderItem = document.querySelector("#blueSlider${id}")
          sliderItem.addEventListener("mouseenter", function() {slider${id}.autoplay.stop()})
          sliderItem.addEventListener("mouseleave", function() {slider${id}.autoplay.start()})
  `
        document.body.append(sliderItemSettingScript)
        break;
      case 0:
        return '';
    }
  }
  function sliderItems(id,items,mobilBreak) {
    items.map(item => {
      document.querySelector(`#blueSlider${id} .swiper-wrapper`).innerHTML += `<div class="swiper-slide">${sliderItemType(item.type,item,mobilBreak)}</div>`;
    })
    
  }
  function sliderItemType(type,sliderItem,settings) {
    let mobilBreak = settingValueReturn(settings,"settings_09")
    switch(Number(type)) {
      case 0:
        return `<picture>
  <source
    media="(min-width: ${Number(mobilBreak)+1}px)"
    srcset="${sliderItem.fileDesktop}">
  <source
    media="(max-width: ${mobilBreak}px)"
    srcset="${sliderItem.fileMobil}">
  <img
    src="${sliderItem.fileDesktop}"
    alt="Flowers"
    style="width:auto;"
    loading="lazy"
  >
</picture>`;
      
      case 1:
        return sliderItem.content
    }
  }
  function sliderItemButtons(settings) {
    let arrowDisplay = settingValueReturn(settings,"settings_05");
    if(arrowDisplay === "1") {
      return `
      <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
      `
    } else {
      return ""
    }
  }
  function settingValueReturn(settings,findValue) {
    let value = settings.filter(item => item.content === findValue)
    value = value[0].value;
    return value;
  }
  function fadeEffect(settings) {
      let fade = settingValueReturn(settings,"settings_06")
      if(fade === "1") {return "effect: 'fade',"} else {return ""}
    
  }
})()





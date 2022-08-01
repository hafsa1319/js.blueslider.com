(function () {

})()

fetch('1025-6738073.json')
  .then(res => res.text())
  .then(response => {
    let str = response
    const decode = (b64)=>{
      return decodeURIComponent(escape(window.atob(b64)));
    }
    console.log(JSON.parse(decode(str)))
    
  })


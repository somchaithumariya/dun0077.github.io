 document.querySelector('#notakaki').innerHTML += ' Cr. <a href="https://t-abdul.blogspot.com" target="_blank">'+unescape("%u0E04%u0E23%u0E39%u0E2D%u0E31%u0E1A%u0E14%u0E38%u0E25%u0E40%u0E25%u0E32%u0E30")+'</a>'
      function showDiscription(){
        document.querySelector('#discription').removeAttribute('style');
        document.querySelector('#btn_hid').removeAttribute('style');
        document.querySelector('#btn_show').setAttribute('style','display:none;');
      }
      function hideDiscription(){
        document.querySelector('#discription').setAttribute('style','display:none;');
        document.querySelector('#btn_hid').setAttribute('style','display:none;');
        document.querySelector('#btn_show').removeAttribute('style');
      }

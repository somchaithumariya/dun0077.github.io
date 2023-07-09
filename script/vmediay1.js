 document.querySelector('#notakaki').innerHTML += ' Cr. <a href="https://t-abdul.blogspot.com" target="_blank">ครูอับดุลเลาะ</a>'
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
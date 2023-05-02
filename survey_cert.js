 if(document.querySelector('.credit').innerHTML != unescape('%u0E40%u0E04%u0E23%u0E14%u0E34%u0E15%3A%20%u0E04%u0E23%u0E39%u0E2D%u0E31%u0E1A%u0E14%u0E38%u0E25%u0E40%u0E25%u0E32%u0E30')){
    document.querySelector('.container').innerHTML = unescape('%3Cbr%3E%3Ccenter%3E%3Ch1%20style%3D%22color%3A%23f00%3B%22%3E%u0E01%u0E23%u0E38%u0E13%u0E32%u0E2D%u0E22%u0E48%u0E32%u0E25%u0E1A%u0E2B%u0E23%u0E37%u0E2D%u0E40%u0E1B%u0E25%u0E35%u0E48%u0E22%u0E19%u0E40%u0E04%u0E23%u0E14%u0E34%u0E15%u0E04%u0E23%u0E31%u0E1A%3Cbr%3E%20%u0E08%u0E32%u0E01%u0E04%u0E23%u0E39%u0E2D%u0E31%u0E1A%u0E14%u0E38%u0E25%u0E40%u0E25%u0E32%u0E30%3C/h1%3E%3C/center%3E')
  }else{
  google.script.run.withSuccessHandler(createTable).getData();
   function createTable(item) {
     var html2 = `<form name="survey"><table class="table table-bordered table-hover">
      <tr class="text-center align-middle sticky-top bg-light">
        <th rowspan="2">รายละเอียดการประเมิน</th>
        <th colspan="5">ระดับความพึงพอใจ</th>
      </tr>
      <tr class="text-center sticky-top bg-light">
        <th>5</th>
        <th>4</th>
        <th>3</th>
        <th>2</th>
        <th>1</th>
      </tr>`
    var html = '';
    for (let i = 0; i < item.length; i++) {
        html += '<tr class="align-middle"><td class="text-start" width="60%"><label>'
       +'<div style="color: black" class="question">'+ item[i][0] +'</div></label></td>'
       + '<td class="text-center" width="8%"><input name="q'+item[i][0]+'" type="radio" id="d' +item[i][0] + item[i][1] + '" value="5"></td>'
      + '<td class="text-center" width="8%"><input name="q'+item[i][0]+'" type="radio" id="d' +item[i][0] + item[i][2] + '" value="4"></td>'
       + '<td class="text-center" width="8%"><input name="q'+item[i][0]+'" type="radio" id="d' +item[i][0] + item[i][3] + '" value="3"></td>'
       + '<td class="text-center" width="8%"><input name="q'+item[i][0]+'" type="radio" id="d' +item[i][0] + item[i][4] + '" value="2"></td>'
       + '<td class="text-center" width="8%"><input name="q'+item[i][0]+'" type="radio" id="d' +item[i][0] + item[i][5] + '" value="1"></td>'
       +'</tr>'
    }
    $("#productbox").html(html2+html)
    
    // ฟังก์ชั่นทำให้คลิกเซลแล้วเลือกอัตโนมัติ
    $(function () {
        $('td').click(function () {

        var cell = $(this),
            state = cell.data('state') || 'first';

        switch (state) {
            case 'first':
                cell.data('state', 'second');
                cell.find('input:radio').attr('checked', true);
                cell.find('input:radio').data('checked', true);
                cell.find('input:radio').prop('checked', true);
                break;
            // case 'second':
            //     cell.data('state', 'first');
            //     cell.find('input:radio').attr('checked', false);
            //     cell.find('input:radio').data('checked', false);
            //     cell.find('input:radio').prop('checked', false);
            //     break;
            default:

                break;
        }
    });
});
   }
   


// บันทึกข้อมูลลงชีต 

  document.querySelector(".btn").addEventListener("click", submitData);



  function submitData(){


    JsLoadingOverlay.show(configs);
    event.preventDefault()
      let input1 = document.getElementById("input1").value;
      let input2 = document.getElementById("input2").value;
      let input3 = document.getElementById("input3").value;
      let input4 = document.getElementById("input4").value;
      
      let data = []
      $("input:checked").each(function() {
          const radioValue = this.value
          data.push(radioValue);
        });

      const result = data.reduce((sum,number) => {
        return parseInt(sum)+parseInt(number)
      }, 0)

      let survey = data

      var QQ = document.getElementById('quiz').value
      var CC = document.getElementById('crit').value

    if(data.length < QQ ){
       JsLoadingOverlay.hide();
          Swal.fire(
            'กรุณาตอบคำถามให้ครบทุกข้อ',
          )
    }else if(input1==""){
       JsLoadingOverlay.hide();
       Swal.fire(
            'กรุณากรอกชื่อสกุล',
          )
    }else if(input2==""){
       JsLoadingOverlay.hide();
       Swal.fire(
            'กรุณาเลือกตำแหน่ง',
          )
    }else if(input3==""){
       JsLoadingOverlay.hide();
       Swal.fire(
            'กรุณาพิมพ์อีเมล์เพื่อรับเกียรติบัตร',
          )
    }else if(result < CC ){
       JsLoadingOverlay.hide();
       Swal.fire(
            'ท่านสอบไม่ผ่านเกณฑ์ กรุณาสอบใหม่',
          )
    }else{
      google.script.run.withSuccessHandler(function(output){
          JsLoadingOverlay.hide();
            Swal.fire({
            title: 'ดาวน์โหลดเกียรติบัตร',
            showConfirmButton: true, 
               html:'<h3>เกียรติบัตรผ่านการอบรมของ '+output[0][2]+'</h3>'+
                    '<a href="'+output[0][6]+'" target="_blank" class="btn bg-success text-light">โหลดเกียรติบัตร</a> '+
                    '<br><br>เราได้ส่งเกียรติบัตรฉบับนี้ไปยังอีเมล์ : '+ output[0][4]+' ของท่านเรียบร้อยแล้ว',          
                  });

          document.querySelector('#input1').value= ""
          document.querySelector('#input2').value= ""
          document.querySelector('#input3').value= ""
          document.querySelector('#input4').value= ""

          google.script.run.withSuccessHandler(resetRadio).getData();
          function resetRadio(item){
              for (let i = 0; i < item.length; i++) {
              $('input[name="q'+item[i][0]+'"]').prop('checked',false);
              }
          }
          
      }).recordData(result,input1,input2,input3,input4,survey) 

    }
    
  }

var configs = {
	'overlayBackgroundColor': '#666666',
	'overlayOpacity': 0.6,
	'spinnerIcon': 'ball-circus',
	'spinnerColor': '#000',
	'spinnerSize': '3x',
	'overlayIDName': 'overlay',
	'spinnerIDName': 'spinner',
	'offsetY': 0,
	'offsetX': 0,
	'lockScroll': false,
	'containerID': null,
};


function reLoad() {
       google.script.run.withSuccessHandler(function(url){
         Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: 'กลับหน้าหลัก',
              showConfirmButton: false,
              timer: 1500
                  })
        window.open(url,'_top');
      })
      .getURL();
    }

}

function showFile(){
 document.querySelector('#survey1').setAttribute('style', 'display:none;');
 document.querySelector('#iframe1').setAttribute('style', 'display:none;');
 document.querySelector('#iframe2').removeAttribute('style');
 document.querySelector('#btn-survey').setAttribute('class', 'nav-link');
 document.querySelector('#btn-file').setAttribute('class', 'nav-link active');
 document.querySelector('#btn-cert').setAttribute('class', 'nav-link');
}
function showCert(){
 document.querySelector('#survey1').setAttribute('style', 'display:none;');
 document.querySelector('#iframe1').removeAttribute('style');
 document.querySelector('#iframe2').setAttribute('style', 'display:none;');
 document.querySelector('#btn-survey').setAttribute('class', 'nav-link');
 document.querySelector('#btn-file').setAttribute('class', 'nav-link');
 document.querySelector('#btn-cert').setAttribute('class', 'nav-link active');
}
function showSurvey(){
 document.querySelector('#survey1').removeAttribute('style');
 document.querySelector('#iframe1').setAttribute('style', 'display:none;');
 document.querySelector('#iframe2').setAttribute('style', 'display:none;');
 document.querySelector('#btn-survey').setAttribute('class', 'nav-link active');
 document.querySelector('#btn-file').setAttribute('class', 'nav-link');
 document.querySelector('#btn-cert').setAttribute('class', 'nav-link');
}

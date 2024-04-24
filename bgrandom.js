/** ฟังก์ชั่นสร้างพื้นหลังแบบสุ่ม แถมให้ 25670422*/
function bgRandom(e){
  let randNo = Math.floor(Math.random()*162)+1;                  //สร้างเลขสุ่ม
  let url = "https://dun0077.github.io/img/bg"+ randNo + ".jpg"  //เอาเลขสุ่มมาใส่ใน url
  document.querySelector(e).setAttribute("style","background-image:url("+url+")")        	 //เอาลิ้งค์รูปภาพที่ได้ตั้งเป็นภาพพื้นหลัง
}
window.onload=function(){
document.getElementById("allow").addEventListener("click",function(){
  navigator.mediaDevices.getUserMedia({'video': true}, success, failure );
});
}

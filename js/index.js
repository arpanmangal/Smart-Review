// This file has functions to coordinate among various JS files


function init() {
    document.getElementById("snap").disabled = true;
    document.getElementById("stop").disabled = true;
    document.getElementById("start").disabled = false;
    document.getElementById("screen").style.display = "none";
    document.getElementById("others").style.display = "none";
    document.getElementById("snap").style.display = "none";

    document.getElementById("untilconfirm").style.display = "none";

}
window.addEventListener("load",init )

function snapshot() {
  document.getElementById("others").style.display = "block";
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    // url = canvas.toDataURL('image/webp', 1.0)
    url = canvas.toDataURL('image/png')
    //var newImg = document.createElement("img"); // create img tag
    //newImg.src = url;
    //document.body.appendChild(newImg); // add to end of your document
    //console.log(url);
}
document.getElementById("screen").addEventListener("click",function(){
snapshot();
})

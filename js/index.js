// This file has functions to coordinate among various JS files

function init() {
    document.getElementById("snap").disabled = true;
}

function snapshot() {
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

// This file deals with getting webcam data
// and sending it to appropriate places for processing
var video = document.querySelector('video');
var url;
var lol;

function startWebcam() {
    /** Call this function for starting the web-cam
     *  It will ask for user permission and start web-cam if permission is granted
    */
    const constraints = {
        video: { width: { min: 1280 }, height: { min: 720 } }
    };

    function handleSuccess(stream) {
        video.srcObject = stream;
        document.getElementById("snap").disabled = false;
        document.getElementById("stop").disabled = false;
        document.getElementById("start").disabled = true;
        document.getElementById("screen").style.display = "block";
    }

    function handleError(error) {
        console.error('Reeeejected!', error);
    }

    navigator.mediaDevices.getUserMedia(constraints).
        then(handleSuccess).catch(handleError);
}


function stopWebcam() {
    /** Function for stopping the web-cam */
    video.srcObject.getTracks()[0].stop()
    document.getElementById("snap").disabled = true;
    document.getElementById("stop").disabled = true;
    document.getElementById("start").disabled = false;
    document.getElementById("screen").style.display = "none";
    document.getElementById("others").style.display = "none";
};


makeblob = function (dataURL) {
    /** This function takes the image data from web-cam returns it after converting to blob */
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = decodeURIComponent(parts[1]);
        return new Blob([raw], { type: contentType });
    }

    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}

document.getElementById("start").addEventListener("click",function(){
startWebcam();
})
document.getElementById("stop").addEventListener("click",function(){
stopWebcam();
})
document.getElementById("snap").addEventListener("click",function(){
snapshot();
})

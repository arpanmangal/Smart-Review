// This JS file contains code which interacts with the Microsoft's Face API
const subscriptionKey = "d86d34f783a34b6c99fb393c6a72fe6e";
const uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

function getEmotionScores(image) {
    // This function grabs an image, and makes query to the Microsoft's Face API
    // It retrieves and returns various emotion
    var emotion
    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes":
            "emotion"
    };
    var sourceImageUrl = url;
    document.querySelector("#sourceImage").src = sourceImageUrl;  //It is displaying the image

    $.ajax({
        url: uriBase + "?" + $.param(params),
        type: 'POST',
        processData: false,
        contentType: 'application/octet-stream',

        // Request headers.
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        // Request body.
        data: makeblob(sourceImageUrl),
    })
    .done(function (data) {
        // Show formatted JSON on webpage.

        lol=data[0]["faceAttributes"]["emotion"];
        $("#responseTextArea").val(JSON.stringify(lol,null,2));
        //$("#responseTextArea").val(JSON.stringify(data, null, 2));
         emotion=JSON.stringify(lol);
         return lol
    })

    .fail(function (jqXHR, textStatus, errorThrown) {
        // Display error message.
        var errorString = (errorThrown === "") ?
            "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ?
            "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                jQuery.parseJSON(jqXHR.responseText).message :
                jQuery.parseJSON(jqXHR.responseText).error.message;
        alert(errorString);
    });

}

function getRating(emotionScores) {
    // This function takes various emotion scores and converts them to an appropriate rating

}

/*
function processImage() {
    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes":
            "age,emotion"
            //"age,gender,headPose,smile,facialHair,glasses,emotion," +
            //"hair,makeup,occlusion,accessories,blur,exposure,noise"
    };

    // Display the image.
    var sourceImageUrl = url; //document.getElementById("inputImage").value;
    document.querySelector("#sourceImage").src = sourceImageUrl;  //It is displaying the image

    $.ajax({
        url: uriBase + "?" + $.param(params),
        type: 'POST',
        processData: false,
        contentType: 'application/octet-stream',

        // Request headers.
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        // Request body.
        data: makeblob(sourceImageUrl),
    })
    .done(function (data) {
        // Show formatted JSON on webpage.
        lol=data[0]["faceAttributes"]["emotion"];
        $("#responseTextArea").val(JSON.stringify(lol));
        emotion=JSON.stringify(data);

    })

    .fail(function (jqXHR, textStatus, errorThrown) {
        // Display error message.
        var errorString = (errorThrown === "") ?
            "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ?
            "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                jQuery.parseJSON(jqXHR.responseText).message :
                jQuery.parseJSON(jqXHR.responseText).error.message;
        alert(errorString);
    });
}
*/

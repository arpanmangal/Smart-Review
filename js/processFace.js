// This JS file contains code which interacts with the Microsoft's Face API
const subscriptionKey = "d86d34f783a34b6c99fb393c6a72fe6e";
const uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

function getEmotionScores() {
    // This function grabs the image whose snapshot is taken, and makes query to the Microsoft's Face API
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
        console.log(lol);
        rating=getRating(lol);
        //$("#responseTextArea").val(JSON.stringify(lol,null,2)); //It just shows the response. remove it.
        $("#responseTextArea").val(rating);
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

function getRating(emotion) {
    //$("#responseTextArea").val(rating); //It just shows the response. remove it.
    var rating=0;
    console.log(emotion["anger"]);
    for (var key in emotion){
        //console.log(emotion[key]);  //works
        //console.log(typeof(emotion[key]));   //number
        rating+=emotion[key];
    }
    return (rating);


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

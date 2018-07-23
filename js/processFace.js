// This JS file contains code which interacts with the Microsoft's Face API
const subscriptionKey = "4a8cf0860f0340cba3ec2b2aa7b4cab5";
const uriBase = "https://southeastasia.api.cognitive.microsoft.com/face/v1.0/detect";

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
    document.querySelector("#myCanvas").src = sourceImageUrl;  //It is displaying the image

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
        //Add a TRY CATCH CONDITION HERE
        try{
        lol=data[0]["faceAttributes"]["emotion"];
        }
        catch(err){
        alert("Please click your snapshot again!");
        }
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
    //console.log(emotion["anger"]);
    for (var key in emotion){
        if (key=="anger"||key=="contempt"||key=="disgust"||key=="fear"){
          rating-=(2*emotion[key]);
        }
        else if (key=="neutral"){
          rating+=(emotion[key]);
        }
        else {
            rating+=(2*emotion[key]);
        }
        //console.log(emotion[key]);  //works
        //console.log(typeof(emotion[key]));   //number

    }
    if (rating==0){
      return "None"
    }
    else{
    return Math.round((rating+2)*2.5);
}

}
document.getElementById("confirm").addEventListener("click",function(){
console.log("Sent to Microsoft")
getEmotionScores();
document.getElementById("untilconfirm").style.display = "block";


})
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

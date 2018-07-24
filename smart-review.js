// Import an element
// import '@polymer/paper-checkbox/paper-checkbox.js';

// Import the PolymerElement base class and html helper
import { PolymerElement, html } from '@polymer/polymer';

// Importing Elements
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';

// Importing libraries
import './jquery-3.3.1.js';

// Define an element class
class SmartReview extends PolymerElement {

  // Define publc API properties
  static get properties() {
    return {
      rating: {
        type: Number,
        value: 5
      },

      subscriptionKey: {
        type: String,
        value: "4a8cf0860f0340cba3ec2b2aa7b4cab5"
      },

      uriBase: {
        type: String,
        value: "https://southeastasia.api.cognitive.microsoft.com/face/v1.0/detect"
      }
    }
  }

  // Define the element's template
  static get template() {
    return html`
      <style>
        .response { margin-top: 10px; } 

        paper-dialog.colored {
          border: 2px solid;
          border-color: #4caf50;
          background-color: #f1f8e9;
          color: #4caf50;
        }

        paper-dialog.size {
          height: 600px;
          width: 600px;
          text-align: center;
        }

        #hiddenCanvas {
          display: none;
        }
      </style>

      <paper-button raised class="green" on-tap="openDialog"><slot></slot></paper-button>
      <paper-dialog id="reviewDialog" class="colored size">
        <h2>Smart Review</h2>
        <p>Click on the Start WebCam button.</p>

        <div>
          <paper-button raised id="startCam" on-tap="startWebcam">Start Webcam</paper-button>
          <paper-button raised disabled id="stopCam" on-tap="stopWebcam">Stop Webcam</paper-button>
        </div>
        <video id="screen" class="wrapping" width="250" height="150" controls autoplay></video>
        
        <div>
        <p> Please click the below button when ready to be clicked... </p>
        <paper-button raised disabled id="rateIt" on-tap="getRating">Rate It !</paper-button>
        <div>
        <br>
        <div id="loading" style="display: none"> Processing your rating ... </div>
        <div id="ratingVal" style="display: none"> You gave us a rating of [[rating]] </div>

        <canvas id="hiddenCanvas" name="wrapping" width="640" height="400"></canvas>
      </paper-dialog>
    `;
  }

  openDialog() {
    // Open the Smart Review Dialog
    this.$.reviewDialog.open();
  }

  startWebcam() {
    /** Call this function for starting the web-cam
     *  It will ask for user permission and start web-cam if permission is granted
    */
    const constraints = {
      video: { width: { min: 1280 }, height: { min: 720 } }
    };

    function handleError(error) {
      console.error('Reeeejected!', error);
    }

    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        let video = this.$.screen;
        video.srcObject = stream;

        this.$.startCam.disabled = true;
        this.$.stopCam.disabled = null;
        this.$.rateIt.disabled = null;

        return;
        document.getElementById("snap").disabled = false;
        document.getElementById("stop").disabled = false;
        document.getElementById("start").disabled = true;
        document.getElementById("screen").style.display = "block";
        document.getElementById("snap").style.display = "block";

      })
      .catch(handleError);
  }

  stopWebcam() {
    /** Function for stopping the web-cam */
    let video = this.$.screen;
    video.srcObject.getTracks()[0].stop();

    this.$.startCam.disabled = null;
    this.$.stopCam.disabled = true;
    this.$.rateIt.disabled = true;
  }

  getRating() {
    /** Grab the image from the video and send to Microsoft API for getting Emotions
     *  Derive rating from the received emotions
     */
    this.$.loading.style.display = 'block';
    this.$.ratingVal.style.display = 'none';

    let url = this.snapshot();
    let imageBlob = this.makeblob(url);

    // Retrive the rating
    this.processFace(imageBlob);
  }

  snapshot() {
    /** Take the snapshot of the image currently displayed in the video */
    let video = this.$.screen;
    var canvas = this.$.hiddenCanvas;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    let url = canvas.toDataURL('image/png');
    return url;
  }

  makeblob(dataURL) {
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

  processFace(image) {
    /** Query the Microsoft's Face API for getting emotions of this image
     *  Returns the emotions dictionary
     */

    var subscriptionKey = this.subscriptionKey;
    var uriBase = this.uriBase;

    var params = {
      "returnFaceId": "true",
      "returnFaceLandmarks": "false",
      "returnFaceAttributes":
        "emotion"
    };

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
      data: image
    })
      .done((data) => {
        try {
          var emotions = data[0]["faceAttributes"]["emotion"];
        }
        catch (err) {
          alert("Please try again..");
        }

        console.log(emotions);
        let rating = this.calEmotionRating(emotions);
        console.log(rating);

        // Update the rating
        this.updateRating(rating);
      })

      .fail((jqXHR, textStatus, errorThrown) => {
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

  calEmotionRating(emotions) {
    /** Calculate the ratings based on emotions */
    var rating = 0;
    var negativeContrib = -4;
    var positiveContrib = 2;
    var neutralContrib = 0;
    var range = positiveContrib - negativeContrib;

    for (let key in emotions) {
      if (key == "anger" || key == "contempt" || key == "disgust" || key == "fear" || key == "sadness") {
        // negative emotions contribute negatively
        rating += (negativeContrib * emotions[key]);
      } else if (key == "neutral") {
        // neutral emotion
        rating += (neutralContrib * emotions[key]);
      } else {
        // positive emotions
        rating += (positiveContrib * emotions[key]);
      }
    }

    rating = Math.round((rating - negativeContrib) * 10 / range);
    return rating;
  }

  updateRating(rating) {
    /** Update the rating property and make it visible */
    this.rating = rating;
    this.$.loading.style.display = 'none';
    this.$.ratingVal.style.display = 'block';
  }
}

// Register the element with the browser
customElements.define('smart-review', SmartReview);


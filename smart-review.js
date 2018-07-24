// Import an element
// import '@polymer/paper-checkbox/paper-checkbox.js';

// Import the PolymerElement base class and html helper
import { PolymerElement, html } from '@polymer/polymer';

// Importing Elements
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';

// Define an element class
class SmartReview extends PolymerElement {

  // Define publc API properties
  static get properties() {
    return { 
      liked: {
        type: Boolean
      },
      video: {
        type: Object
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

  getRating () {
    console.log('getting rating')
  }
}

// Register the element with the browser
customElements.define('smart-review', SmartReview);


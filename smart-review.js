// Import an element
// import '@polymer/paper-checkbox/paper-checkbox.js';

// Import the PolymerElement base class and html helper
import {PolymerElement, html} from '@polymer/polymer';

// Importing Elements
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';

// Define an element class
class SmartReview extends PolymerElement {

  // Define publc API properties
  static get properties() { return { liked: Boolean }}

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
          height: 400px;
          width: 600px;
        }
      </style>
      <h1> hid </h1>

      <paper-button raised class="green" on-tap="openDialog"><slot></slot></paper-button>
      <paper-dialog id="reviewDialog" class="colored size">
        <h2 style="text-align: center">Smart Review</h2>
        <p>Cool</p>
      </paper-dialog>
    `;
  }

  openDialog () {
    this.$.reviewDialog.open();
  }
}

// Register the element with the browser
customElements.define('smart-review', SmartReview);
  

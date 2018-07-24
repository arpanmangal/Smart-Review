// Import an element
// import '@polymer/paper-checkbox/paper-checkbox.js';

// Import the PolymerElement base class and html helper
import {PolymerElement, html} from '@polymer/polymer';

// Define an element class
class SmartReview extends PolymerElement {

  // Define publc API properties
  static get properties() { return { liked: Boolean }}

  // Define the element's template
  static get template() {
    return html`
      <style>
        .response { margin-top: 10px; } 
      </style>
      <h1> hi </h1>
    `;
  }
}

// Register the element with the browser
customElements.define('smart-review', SmartReview);
  

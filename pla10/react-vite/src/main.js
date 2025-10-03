import "./style.css";
import { setupCounter } from "./counter.js";
import duck from "./duck.svg";

document.querySelector("#app").innerHTML = `
  <div>

        <a href="https://www.linkedin.com/in/teix-garcia/" target="_blank">
      <img src="${duck}" class="logo" alt="Duck" />
    </a>
    <h1>Hello Cifo!</h1>
    <p>Just press the button to de-stress and watch the number go up.</p>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    
    <p class="read-the-docs">
      Click on the Duck logo to see my LinkedIn profile
    </p>
  </div>
`;

setupCounter(document.querySelector("#counter"));

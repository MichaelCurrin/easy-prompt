import { createApp } from "https://unpkg.com/vue@3.4.38/dist/vue.esm-browser.js";
import { OPTIONS } from "./constants.js";
import Form from "./Form.js";
import InfoDialog from "./InfoDialog.js";
import LLM from "./LLM.js";
import Result from "./Result.js";

const Intro = {
  template: `
    <div class="intro">
      <h2>About</h2>
      <p>
        Crafting an effective prompt can be time-consuming, but this tool simplifies the process.
        It offers a user-friendly form which guides you to enter input and the process is even easier by choosing from preset values.
        Finally, all the inputs are combined as single prompt with structure and wording that LLM tools will understand. Whether for creative writing, business, or coding.
      </p>
      <p><b>Recommended</b>: Go to <a href="https://michaelcurrin.github.io/dev-resources/resources/artificial-intelligence/">AI - Dev Resources</a> and see one of the tools listed there under Prompt Writing Tools to optimize your prompt or check the Prompt Libraries to get ideas from existing prompts.</p>
    </div>
  `,
};

const app = createApp({
  components: {
    Intro,
    Form,
    Result,
    LLM,
  },
  data() {
    return {
      form: {
        topic: "Sample value",
        purpose: "",
        role: "",
        audience: "",
        outputLength: "",
        asCodeblock: "",
        format: "",
        style: [],
        customStyle: "",
        points: "",
        examples: "",
        steps: "",
        notes: "",
      },
      options: OPTIONS,
    };
  },
  watch: {
    form: {
      handler(newData) {
        localStorage.setItem("formData", JSON.stringify(newData));
      },
      deep: true,
    },
  },
  mounted() {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      this.form = JSON.parse(savedData);
    }
  },
  template: `
    <div>
      <Intro />
      <div class="container">
        <div class="container-item">
          <Form :form="form" :options="options" />
        </div>
        <div class="container-item container-item--sticky">
          <Result :form="form" />
        </div>
        <div class="container-item">
          <LLM />
        </div>
      </div>
    </div>
  `,
});

// Register shared components globally for use in child components
app.component("InfoDialog", InfoDialog);

app.mount("#app");

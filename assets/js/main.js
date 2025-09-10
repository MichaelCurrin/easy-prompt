import { createApp } from "https://unpkg.com/vue@3.4.38/dist/vue.esm-browser.js";
import Form from "./Form.js";
import LLM from "./LLM.js";
import Result from "./Result.js";
import { OPTIONS } from "./constants.js";

const Intro = {
  template: `
    <div class="intro">
      <h2>About</h2>
      <p>
        Crafting an effective prompt can be time-consuming, but this tool simplifies the process.
        It offers a user-friendly form which guides you to enter input and the process is even easier by choosing from preset values.
        Finally, all the inputs are combined as single prompt with structure and wording that LLM tools will understand. Whether for creative writing, business, or coding.
      </p>
      <p><b>Recommended</b>: See one of the tools listed here under Prompt Writing Tools to optimize your prompt or check the Prompt Libraries to get ideas from existing prompts. Go to <a href="https://michaelcurrin.github.io/dev-resources/resources/artificial-intelligence/">AI - Dev Resources</a>.</p>
    </div>
  `,
};

const Instructions = {
  methods: {
    open() {
      this.$refs.instructionsDialog.showModal();
    },
    close() {
      this.$refs.instructionsDialog.close();
    },
  },
  template: `
    <div class="div__center">
      <button class="button" role="button" @click="open">📘 <span>Show instructions</span></button>
      <dialog ref="instructionsDialog">
        <form method="dialog">
          <h3>Instructions for setting the prompt settings</h3>
          <p>Fill in the form and see the prompt generated immediately. When you are done, click "Copy".</p>
          <p>Your answers will be persisted so the form remembers what you entered. But everything is kept private and stored locally - your inputs are not sent across the internet.</p>
          <p>Only the "Task" field is required; all other fields are optional. Any empty fields will be excluded from the output to maintain brevity.</p>
          <p><b>Tip:</b> If you leave out a field that makes sense (e.g. audience for a blog post), the LLM may ask for info before proceeding. This can help quality but may slow you down. What could you do? Tell the LLM what you want for consistent results</p>
          <ul>
            <li>Ask for thoroughness: "Ask me questions before responding until you have all the necessary info".</li>
            <li>Optimize for speed: "Choose for me, make assumptions, and proceed without asking for further info. Tell me what you chose before writing the piece".</li>
            <li>Let it choose for a specific field, e.g. "Audience: Choose for me based on what is relevant for this task.</li>
          </ul>
          <div class="div__center" style="margin-top: 1rem;">
            <button class="button">Close</button>
          </div>
        </form>
      </dialog>
    </div>
  `,
};

const app = createApp({
  components: {
    Intro,
    Instructions,
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
      <Instructions />
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

app.mount("#app");

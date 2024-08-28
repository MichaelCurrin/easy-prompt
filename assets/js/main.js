import { createApp } from "https://unpkg.com/vue@3.4.38/dist/vue.esm-browser.js";
import PromptForm from "./PromptForm.js";
import Result from "./Result.js";

const Intro = {
  template: `
    <h2>About</h2>
    <p>
      Crafting an effective prompt can be time-consuming, but this tool simplifies the process.
      It offers a user-friendly form which guides you to enter input and the process is even easier by choosing from preset values.
      Finally, all the inputs are combined as single prompt with structure and wording that LLM tools will understand. Whether for creative writing, business, or coding.
    </p>
    <p>For more advanced prompt optimization, see an AI-based tool like <a href="https://promptperfect.jina.ai">PromptPerfect</a>.</p>
  `,
};

const Instructions = {
  template: `
    <div>
      <details>
        <summary>
          <b>Instructions</b>
        </summary>
        <p>Fill in the form and see the prompt generated immediately. When you are done, click "Copy".</p>
        <p>Only the "Request" field is required; all other fields are optional. Any empty fields will be excluded from the output to maintain brevity.</p>
      </details>
    </div>
  `,
};

const app = createApp({
  components: {
    Intro,
    Instructions,
    PromptForm,
    Result,
  },
  data() {
    return {
      form: {
        topic: "Sample value",
        purpose: "",
        audience: "",
        outputLength: "",
        asCodeblock: "",
        format: "",
        style: [],
        points: "",
        examples: "",
        steps: "",
        notes: "",
      },
      options: {
        purpose: ["Inform", "Persuade", "Entertain", "Educate", "Inspire"],
        audience: [
          "Beginners",
          "Kids",
          "Students",
          "General public",
          "Professionals",
          "Experts",
          "Software engineers",
          "Journalists",
        ],
        outputLength: [
          "short (1-2 paragraphs)",
          "medium (3-5 paragraphs)",
          "long (6+ paragraphs)",
          "a page",
        ],
        asCodeblock: ["Markdown", "HTML"],
        format: [
          "Outline of an article with headings and one line covering what will be covered under each",
          "Article",
          "Blog post",
          "Social media post",
          "Bullet-points",
          "Numbered points",
          "Numbered points with bullet subpoints",
          "Outline of slide presentation",
          "Slide presentation with details for each slide",
          "Guide",
          "Tutorial",
          "Report",
          "Table",
          "Code",
          "Summary containing title, one paragraph summary, and bullet points for key takeways or action items",
          "UML diagram",
        ],
        style: [
          "Assertive",
          "Casual",
          "Conversational",
          "Curious",
          "Encouraging",
          "Formal",
          "Friendly",
          "Humorous",
          "Optimistic",
          "Professional",
          "Serious",
        ],
      },
    };
  },

  template: `
    <div>
      <Intro />
      <Instructions />
      <div class="container">
        <div class="container-item">
          <PromptForm :form="form" :options="options" />
        </div>
        <div class="container-item">
          <Result class="div__sticky" :form="form" />
        </div>
      </div>
    </div>
  `,
});

app.mount("#app");

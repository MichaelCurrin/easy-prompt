/**
 * Main app module.
 */
import { createApp } from "https://unpkg.com/vue@3.4.38/dist/vue.esm-browser.js";

const Intro = {
  template: `
    <h2>About</h2>
    <p>Crafting an effective prompt can be time-consuming, but this tool simplifies the process.
    It offers a user-friendly form which guides you to enter input and the process is even easier by choosing from preset values.
    Finally, all the inputs are combined as single prompt with structure and wording that LLM tools will understand. Whether for creative writing, business, or coding.</p>
    <p>For more advanced prompt optimization, see an AI-based tool like <a href="https://promptperfect.jina.ai">PromptPerfect</a>.</p>
  `
}

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
  `
};

const PromptForm = {
  props: ['form', 'options'],
  template: `
    <h2>Form</h2>
    <form>
      <div>
        <label for="topic">Request:</label>
        <input type="text" id="topic" v-model="form.topic" required />
        <p>e.g. "how to raise awareness of climate change", "best practices for remote work productivity", "budgeting for beginners"</p>
      </div>
      <div>
        <label for="purpose">Purpose:</label>
        <select id="purpose" v-model="form.purpose">
          <option selected value="">Select purpose</option>
          <option v-for="value in options.purpose" :value="value" :key="value">{{ value }}</option>
        </select>
      </div>
      <div>
        <label for="audience">Audience:</label>
        <select id="audience" v-model="form.audience">
          <option value="">Select audience</option>
          <option v-for="value in options.audience" :value="value" :key="value">{{ value }}</option>
        </select>
      </div>
      <div>
        <label for="format">Output format:</label>
        <select id="format" v-model="form.format">
          <option value="">Select format</option>
          <option v-for="value in options.format" :value="value" :key="value">{{ value }}</option>
        </select>
      </div>
      <div>
        <label for="length">Length:</label>
        <select id="length" v-model="form.outputLength">
          <option value="">Select length</option>
          <option v-for="value in options.outputLength" :value="value" :key="value">{{ value }}</option>
        </select>
      </div>
      <div>
        <label for="asCodeblock">Output as codeblock:</label>
        <p>Select if you want your content to be written as code in a codeblock, for easy copy and pasting the result.</p>
        <select id="asCodeblock" v-model="form.asCodeblock">
          <option value="">Select output language</option>
          <option v-for="value in options.asCodeblock" :value="value" :key="value">{{ value }}</option>
        </select>
      </div>
      <div>
        <label for="style">Language style and tone:</label>
        <template v-for="value in options.style" :key="value">
          <label>
            <input type="checkbox" v-model="form.style" :value="value" />
            {{ value }}
          </label>
        </template>
      </div>
      <div>
        <label for="points">Key Points:</label>
        <textarea id="points" v-model="form.points"></textarea>
      </div>
      <div>
        <label for="examples">Examples:</label>
        <textarea id="examples" v-model="form.examples"></textarea>
      </div>
      <div>
        <label for="steps">Steps:</label>
        <textarea id="steps" v-model="form.steps"></textarea>
      </div>
      <div>
        <label for="notes">Additional notes:</label>
        <textarea id="notes" v-model="form.notes"></textarea>
      </div>
    </form>
  `
};

const Result = {
  props: ['form'],
  methods: {
    async copyToClipboard() {
      const resultText = document.getElementById('result-code').innerText;
      const button = document.getElementById('copy-button');

      try {
        await navigator.clipboard.writeText(resultText);
        console.log('Copied to clipboard!');

        button.innerText = 'Copied!';

        setTimeout(() => {
          button.innerText = 'Copy';
        }, 2000);

      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  },
  template: `
    <div>
      <h2>Result</h2>
      <p>Paste this prompt into your AI assistant:</p>
      <button id="copy-button" class="button" role="button" @click="copyToClipboard">Copy</button>
      <pre><code id="result-code">## Request
Write an answer using the following request and provide the answer only, without any preamble.

{{ form.topic }}

## Guidance and limitations

Ensure that your answer follows what is outlined here.

<template v-if="form.purpose">
### Purpose
{{ form.purpose }}
</template>
<template v-if="form.audience">
### Target audience
The audience is {{ form.audience }}.
</template>
<template v-if="form.asCodeblock || form.format || form.outputLength">
  ### Output format
  <template v-if="form.asCodeblock">
  Output as a codeblock with code written in {{ form.asCodeblock }}.
  </template>
  <template v-if="form.format">
  Write the content as {{ form.format }}.
  </template>
  <template v-if="form.outputLength">
  ### Length
  The content length should be {{ form.outputLength }}.
  </template>
</template>
<template v-if="form.style">
### Language style and tone
{{ form.style.join(', ') }}
</template>
<template v-if="form.points">
### Key points
Make sure to cover these key points in your answer:
{{ form.points }}
</template>
<template v-if="form.examples">
### Examples
Here are some examples to guide you:
\`\`\`
{{ form.examples }}
\`\`\`
</template>
<template v-if="form.steps">
### Steps
Make sure to cover these actions or steps in your answer:
{{ form.steps }}
</template>
<template v-if="form.notes">
### Additional notes
Please take into consideration the following additional notes:
{{ form.notes }}
</template>
</code></pre>
    </div>
  `
};

const app = createApp({
  components: {
    Intro,
    Instructions,
    PromptForm,
    Result
  },
  data() {
    return {
      output: "",
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
        notes: ""
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
        outputLength: ["short (1-2 paragraphs)", "medium (3-5 paragraphs)", "long (6+ paragraphs)",
          "a page"],
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
          "UML",
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
        ]
      }
    };
  },

  template: `
    <div>
      <h1>Prompt Builder</h1>
      <Intro />
      <Instructions />
      <div class="container">
        <div class="container-item">
          <PromptForm :form="form" :options="options" />
        </div>
        <div class="container-item">
          <Result class="div__sticky" form="form" />
        </div>
      </div>
    </div>
  `
});

app.mount("#app");

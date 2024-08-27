/**
 * Main app module.
 */
import { createApp } from "https://unpkg.com/vue@3.4.38/dist/vue.esm-browser.js";

const Intro = {
  template: `
    <p>Crafting an effective prompt can be time-consuming, but this tool simplifies the process.
    It offers a user-friendly form which guides you to enter input and the process is even easier by choosing from preset values.
    Finally, all the inputs are combined as single prompt with structure and wording that LLM tools will understand. Whether for creative writing, business, or coding.</p>
    <p>For more advanced prompt optimization, see an AI-based tool like <a href="https://promptperfect.jina.ai">PromptPerfect</a>.</p>
  `
}

const Instructions = {
  template: `
    <div>
      <h2>Instructions</h2>
      <p>Fill in the form and see the prompt generated immediately. When you are done, click "Copy".</p>
      <p>Only the "Topic" field is required; all other fields are optional. Any empty fields will be excluded from the output to maintain brevity.</p>
    </div>
  `
};

const PromptForm = {
  props: ['form', 'options'],
  template: `
    <form>
      <div>
        <label for="topic">Topic:</label>
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
        <label for="length">Length:</label>
        <select id="length" v-model="form.length">
          <option value="">Select length</option>
          <option v-for="value in options.length" :value="value" :key="value">{{ value }}</option>
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
        <label for="asCodeblock">Output as codeblock:</label>
        <p>Select if you want your content to be written as code in a codeblock, for easy copy and pasting the result.</p>
        <select id="asCodeblock" v-model="form.asCodeblock">
          <option value="">Select output language</option>
          <option v-for="value in options.asCodeblock" :value="value" :key="value">{{ value }}</option>
        </select>
      </div>
      <div>
        <label for="style">Language Style:</label>
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
      <button id="copy-button" class="button" role="button"  @click="copyToClipboard">Copy</button>
      <pre><code id="result-code">Write a piece about the topic given below under “Topic”.
Ensure that your answer follows the guidance and limitations provided under “Specification”.
Provide the answer only, without any preamble.

## Topic
{{ form.topic }}

## Specification
<template v-if="form.purpose">
### Purpose
{{ form.purpose }}
</template><template v-if="form.audience">
### Audience
The audience is {{ form.audience }}.
</template><template v-if="form.length">
### Length
The content length should be {{ form.length }}.
</template><template v-if="form.asCodeblock || form.format">
### Format
<template v-if="form.asCodeblock">
Output as a codeblock with code written in {{ form.asCodeblock }}.
</template><template v-if="form.asCodeblock || form.format">
Write the content as {{ form.format }}
</template>
</template><template v-if="form.style.length">
### Language style
{{ form.style.join(', ') }}
</template><template v-if="form.points">
### Key Points
Make sure to cover these key points in your answer:
{{ form.points }}
</template><template v-if="form.examples">
### Examples
Here are some examples to guide you:
\`\`\`
{{ form.examples }}
\`\`\`
</template><template v-if="form.steps">
### Steps
Make sure to cover these actions or steps in your answer:
{{ form.steps }}
</template><template v-if="form.notes">
### Additional Notes
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
        length: "",
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
          "Adults",
          "Kids",
          "Professionals",
          "Software engineers",
          "Experts",
          "Beginners",
          "Journalists",
          "General public",
          "The arts community",
          "The scientific community"
        ],
        length: ["short", "medium", "long", "a sentence", "a paragraph", 'a few paragraphs', "a page"],
        asCodeblock: ["Markdown", "HTML"],
        format: [
          "Article",
          "Blog post",
          "Bullet-points",
          "Numbered points",
          "Numbered points with bullet subpoints",
          "Outline of slide presentation",
          "Script",
          "Guide",
          "Tutorial",
          "Report",
          "Table",
          "Code",
          "Summary",
          "Skeleton or outline with placeholder values"
        ],
        style: [
          "Expert",
          "Formal",
          "Informal",
          "Optimistic",
          "Cautious",
          "Friendly",
          "Professional",
          "Conversational",
          "Curious",
          "Assertive",
          "Encouraging",
          "Surprised",
          "Cooperative"
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
        <div class="form-container">
          <PromptForm :form="form" :options="options" />
        </div>
        <div class="result-container">
          <Result :form="form" />
        </div>
      </div>
    </div>
  `
});

app.mount("#app");

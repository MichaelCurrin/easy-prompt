/**
 * Main app module.
 */
import { createApp } from "https://unpkg.com/vue@3.4.38/dist/vue.esm-browser.js";

const Instructions = {
  template: `
    <div>
      <h2>Instructions</h2>
      <p>Select from the recommended options to include in your prompt's content. A prompt will be generated instantly at the bottom, which you can copy and paste into an LLM.</p>
      <p>Only the "Topic" field is mandatory; all other fields are optional. Any empty fields will be excluded from the output to maintain brevity.</p>
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
        <label for="steps">Action Steps:</label>
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
  template: `
    <div>
      <h2>Result</h2>
      <p>Copy and paste this into your AI assistant prompt:</p>
      <pre><code>## Topic&#10;&#10;{{ form.topic }}&#10;
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
### Language Style
{{ form.style.join(', ') }}
</template><template v-if="form.points">
### Key Points
Make sure to cover these as the key points:
{{ form.points }}
</template><template v-if="form.examples">
### Examples
Here are some examples to help you:
\`\`\`
{ { form.examples } }
\`\`\`
</template><template v-if="form.steps">
### Action Steps
{{ form.steps }}
</template><template v-if="form.notes">
### Additional Notes
{{ form.notes }}
</template>
</code></pre>
    </div>
  `
};

const app = createApp({
  components: {
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
          "Experts",
          "Beginners",
          "Journalists",
          "General public",
          "The arts community",
          "The scientific community"
        ],
        length: ["Short", "Medium", "Long"],
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
      <Instructions />
      <PromptForm :form="form" :options="options" />
      <Result :form="form" />
    </div>
  `
});

app.mount("#app");

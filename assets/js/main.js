/**
 * Main app module.
 */
import { createApp } from "https://unpkg.com/vue@3.4.38/dist/vue.esm-browser.js";

const template = `
  <div>
    <h1>Prompt builder</h1>
    <p>Prompt improvement tool to guide the LLM to consistent and high quality results.</p>

    <h2>Instructions</h2>

    <p>
      Choose from some recommended options that you would like to include for
      the content of your prompt. A prompt is generated at the bottom. Then copy and
      paste it into ChatGPT or your preferred LLM.
    </p>
    <p>
      Only the "Topic" field is required while other fields are optional. Any blank
      fields are omitted from the output to keep it short
    </p>
    <p>The output updates immediately as you change the inputs</p>

    <h2>Form</h2>
    <!-- TODO improvements. Move output to the right. Show samples for text inputs next to or inside. Make suggestions dynamic based on droplists. Add other field inputs and group them. Make some open text and see if there are other values to as a options. -->
    <!-- TODO give some preset buttons to choose from for common scenarios and that changes the form inputs    -->
    <form @submit.prevent>
      <div>
        <label for="topic">Topic:</label>
        <input type="text" id="topic" v-model="form.topic" required />
      </div>
      <div>
        <label for="purpose">Purpose:</label>
        <select id="purpose" v-model="form.purpose">
          <option selected value="">Select purpose</option>
          <option v-for="value in options.purpose" :value="value" :key="value">
            {{ value }}
          </option>
        </select>
      </div>
      <div>
        <label for="audience">Audience:</label>
        <select id="audience" v-model="form.audience">
          <option value="">Select audience</option>
          <option v-for="value in options.audience" :value="value" :key="value">
            {{ value }}
          </option>
        </select>
      </div>
      <div>
        <label for="length">Length:</label>
        <select id="length" v-model="form.length">
          <option value="">Select length</option>
          <option v-for="value in options.length" :value="value" :key="value">
            {{ value }}
          </option>
        </select>
      </div>
      <div>
        <label for="format">Output format:</label>
        <select id="format" v-model="form.format">
          <option value="">Select format</option>
          <option v-for="value in options.format" :value="value" :key="value">
            {{ value }}
          </option>
        </select>
      </div>
      <div>
        <label for="asCodeblock">Output as codeblock:</label>
        <p>
          Select if you want your content to be written as code in a codeblock,
          for easy copy and pasting the result. Leave this option blank if you
          want to get the default richtext-formatted response.
        </p>
        <select id="asCodeblock" v-model="form.asCodeblock">
          <option value="">Select output language</option>
          <option
            v-for="value in options.asCodeblock"
            :value="value"
            :key="value"
          >
            {{ value }}
          </option>
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
        <p>
          If you already know what content you want included and you want this
          to be expanded on.
        </p>
        <textarea id="points" v-model="form.points"></textarea>
      </div>
      <div>
        <label for="examples">Examples:</label>
        <p>
          Include examples of the kind of content you expect. If you structure
          the examples in the format that you want for your output, that also
          helps e.g. your examples in Markdown, structured as nested
          bullet-points or with headings and subheadings. Or with other Markdown
          symbols like for bold or italics.
        </p>
        <textarea id="examples" v-model="form.examples"></textarea>
      </div>
      <div>
        <label for="steps">Action Steps:</label>
        <!-- TODO - this could be better as checkbox and also ChatGPT to include
          action items in your output for the summary/article etc. -->
        <textarea id="steps" v-model="form.steps"></textarea>
      </div>
      <div>
        <label for="notes">Additional notes:</label>
        <p>
          Anything else you want to include, not covered by the other fields.
        </p>
        <textarea id="notes" v-model="form.notes"></textarea>
      </div>
      <!--       <div>
        <button type="submit">Generate Prompt</button>
      </div> -->
      <!-- TODO - ask for improvements to the prompt and reflect on a better answer-->
    </form>

    <h2>Result</h2>
    <div>
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
</template>
<template v-if="form.steps">
### Action Steps

{{ form.steps }}
</template>
<template v-if="form.notes">
### Additional Notes

{{ form.notes }}
</template>
</code></pre>
    </div>
  </div>
`

const app = createApp({
  template: template,
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
  }
});

app.mount("#app");

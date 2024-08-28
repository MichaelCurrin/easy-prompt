const Form = {
  props: ["form", "options"],
  template: `
    <h2>Prompt settings</h2>
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
  `,
};

export default Form;

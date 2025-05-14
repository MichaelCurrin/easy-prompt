const Form = {
  props: ["form", "options"],
  data() {
    return {
      dropdownPurpose: "",
      customPurpose: "",
      dropdownAudience: "",
      customAudience: "",
      dropdownFormat: "",
      customFormat: "",
      dropdownLength: "",
      customLength: "",
      dropdownCodeblock: "",
      customCodeblock: "",
    };
  },
  computed: {
    isCustomPurpose() {
      return this.dropdownPurpose === "custom";
    },
    isCustomAudience() {
      return this.dropdownAudience === "custom";
    },
    isCustomFormat() {
      return this.dropdownFormat === "custom";
    },
    isCustomLength() {
      return this.dropdownLength === "custom";
    },
    isCustomCodeblock() {
      return this.dropdownCodeblock === "custom";
    },
  },
  watch: {
    dropdownPurpose(newValue) {
      if (newValue === "custom") {
        this.form.purpose = this.customPurpose;
      } else {
        this.form.purpose = newValue;
      }
    },
    customPurpose(newValue) {
      if (this.isCustomPurpose) {
        this.form.purpose = newValue;
      }
    },
    dropdownAudience(newValue) {
      if (newValue === "custom") {
        this.form.audience = this.customAudience;
      } else {
        this.form.audience = newValue;
      }
    },
    customAudience(newValue) {
      if (this.isCustomAudience) {
        this.form.audience = newValue;
      }
    },
    dropdownFormat(newValue) {
      if (newValue === "custom") {
        this.form.format = this.customFormat;
      } else {
        this.form.format = newValue;
      }
    },
    customFormat(newValue) {
      if (this.isCustomFormat) {
        this.form.format = newValue;
      }
    },
    dropdownLength(newValue) {
      if (newValue === "custom") {
        this.form.outputLength = this.customLength;
      } else {
        this.form.outputLength = newValue;
      }
    },
    customLength(newValue) {
      if (this.isCustomLength) {
        this.form.outputLength = newValue;
      }
    },
    dropdownCodeblock(newValue) {
      if (newValue === "custom") {
        this.form.asCodeblock = this.customCodeblock;
      } else {
        this.form.asCodeblock = newValue;
      }
    },
    customCodeblock(newValue) {
      if (this.isCustomCodeblock) {
        this.form.asCodeblock = newValue;
      }
    },
  },
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
        <div class="purpose-inputs">
          <div class="input-row">
            <select id="purpose" v-model="dropdownPurpose">
              <option selected value="">Select purpose</option>
              <option v-for="value in options.purpose" :value="value" :key="value">{{ value }}</option>
              <option value="custom">Custom...</option>
            </select>
            <input
              v-show="isCustomPurpose"
              type="text"
              id="custom-purpose"
              v-model="customPurpose"
              placeholder="Enter custom purpose..."
              class="input-row__input"
            />
          </div>
        </div>
      </div>
      <div>
        <label for="audience">Audience:</label>
        <div class="audience-inputs">
          <div class="input-row">
            <select id="audience" v-model="dropdownAudience">
              <option value="">Select audience</option>
              <option v-for="value in options.audience" :value="value" :key="value">{{ value }}</option>
              <option value="custom">Custom...</option>
            </select>
            <input
              v-show="isCustomAudience"
              type="text"
              id="custom-audience"
              v-model="customAudience"
              placeholder="Enter custom audience..."
              class="input-row__input"
            />
          </div>
        </div>
      </div>
      <div>
        <label for="format">Output format:</label>
        <div class="format-inputs">
          <div class="input-row">
            <select id="format" v-model="dropdownFormat">
              <option value="">Select format</option>
              <option v-for="value in options.format" :value="value" :key="value">{{ value }}</option>
              <option value="custom">Custom...</option>
            </select>
            <input
              v-show="isCustomFormat"
              type="text"
              id="custom-format"
              v-model="customFormat"
              placeholder="Enter custom format..."
              class="input-row__input"
            />
          </div>
        </div>
      </div>
      <div>
        <label for="length">Length:</label>
        <div class="length-inputs">
          <div class="input-row">
            <select id="length" v-model="dropdownLength">
              <option value="">Select length</option>
              <option v-for="value in options.outputLength" :value="value" :key="value">{{ value }}</option>
              <option value="custom">Custom...</option>
            </select>
            <input
              v-show="isCustomLength"
              type="text"
              id="custom-length"
              v-model="customLength"
              placeholder="Enter custom length..."
              class="input-row__input"
            />
          </div>
        </div>
      </div>
      <div>
        <label for="asCodeblock">Output as codeblock:</label>
        <p>Select if you want your content to be written as code in a codeblock, for easy copy and pasting the result.</p>
        <div class="codeblock-inputs">
          <div class="input-row">
            <select id="asCodeblock" v-model="dropdownCodeblock">
              <option value="">Select output language</option>
              <option v-for="value in options.asCodeblock" :value="value" :key="value">{{ value }}</option>
              <option value="custom">Custom...</option>
            </select>
            <input
              v-show="isCustomCodeblock"
              type="text"
              id="custom-codeblock"
              v-model="customCodeblock"
              placeholder="Enter custom codeblock..."
              class="input-row__input"
            />
          </div>
        </div>
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

const Form = {
  props: ["form", "options"],
  data() {
    return {
      CUSTOM_OPTION: "custom",
      dropdownPurpose: "",
      customPurpose: "",
      dropdownRole: "",
      customRole: "",
      dropdownAudience: "",
      customAudience: "",
      dropdownFormat: "",
      customFormat: "",
      dropdownLength: "",
      customLength: "",
      dropdownCodeblock: "",
      customCodeblock: "",
      customStyle: "",
    };
  },
  computed: {
    isCustomPurpose() {
      return this.dropdownPurpose === this.CUSTOM_OPTION;
    },
    isCustomRole() {
      return this.dropdownRole === this.CUSTOM_OPTION;
    },
    isCustomAudience() {
      return this.dropdownAudience === this.CUSTOM_OPTION;
    },
    isCustomFormat() {
      return this.dropdownFormat === this.CUSTOM_OPTION;
    },
    isCustomLength() {
      return this.dropdownLength === this.CUSTOM_OPTION;
    },
    isCustomCodeblock() {
      return this.dropdownCodeblock === this.CUSTOM_OPTION;
    },
    combinedStyles() {
      const selectedStyles = this.form.style;
      const customStyle = this.customStyle.trim();

      if (!customStyle) {
        return selectedStyles;
      }

      return [...selectedStyles, customStyle];
    },
  },
  watch: {
    dropdownPurpose(newValue) {
      if (newValue === this.CUSTOM_OPTION) {
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
    dropdownRole(newValue) {
      if (newValue === this.CUSTOM_OPTION) {
        this.form.role = this.customRole;
      } else {
        this.form.role = newValue;
      }
    },
    customRole(newValue) {
      if (this.isCustomRole) {
        this.form.role = newValue;
      }
    },
    dropdownAudience(newValue) {
      if (newValue === this.CUSTOM_OPTION) {
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
      if (newValue === this.CUSTOM_OPTION) {
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
      if (newValue === this.CUSTOM_OPTION) {
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
      if (newValue === this.CUSTOM_OPTION) {
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
    customStyle(newValue) {
      this.form.customStyle = newValue.trim();
    },
  },
  methods: {
    openInstructions() {
      this.$refs.instructionsDialog.showModal();
    },
    closeInstructions() {
      this.$refs.instructionsDialog.close();
    },
  },
  template: `
    <h2>Prompt settings</h2>
    <div class="div__center" style="margin-bottom: 1rem;">
      <button class="button" role="button" @click="openInstructions">📘 <span>Show instructions</span></button>
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
    <form>
      <div>
        <label for="topic">Task:</label>
        <textarea id="topic" v-model="form.topic" required></textarea>
        <p>e.g. "how to raise awareness of climate change", "best practices for remote work productivity", "budgeting for beginners"</p>
      </div>
      <div>
        <label for="purpose">Purpose:</label>
        <div class="purpose-inputs">
          <div class="input-row">
            <select id="purpose" v-model="dropdownPurpose">
              <option selected value="">Select purpose</option>
              <option v-for="value in options.purpose" :value="value" :key="value">{{ value }}</option>
              <option :value="CUSTOM_OPTION">Custom...</option>
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
        <label for="role">Role:</label>
        <div class="role-inputs">
          <div class="input-row">
            <select id="role" v-model="dropdownRole">
              <option value="">Select role</option>
              <option v-for="value in options.role" :value="value" :key="value">{{ value }}</option>
              <option :value="CUSTOM_OPTION">Custom...</option>
            </select>
            <input
              v-show="isCustomRole"
              type="text"
              id="custom-role"
              v-model="customRole"
              placeholder="Enter custom role..."
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
              <option :value="CUSTOM_OPTION">Custom...</option>
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
              <option :value="CUSTOM_OPTION">Custom...</option>
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
              <option :value="CUSTOM_OPTION">Custom...</option>
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
              <option :value="CUSTOM_OPTION">Custom...</option>
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
        <div class="input-row">
          <input
            type="text"
            id="custom-style"
            v-model="customStyle"
            placeholder="Enter custom style..."
            class="input-row__input"
          />
        </div>
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

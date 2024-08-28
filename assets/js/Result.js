// Note that inside a pre tag all the whitespace is rendered, which is not good
// for this purpose. Since each template on a newline adds whitespace, that is
// better stripped out after. And indenting is also better stripped out.
const outputCode = `## Request
Write an answer using the following request and provide the answer only, without any preamble.

{{ form.topic }}

## Guidance and limitations

Ensure that your answer follows what is outlined here.

<template v-if="form.purpose">
### Purpose
The purpose of the piece is to: {{ form.purpose }}
</template>
<template v-if="form.audience">
### Audience
The target audience is {{ form.audience }}.
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
<template v-if="form.style.length">
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
</template>`
  .replaceAll("\n  ", "\n")
  .replaceAll("\n<template", "<template")

const Result = {
  props: ["form"],
  data() {
    return {
      buttonText: "Copy",
    };
  },
  methods: {
    async copyToClipboard() {
      const resultText = this.$refs.resultCode.innerText;

      try {
        await navigator.clipboard.writeText(resultText);
        console.log("Copied to clipboard!");
        this.buttonText = "Copied!";

        setTimeout(() => {
          this.buttonText = "Copy";
        }, 2000);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    },
  },
  template: `
    <div>
      <h2>Prompt result</h2>
      <div class="div__sticky div__center">
      <button class="button" role="button" @click="copyToClipboard">
        {{ buttonText }}
      </button>
      </div>
      <pre><code ref="resultCode">${outputCode}</code></pre>
    </div>
  `,
};

export default Result;

const Result = {
  props: ["form"],
  methods: {
    async copyToClipboard() {
      const resultText = document.getElementById("result-code").innerText;
      const button = document.getElementById("copy-button");

      try {
        await navigator.clipboard.writeText(resultText);
        console.log("Copied to clipboard!");

        button.innerText = "Copied!";

        setTimeout(() => {
          button.innerText = "Copy";
        }, 2000);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    },
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
</template>
</code></pre>
    </div>
  `,
};

export default Result;

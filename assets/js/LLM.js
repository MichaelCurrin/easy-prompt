// TODO Render the Markdown in HTML
// TODO set colors for buttons

const LLM = {
    props: ["promptText"],
    data() {
        return {
            buttonText: "Copy",
            llmResult: ''
        };
    },
    methods: {
        async copyToClipboard() {
            const resultText = this.$refs.llmResult.innerText;

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
        async fetchPollinationsText(requestBody) {
            /* See https://github.com/pollinations/pollinations/blob/master/pollinations-react/src/hooks/usePollinationsText.js */
            try {
                const response = await fetch('https://text.pollinations.ai/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return await response.text();
            } catch (error) {
                console.error("Error fetching text from Pollinations API:", error);
                throw error;
            }

        },
        async generate() {
            const promptText = document.getElementById("resultCode").innerText
            if (!promptText) {
                throw new Error("Prompt cannot be empty")
            }
            const requestBody = {
                messages: [{ "role": "user", "content": promptText }]
            }

            this.llmResult = await this.fetchPollinationsText(requestBody)
        }
    },
    template: `
    <div>
      <h2>LLM test</h2>
      <p>Test your prompt against the <a href="https://pollinations.ai">pollinations.ai</a> service's free API.
      This does not require any authorization such as signup or API key, however, requests are limited by
      IP to 20 requests per minute and may not succeed at peak usage times.</p>
      <div class="div__sticky div__center">
      <button class="button" role="button" @click="generate">
        🤖 <span>Generate</span>
      </button>
      <button class="button" role="button" @click="copyToClipboard">
        📋 <span>{{ buttonText }}</span>
      </button>
      </div>
      <pre><code ref="llmResult">{{ llmResult }}</code></pre>
    </div>
  `,
};

export default LLM;

const InfoDialog = {
  props: ["buttonText", "title"],
  methods: {
    open() {
      this.$refs.dialog.showModal();
    },
    close() {
      this.$refs.dialog.close();
    },
  },
  template: `
    <div class="div__center">
      <button class="button" role="button" @click="open">{{ buttonText }}</button>
      <dialog ref="dialog">
        <form method="dialog">
          <h3>{{ title }}</h3>
          <slot></slot>
          <div class="div__center" style="margin-top: 1rem;">
            <button class="button">Close</button>
          </div>
        </form>
      </dialog>
    </div>
  `,
};

export default InfoDialog;

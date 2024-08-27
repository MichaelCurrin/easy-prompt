/**
 * Main app module.
 */
import { createApp } from "https://unpkg.com/vue@3.4.38/dist/vue.esm-browser.js";
import ConsumeApi from "./ConsumeApi.js";

const Counter = {
  data() {
    return {
      counter: 0,
    };
  },
  mounted() {
    setInterval(() => {
      this.counter++;
    }, 1000);
  },
  template: `
    <div>
      Counter: {{ counter }}
    </div>
  `,
};

const EventHandling = {
  data() {
    return {
      message: "Hello Vue.js!",
    };
  },
  methods: {
    reverseMessage() {
      this.message = this.message.split("").reverse().join("");
    },
  },
  template: `
    <div>
      <p>
        {{ message }}
      </p>

      <button v-on:click="reverseMessage">
        Reverse Message
      </button>
    </div>
  `,
};

const TwoWayBinding = {
  data() {
    return {
      message: "Hello Vue!",
    };
  },
  template: `
    <div>
      <label for="message-input">
        Message:
      </label>
      {{ }}
      <input id="message-input" type="text" v-model="message" />

      <p>
        {{ message }}
      </p>
    </div>
  `,
};

const TodoItem = {
  props: {
    todo: { type: Object, required: true },
  },
  template: `<li>{{ todo.text }}</li>`,
};

const TodoList = {
  components: { TodoItem },
  data() {
    return {
      groceryList: [
        { id: 0, text: "Vegetables" },
        { id: 1, text: "Cheese" },
        { id: 2, text: "Whatever else humans are supposed to eat" },
      ],
    };
  },
  template: `
    <div>
      <ol>
        <todo-item v-for="item in groceryList" v-bind:todo="item" v-bind:key="item.id"></todo-item>
      </ol>
    </div>
  `,
};

const app = createApp({
  components: {
    Counter,
    EventHandling,
    TwoWayBinding,
    TodoList,
    ConsumeApi,
  },
  data() {
    return {
      name: "developer",
    };
  },
  template: `
    <h2>Greeting</h2>
    <p>Hello, {{ name }}!</p>

    <h2>Counter</h2>
    <Counter></Counter>

    <h2>Event handling</h2>
    <EventHandling></EventHandling>

    <h2>Two-way binding</h2>
    <TwoWayBinding></TwoWayBinding>

    <h2>Todo list</h2>
    <TodoList></TodoList>

    <h2>Consume API</h2>
    <ConsumeApi></ConsumeApi>
  `,
});

app.mount("#app");

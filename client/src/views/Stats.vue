<template>
  <section class="content-section" id="Stats">
    <div class="container">
      <h1>Statistiken</h1>
      <div class="card" v-for="c in sortedCategories" :key="c._id">
        <h2>{{c.title}}</h2>
        <div v-for="t in filterTasks(c._id)" :key="t._id">
          <p>{{t.title}}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { API, config } from "@/constants";
export default {
  name: "Stats",
  props: ["userId"],
  data() {
    return {
      categories: [],
      tasks: []
    };
  },
  methods: {
    async getTasks() {
      const body = {
        userId: this.userId
      }
      let response = await this.$http.post(API.task.get, body, config);
      this.tasks = response.data.items;
    },
    async getCategories() {
      const body = {
        userId: this.userId
      }
      let response = await this.$http.post(API.category.get, body, config);
      this.categories = response.data.items;
    },
    filterTasks(id) {
      let result = this.tasks.filter((el) => (el.category_id == id));

      return result;
    }
  },
  computed: {
    sortedCategories() {
      let result = this.categories;
      const compare = (a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1);
      return result.sort(compare);
    }
  },
  mounted() {
    this.getTasks();
    this.getCategories();
  }
};
</script>
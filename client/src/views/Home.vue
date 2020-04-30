<template>
  <section class="content-section" id="Home">
    <div class="container">
      <div class="card">
        <h1>Heute</h1>
        <p>{{day}}, {{date}}</p>
      </div>
      <div class="card">
        <div v-for="t in sortedAndFilteredTasks" :key="t._id">
          <p>{{t.title}}</p>
          <p>{{t.taskdays}}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { API, config } from "@/constants";
export default {
  name: "Home",
  props: ["userId"],
  data() {
    return {
      date: "",
      day: "test",
      tasks: []
    };
  },
  computed: {
    sortedAndFilteredTasks: function() {
      let result = this.tasks.filter(el => {
        switch (new Date().getDay()) {
          case 0:
            return el.dates.sun;
          case 1:
            return el.dates.mon;
          case 2:
            return el.dates.tur;
          case 3:
            return el.dates.wed;
          case 4:
            return el.dates.thu;
          case 5:
            return el.dates.fri;
          case 6:
            return el.dates.sat;
        }
      });
      let compare = (a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
      return result.sort(compare);
    }
  },
  methods: {
    getDate() {
      let date = new Date().toLocaleDateString();
      this.date = date;
      switch (new Date().getDay()) {
        case 0:
          this.day = "Sonntag";
          break;
        case 1:
          this.day = "Montag";
          break;
        case 2:
          this.day = "Dienstag";
          break;
        case 3:
          this.day = "Mittwoch";
          break;
        case 4:
          this.day = "Donnerstag";
          break;
        case 5:
          this.day = "Freitag";
          break;
        case 6:
          this.day = "Samstag";
      }
    },
    //Tasks
    async getTasks() {
      const body = {
        userId: this.userId
      };
      let response = await this.$http.post(API.task.get, body, config);
      this.tasks = response.data.items;
      for (let i = 0; i < response.data.items.length; i++) {
        console.log(response.data.items[i]._id);
        this.getTaskDay(response.data.items[i]._id);
      }
    },
    async getTaskDay(id) {
      const body = {
        id
      };
      try {
        let response = await this.$http.post(API.task.gettaskday, body, config);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.getDate();
    this.getTasks();
    // setTimeout(() => this.getTasks(), 100);
  },
  watch: {
    userId() {
      this.getTasks();
    }
  }
};
</script>
<template>
  <section class="content-section" id="Tasks">
    <div class="container">
      <button class="button sec white close" @click="$router.push('/tasks')">x</button>
      <div class="card">
        <h1>Aufgabe bearbeiten</h1>
        <form @submit.prevent="editItem">
          <label>
            Titel
            <input type="text" v-model="newItem.title" />
          </label>
          <label>
            <input type="text" v-model="newItem.description" />
          </label>
          <label class="custom-select">
            <select v-model="newItem.category_id">
              <option value selected disabled>Bitte wählen</option>
              <option v-for="c in sortedCategories" :key="c._id" :value="c._id">{{c.title}}</option>
            </select>
          </label>
          <label class="custom-checkbox">
            <input type="checkbox" v-model="newItem.dates.mon" /> Montag
            <span class="checkmark"></span>
          </label>
          <label class="custom-checkbox">
            <input type="checkbox" v-model="newItem.dates.tue" /> Dienstag
            <span class="checkmark"></span>
          </label>
          <label class="custom-checkbox">
            <input type="checkbox" v-model="newItem.dates.wed" /> Mittwoch
            <span class="checkmark"></span>
          </label>
          <label class="custom-checkbox">
            <input type="checkbox" v-model="newItem.dates.thu" /> Donnerstag
            <span class="checkmark"></span>
          </label>
          <label class="custom-checkbox">
            <input type="checkbox" v-model="newItem.dates.fri" /> Freitag
            <span class="checkmark"></span>
          </label>
          <label class="custom-checkbox">
            <input type="checkbox" v-model="newItem.dates.sat" /> Samstag
            <span class="checkmark"></span>
          </label>
          <label class="custom-checkbox">
            <input type="checkbox" v-model="newItem.dates.sun" /> Sonntag
            <span class="checkmark"></span>
          </label>
            <label class="flex-label">
              <input type="date" v-model="newItem.dates.startOn" /> von (Datum)
            </label>
            <label class="flex-label">
              <input type="date" v-model="newItem.dates.endOn"> bis (Datum)
            </label>
          <label class="flex-label">
            <input type="number" v-model="newItem.priority" min="1" max="3" /> Priorität
          </label>
          <button type="submit">Speichern</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { API, config } from "@/constants";
import { mapMutations } from "vuex";
export default {
  name: "TaskEdit",
  props: ["userId"],
  data() {
    return {
      categories: [],
      newItem: {
        title: "",
        description: "",
        category_id: "",
        dates: {},
        priority: 1
      }
    };
  },
  methods: {
    ...mapMutations(["setNotification"]),
    async findItem() {
      const body = {
        id: this.$route.params.id
      };
      try {
        const response = await this.$http.post(API.task.findone, body, config);
        this.newItem = response.data.item;
        if(response.data.item.dates.startOn){
          this.newItem.dates.startOn = response.data.item.dates.startOn.substring(0,10);
        }
        if(response.data.item.dates.endOn){
          this.newItem.dates.endOn = response.data.item.dates.endOn.substring(0,10);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async editItem() {
      const body = this.newItem;
      try {
        await this.$http.post(API.task.edit, body, config);
        this.$router.push("/tasks");
        this.setNotification({ status: "success", msg: "Aufgabe bearbeitet" });
      } catch (error) {
        console.log(error);
      }
    },
    async getCategories() {
      const body = {
        userId: this.userId
      };
      console.log(body);
      let response = await this.$http.post(API.category.get, body, config);
      this.categories = response.data.items;
    }
  },
  mounted() {
    setTimeout(() => document.querySelector("input").focus(), 400);
    this.findItem();
    this.getCategories();
  },
  computed: {
    sortedCategories: function() {
      let result = this.categories;
      let compare = (a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
      return result.sort(compare);
    }
  },
  watch: {
    userId: function() {
      this.getCategories();
    }
  }
};
</script>
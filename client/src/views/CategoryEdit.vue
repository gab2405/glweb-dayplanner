<template>
  <section class="content-section" id="Tasks">
    <div class="container">
      <button class="button sec white close" @click="$router.push('/tasks')">x</button>
      <div class="card">
        <h1>Kategorie bearbeiten</h1>
        <form @submit.prevent="editItem">
          <label>
            Titel
            <input type="text" v-model="newItem.title" />
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
  name: "CategoryEdit",
  props: ["userId"],
  data() {
    return {
      newItem: {
        title: ""
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
        const response = await this.$http.post(
          API.category.findone,
          body,
          config
        );
        this.newItem = response.data.item;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem() {
      const body = this.newItem;
      try {
        await this.$http.post(API.category.edit, body, config);
        this.$router.push('/tasks')
          this.setNotification({ status: "success", msg: "Kategorie bearbeitet" });
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    setTimeout(() => document.querySelector("input").focus(), 400);
    this.findItem();
  }
};
</script>
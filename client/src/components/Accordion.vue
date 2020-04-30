<template>
  <div class="accordion" ref="acc">
    <div class="button" @click="toggle">
      <slot name="button"></slot>
    </div>
    <div class="content" ref="toggle">
      <div class="inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Accordion",
  methods: {
    toggle() {
      let thisContent = this.$refs.toggle;
      let thisAcc = this.$refs.acc;
      let height = thisContent.scrollHeight;
      let allAcc = document.querySelectorAll(".accordion");
      allAcc.forEach(function(item) {
        if (item !== thisAcc) {
          item.classList.remove("active");
          item.querySelector(".content").style.maxHeight = `0px`;
        }
      });
      if (thisAcc.classList.contains("active")) {
        thisAcc.classList.remove("active");
        thisContent.style.maxHeight = "0px";
        this.open = false;
      } else {
        thisAcc.classList.add("active");
        thisContent.style.maxHeight = `${height}px`;
        this.open = true;
        if(thisContent.querySelector('input')){
          setTimeout(() => (thisContent.querySelector('input').focus()), 400);
        }
      }
    },
    bodyClick(e) {
      if ( (!e.target.parentNode.closest(".accordion")) || (e.target.tagName == "A") || (e.target.classList.contains('close')) ) {
        let allAcc = document.querySelectorAll(".accordion");
        allAcc.forEach(function(item) {
          item.classList.remove("active");
          item.querySelector(".content").style.maxHeight = `0px`;
        });
      }
    }
  },
  created() {
    document.body.addEventListener("click", this.bodyClick);
  },
  destroyed() {
    document.body.removeEventListener("click", this.bodyClick);
  },
};
</script>

<style>
.accordion > .content {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.4s;
}
</style>
<template>
  <div class="popup" v-if="popup.show">
    <h1 class="popup-title">{{ popup.data.text }}</h1>
    <div class="popup-buttons">
      <button class="dark-btn" @click="submitPopup">Yes</button>
      <button class="dark-btn" @click="closePopup()">No</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: "popup",
  computed: {
    ...mapState('storage', [
      'popup'
    ])
  },
  methods: {
    ...mapActions('storage', [
      'hidePopup',
      'deleteContact',
      'deleteField'
    ]),
    closePopup() {
      this.hidePopup();
    },
    submitPopup() {
      switch (this.popup.type) {
        case 'contact':
          this.deleteContact(this.popup.data.id);
          break;
        case 'field':
          this.deleteField(this.popup.data);
          break;
        default:
      }
      this.hidePopup();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.popup {
  position: fixed;
  width: 300px;
  min-height: 100px;
  left: calc(50% - 150px);
  top: calc(35% - 50px);
  border: 1px solid white;
  padding: 8px 16px;
  border-radius: 4px;
  z-index: 1;
  background: $dark-color;
  box-shadow: $light-shadow;
}

.popup-title {
  font-size: 20px;
}

.popup-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 5px;

  button {
    &:last-child {
      margin-left: 10px;
    }
  }
}
</style>

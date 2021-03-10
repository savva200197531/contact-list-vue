<template>
  <div class="contact-info">
    <div class="contact-card" v-if="currentContact.name">
      <div class="contact-info-row" v-for="(contactValue, contactKey) in currentContact">
        <span class="contact-info-key">{{ contactKey }}</span>: 
        <span class="contact-info-value">{{ contactValue }}</span>
      </div>
      <div class="add-field">
        <button class="add-filed-btn dark-btn">Add field</button>
      </div>
    </div>
    <router-link to="/">back</router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "contactInfo",
  data: () => ({
    currentContact: {}
  }),
  computed: {
    ...mapGetters('storage', [
        'getCurrentContact'
    ])
  },
  methods: {},
  mounted() {
    this.currentContact = this.getCurrentContact(window.location.href.split('contact')[1]);
  }
}
</script>

<style scoped>

</style>

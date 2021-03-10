<template>
  <div class="contacts-page">
    <div class="add-contact-btn-wrapper">
      <button class="add-contact-btn dark-btn" @click="openForm">Add contact</button>
    </div>
    <div class="contacts">
      <router-link
          :to="'/contact' + key"
          v-for="(contact, key) in contacts"
          :key="contact.id"
          class="contact"
          custom v-slot="{ navigate }">
        <div @click="navigate" role="link">
          <div v-for="(contactValue, contactKey) in contact" class="contact-info-row">
            <span class="contact-info-key">{{ contactKey }}</span>:
            <span class="contact-info-value">{{ contactValue }}</span>
          </div>
        </div>
      </router-link>
      <form @submit.prevent="validateForm" v-if="showForm" class="contact-form contact">
        <div class="contact-form-close" @click="closeForm">x</div>
        <div class="contact-info-row" v-for="(fieldValue, fieldKey) in initialFields">
          <label :for="fieldKey" class="contact-info-key">{{ fieldKey }}:</label>
          <input v-model="initialFields[fieldKey]" :id="fieldKey" type="text" class="contact-info-value dark-input">
        </div>
        <div class="contact-form-errors" v-for="error in errors">
          {{ error }}
        </div>
        <div class="create-contact-btn-wrapper contact-info-row">
          <button type="submit" class="create-contact-btn dark-btn">Create contact</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: "contactsPage",
  data: () => ({
    showForm: false,
    initialFields: {
      name: '1',
      phone: '2'
    },
    errors: []
  }),
  computed: {
    ...mapState('storage', [
      'contacts'
    ])
  },
  methods: {
    ...mapActions('storage', [
      'createContact'
    ]),
    closeForm() {
      this.showForm = false;
      this.errors = [];
    },
    openForm() {
      this.showForm = true;
    },
    validateForm() {
      const formKeys = Object.keys(this.initialFields);
      this.errors = [];
      formKeys.forEach(key => {
        const field = this.initialFields[key];
        if (!field.trim().length) this.errors.push(`Field ${key} is required!`);
      });
      if (!this.errors.length) {
        this.createContact(this.initialFields);
        this.closeForm();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.add-contact-btn-wrapper {
  margin-top: 10px;
  max-width: 300px;
  //margin-left: auto;
}

.contacts {
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin-top: 30px;
}

.contact {
  border: 1px solid white;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  background: $dark-color;
  color: white;
}

.contact-info-row {
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-info-key {
  font-weight: bold;
}

.contact-info-value {
  margin-left: 8px;
}

.contact-photo {
  width: 60px;
  height: 60px;
  border: 1px solid;
  border-radius: 50%;
}

.contact-form {
  position: relative;
  cursor: auto;
}

.contact-form-close {
  position: absolute;
  top: -3px;
  right: 0;
  cursor: pointer;
  padding: 5px;
}

.create-contact-btn-wrapper {
  margin-top: 8px;
}

.contact-form-errors {
  color: $danger-color;
  text-align: center;
  margin-top: 5px;
}
</style>

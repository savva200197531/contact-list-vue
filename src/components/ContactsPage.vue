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
          <div class="close" @click.prevent="deleteContact(contact.name, key)">x</div>
          <div v-for="(contactValue, contactKey) in contact" class="contact-info-row">
            <span class="contact-info-key">{{ contactKey }}</span>:
            <span class="contact-info-value">{{ contactValue }}</span>
          </div>
        </div>
      </router-link>
      <form @submit.prevent="validateForm" v-if="showForm" class="contact-form contact">
        <div class="close" @click="closeForm">x</div>
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
    <popup></popup>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Popup from '@/components/Popup';

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
  components: {
    Popup
  },
  computed: {
    ...mapState('storage', [
      'contacts'
    ])
  },
  methods: {
    ...mapActions('storage', [
      'createContact',
      'showPopup'
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
        if (!this.initialFields[key].trim().length) this.errors.push(`Field ${key} is required!`);
      });
      if (!this.errors.length) {
        this.createContact(this.initialFields);
        this.closeForm();
        formKeys.forEach(key => this.initialFields[key] = '');
      }
    },
    deleteContact(name, key) {
      this.showPopup({
        type: 'contact',
        data: {
          id: key,
          text: `Are you sure you want to delete the contact ${name}?`
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.contacts-page {
  padding: 0 10px;
}

.add-contact-btn-wrapper {
  margin-top: 10px;
  width: 300px;
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
  background: $dark-color;
  color: white;
  position: relative;
}

.contact-info-row {
  display: flex;
  align-items: center;
  //justify-content: center;
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
  cursor: auto;
}

.close {
  position: absolute;
  top: -3px;
  right: 0;
}

.create-contact-btn-wrapper {
  margin-top: 8px;
}
</style>

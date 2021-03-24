<template>
  <div class="contact-info">
    <router-link class="go-back" to="/"><- Go back</router-link>
    <div class="contact-card" v-if="Object.keys(currentContact).length">
      <!--      <span class="rollback">Rollback</span>-->
      <div class="contact-info-row" v-for="(contactValue, contactKey) in currentContact">
        <div class="contact-info-row-left">
          <span class="contact-info-key">{{ contactKey }}</span>
          <span> : </span>
          <span class="contact-info-value">{{ contactValue }}</span>
        </div>
        <div class="contact-info-row-right">
          <button type="button" class="dark-btn" @click="redactField(contactValue, contactKey)">Redact</button>
          <button class="dark-btn" @click="deleteField(contactKey)">x</button>
        </div>
      </div>
      <form v-if="showForm" class="contact-info-row contact-info-form">
        <div class="contact-info-inputs">
          <input :readonly="redact" v-model="newValues.key" placeholder="key" id="key" type="text" class="dark-input"> :
          <input v-model="newValues.value" placeholder="value" id="value" type="text" class="dark-input">
        </div>
        <div class="contact-form-errors" v-for="error in errors">
          {{ error }}
        </div>
        <div class="contact-info-buttons">
          <button class="contact-info-btn dark-btn" type="submit" @click.prevent="validateFields">Save</button>
          <button type="button" class="contact-info-btn dark-btn" @click="closeForm">Cancel</button>
        </div>
      </form>
      <div class="add-field">
        <button :disabled="redact" class="add-field-btn dark-btn" @click="openForm">Add field</button>
      </div>
    </div>
    <popup></popup>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Popup from '@/components/Popup';

export default {
  name: "contactInfo",
  data: () => ({
    currentContact: {},
    showForm: false,
    newValues: {
      key: '',
      value: ''
    },
    errors: [],
    currentContactId: '',
    redact: false,
    history: []
  }),
  components: {
    Popup
  },
  computed: {
    ...mapGetters('storage', [
      'getCurrentContact'
    ]),
    ...mapState('storage', [
      'popup'
    ])
  },
  methods: {
    ...mapActions('storage', [
      'createField',
      'showPopup'
    ]),
    resetForm() {
      this.showForm = false;
      this.redact = false;
      this.errors = [];
      Object.keys(this.newValues).forEach(key => this.newValues[key] = '');
    },
    closeForm() {
      // if (this.redact) {
      //   this.showPopup({
      //     type: 'redact',
      //     data: {
      //       text: `Are you sure you want to undo your changes?`
      //     }
      //   });
      // } else {
      // }
      this.resetForm();
    },
    openForm() {
      this.showForm = true;
    },
    validateFields() {
      const formKeys = Object.keys(this.newValues);
      this.errors = [];
      formKeys.forEach(key => {
        if (!this.newValues[key].trim().length) this.errors.push(`Field ${key} is required!`);
      });
      if (!this.errors.length) {
        this.createField({
          id: this.currentContactId,
          data: { [this.newValues.key]: this.newValues.value }
        });
        this.resetForm();
        this.closeForm();
      }
    },
    deleteField(key) {
      this.showPopup({
        type: 'field',
        data: {
          id: this.currentContactId,
          text: `Are you sure you want to delete the field ${key}?`,
          key
        }
      });
    },
    redactField(value, key) {
      this.openForm();
      this.newValues = {
        key,
        value
      };
      this.redact = true;
    }
  },
  mounted() {
    this.currentContactId = window.location.href.split('contact')[1];
    this.currentContact = this.getCurrentContact(this.currentContactId);
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.rollback {
  position: absolute;
  top: 5px;
  right: 5px;
  color: white;
  font-size: 18px;
  text-decoration: underline;
  cursor: pointer;
}

.contact-card {
  border: 1px solid white;
  width: 50%;
  margin: 10px auto 0 auto;
  position: relative;
  padding: 35px 30px 20px 30px;
  border-radius: 4px;
  box-shadow: $light-shadow;
}

.go-back {
  position: absolute;
  top: 5px;
  left: 5px;
  color: white;
  font-size: 18px;
}

.contact-info-inputs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;

  input {
    height: 40px;
    font-weight: 500;
    font-size: 16px;
    width: 49%;
  }
}

.contact-info-row-right {
  display: flex;
  align-items: center;
}

.contact-info-buttons {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 5px;
  justify-content: space-between;
}

.contact-info-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 18px;
  border-bottom: 1px solid white;
  padding: 8px 0;
}

.contact-info-key {
  font-weight: bold;
}

.contact-info-value {
  margin-left: 8px;
}

.add-field-form-close {
  cursor: pointer;
}

.add-field {
  margin-top: 10px;
}
</style>

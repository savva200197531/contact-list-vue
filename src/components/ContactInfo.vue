<template>
  <div class="contact-info">
    <router-link class="go-back" to="/"><- Go back</router-link>
    <div class="contact-card" v-if="Object.keys(currentContact).length">
      <span class="rollback">Rollback</span>
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
          <input :readonly="block" v-model="newValues.key" placeholder="key" id="key" type="text" class="dark-input"> :
          <input v-model="newValues.value" placeholder="value" id="value" type="text" class="dark-input">
        </div>
        <div class="contact-form-errors" v-for="error in errors">
          {{ error }}
        </div>
        <div class="contact-info-buttons">
          <button class="contact-info-btn dark-btn" type="submit" @click.prevent="validateFields">Save</button>
          <button type="button" class="contact-info-btn dark-btn" @click="closeForm">Remove</button>
        </div>
      </form>
      <div class="add-field">
        <button :disabled="block" class="add-field-btn dark-btn" @click="openForm">Add field</button>
      </div>
    </div>
    <popup></popup>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Popup from '@/components/Popup';

export default {
  name: "contactInfo",
  data: () => ({
    currentContact: {},
    showForm: false,
    newValues: {
      key: '2',
      value: '1'
    },
    errors: [],
    currentContactId: '',
    block: false
  }),
  components: {
    Popup
  },
  computed: {
    ...mapGetters('storage', [
      'getCurrentContact'
    ])
  },
  methods: {
    ...mapActions('storage', [
      'createField',
        'showPopup'
    ]),
    closeForm() {
      this.showForm = false;
      this.errors = [];
      this.newValues = {
        key: '',
        value: ''
      };
      this.block = false;
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
        this.closeForm();
        formKeys.forEach(key => this.newValues[key] = '');
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
      this.block = true;
    }
  },
  mounted() {
    this.currentContact = this.getCurrentContact(window.location.href.split('contact')[1]);
    this.currentContactId = window.location.href.split('contact')[1];
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

.contact-info-form {
  //justify-content: space-between;
  //max-width: 400px;
  //width: 100%;
  //width: 40%;
}

.contact-info-inputs {
  //width: 50%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;

  input {
    height: 40px;
    font-weight: 500;
    font-size: 16px;
    //margin-left: 8px;
    width: 49%;
  }
}

//.contact-info-input {
//  display: flex;
//  justify-content: space-between;
//  align-items: center;
//}

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

  button {
    //width: %;
  }
}

.contact-info-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  //min-height: 40px;
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

.contact-info-btn {
  //margin-left: 5px;
}

.add-field-form-close {
  cursor: pointer;
}

.add-field {
  margin-top: 10px;
}
</style>

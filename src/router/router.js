import Vue from 'vue';
import Router from 'vue-router';
import ContactsPage from '@/components/ContactsPage';
import ContactInfo from '@/components/ContactInfo';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'contactsPage',
      component: ContactsPage,
    },
    {
      path: '/contact:id',
      name: 'contactInfo',
      component: ContactInfo,
    },
  ],
});

export default router;

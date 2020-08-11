import Vue from 'vue'
import Storage from 'vue-ls';

Vue.use(Storage, {
    storage: 'local', // storage name session, local, memory
});
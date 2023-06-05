import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);
const config = {
    plugins: [createPersistedState()],
    state: {
        isLogin: false,
        username: '',
        balance:'',
        token: '',
        user:{}
        
    },
    getters: {
        isLogin: state => state.isLogin,
        token: state => state.token,
        username: state => state.username,
        balance: state => state.balance,
        user: state => state.user
    },
    mutations: {
        updateLogin(state, payload) {
            state.isLogin = payload;
        },
        updateToken(state, payload) {
            state.token = payload;
        },
        updateUsername(state, payload) {
            state.username = payload;
        },
        updateUser(state, payload) {
            state.user = payload;
        },
        updateBalance(state, payload) {
            state.balance = payload;
        }
    },
    actions: {}
}
const store = new Vuex.Store(config);
export default store;
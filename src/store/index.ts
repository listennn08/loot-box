import { createStore } from 'vuex';
import dataProvider from '@/apis/cors';
import converter from '@/utils/convertCSVToArray';

export default createStore({
  state: {
    cards: [],
    imgBasePath: 'https://raw.githubusercontent.com/listennn08/loot-box-image/master/',
  },
  mutations: {
    INIT_DATA(state, payload) {
      state.cards = payload;
    },
  },
  actions: {
    async initData({ commit }) {
      const resp: string = (await dataProvider).data;
      const data = converter(resp);
      commit('INIT_DATA', data);
    },
  },
  modules: {
  },
});

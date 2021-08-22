import Vue from 'vue'
import Vuex from 'vuex'
import { openDB } from 'idb'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    houses: [{ name: "sommerset" }],
    items: [],
  },
  mutations: {
    setHouses: (state, payload) => {
      state.houses = payload
    },
    pushHouse: (state, payload) => {
      state.houses.push(payload)
    }
  },
  actions: {
    addHouse: async ({ commit }, payload) => {
      const dbPromise = await openDB('wdipi-db1');

      await dbPromise.add('houses', payload);
      commit('pushHouse', payload)

    },
    getHouses: async ({ commit }) => {
      const dbPromise = await openDB('wdipi-db1');

      const value = await dbPromise.getAll('houses');

      commit('setHouses', value)

    }
  },
  getters: {
    houses: function (state) {
      let housesArray = [];
      for (let key in state.houses) {
        housesArray.push(state.houses[key].name)
      }
      return housesArray
    },
    items: state => state.items
  },
  modules: {
  }
})

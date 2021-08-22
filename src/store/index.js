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
    },
    setItems: (state, payload) => {
      state.items = payload
    },
    pushItem: (state, payload) => {
      state.items.push(payload)
    },
  },
  actions: {

    addItem: async ({ commit }, payload) => {
      const dbPromise = await openDB('wdipi-db1');

      await dbPromise.add('items', payload).then(() => {
        commit('pushItem', payload)
      })


    },
    addHouse: async ({ commit }, payload) => {
      const dbPromise = await openDB('wdipi-db1');

      await dbPromise.add('houses', payload).then(() => {
        commit('pushHouse', payload)
      })


    },
    getItems: async ({ commit }) => {
      const dbPromise = await openDB('wdipi-db1');

      const value = await dbPromise.getAll('items');

      commit('setItems', value)
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

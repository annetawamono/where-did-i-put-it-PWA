import Vue from 'vue';
import Vuex from 'vuex';
// import { openDB } from 'idb';
import { openDB } from 'idb/with-async-ittr.js';

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

      await dbPromise.add('items', payload).then((validKey) => {
        let newPayload = {
          ...payload,
          id: validKey
        }
        commit('pushItem', newPayload)
      })


    },
    addHouse: async ({ commit }, payload) => {
      const dbPromise = await openDB('wdipi-db1');

      await dbPromise.add('houses', payload).then((validKey) => {
        let newPayload = {
          ...payload,
          id: validKey
        }
        commit('pushHouse', newPayload)
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

    },
    updateItemHouse: async ({ commit, state }, payload) => {
      const dbPromise = await openDB('wdipi-db1');

      const tx = dbPromise.transaction('items', 'readwrite');

      for await (const cursor of tx.store) {

        if (cursor.key === payload.key) {
          let updateData = { ...cursor.value };
          updateData.home = payload.home;

          cursor.update(updateData).then(() => {
            // update the item store in vuex
            const index = state.items.findIndex(item => item.id === payload.key);
            const updateItems = [...state.items.slice(0, index), updateData, ...state.items.slice(index + 1)]
            commit('setItems', updateItems);
          }).catch(err => {
            console.error(err);
          })

        }

      }

      await tx.done;

    },
    updateItem: async ({ commit, state }, payload) => {
      const dbPromise = await openDB('wdipi-db1');

      const tx = dbPromise.transaction('items', 'readwrite');

      for await (const cursor of tx.store) {

        if (cursor.key === payload.key) {
          let updateData = { ...cursor.value };
          updateData.home = payload.home;
          updateData.qty = payload.qty;
          updateData.name = payload.name;
          updateData.category = payload.category;

          cursor.update(updateData).then(() => {
            // update the item store in vuex
            const index = state.items.findIndex(item => item.id === payload.key);
            const updateItems = [...state.items.slice(0, index), updateData, ...state.items.slice(index + 1)]
            commit('setItems', updateItems);
          }).catch(err => {
            console.error(err);
          })

        }

      }

      await tx.done;

    },
    deleteItem: async ({ commit, state }, payload) => {
      const dbPromise = await openDB('wdipi-db1');

      await dbPromise.delete('items', payload).then(() => {
        // update the item store in vuex
        const index = state.items.findIndex(item => item.id === payload);
        const updateItems = [...state.items.slice(0, index), ...state.items.slice(index + 1)]
        commit('setItems', updateItems);
      }).catch(err => {
        console.error(err);
      })
    },
    deleteHouse: async ({ commit, state }, payload) => {
      const dbPromise = await openDB('wdipi-db1');

      await dbPromise.delete('houses', payload).then(() => {
        // update the houses store in vuex
        const index = state.houses.findIndex(house => house.id === payload);
        const updateHouses = [...state.houses.slice(0, index), ...state.houses.slice(index + 1)]
        commit('setHouses', updateHouses)
      }).catch(err => {
        console.error(err);
      })
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
    housesWithKeys: state => state.houses,
    items: state => state.items
  },
  modules: {
  }
})

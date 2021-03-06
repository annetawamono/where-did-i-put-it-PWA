import Vue from 'vue';
import Vuex from 'vuex';
// import { openDB } from 'idb';
import { openDB } from 'idb/with-async-ittr.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    houses: [{ name: "sommerset" }],
    items: [],
    alert: { display: false, message: "" },
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
    setAlert: (state, payload) => {
      state.alert = payload;
    }
  },
  actions: {

    resetAlert: ({ commit }) => {
      commit('setAlert', { display: false, message: "" });
    },

    addItem: async ({ commit }, payload) => {
      const dbPromise = await openDB('wdipi-db1');

      await dbPromise.add('items', payload).then((validKey) => {
        let newPayload = {
          ...payload,
          id: validKey
        }
        commit('pushItem', newPayload);

        let alert = {
          display: true,
          message: payload.name + " added to " + payload.home + ".",
        }
        commit('setAlert', alert);

      }).catch(err => {
        let alert = {
          display: true,
          message: err
        }
        commit('setAlert', alert);
      })


    },
    addHouse: async ({ commit }, payload) => {
      const dbPromise = await openDB('wdipi-db1');

      await dbPromise.add('houses', payload).then((validKey) => {
        let newPayload = {
          ...payload,
          id: validKey
        }
        commit('pushHouse', newPayload);

        let alert = {
          display: true,
          message: payload.name + " added.",
        }
        commit('setAlert', alert);
      }).catch(err => {
        let alert = {
          display: true,
          message: err
        }
        commit('setAlert', alert);
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

            let alert = {
              display: true,
              message: payload.name + " moved to " + payload.home,
            }
            commit('setAlert', alert);
          }).catch(err => {
            let alert = {
              display: true,
              message: err
            }
            commit('setAlert', alert);
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

            let alert = {
              display: true,
              message: payload.name + " was edited.",
            }
            commit('setAlert', alert);
          }).catch(err => {
            let alert = {
              display: true,
              message: err
            }
            commit('setAlert', alert);
          })

        }

      }

      await tx.done;

    },
    updateHouse: async ({ commit, state }, payload) => {
      // TODO: When user updates, corresponding item houses need to update too. Can store item with house ID instead of name.

      const dbPromise = await openDB('wdipi-db1');

      const tx = dbPromise.transaction('houses', 'readwrite');

      for await (const cursor of tx.store) {
        if (cursor.key === payload.key) {
          let updateData = { ...cursor.value };
          updateData.name = payload.name;

          cursor.update(updateData).then(() => {
            // update the house store in vuex
            const index = state.houses.findIndex(house => house.id === payload.key);
            const updateHouses = [...state.houses.slice(0, index), updateData, ...state.houses.slice(index + 1)];
            commit('setHouses', updateHouses);

            let alert = {
              display: true,
              message: payload.name + " updated.",
            }
            commit('setAlert', alert);
          }).catch(err => {
            let alert = {
              display: true,
              message: err
            }
            commit('setAlert', alert);
          })
        }
      }

      await tx.done;
    },
    deleteItem: async ({ commit, state }, payload) => {
      const dbPromise = await openDB('wdipi-db1');

      await dbPromise.delete('items', payload.key).then(() => {
        // update the item store in vuex
        const index = state.items.findIndex(item => item.id === payload.key);
        const updateItems = [...state.items.slice(0, index), ...state.items.slice(index + 1)]
        commit('setItems', updateItems);

        let alert = {
          display: true,
          message: payload.name + " was deleted.",
        }
        commit('setAlert', alert);
      }).catch(err => {
        let alert = {
          display: true,
          message: err
        }
        commit('setAlert', alert);
      })
    },
    deleteHouse: async ({ commit, state }, payload) => {
      const dbPromise = await openDB('wdipi-db1');

      await dbPromise.delete('houses', payload.key).then(() => {
        // update the houses store in vuex
        const index = state.houses.findIndex(house => house.id === payload.key);
        const updateHouses = [...state.houses.slice(0, index), ...state.houses.slice(index + 1)]
        commit('setHouses', updateHouses);

        let alert = {
          display: true,
          message: payload.name + " was deleted.",
        }
        commit('setAlert', alert);
      }).catch(err => {
        let alert = {
          display: true,
          message: err
        }
        commit('setAlert', alert);
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
    items: state => state.items,
    alert: state => state.alert,
  },
  modules: {
  }
})

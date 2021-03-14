<template>
	<div class="home">
		<Header v-bind:homes="homes" v-on:view-select="changeView" />

		<FilterBar v-bind:filters="filters" v-on:filter-select="changeFilters" />

		<ItemList v-if="selectedFilters.length > 0" v-bind:items="filteredItems" />
		<ItemList v-else v-bind:items="houseItems" />
	</div>
</template>

<script>
// @ is an alias to /src
import FilterBar from "@/components/FilterBar.vue";
import Header from "@/components/Header.vue";
import ItemList from "@/components/ItemList.vue";

export default {
	name: "Home",
	components: {
		FilterBar,
		Header,
		ItemList,
	},
	data: () => ({
		items: [
			{
				id: "01",
				name: "Blanket",
				qty: 2,
				home: "Green Point",
				category: "Living room",
			},
			{ id: "02", name: "Tomatoes", qty: 1, home: "Boston", category: "Food" },
			{
				id: "03",
				name: "Jacket",
				qty: 1,
				home: "Boston",
				category: "Clothing",
			},
		],
		homes: ["Green Point", "Boston"],
		homeView: "Green Point",
		filters: [
			"Food",
			"Clothing",
			"Bedroom",
			"Laundry",
			"Bathroom",
			"Living room",
		],
		selectedFilters: [],
	}),
	methods: {
		changeView(newView) {
			this.homeView = newView;
		},
		changeFilters(newFilters) {
			this.selectedFilters = newFilters;
		},
		checkList(item) {
			return item.home == this.homeView;
		},
		checkListFilters(item) {
			// create array of selected filters with names
			let filters = [];
			this.selectedFilters.forEach((i) => {
				filters.push(this.filters[i]);
			});
			// return true if any selected filter is found in item and belongs to the house
			return (
				filters.find((filter) => filter == item.category) &&
				this.checkList(item)
			);
		},
	},
	computed: {
		houseItems: function () {
			return this.items.filter(this.checkList);
		},
		filteredItems: function () {
			return this.items.filter(this.checkListFilters);
		},
	},
};
</script>

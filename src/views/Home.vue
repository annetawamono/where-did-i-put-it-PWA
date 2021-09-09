<template>
	<div class="home">
		<Header :pageTitle="pageTitle">
			<v-row no-gutters>
				<v-col cols="12" sm="4">
					<v-select
						class="select2"
						:items="houses"
						solo
						v-model="homeView"
					></v-select>
				</v-col>
			</v-row>
		</Header>

		<FilterBar v-bind:filters="filters" v-on:filter-select="changeFilters" />

		<ItemList v-if="selectedFilters.length > 0" v-bind:items="filteredItems" />
		<ItemList v-else v-bind:items="houseItems" />
		<add-item></add-item>
	</div>
</template>

<script>
// @ is an alias to /src
import FilterBar from "@/components/FilterBar.vue";
import Header from "@/components/Header.vue";
import ItemList from "@/components/ItemList.vue";
import { mapGetters } from "vuex";
import AddItem from "../components/AddItem.vue";

export default {
	name: "Home",

	components: {
		FilterBar,
		Header,
		ItemList,
		AddItem,
	},
	data: () => ({
		pageTitle: "I definitely put it in",
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
		...mapGetters(["houses", "items"]),
	},
};
</script>

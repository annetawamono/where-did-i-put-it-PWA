<template>
	<div class="home">
		<Header v-bind:homes="homes" />

		<FilterBar />

		<v-list>
			<v-list-item v-for="item in items" :key="item.id">
				<v-list-item-icon>
					<v-menu>
						<template v-slot:activator="{ on, attrs }">
							<v-icon color="secondary" v-bind="attrs" v-on="on"
								>mdi-dots-vertical</v-icon
							>
						</template>
						<v-list>
							<v-list-item>
								<v-list-item-title>Move to</v-list-item-title>
							</v-list-item>
							<v-list-item>
								<v-list-item-title>Edit</v-list-item-title>
							</v-list-item>
							<v-list-item>
								<v-list-item-title>Delete</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
					<!-- <v-icon color="secondary" @click="openOptions"
						>mdi-dots-vertical</v-icon
					> -->
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title>
						{{ item.name }}
					</v-list-item-title>
				</v-list-item-content>
				<v-list-item-content>
					<v-list-item-title> Qty:{{ item.qty }} </v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</div>
</template>

<script>
// @ is an alias to /src
import FilterBar from "@/components/FilterBar.vue";
import Header from "@/components/Header.vue";

export default {
	name: "Home",
	components: {
		FilterBar,
		Header,
	},
	data: () => ({
		items: [
			{
				id: "01",
				name: "Blanket",
				qty: 2,
				home: "Green Point",
				category: "living room",
			},
			{ id: "02", name: "Tomatoes", qty: 1, home: "Boston", category: "food" },
		],
		homes: ["Green Point", "Boston"],
	}),
	methods: {
		// openOptions() {
		// 	alert("List Options");
		// },
	},
};
</script>

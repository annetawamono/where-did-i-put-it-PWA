<template>
	<v-app>
		<v-main>
			<router-view />
		</v-main>

		<v-bottom-navigation v-model="value" color="primary" grow height="12vh">
			<router-link to="/">
				<v-btn color="white" value="home">
					<span>Homes</span>
					<v-icon>mdi-home-outline</v-icon>
				</v-btn>
			</router-link>

			<router-link to="/settings">
				<v-btn color="white" value="settings">
					<span>Settings</span>
					<v-icon>mdi-home-edit-outline</v-icon>
				</v-btn>
			</router-link>
		</v-bottom-navigation>
	</v-app>
</template>

<script>
export default {
	name: "App",
	created() {
		this.handleHouses();
		this.handleItems();
	},

	data: () => ({
		value: "home",
	}),

	methods: {
		handleItems() {
			this.$store.dispatch("getItems");
		},
		handleHouses() {
			this.$store.dispatch("getHouses");
		},
	},
};
</script>

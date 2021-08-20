<template>
	<v-app>
		<v-main>
			<router-view />
		</v-main>
		<add-home></add-home>
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
import AddHome from "./components/AddHome.vue";

export default {
	name: "App",

	components: {
		AddHome,
	},

	data: () => ({
		value: "home",
	}),
};
</script>

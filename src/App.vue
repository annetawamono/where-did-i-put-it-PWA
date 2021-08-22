<template>
	<v-app>
		<v-main>
			<router-view />
		</v-main>
		<add-item></add-item>
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
import AddItem from "./components/AddItem.vue";

export default {
	name: "App",

	components: {
		AddItem,
	},

	data: () => ({
		value: "home",
	}),
};
</script>

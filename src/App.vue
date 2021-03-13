<template>
	<v-app>
		<v-main>
			<router-view />
		</v-main>
		<v-btn
			@click="addItem"
			fab
			color="accent"
			large
			fixed
			right
			bottom
			class="fab_addHome"
		>
			<v-icon>mdi-home-plus-outline</v-icon>
		</v-btn>
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
// import HelloWorld from './components/HelloWorld';

export default {
	name: "App",

	components: {},

	data: () => ({
		value: "home",
	}),

	methods: {
		addItem() {
			alert("FAB clicked");
		},
	},
};
</script>
<style>
.fab_addHome {
	margin-bottom: 12vh;
}
</style>
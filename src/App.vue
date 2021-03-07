<template>
	<v-app>
		<v-main>
			<router-view />
		</v-main>
		<v-bottom-navigation v-model="value" color="primary" grow>
			<router-link to="/">
				<v-btn value="home">
					<span>Homes</span>
					<v-icon>mdi-home-outline</v-icon>
				</v-btn>
			</router-link>

			<router-link to="/settings">
				<v-btn value="settings">
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
};
</script>

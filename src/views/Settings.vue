<template>
	<div>
		<Header :pageTitle="pageTitle"></Header>
	</div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
	components: {
		Header,
	},
	data: function () {
		return {
			pageTitle: "Settings",
		};
	},
};
</script>
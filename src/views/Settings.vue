<template>
	<div>
		<Header :pageTitle="pageTitle"></Header>
		<v-list>
			<v-list-item>
				<v-list-item-content>
					<v-list-item-subtitle>Homes</v-list-item-subtitle>
				</v-list-item-content>
				<v-list-item-action>
					<add-house></add-house>
				</v-list-item-action>
			</v-list-item>
			<template v-for="(house, index) in houses">
				<v-list-item :key="index">
					<v-list-item-content>{{ house }}</v-list-item-content>
					<v-list-item-action>
						<v-icon>mdi-lead-pencil</v-icon>
					</v-list-item-action>
					<v-list-item-action>
						<v-icon>mdi-trash-can-outline</v-icon>
					</v-list-item-action>
				</v-list-item>
				<v-divider v-if="index < houses.length - 1" :key="index"></v-divider>
			</template>
		</v-list>
	</div>
</template>

<script>
import Header from "../components/Header.vue";
import AddHouse from "../components/AddHouse.vue";

import { mapGetters } from "vuex";
export default {
	components: {
		Header,
		AddHouse,
	},
	data: function () {
		return {
			pageTitle: "Settings",
		};
	},
	computed: {
		...mapGetters(["houses"]),
	},
};
</script>
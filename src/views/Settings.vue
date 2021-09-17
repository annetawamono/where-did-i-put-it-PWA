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
			<template v-for="(house, index) in housesWithKeys">
				<v-list-item :key="house.key">
					<v-list-item-content>{{ house.name }}</v-list-item-content>
					<v-list-item-action>
						<v-icon>mdi-lead-pencil</v-icon>
					</v-list-item-action>
					<v-list-item-action>
						<v-icon
							@click="
								dialogDelete = true;
								houseKey = house.id;
							"
							>mdi-trash-can-outline</v-icon
						>
					</v-list-item-action>
				</v-list-item>
				<v-divider
					v-if="index < housesWithKeys.length - 1"
					:key="house.key"
				></v-divider>
			</template>
		</v-list>
		<v-dialog v-model="dialogDelete">
			<delete-dialog
				@onClickDelete="deleteHouse"
				@onClickCancel="dialogDelete = false"
			></delete-dialog>
		</v-dialog>
	</div>
</template>

<script>
import Header from "../components/Header.vue";
import AddHouse from "../components/AddHouse.vue";
import DeleteDialog from "../components/DeleteDialog.vue";

import { mapGetters } from "vuex";
export default {
	components: {
		Header,
		AddHouse,
		DeleteDialog,
	},
	data: function () {
		return {
			pageTitle: "Settings",
			dialogDelete: false,
			houseKey: -1,
		};
	},
	computed: {
		...mapGetters(["housesWithKeys"]),
	},
	methods: {
		deleteHouse() {
			this.$store.dispatch("deleteHouse", this.houseKey);
			this.dialogDelete = false;
		},
	},
};
</script>
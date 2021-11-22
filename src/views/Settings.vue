<template>
	<div>
		<Header :pageTitle="pageTitle"></Header>
		<!-- Snackbar -->
		<v-snackbar
			@input="resetAlert"
			:value="alert.display"
			absolute
			left
			rounded="pill"
			top
			width="200"
			color="accent"
		>
			{{ alert.message }}
		</v-snackbar>
		<v-list>
			<v-list-item>
				<v-list-item-content>
					<v-list-item-subtitle>Homes</v-list-item-subtitle>
				</v-list-item-content>
				<v-list-item-action>
					<!-- Add House -->
					<add-house @submit="saveHouse"></add-house>
				</v-list-item-action>
			</v-list-item>
			<template v-for="(house, index) in housesWithKeys">
				<v-list-item :key="house.key">
					<v-list-item-content>{{ house.name }}</v-list-item-content>
					<v-list-item-action>
						<v-icon
							@click="
								dialogEdit = true;
								houseKey = house.id;
								houseName = house.name;
							"
							>mdi-lead-pencil</v-icon
						>
					</v-list-item-action>
					<v-list-item-action>
						<v-icon
							@click="
								dialogDelete = true;
								houseKey = house.id;
								houseName = house.name;
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
		<v-dialog v-model="dialogEdit">
			<v-card>
				<v-card-title>Edit Home</v-card-title>
				<v-card-text>
					<v-text-field label="House name" v-model="houseName"></v-text-field>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" outlined @click="updateHouse"> Confirm </v-btn>
					<v-btn color="secondary" @click="dialogEdit = false"> Cancel </v-btn>
				</v-card-actions>
			</v-card>
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
			dialogEdit: false,
			houseKey: -1,
			houseName: "",
		};
	},
	computed: {
		...mapGetters(["housesWithKeys", "alert"]),
	},
	methods: {
		resetAlert() {
			this.$store.dispatch("resetAlert");
		},

		saveHouse: function (houseName) {
			const newHouse = {
				name: houseName,
			};
			this.$store.dispatch("addHouse", newHouse);
		},
		deleteHouse() {
			const deleteData = {
				name: this.houseName,
				key: this.houseKey,
			};
			this.$store.dispatch("deleteHouse", deleteData);
			this.dialogDelete = false;
		},
		updateHouse() {
			const updateData = {
				key: this.houseKey,
				name: this.houseName,
			};
			this.$store.dispatch("updateHouse", updateData);
			this.dialogEdit = false;
		},
	},
};
</script>
<template>
	<div class="item-list">
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
								<v-list-item-title
									@click="
										itemKey = item.id;
										name = item.name;
										dialogMove = true;
									"
									>Move to</v-list-item-title
								>
							</v-list-item>
							<v-list-item>
								<v-list-item-title
									@click="
										itemKey = item.id;
										qty = item.qty;
										name = item.name;
										itemHome = item.home;
										category = item.category;
										dialogEdit = true;
									"
									>Edit</v-list-item-title
								>
							</v-list-item>
							<v-list-item>
								<v-list-item-title
									@click="
										itemKey = item.id;
										name = item.name;
										dialogDelete = true;
									"
									>Delete</v-list-item-title
								>
							</v-list-item>
						</v-list>
					</v-menu>
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
		<v-dialog v-model="dialogMove">
			<v-card>
				<v-card-title>Move</v-card-title>
				<v-card-subtitle>Move item to another house:</v-card-subtitle>
				<v-card-text>
					<v-select :items="houses" label="House" v-model="home"></v-select>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" outlined @click="moveItem"> Move </v-btn>
					<v-btn color="secondary" @click="dialogMove = false"> Cancel </v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="dialogDelete">
			<delete-dialog
				@onClickDelete="deleteItem"
				@onClickCancel="dialogDelete = false"
			></delete-dialog>
		</v-dialog>
		<v-dialog v-model="dialogEdit">
			<v-card>
				<v-card-title>Edit Item</v-card-title>
				<v-card-text>
					<v-select :items="houses" label="House" v-model="itemHome"></v-select>
					<v-text-field label="Item name" v-model="name"></v-text-field>
					<v-slider
						v-model="qty"
						thumb-label="always"
						min="0"
						max="10"
						label="Qty"
						:style="{
							marginTop: 1.5 + 'rem',
						}"
					></v-slider>
					<v-combobox
						v-model="category"
						:items="['Clothing', 'Food', 'Living Room']"
						label="Category"
						chips
					></v-combobox>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" outlined @click="updateItem"> Confirm </v-btn>
					<v-btn color="secondary" @click="dialogEdit = false"> Cancel </v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>
import { VSelect } from "vuetify/lib";
import { mapGetters } from "vuex";
import DeleteDialog from "../components/DeleteDialog.vue";

export default {
	components: {
		VSelect,
		DeleteDialog,
	},
	props: ["items"],
	data: function () {
		return {
			dialogMove: false,
			dialogDelete: false,
			dialogEdit: false,
			home: "",
			itemKey: -1,
			itemDialog: null,
			qty: 0,
			name: "",
			itemHome: "",
			category: "",
		};
	},
	computed: {
		...mapGetters(["houses", "alert"]),
	},
	methods: {
		resetAlert() {
			this.$store.dispatch("resetAlert");
		},

		moveItem() {
			const moveData = { home: this.home, key: this.itemKey, name: this.name };
			this.$store.dispatch("updateItemHouse", moveData);
			this.dialogMove = false;
		},

		// TODO: Move dialogs to own components: https://vuejs.org/v2/guide/components.html#:~:text=Custom%20events%20can%20also%20be%20used%20to%20create%20custom%20inputs%20that%20work%20with%20v%2Dmodel
		updateItem() {
			const updateData = {
				key: this.itemKey,
				home: this.itemHome,
				qty: this.qty,
				name: this.name,
				category: this.category,
			};

			this.$store.dispatch("updateItem", updateData);
			this.dialogEdit = false;
		},
		deleteItem() {
			const deleteData = { key: this.itemKey, name: this.name };
			this.$store.dispatch("deleteItem", deleteData);
			this.dialogDelete = false;
		},
	},
};
</script>

<style>
.item-list {
	max-height: 50vh;
	overflow-y: scroll;
}
</style>
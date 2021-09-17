<template>
	<div>
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
			<v-card>
				<v-card-title>Delete</v-card-title>
				<v-card-text>Are you sure?</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="error" @click="deleteItem"> Delete </v-btn>
					<v-btn color="secondary" outlined @click="dialogDelete = false">
						Cancel
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="dialogEdit">
			<v-card>
				<v-card-title>Edit Item</v-card-title>
				<v-card-text>
					<v-select :items="houses" label="House" v-model="itemHome"></v-select>
					<v-text-field label="Item name" v-model="name"></v-text-field>
					<v-subheader class="pl-0"> Qty </v-subheader>
					<v-slider v-model="qty" thumb-label></v-slider>
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

export default {
	components: {
		VSelect,
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
		...mapGetters(["houses"]),
	},
	methods: {
		moveItem() {
			const moveData = { home: this.home, key: this.itemKey };
			this.$store.dispatch("updateItemHouse", moveData);
			this.dialogMove = false;
		},
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
			this.$store.dispatch("deleteItem", this.itemKey);
			this.dialogDelete = false;
		},
	},
};
</script>
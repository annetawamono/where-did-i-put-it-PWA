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
										updateItemKey = item.id;
										dialog = true;
									"
									>Move to</v-list-item-title
								>
							</v-list-item>
							<v-list-item>
								<v-list-item-title>Edit</v-list-item-title>
							</v-list-item>
							<v-list-item>
								<v-list-item-title>Delete</v-list-item-title>
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
		<v-dialog v-model="dialog">
			<v-card>
				<v-card-title>Move item to another house:</v-card-title>
				<v-card-text>
					<v-select :items="houses" label="House" v-model="home"></v-select>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" outlined @click="updateItem"> Move </v-btn>
					<v-btn color="error" @click="dialog = false"> Cancel </v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>
import { VSelect } from "vuetify/lib";
import { mapGetters } from "vuex";

export default {
	name: "ItemList",
	props: ["items"],
	components: {
		VSelect,
	},
	data: function () {
		return {
			dialog: false,
			home: "",
			updateItemKey: -1,
		};
	},
	computed: {
		...mapGetters(["houses"]),
	},
	methods: {
		updateItem() {
			let moveData = { home: this.home, key: this.updateItemKey };
			this.$store.dispatch("updateHouse", moveData);
			this.dialog = false;
		},
	},
};
</script>
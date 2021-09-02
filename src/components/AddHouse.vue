<template>
	<div>
		<v-dialog v-model="dialog">
			<template v-slot:activator="{ on, attrs }">
				<v-btn color="accent" small v-bind="attrs" v-on="on">
					<v-icon>mdi-plus</v-icon>
					Add
				</v-btn>
			</template>
			<v-card>
				<v-card-title>Add Home</v-card-title>
				<v-card-text>
					<v-text-field label="House name" v-model="houseName"></v-text-field>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" outlined @click="saveHouse"> Confirm </v-btn>
					<v-btn color="error" @click="dialog = false"> Cancel </v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	data: function () {
		return {
			dialog: false,
			houseName: "",
		};
	},
	methods: {
		saveHouse() {
			var newHouse = {
				name: this.houseName,
			};
			// adding to indexeddb
			this.$store.dispatch("addHouse", newHouse);
			this.dialog = false;
		},
	},
};
</script>
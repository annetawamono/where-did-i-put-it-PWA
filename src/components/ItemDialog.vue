<template>
	<v-card>
		<v-card-title>Add Item</v-card-title>
		<v-card-text>
			<v-select :items="houses" label="House" v-model="home"></v-select>
			<v-text-field label="Item name" v-model="name"></v-text-field>
			<!-- <v-subheader class="pl-0"> Qty </v-subheader> -->
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
			<v-btn color="primary" outlined @click="submitForm()"> Confirm </v-btn>
			<v-btn color="secondary" @click="$emit('close')"> Cancel </v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import { VSelect } from "vuetify/lib";
import { mapGetters } from "vuex";

export default {
	components: {
		VSelect,
	},

	data: function () {
		return {
			qty: 0,
			name: "",
			home: "",
			category: "",
		};
	},
	computed: {
		...mapGetters(["houses"]),
	},
	methods: {
		submitForm() {
			const newItem = {
				name: this.name,
				qty: this.qty,
				home: this.home,
				category: this.category,
			};

			this.$emit("submitForm", newItem);
		},
	},
};
</script>
<template>
	<div>
		<v-dialog v-model="dialog">
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					v-bind="attrs"
					v-on="on"
					fab
					color="accent"
					large
					fixed
					right
					bottom
					class="fab_addHome"
				>
					<v-icon>mdi-home-plus-outline</v-icon>
				</v-btn>
			</template>
			<v-card>
				<v-card-title>Add Home</v-card-title>
				<v-card-text>
					<v-select :items="['Boston', 'Greenpoint']" label="House"></v-select>
					<v-text-field label="Item name"></v-text-field>
					<v-subheader class="pl-0"> Qty </v-subheader>
					<v-slider v-model="qty" thumb-label></v-slider>
					<v-combobox
						v-model="select"
						:items="['Clothing', 'Food', 'Living Room']"
						label="Category"
						multiple
						chips
					></v-combobox>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" outlined @click="dialog = false">
						Confirm
					</v-btn>
					<v-btn color="error" @click="dialog = false"> Cancel </v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import { VSelect, VDialog } from "vuetify/lib";
export default {
	components: {
		VSelect,
		VDialog,
	},
	data: function () {
		return {
			dialog: false,
			qty: 0,
		};
	},
};
</script>

<style>
.fab_addHome {
	margin-bottom: 12vh;
}
</style>
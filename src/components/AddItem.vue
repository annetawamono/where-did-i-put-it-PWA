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
			<item-dialog @submitForm="saveItem" @close="dialog = false"></item-dialog>
		</v-dialog>
	</div>
</template>

<script>
import ItemDialog from "./ItemDialog.vue";

export default {
	components: {
		ItemDialog,
	},
	data: function () {
		return {
			dialog: false,
		};
	},
	methods: {
		saveItem(value) {
			// adding to indexeddb

			this.$store.dispatch("addItem", value);
			this.dialog = false;
		},
	},
};
</script>

<style>
.fab_addHome {
	margin-bottom: 12vh;
}
</style>
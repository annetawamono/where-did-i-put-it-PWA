<template>
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
							<v-list-item-title>Move to</v-list-item-title>
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
</template>
<script>
export default {
	name: "ItemList",
	props: ["items"],
};
</script>
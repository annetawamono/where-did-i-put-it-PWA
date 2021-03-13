<template>
	<div class="filterBar">
		<v-chip-group multiple show-arrows active-class="accent">
			<v-chip label v-for="filter in filters" :key="filter">
				{{ filter }}
			</v-chip>
		</v-chip-group>
	</div>
</template>

<script>
export default {
	name: "FilterBar",
	data: () => ({
		filters: ["Food", "Clothing", "Bedroom", "Laundry", "Bathroom"],
	}),
};
</script>
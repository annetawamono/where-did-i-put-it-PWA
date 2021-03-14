<template>
	<div class="filterBar">
		<v-chip-group
			v-model="selected"
			multiple
			show-arrows
			active-class="accent"
			@change="$emit('filter-select', selected)"
		>
			<v-chip label v-for="filter in filters" :key="filter">
				{{ filter }}
			</v-chip>
		</v-chip-group>
	</div>
</template>

<script>
export default {
	name: "FilterBar",
	props: ["filters"],
	data: () => ({
		// filters: ["Food", "Clothing", "Bedroom", "Laundry", "Bathroom"],
		selected: [],
	}),
};
</script>
<template>
	<v-card>
		<v-card-title>Delete</v-card-title>
		<v-card-text>Are you sure?</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn color="error" @click="$emit('onClickDelete')"> Delete </v-btn>
			<v-btn color="secondary" outlined @click="$emit('onClickCancel')">
				Cancel
			</v-btn>
		</v-card-actions>
	</v-card>
</template>
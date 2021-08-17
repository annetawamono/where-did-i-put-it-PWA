<template>
	<div>
		<v-card color="primary" flat rounded="0" max-height="177px">
			<v-container class="pa-6">
				<div class="header__text">
					<h1>Where did I put it?</h1>
					<p>{{ pageTitle }}</p>
				</div>
				<slot></slot>
			</v-container>
			<div v-show="this.$slots.default" class="divider_rounded"></div>
		</v-card>
	</div>
</template>

<script>
export default {
	name: "Header",
	props: {
		pageTitle: {
			type: String,
			required: true,
		},
	},
	data: () => ({
		selected: "Green Point",
	}),
};
</script>
<style>
.header__text {
	color: white;
}
.header__text h1 {
	font-size: 1rem;
}

.header__text p {
	font-size: 2rem;
}
.divider_rounded {
	height: 43px;
	border-radius: 50px 50px 0px 0px;
	background-color: white;
	position: relative;
	top: -76px;
}
.select2 {
	z-index: 2;
}
</style>
<template>
	<div>
		<v-card color="primary" flat rounded="0" max-height="177px">
			<v-container class="pa-6">
				<div class="header__text">
					<h1>Where did I put it?</h1>
					<p>I definitely put it in:</p>
				</div>
				<v-row no-gutters>
					<v-col cols="12" sm="4">
						<v-select
							class="select2"
							:items="homes"
							solo
							v-bind:value="homes[0]"
						></v-select>
					</v-col>
				</v-row>
			</v-container>
			<div class="divider_rounded"></div>
		</v-card>
	</div>
</template>

<script>
export default {
	name: "Header",
	props: ["homes"],
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
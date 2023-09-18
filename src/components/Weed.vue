<script setup>
const props = defineProps({
	x: Number,
	y: Number,
});
</script>

<template>
	<!-- x, y プロパティが正しく渡されているかを確認するため、画面に表示する -->
	<td :class="grass">{{x}}{{y}}</td>
</template>

<style scoped>
td {
	user-select: none;	/* ダブルクリックでテキストが選択されないようにする */
	border: 1px solid green;
	width: 150px;
	height: 150px;
	font-size: 6rem;
	text-align: center;
	background: #ffaa00;
}
</style>

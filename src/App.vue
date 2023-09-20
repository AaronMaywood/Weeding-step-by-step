<script setup>
import Garden from './components/Garden.vue';
import { gameStart, gameRestart, isGameClear, isGameOver } from './store.js';
gameStart();
</script>

<template>
	<h1>草むしり</h1>
	<Garden />
	<p class="clear" v-if="isGameClear()">GAME CLEAR!</p>
	<p class="over" v-if="isGameOver()">GAME OVER!</p>
	<!--
	ボタンをフワーッと表示させる効果を付けるために、<Transition> を使用しました。
	https://ja.vuejs.org/guide/built-ins/transition.html より
   	-->
	<Transition>
		<button class="replay" @click="gameRestart()" v-if="isGameOver() || isGameClear()">再度プレイする</button>
	</Transition>
</template>

<style scoped>
h1 {
	text-align: center;
}
.clear,
.over {
	background: #006600;
	color: white;
	padding: 1rem;
	font-size: 5rem;
	width: max-content;
	/* 画面中央に表示 */
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-100%);
}

.over {
	background: #006600;
	color: red;
}

/* ボタンをフワーッと表示させるトランジション効果のためのCSSです
https://ja.vuejs.org/guide/built-ins/transition.html#css-based-transitions より
 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.replay {
	font-size: 3rem;
	/* 画面中央に表示 */
	position: absolute;
    top: calc(50% + 130px);
    left: 50%;
	transform: translate(-50%,-100%);
}
</style>

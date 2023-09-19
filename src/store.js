import { ref } from 'vue';

const X_MAX = 5;
const Y_MAX = 5;
export const state = ref([
	[0,1,2,3,0], // 試験用に1,2,3を入れて画面上に草が生えるのを確認する
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
]);

// 除草する
export function weeding(x,y){
	state.value[x][y]--;
	if( state.value[x][y] < 0 ){
		state.value[x][y] = 0;
	}
}

// 草が伸びる
function grow(x,y){
	state.value[x][y]++;
	if( state.value[x][y] > 3){
		state.value[x][y] = 3;
	}
}

// 草を更新
function update(){
	// 1. ランダムに空き地に草が生える
	if( Math.random() > 0.985 ){
		const x = Math.floor(Math.random() * X_MAX);
		const y = Math.floor(Math.random() * Y_MAX);
		grow(x,y);
	}
	
	requestAnimationFrame(update);
}

requestAnimationFrame(update);


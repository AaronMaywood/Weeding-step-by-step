import { ref } from 'vue';

export const gameState = ref(0);

function gameClear(){
	gameState.value = 1;
}

export function isGameClear(){
	return gameState.value === 1;
}

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
	// ゲームクリアーになったら以後更新をストップ
	if (isGameClear()) return;

	// 1. ランダムに空き地に草が生える
	if( Math.random() > 0.985 ){
		const x = Math.floor(Math.random() * X_MAX);
		const y = Math.floor(Math.random() * Y_MAX);
		grow(x,y);
	}

	// もし、草が一本もなくなったらゲームクリアー
	let grassCounter = 0;
	for(let x=0 ; x < X_MAX ; x++){
		for(let y=0 ; y < Y_MAX ; y++){
			if( state.value[x][y] !== 0 ){
				grassCounter++;
			}
		}
	}
	if(grassCounter === 0){
		gameClear();
	}

	requestAnimationFrame(update);
}

requestAnimationFrame(update);


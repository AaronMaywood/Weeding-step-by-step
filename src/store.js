import { ref, computed } from 'vue';

export const gameState = ref(0);

function gameClear(){
	gameState.value = 1;
}

export const isGameClear = computed(()=>{
	return gameState.value === 1;
});

function gameOver(){
	gameState.value = 2;
}

export const isGameOver = computed(()=>{
	return gameState.value === 2;
});

const X_MAX = 5;
const Y_MAX = 5;
export const state = ref([
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
]);

// ゲーム開始時にランダムに草を生やす
export function gameStart(){
	state.value = [
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
	];
	gameState.value = 0;
	for(let i=0 ; i<30 ; i++){
		const x = Math.floor(Math.random() * X_MAX);
		const y = Math.floor(Math.random() * Y_MAX);
		grow(x,y);
	}
	requestAnimationFrame(update);
}

// ゲームクリアー、ゲームオーバーになったあと、ゲームを再プレイする
export function gameRestart(){
	gameStart();
}

// 除草する
export function weeding(x,y){
	// ゲーム終了になったら以後更新をストップ
	if (isGameClear() || isGameOver() ) return;

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
let counter = 0;
function update(){
	// ゲームクリアーになったら以後更新をストップ
	if (isGameClear.value || isGameOver.value ) return;

	// 1. ランダムに空き地に草が生える
	if( Math.random() > 0.985 ){
		const x = Math.floor(Math.random() * X_MAX);
		const y = Math.floor(Math.random() * Y_MAX);
		grow(x,y);
	}

	// 2. 周囲に草が茂っているときは（根が張っているので）ぐんと伸びる＝緑が濃いところほど濃くなる
	if( counter++ % 150 === 0 ){	 // 一定間隔毎に更新
		// 次のコマの計算のため、現在の state.value をコピーした next を用意する
		let next = JSON.parse(JSON.stringify(state.value))

		for(let x=0 ; x < X_MAX ; x++){
			for(let y=0 ; y < Y_MAX ; y++){
				// 隣り合った上下左右の草の数を数える（枠外は数えない）
				let counter = upper(x,y) + bottom(x,y) + right(x,y) + left(x,y);
				// 上下左右の草の合計が4より大きいとき、現在の位置に草を生やす
				if(counter>4){
					next[x][y]++;
					if(next[x][y] > 3) {
						next[x][y] = 3;
					}
				}
			}
		}

		// 計算済みの next を現在のコマに反映
		state.value = JSON.parse(JSON.stringify(next));
	}

	// 3. もし、草が一本もなくなったらゲームクリアー（勝ち）
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

	// 4. もし、全てのマス目に草が茂ったらゲームオーバー（負け）
	let grassCounter2 = 0;
	for(let x=0 ; x < X_MAX ; x++){
		for(let y=0 ; y < Y_MAX ; y++){
			if( state.value[x][y] === 0 ){
				grassCounter2++;
			}
		}
	}
	if(grassCounter2 === 0){
		gameOver();
	}

	requestAnimationFrame(update);
}

// 上下左右の方向に草があるかを調べる
function upper(x,y){
	if(y <= 0){ return 0 }
	return state.value[x][y-1]
}

function bottom(x,y){
	if(y >= Y_MAX-1){ return 0 }
	return state.value[x][y+1]
}

function right(x,y){
	if(x >= X_MAX-1){ return 0 }
	return state.value[x+1][y]
}

function left(x,y){
	if(x <= 0){ return 0 }
	return state.value[x-1][y]
}

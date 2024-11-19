

const gameContainer = document.getElementById('gameContainer');
const poi = document.getElementById('poi');
const fishImage = 'denshi05.png'; // 金魚の画像に差し替え
const scoreBoard = document.getElementById("scoreBoard");
const timerElement = document.getElementById('timer');
const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const bestscorediv = document.getElementById('bestscore');
const GameBoard = document.getElementById('GameBoard');
const fn = document.getElementById('fn');
const finishscore = document.getElementById("finishscore");
const homebutton = document.getElementById("home");
// 画像を表示するコンテナ
const imageContainer = document.getElementById('imageContainer');


let timerValue = 5; // タイマーの初期値（秒）
let timerInterval = null; // 初期値をnullに設定
let score = 0;
let poiX = 400;
let poiY = 300;
const poiSpeed = 5;
const fishSize = 100;


function createFish() {
    const fish = document.createElement('img');
    fish.src = fishImage;
    fish.classList.add('fish');

    // 初期位置を設定
    const initialX = Math.random() * (gameContainer.clientWidth - fishSize);
    const initialY = Math.random() * (gameContainer.clientHeight - fishSize);
    fish.style.width = fishSize + 'px';
    fish.style.height = fishSize + 'px';
    fish.style.left = initialX + 'px';
    fish.style.top = initialY + 'px';

    gameContainer.appendChild(fish);
    moveFishSmoothly(fish);
}

function moveFishSmoothly(fish) {
    let directionX = Math.random() < 0.5 ? 1 : -1; // X方向の初期移動方向
    let directionY = Math.random() < 0.5 ? 1 : -1; // Y方向の初期移動方向
    const speed = 2; // 移動速度

    function updatePosition() {
        const currentX = parseFloat(fish.style.left);
        const currentY = parseFloat(fish.style.top);
        const maxX = gameContainer.clientWidth - fishSize;
        const maxY = gameContainer.clientHeight - fishSize;

        // 新しい位置を計算
        let newX = currentX + directionX * speed;
        let newY = currentY + directionY * speed;

        // 境界で方向を反転
        if (newX < 0 || newX > maxX) directionX *= -1;
        if (newY < 0 || newY > maxY) directionY *= -1;

        fish.style.left = newX + 'px';
        fish.style.top = newY + 'px';

        requestAnimationFrame(updatePosition); // 再帰呼び出し
    }

    updatePosition(); // 初期呼び出し
}

function handlePoiMovement() {
    let keysPressed = {};

    window.addEventListener('keydown', (e) => {
        keysPressed[e.key] = true;
    });

    window.addEventListener('keyup', (e) => {
        keysPressed[e.key] = false;
    });

    function movePoi() {
        if (keysPressed['ArrowUp'] && poiY > 0) poiY -= poiSpeed;
        if (keysPressed['ArrowDown'] && poiY < gameContainer.clientHeight - 80) poiY += poiSpeed;
        if (keysPressed['ArrowLeft'] && poiX > 0) poiX -= poiSpeed;
        if (keysPressed['ArrowRight'] && poiX < gameContainer.clientWidth - 80) poiX += poiSpeed;

        poi.style.transform = `translate(${poiX}px, ${poiY}px)`;
        requestAnimationFrame(movePoi);
    }
    movePoi();
}

function catchFish() {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const fishes = document.querySelectorAll('.fish');
            fishes.forEach(fish => {
                const fishRect = fish.getBoundingClientRect();
                const poiRect = poi.getBoundingClientRect();

                if (
                    poiRect.left < fishRect.right &&
                    poiRect.right > fishRect.left &&
                    poiRect.top < fishRect.bottom &&
                    poiRect.bottom > fishRect.top
                ) {
                    fish.remove();
                    score += 1;
                    scoreBoard.textContent = `金魚: ${score}匹`;

                }
            });
        }
    });
}

function startTimer() {
    if (timerInterval !== null) return; // 既にタイマーが進行中の場合は何もしない



    timerInterval = setInterval(() => {
        timerValue--;
        timerElement.textContent = `残り時間: ${timerValue}秒`;

        createFish();
        createFish();


        if (timerValue <= 0) {
            clearInterval(timerInterval);
            timerInterval = null; // タイマー終了後にリセット


            timerElement.textContent = `残り時間: 0秒`;

            timerInterval = null; // 初期値をnullに設定


            home();
        }
    }, 1000);

}

homebutton.addEventListener("click", () => {
    location.reload(true);

})

// 画像を表示する関数
function displayImages(score) {

    for (let i = 0; i < score; i++) {
        const img = document.createElement('img'); // <img>要素を作成
        img.src = fishImage; // 画像のURLを設定
        img.style.width = fishSize + 'px';
        img.style.height = fishSize + 'px';

        //console.log(score);
        //moveFishSmoothly(img);
        imageContainer.appendChild(img); // コンテナに追加
    }
}


function home() {

    //location.reload(true);


    GameBoard.style.display = 'none';
    gameContainer.style.display = 'none';

    finishscore.textContent = `${score}匹捕まえた`;



    startButton.style.display = 'block';

    fn.style.display = "block";







    // 画像を表示
    displayImages(score);



}





handlePoiMovement();
catchFish();



function startGame() {
    GameBoard.style.display = 'block';
    gameContainer.style.display = 'block';
    startScreen.style.display = 'none';

    score = 0;
    //timerValue = 3;
    scoreBoard.textContent = '金魚: 0匹';
    timerElement.textContent = '残り時間: 30秒';

    // const fishes = document.querySelectorAll('.fish');
    // console.log(fishes);
    // for (let i in fishes) {
    //     i.remove;
    //     console.log("けした");

    // }

    // console.log("ゲームスタート");

    for (let i = 0; i < 5; i++) {
        createFish();
    }


    // const ff = document.querySelectorAll('.fish');

    //console.log(ff.length);


    startTimer();

}


document.addEventListener('DOMContentLoaded', () => {
    startButton.addEventListener('click', startGame);
});


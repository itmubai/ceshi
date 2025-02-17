// script.js
const preloadImages = ['shocked.png', 'think.png', 'angry.png', 'crying.png', 'hug.png'];
preloadImages.forEach(img => {
  new Image().src = `./images/${img}`;
});

let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");

let clickCount = 0;

const noTexts = [
    "？你认真的吗…", 
    "要不再想想？", 
    "不许选这个！ ", 
    "我会很伤心…", 
    "不行:("
];

// 烟花特效函数
function createFirework() {
    const colors = ['#ff3366', '#ffd700', '#00ff87', '#7d3cff'];
    const firework = document.createElement("div");
    firework.className = "firework";
    firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    firework.style.left = Math.random() * 95 + "vw";
    firework.style.top = Math.random() * 95 + "vh";
    document.getElementById("fireworks-container").appendChild(firework);
    setTimeout(() => firework.remove(), 1000);
}

noButton.addEventListener("click", function() {
    if (navigator.vibrate) navigator.vibrate(100);
    clickCount++;

    yesButton.style.transform = `scale(${1 + (clickCount * 1.2)})`;
    noButton.style.transform = `translateX(${clickCount * 50}px)`;
    
    mainImage.style.transform = `translateY(-${clickCount * 25}px)`;
    questionText.style.transform = `translateY(-${clickCount * 25}px)`;

    if (clickCount <= 5) noButton.innerText = noTexts[clickCount - 1];
    
    const imgMap = {
        1: "shocked.png",
        2: "think.png", 
        3: "angry.png",
        4: "crying.png",
        5: "crying.png"
    };
    if (imgMap[clickCount]) mainImage.src = `./images/${imgMap[clickCount]}`;
});

yesButton.addEventListener("click", function() {
    // 连续烟花绽放
    const fireworksInterval = setInterval(() => {
        for(let i=0; i<5; i++) createFirework();
    }, 200);
    
    // 3秒后停止烟花并显示成功页面
    setTimeout(() => {
        clearInterval(fireworksInterval);
        document.body.innerHTML = `
            <div class="yes-screen">
                <h1 class="yes-text">!!! 超级喜欢你!!! (♡°▽°♡)</h1>
                <img src="./images/hug.png" alt="拥抱" class="yes-image">
            </div>
        `;
        document.body.style.overflow = "hidden";
    }, 3000);
});
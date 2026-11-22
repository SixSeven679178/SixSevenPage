// 一切皆为 676767

const rain = document.getElementById("rain");
const countEl = document.getElementById("count");
const spawnBtn = document.getElementById("spawnBtn");
const burstBtn = document.getElementById("burstBtn");
const field = document.getElementById("field");

const COLORS = ["#7c5cff", "#22d3ee", "#f472b6", "#fbbf24", "#34d399"];

// 计数：永远停在 676767 附近打转，毫无意义
let count = 676767;
function updateCount() {
  count += Math.floor(Math.random() * 3) - 1;
  countEl.textContent = count.toLocaleString("en-US");
}

// 背景持续飘落
function spawnDrop() {
  const el = document.createElement("span");
  el.className = "drop";
  el.textContent = "676767";
  el.style.left = Math.random() * 100 + "%";
  el.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
  el.style.fontSize = (0.8 + Math.random() * 1.6).toFixed(2) + "rem";
  const dur = 6 + Math.random() * 8;
  el.style.animationDuration = dur + "s";
  el.style.animationDelay = -Math.random() * dur + "s";
  rain.appendChild(el);
  // 动画结束后移除，避免无限累积
  el.addEventListener("animationend", () => el.remove());
}

// 初始铺一层 + 定时补充
for (let i = 0; i < 40; i++) spawnDrop();
setInterval(spawnDrop, 350);

// 点击按钮：在 field 里爆发一批 676767
function burst(n, fullScreen) {
  for (let i = 0; i < n; i++) {
    const el = document.createElement("span");
    el.className = "pop";
    el.textContent = "676767";
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    el.style.color = color;
    el.style.fontSize = (1 + Math.random() * 2.2).toFixed(2) + "rem";

    let dx, dy;
    if (fullScreen) {
      // 全屏爆发：放到 body，随机落在任意位置
      dx = (Math.random() - 0.5) * 60 + "vw";
      dy = (Math.random() - 0.5) * 60 + "vh";
      el.style.position = "fixed";
      el.style.left = Math.random() * 100 + "vw";
      el.style.top = Math.random() * 100 + "vh";
      el.style.zIndex = "2";
      document.body.appendChild(el);
    } else {
      dx = (Math.random() - 0.5) * 400 + "px";
      dy = (Math.random() - 0.5) * 300 + "px";
      el.style.left = 50 + Math.random() * 40 - 20 + "%";
      el.style.top = Math.random() * 60 + "%";
      field.appendChild(el);
    }

    el.style.setProperty("--dx", dx);
    el.style.setProperty("--dy", dy);
    el.style.setProperty("--rot", (Math.random() * 720 - 360).toFixed(0) + "deg");
    el.addEventListener("animationend", () => el.remove());
  }
  updateCount();
}

spawnBtn.addEventListener("click", () => burst(12, false));
burstBtn.addEventListener("click", () => burst(60, true));

// 计数的数字也偶尔自己跳一下
setInterval(updateCount, 2000);

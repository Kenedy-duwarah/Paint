const canvas = document.getElementById("canvas"),
    decreaseBtn = document.getElementById("decrease"),
    increaseBtn = document.getElementById("increase"),
    sizeEL = document.getElementById("size"),
    colorEl = document.getElementById("color"),
    clearEl = document.getElementById("clear"),
    eraserBtn = document.getElementById("eraser"),
    saveBtn = document.getElementById("save"),
    circleBtn = document.getElementById("circle"),
    squareBtn = document.getElementById("square"),
    starBtn = document.getElementById("star"),
    backBtn = document.getElementById("back"),
    ctx = canvas.getContext("2d");
let size = 10,
    isPressed = !1,
    eraser = !1,
    color = colorEl.value,
    x, y, history = [],
    shape = "line";

function updateSizeOnScreen() { sizeEL.innerText = size }

function drawStar(e, t, c, s) { let r = Math.PI / s;
    ctx.moveTo(e + 1 * c, t + 0 * c); for (let a = 1; a <= s; a++) ctx.lineTo(e + c * Math.cos(a * r), t + c * Math.sin(a * r));
    ctx.closePath() }
canvas.addEventListener("mousedown", e => { isPressed = !0, x = e.offsetX, y = e.offsetY }), document.addEventListener("mouseup", e => { isPressed = !1, x = void 0, y = void 0 }), canvas.addEventListener("mousemove", e => { if (isPressed) { let t = e.offsetX,
            c = e.offsetY; if (eraser) ctx.clearRect(t - size / 2, c - size / 2, size, size);
        else { switch (ctx.strokeStyle = color, ctx.lineWidth = 2 * size, ctx.beginPath(), shape) {
                case "line":
                    ctx.moveTo(x, y), ctx.lineTo(t, c); break;
                case "circle":
                    ctx.arc(t, c, size, 0, 2 * Math.PI); break;
                case "square":
                    ctx.rect(t - size / 2, c - size / 2, size, size); break;
                case "star":
                    drawStar(t, c, size, 5) }
            ctx.stroke() }
        x = t, y = c, history.push({ x1: x, y1: y, x2: t, y2: c, color: color, size: size, eraser: eraser, shape: shape }) } }), decreaseBtn.addEventListener("click", () => {
    (size -= 5) < 5 && (size = 5), updateSizeOnScreen() }), increaseBtn.addEventListener("click", () => {
    (size += 5) > 50 && (size = 50), updateSizeOnScreen() }), colorEl.addEventListener("change", e => color = e.target.value), clearEl.addEventListener("click", () => { ctx.clearRect(0, 0, canvas.width, canvas.height), history = [] }), eraserBtn.addEventListener("click", () => { eraser = !eraser }), saveBtn.addEventListener("click", () => { let e = canvas.toDataURL(),
        t = document.createElement("a");
    t.href = e, t.download = "drawing.png", t.click() }), circleBtn.addEventListener("click", () => { shape = "circle" }), squareBtn.addEventListener("click", () => { shape = "square" }), starBtn.addEventListener("click", () => { shape = "star" }), backBtn.addEventListener("click", () => { history.length > 0 && (history.pop(), ctx.clearRect(0, 0, canvas.width, canvas.height), history.forEach(e => { switch (ctx.strokeStyle = e.color, ctx.lineWidth = 2 * e.size, ctx.beginPath(), e.shape) {
            case "line":
                ctx.moveTo(e.x1, e.y1), ctx.lineTo(e.x2, e.y2); break;
            case "circle":
                ctx.arc(e.x2, e.y2, e.size, 0, 2 * Math.PI); break;
            case "square":
                ctx.rect(e.x2 - e.size / 2, e.y2 - e.size / 2, e.size, e.size); break;
            case "star":
                drawStar(e.x2, e.y2, e.size, 5) }
        ctx.stroke() })) }), window.addEventListener("load", function() { setTimeout(function() { document.getElementById("pre-loader").style.display = "none", document.getElementById("content").style.display = "block" }, 3e3) });
const coords = { x: 0, y: 0 },
    circles = document.querySelectorAll(".circle"),
    colors = ["#ffb56b", "#fdaf69", "#f89d63", "#f59761", "#ef865e", "#ec805d", "#e36e5c", "#df685c", "#d5585c", "#d1525c", "#c5415d", "#c03b5d", "#b22c5e", "#ac265e", "#9c155f", "#950f5f", "#830060", "#7c0060", "#680060", "#60005f", "#48005f", "#3d005e"];

function animateCircles() { let e = coords.x,
        t = coords.y;
    circles.forEach(function(c, s) { c.style.left = e - 12 + "px", c.style.top = t - 12 + "px", c.style.scale = (circles.length - s) / circles.length, c.x = e, c.y = t; let r = circles[s + 1] || circles[0];
        e += (r.x - e) * .3, t += (r.y - t) * .3 }), requestAnimationFrame(animateCircles) }
circles.forEach(function(e, t) { e.x = 0, e.y = 0, e.style.backgroundColor = colors[t % colors.length] }), window.addEventListener("mousemove", function(e) { coords.x = e.clientX, coords.y = e.clientY }), animateCircles();
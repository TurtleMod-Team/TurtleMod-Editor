// engine/renderer.js

window.TurtleModRenderer = (() => {
  const Renderer = {};
  let canvas, ctx;

  Renderer.initStage = function (stageEl, workspace) {
    canvas = document.createElement("canvas");
    canvas.width = stageEl.clientWidth || 320;
    canvas.height = stageEl.clientHeight || 240;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    stageEl.appendChild(canvas);

    ctx = canvas.getContext("2d");
    drawBackground();

    window.addEventListener("resize", () => {
      canvas.width = stageEl.clientWidth;
      canvas.height = stageEl.clientHeight;
      drawBackground();
    });
  };

  function drawBackground() {
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#1f7a3a";
    ctx.font = "16px Inter, sans-serif";
    ctx.fillText("TurtleMod Stage", 10, 24);
  }

  return Renderer;
})();

// engine/blocks.js

window.TurtleModBlocks = (() => {
  const Blocks = {};

  const BLOCK_PALETTE = [
    { id: "tm_when_flag_clicked", label: "when green flag clicked", color: "#ffd500" },
    { id: "tm_move_10_steps", label: "move 10 steps", color: "#4c97ff" },
    { id: "tm_turn_15_deg", label: "turn 15 degrees", color: "#4c97ff" }
  ];

  Blocks.initSidebar = function (sidebarEl) {
    sidebarEl.innerHTML = `<h3 style="padding:8px 10px;margin:0;">Blocks</h3>`;
    BLOCK_PALETTE.forEach(block => {
      const div = document.createElement("div");
      div.textContent = block.label;
      div.dataset.blockId = block.id;
      div.style.background = block.color;
      div.style.color = "#fff";
      div.style.margin = "6px 8px";
      div.style.padding = "6px 8px";
      div.style.borderRadius = "6px";
      div.style.cursor = "grab";
      div.style.userSelect = "none";

      div.addEventListener("mousedown", e => {
        TurtleModWorkspace.spawnBlockFromPalette(block, e);
      });

      div.addEventListener("touchstart", e => {
        TurtleModWorkspace.spawnBlockFromPalette(block, e);
      });

      sidebarEl.appendChild(div);
    });
  };

  return Blocks;
})();

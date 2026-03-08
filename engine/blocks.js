// engine/blocks.js
//
// TurtleMod Block Palette
// Defines the blocks shown in the sidebar.
//

window.TurtleModBlocks = (() => {
  const Blocks = {};

  // ---------------------------------------------
  // BLOCK DEFINITIONS
  // ---------------------------------------------
  const BLOCK_PALETTE = [
    {
      category: "Events",
      color: "#FFD500",
      blocks: [
        { id: "tm_when_flag_clicked", label: "when green flag clicked" }
      ]
    },
    {
      category: "Motion",
      color: "#4C97FF",
      blocks: [
        { id: "tm_move_10_steps", label: "move 10 steps" },
        { id: "tm_turn_15_deg", label: "turn 15 degrees" }
      ]
    }
  ];

  // ---------------------------------------------
  // BUILD SIDEBAR
  // ---------------------------------------------
  Blocks.initSidebar = function (sidebarEl) {
    sidebarEl.innerHTML = "";

    BLOCK_PALETTE.forEach(section => {
      // Category title
      const title = document.createElement("h3");
      title.textContent = section.category;
      title.style.padding = "8px 10px";
      title.style.margin = "0";
      title.style.background = "#f0f0f0";
      title.style.borderBottom = "1px solid #ddd";
      sidebarEl.appendChild(title);

      // Blocks in this category
      section.blocks.forEach(block => {
        const div = document.createElement("div");
        div.textContent = block.label;
        div.dataset.blockId = block.id;

        Object.assign(div.style, {
          background: section.color,
          color: "#fff",
          margin: "6px 8px",
          padding: "6px 8px",
          borderRadius: "6px",
          cursor: "grab",
          userSelect: "none",
          fontSize: "14px"
        });

        // Drag from palette → workspace
        div.addEventListener("mousedown", e => {
          TurtleModWorkspace.spawnBlockFromPalette(block, e);
        });

        div.addEventListener("touchstart", e => {
          TurtleModWorkspace.spawnBlockFromPalette(block, e);
        });

        sidebarEl.appendChild(div);
      });
    });
  };

  return Blocks;
})();

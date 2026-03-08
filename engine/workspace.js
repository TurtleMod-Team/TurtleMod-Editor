// engine/workspace.js
//
// TurtleMod Workspace
// Manages block instances placed in the editor.
//

window.TurtleModWorkspace = (() => {
  const Workspace = {};
  let workspaceEl;
  let blocks = [];

  // ---------------------------------------------
  // Initialize workspace
  // ---------------------------------------------
  Workspace.init = function (el) {
    workspaceEl = el;
    workspaceEl.style.overflow = "hidden";

    return {
      getBlocks: () => blocks
    };
  };

  // ---------------------------------------------
  // Spawn a block from the palette
  // ---------------------------------------------
  Workspace.spawnBlockFromPalette = function (blockDef, mouseOrTouchEvent) {
    if (!workspaceEl) return;

    const blockEl = document.createElement("div");
    blockEl.textContent = blockDef.label;
    blockEl.className = "tm-block";

    Object.assign(blockEl.style, {
      position: "absolute",
      background: blockDef.color,
      color: "#fff",
      padding: "6px 10px",
      borderRadius: "8px",
      cursor: "grab",
      userSelect: "none",
      fontSize: "14px"
    });

    // Position where the user clicked
    const rect = workspaceEl.getBoundingClientRect();
    const clientX = mouseOrTouchEvent.touches
      ? mouseOrTouchEvent.touches[0].clientX
      : mouseOrTouchEvent.clientX;
    const clientY = mouseOrTouchEvent.touches
      ? mouseOrTouchEvent.touches[0].clientY
      : mouseOrTouchEvent.clientY;

    blockEl.style.left = clientX - rect.left + "px";
    blockEl.style.top = clientY - rect.top + "px";

    // Make draggable
    makeDraggable(blockEl);

    // Add to DOM
    workspaceEl.appendChild(blockEl);

    // Store block instance
    blocks.push({
      id: crypto.randomUUID(),
      def: blockDef,
      el: blockEl,
      x: clientX - rect.left,
      y: clientY - rect.top,
      next: null,
      parent: null,
      inputs: {}
    });
  };

  // ---------------------------------------------
  // Draggable behavior
  // ---------------------------------------------
  function makeDraggable(el) {
    let offsetX = 0;
    let offsetY = 0;
    let dragging = false;

    function startDrag(clientX, clientY) {
      dragging = true;
      const rect = el.getBoundingClientRect();
      offsetX = clientX - rect.left;
      offsetY = clientY - rect.top;
    }

    function moveDrag(clientX, clientY) {
      if (!dragging || !workspaceEl) return;
      const rect = workspaceEl.getBoundingClientRect();
      el.style.left = clientX - rect.left - offsetX + "px";
      el.style.top = clientY - rect.top - offsetY + "px";
    }

    function endDrag() {
      dragging = false;
    }

    // Mouse
    el.addEventListener("mousedown", e => {
      e.preventDefault();
      startDrag(e.clientX, e.clientY);
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });

    function onMouseMove(e) {
      moveDrag(e.clientX, e.clientY);
    }

    function onMouseUp() {
      endDrag();
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    // Touch
    el.addEventListener("touchstart", e => {
      const t = e.touches[0];
      startDrag(t.clientX, t.clientY);
    });

    el.addEventListener("touchmove", e => {
      const t = e.touches[0];
      moveDrag(t.clientX, t.clientY);
    });

    el.addEventListener("touchend", () => {
      endDrag();
    });
  }

  // ---------------------------------------------
  // Internal access
  // ---------------------------------------------
  Workspace._getInternalBlocks = () => blocks;

  return Workspace;
})();

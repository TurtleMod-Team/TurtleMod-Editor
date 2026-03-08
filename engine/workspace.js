// engine/workspace.js

window.TurtleModWorkspace = (() => {
  const Workspace = {};
  let workspaceEl;
  let blocks = [];

  Workspace.init = function (el) {
    workspaceEl = el;
    workspaceEl.style.overflow = "hidden";

    workspaceEl.addEventListener("mousedown", () => {
      // could clear selection later
    });

    return {
      getBlocks: () => blocks
    };
  };

  Workspace.spawnBlockFromPalette = function (blockDef, mouseOrTouchEvent) {
    if (!workspaceEl) return;

    const blockEl = document.createElement("div");
    blockEl.textContent = blockDef.label;
    blockEl.style.position = "absolute";
    blockEl.style.background = blockDef.color;
    blockEl.style.color = "#fff";
    blockEl.style.padding = "6px 10px";
    blockEl.style.borderRadius = "8px";
    blockEl.style.cursor = "grab";
    blockEl.style.userSelect = "none";

    const rect = workspaceEl.getBoundingClientRect();
    const clientX = mouseOrTouchEvent.touches
      ? mouseOrTouchEvent.touches[0].clientX
      : mouseOrTouchEvent.clientX;
    const clientY = mouseOrTouchEvent.touches
      ? mouseOrTouchEvent.touches[0].clientY
      : mouseOrTouchEvent.clientY;

    blockEl.style.left = clientX - rect.left + "px";
    blockEl.style.top = clientY - rect.top + "px";

    makeDraggable(blockEl);
    workspaceEl.appendChild(blockEl);

    blocks.push({
      def: blockDef,
      el: blockEl
    });

    if (window.TurtleModToolbar && window.TurtleModToolbar.setBlockCount) {
      TurtleModToolbar.setBlockCount(blocks.length);
    }
  };

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

  Workspace._getInternalBlocks = () => blocks;

  return Workspace;
})();

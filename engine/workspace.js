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

  Workspace.spawnBlockFromPalette = function (blockDef, mouseEvent) {
    if (!workspaceEl) return;

    const blockEl = document.createElement("div");
    blockEl.textContent = blockDef.label;
    blockEl.style.position = "absolute";
    blockEl.style.left = mouseEvent.clientX - workspaceEl.getBoundingClientRect().left + "px";
    blockEl.style.top = mouseEvent.clientY - workspaceEl.getBoundingClientRect().top + "px";
    blockEl.style.background = blockDef.color;
    blockEl.style.color = "#fff";
    blockEl.style.padding = "6px 10px";
    blockEl.style.borderRadius = "8px";
    blockEl.style.cursor = "grab";
    blockEl.style.userSelect = "none";

    makeDraggable(blockEl);
    workspaceEl.appendChild(blockEl);

    blocks.push({
      def: blockDef,
      el: blockEl
    });
  };

  function makeDraggable(el) {
    let offsetX = 0;
    let offsetY = 0;
    let dragging = false;

    el.addEventListener("mousedown", e => {
      dragging = true;
      const rect = el.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    });

    function onMove(e) {
      if (!dragging) return;
      const rect = workspaceEl.getBoundingClientRect();
      el.style.left = e.clientX - rect.left - offsetX + "px";
      el.style.top = e.clientY - rect.top - offsetY + "px";
    }

    function onUp() {
      dragging = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    }
  }

  return Workspace;
})();

// engine/editor.js

window.TurtleModEditor = (() => {
  const Editor = {};
  let workspaceHandle = null;

  Editor.init = function (rootId) {
    const root = document.getElementById(rootId);
    if (!root) {
      console.error("TurtleModEditor: root not found:", rootId);
      return;
    }

    // Layout: left = blocks, center = workspace, right = stage
    root.innerHTML = `
      <div id="tm-editor">
        <div id="tm-sidebar"></div>
        <div id="tm-workspace"></div>
        <div id="tm-stage"></div>
      </div>
    `;

    // Basic flex layout
    const style = document.createElement("style");
    style.textContent = `
      #tm-editor {
        display: grid;
        grid-template-columns: 260px 1fr 320px;
        grid-template-rows: 1fr;
        width: 100%;
        height: 100%;
      }
      #tm-sidebar {
        background: #f0faf3;
        border-right: 1px solid #c8e6d0;
        overflow: auto;
      }
      #tm-workspace {
        position: relative;
        background: #ffffff;
      }
      #tm-stage {
        background: #e8f7eb;
        border-left: 1px solid #c8e6d0;
      }
    `;
    document.head.appendChild(style);

    // Init subsystems
    TurtleModBlocks.initSidebar(document.getElementById("tm-sidebar"));
    workspaceHandle = TurtleModWorkspace.init(document.getElementById("tm-workspace"));
    TurtleModRenderer.initStage(document.getElementById("tm-stage"), workspaceHandle);

    // Hook runtime if present
    if (window.TurtleModRuntime && typeof window.TurtleModRuntime.init === "function") {
      window.TurtleModRuntime.init(workspaceHandle);
    }

    Editor.workspace = workspaceHandle;
    return workspaceHandle;
  };

  return Editor;
})();

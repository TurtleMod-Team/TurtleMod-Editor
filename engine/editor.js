// engine/editor.js
//
// TurtleMod Editor Core
// Updated to attach to #editor-root and initialize sidebar blocks
//

window.TurtleModEditor = (() => {
  const Editor = {};

  Editor.init = function (rootId) {
    const root = document.getElementById(rootId);
    if (!root) {
      console.error(`TurtleModEditor: #${rootId} not found`);
      return;
    }

    // Create main editor container
    const editor = document.createElement("div");
    editor.id = "tm-editor";

    Object.assign(editor.style, {
      width: "100%",
      height: "calc(100vh - 56px)", // below toolbar
      display: "flex",
      flexDirection: "row",
      overflow: "hidden",
      background: "#f4f7f4"
    });

    // Sidebar
    const sidebar = document.createElement("div");
    sidebar.id = "tm-sidebar";

    Object.assign(sidebar.style, {
      width: "240px",
      background: "#ffffff",
      borderRight: "1px solid #dcdcdc",
      overflowY: "auto"
    });

    // Initialize block palette in sidebar
    if (window.TurtleModBlocks) {
      TurtleModBlocks.initSidebar(sidebar);
    }

    // Workspace
    const workspace = document.createElement("div");
    workspace.id = "tm-workspace";

    Object.assign(workspace.style, {
      flex: "1",
      background: "#eef2ee",
      position: "relative",
      overflow: "hidden"
    });

    // Stage
    const stage = document.createElement("div");
    stage.id = "tm-stage";

    Object.assign(stage.style, {
      width: "360px",
      background: "#ffffff",
      borderLeft: "1px solid #dcdcdc",
      overflow: "hidden"
    });

    // Assemble editor layout
    editor.appendChild(sidebar);
    editor.appendChild(workspace);
    editor.appendChild(stage);

    // Insert editor into root
    root.appendChild(editor);

    console.log("TurtleModEditor initialized");
  };

  return Editor;
})();

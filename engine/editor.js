// engine/editor.js
//
// TurtleMod Editor Core
//

window.TurtleModEditor = (() => {
  const Editor = {};

  Editor.init = function (rootId) {
    const root = document.getElementById(rootId);
    if (!root) {
      console.error(`TurtleModEditor: #${rootId} not found`);
      return;
    }

    // ---------------------------------------------
    // MAIN EDITOR LAYOUT
    // ---------------------------------------------
    const editor = document.createElement("div");
    editor.id = "tm-editor";

    Object.assign(editor.style, {
      width: "100%",
      height: "calc(100vh - 56px)",
      display: "flex",
      flexDirection: "row",
      overflow: "hidden",
      background: "#f4f7f4"
    });

    // ---------------------------------------------
    // SIDEBAR (BLOCK PALETTE)
    // ---------------------------------------------
    const sidebar = document.createElement("div");
    sidebar.id = "tm-sidebar";

    Object.assign(sidebar.style, {
      width: "240px",
      background: "#ffffff",
      borderRight: "1px solid #dcdcdc",
      overflowY: "auto"
    });

    if (window.TurtleModBlocks) {
      TurtleModBlocks.initSidebar(sidebar);
    }

    // ---------------------------------------------
    // WORKSPACE (BLOCK AREA)
    // ---------------------------------------------
    const workspace = document.createElement("div");
    workspace.id = "tm-workspace";

    Object.assign(workspace.style, {
      flex: "1",
      background: "#eef2ee",
      position: "relative",
      overflow: "hidden"
    });

    // ---------------------------------------------
    // STAGE (RENDERER AREA)
    // ---------------------------------------------
    const stage = document.createElement("div");
    stage.id = "tm-stage";

    Object.assign(stage.style, {
      width: "360px",
      background: "#ffffff",
      borderLeft: "1px solid #dcdcdc",
      overflow: "hidden",
      position: "relative"
    });

    // ---------------------------------------------
    // BUILD EDITOR UI
    // ---------------------------------------------
    editor.appendChild(sidebar);
    editor.appendChild(workspace);
    editor.appendChild(stage);
    root.appendChild(editor);

    // ---------------------------------------------
    // INITIALIZE WORKSPACE ENGINE
    // ---------------------------------------------
    const workspaceEngine = TurtleModWorkspace.init(workspace);

    // ---------------------------------------------
    // INITIALIZE IO
    // ---------------------------------------------
    if (window.TurtleModIO) {
      TurtleModIO.init(workspaceEngine);
    }

    // ---------------------------------------------
    // INITIALIZE RUNTIME
    // ---------------------------------------------
    if (window.TurtleModRuntime) {
      TurtleModRuntime.init(workspaceEngine);
    }

    // ---------------------------------------------
    // INITIALIZE RENDERER (IMPORTANT)
    // ---------------------------------------------
    if (window.TurtleModRenderer) {
      TurtleModRenderer.initStage(stage);
    }

    // ---------------------------------------------
    // TOOLBAR COUNTER
    // ---------------------------------------------
    if (window.TurtleModToolbar && window.TurtleModToolbar.setBlockCount) {
      TurtleModToolbar.setBlockCount(workspaceEngine.getBlocks().length);
    }

    console.log("TurtleModEditor initialized");
  };

  return Editor;
})();

// engine/editor.js
//
// Main layout for the TurtleMod Editor.
// Updated to use a Snail IDE–style layout with TurtleMod green theme.
//

window.TurtleModEditor = (() => {
  const Editor = {};

  Editor.init = function () {
    const root = document.getElementById("tm-editor");
    if (!root) {
      console.error("TurtleModEditor: #tm-editor not found");
      return;
    }

    // -------------------------------
    // Apply SnailMod-Green Layout
    // -------------------------------
    Object.assign(root.style, {
      display: "grid",
      gridTemplateRows: "56px 1fr", // Snail-style tall top bar
      gridTemplateColumns: "260px 1fr 320px",
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      background: "#e8f5e9" // soft greenish background
    });

    // -------------------------------
    // Top Bar (Snail-style)
    // -------------------------------
    const topbar = document.createElement("div");
    topbar.id = "tm-topbar";

    Object.assign(topbar.style, {
      gridColumn: "1 / 4",
      gridRow: "1 / 2",
      background: "#1f7a3a", // dark TurtleMod green
      color: "white",
      display: "flex",
      alignItems: "center",
      padding: "0 16px",
      fontSize: "18px",
      fontWeight: "600",
      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      zIndex: 20
    });

    topbar.textContent = "TurtleMod Editor"; // Snail-style title placeholder

    root.appendChild(topbar);

    // -------------------------------
    // Sidebar (Snail-style card)
    // -------------------------------
    const sidebar = document.createElement("div");
    sidebar.id = "tm-sidebar";

    Object.assign(sidebar.style, {
      gridColumn: "1 / 2",
      gridRow: "2 / 3",
      background: "#ffffff",
      borderRight: "2px solid #c8e6d0",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      boxShadow: "2px 0 6px rgba(0,0,0,0.08)",
      zIndex: 10
    });

    // Sidebar header (Snail-style)
    const sidebarHeader = document.createElement("div");
    sidebarHeader.textContent = "Blocks";
    Object.assign(sidebarHeader.style, {
      background: "#1f7a3a",
      color: "white",
      padding: "10px 14px",
      fontSize: "16px",
      fontWeight: "600",
      borderBottom: "3px solid #4cce6a" // light green accent
    });

    sidebar.appendChild(sidebarHeader);

    // Container for blocks
    const sidebarContent = document.createElement("div");
    sidebarContent.id = "tm-sidebar-content";
    sidebarContent.style.flex = "1";
    sidebar.appendChild(sidebarContent);

    root.appendChild(sidebar);

    // -------------------------------
    // Workspace (Snail-style card)
    // -------------------------------
    const workspace = document.createElement("div");
    workspace.id = "tm-workspace";

    Object.assign(workspace.style, {
      gridColumn: "2 / 3",
      gridRow: "2 / 3",
      background: "#ffffff",
      margin: "12px",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      position: "relative",
      overflow: "hidden"
    });

    root.appendChild(workspace);

    // -------------------------------
    // Stage Panel (Snail-style card)
    // -------------------------------
    const stage = document.createElement("div");
    stage.id = "tm-stage";

    Object.assign(stage.style, {
      gridColumn: "3 / 4",
      gridRow: "2 / 3",
      background: "#ffffff",
      margin: "12px 12px 12px 0",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column"
    });

    root.appendChild(stage);

    // -------------------------------
    // Initialize subsystems
    // -------------------------------
    if (window.TurtleModBlocks) {
      TurtleModBlocks.initSidebar(sidebarContent);
    }

    if (window.TurtleModWorkspace) {
      const ws = TurtleModWorkspace.init(workspace);
      if (window.TurtleModRuntime) {
        TurtleModRuntime.init(ws);
      }
      if (window.TurtleModIO) {
        TurtleModIO.init(ws);
      }
    }

    if (window.TurtleModRenderer) {
      TurtleModRenderer.initStage(stage);
    }

    if (window.TurtleModToolbar) {
      TurtleModToolbar.init(); // attaches to top bar automatically
    }
  };

  return Editor;
})();

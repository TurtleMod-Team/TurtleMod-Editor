// engine/io.js
//
// Saving, loading, and exporting TurtleMod projects as JSON.
//

window.TurtleModIO = (() => {
  const IO = {};

  let workspaceRef = null;

  IO.init = function (workspace) {
    workspaceRef = workspace;
  };

  IO.exportProject = function () {
    if (!workspaceRef || !workspaceRef.getBlocks) return null;

    const blocksArr = workspaceRef.getBlocks();

    const blocks = blocksArr.map(b => {
      const rect = b.el.getBoundingClientRect();
      const parent = b.el.parentElement.getBoundingClientRect();

      return {
        id: b.def.id,
        label: b.def.label,
        color: b.def.color,
        x: rect.left - parent.left,
        y: rect.top - parent.top
      };
    });

    return {
      meta: {
        format: "turtlemod-project",
        version: 1
      },
      blocks
    };
  };

  IO.downloadProject = function () {
    const project = IO.exportProject();
    if (!project) return;

    const blob = new Blob([JSON.stringify(project, null, 2)], {
      type: "application/json"
    });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "turtlemod-project.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  IO.loadFromJSON = function (json) {
    if (!workspaceRef || !workspaceRef.getBlocks) return;
    const workspaceEl = document.getElementById("tm-workspace");
    if (!workspaceEl) return;

    const blocksArr = workspaceRef.getBlocks();
    blocksArr.forEach(b => b.el.remove());
    blocksArr.length = 0;

    if (!json.blocks) {
      if (window.TurtleModToolbar && window.TurtleModToolbar.setBlockCount) {
        TurtleModToolbar.setBlockCount(0);
      }
      return;
    }

    json.blocks.forEach(b => {
      const def = {
        id: b.id,
        label: b.label,
        color: b.color
      };

      const fakeEvent = {
        clientX: 0,
        clientY: 0
      };

      TurtleModWorkspace.spawnBlockFromPalette(def, fakeEvent);
      const last = workspaceRef.getBlocks()[workspaceRef.getBlocks().length - 1];
      last.el.style.left = b.x + "px";
      last.el.style.top = b.y + "px";
    });

    if (window.TurtleModToolbar && window.TurtleModToolbar.setBlockCount) {
      TurtleModToolbar.setBlockCount(workspaceRef.getBlocks().length);
    }
  };

  IO.openFilePicker = function () {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";

    input.addEventListener("change", () => {
      const file = input.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        try {
          const json = JSON.parse(reader.result);
          IO.loadFromJSON(json);
        } catch (e) {
          alert("Invalid TurtleMod project file.");
        }
      };
      reader.readAsText(file);
    });

    input.click();
  };

  IO.exportForUpload = function () {
    const project = IO.exportProject();
    if (!project) return;
    sessionStorage.setItem("turtlemod-project", JSON.stringify(project));
  };

  return IO;
})();

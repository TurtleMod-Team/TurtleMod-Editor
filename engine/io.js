// engine/io.js
//
// Saving, loading, and exporting TurtleMod projects as Scratch-style JSON.
//

window.TurtleModIO = (() => {
  const IO = {};

  let workspaceRef = null;

  IO.init = function (workspace) {
    workspaceRef = workspace;
  };

  // ---------------------------------------------
  // Block opcode mapping
  // ---------------------------------------------
  const OPCODES = {
    tm_when_flag_clicked: "event_whenflagclicked",
    tm_move_10_steps: "motion_movesteps",
    tm_turn_15_deg: "motion_turnright"
  };

  // ---------------------------------------------
  // Export project in Scratch JSON format
  // ---------------------------------------------
  IO.exportProject = function () {
    if (!workspaceRef || !workspaceRef.getBlocks) return null;

    const blocksArr = workspaceRef.getBlocks();
    const blockMap = {};

    blocksArr.forEach(b => {
      const rect = b.el.getBoundingClientRect();
      const parent = b.el.parentElement.getBoundingClientRect();

      const blockId = crypto.randomUUID();

      blockMap[blockId] = {
        opcode: OPCODES[b.def.id] || "unknown_block",
        next: null,
        parent: null,
        inputs: {},
        fields: {},
        topLevel: true,
        x: rect.left - parent.left,
        y: rect.top - parent.top
      };
    });

    // Scratch-style project wrapper
    return {
      meta: {
        semver: "3.0.0",
        vm: "TurtleMod",
        agent: "TurtleMod Editor"
      },
      targets: [
        {
          isStage: false,
          name: "Sprite1",
          blocks: blockMap,
          costumes: [],
          sounds: [],
          currentCostume: 0,
          visible: true,
          x: 0,
          y: 0,
          size: 100,
          direction: 90,
          draggable: false,
          rotationStyle: "all around"
        }
      ]
    };
  };

  // ---------------------------------------------
  // Download project as JSON
  // ---------------------------------------------
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

  // ---------------------------------------------
  // Load project (simple version)
  // ---------------------------------------------
  IO.loadFromJSON = function (json) {
    if (!workspaceRef || !workspaceRef.getBlocks) return;
    const workspaceEl = document.getElementById("tm-workspace");
    if (!workspaceEl) return;

    const blocksArr = workspaceRef.getBlocks();
    blocksArr.forEach(b => b.el.remove());
    blocksArr.length = 0;

    if (!json.targets || !json.targets[0] || !json.targets[0].blocks) return;

    const blocks = json.targets[0].blocks;

    Object.values(blocks).forEach(b => {
      const def = {
        id: Object.keys(OPCODES).find(k => OPCODES[k] === b.opcode),
        label: b.opcode,
        color: "#4c97ff"
      };

      const fakeEvent = { clientX: 0, clientY: 0 };
      TurtleModWorkspace.spawnBlockFromPalette(def, fakeEvent);

      const last = workspaceRef.getBlocks()[workspaceRef.getBlocks().length - 1];
      last.el.style.left = b.x + "px";
      last.el.style.top = b.y + "px";
    });
  };

  // ---------------------------------------------
  // Save for upload.html
  // ---------------------------------------------
  IO.exportForUpload = function () {
    const project = IO.exportProject();
    if (!project) return;
    sessionStorage.setItem("turtlemod-project", JSON.stringify(project));
  };

  return IO;
})();

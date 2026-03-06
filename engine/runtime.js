// engine/runtime.js
//
// Bridges TurtleMod's workspace → Snail IDE–style project JSON → Snail VM.
//

window.TurtleModRuntime = (() => {
  const Runtime = {};

  let workspaceRef = null;
  let running = false;

  // Map TurtleMod block IDs → Snail/Scratch opcodes
  const BLOCK_MAP = {
    tm_when_flag_clicked: "event_whenflagclicked",
    tm_move_10_steps: "motion_movesteps",
    tm_turn_15_deg: "motion_turnright"
  };

  // Simple default inputs for demo purposes
  const DEFAULT_INPUTS = {
    motion_movesteps: {
      STEPS: [1, "10"] // number input 10
    },
    motion_turnright: {
      DEGREES: [1, "15"]
    }
  };

  /* ---------------------------------------------- */
  /* Init                                           */
  /* ---------------------------------------------- */

  Runtime.init = function (workspace) {
    workspaceRef = workspace;
  };

  /* ---------------------------------------------- */
  /* Build Snail-style project JSON                 */
  /* ---------------------------------------------- */

  function buildProjectFromWorkspace() {
    if (!workspaceRef || !workspaceRef.getBlocks) {
      console.warn("TurtleModRuntime: workspaceRef missing or invalid");
      return null;
    }

    const blocksArr = workspaceRef.getBlocks();
    const blocksObj = {};
    const topBlocks = [];

    blocksArr.forEach((b, index) => {
      const def = b.def;
      const opcode = BLOCK_MAP[def.id];
      if (!opcode) return;

      const id = `TM_${index}_${def.id}`;
      const rect = b.el.getBoundingClientRect();
      const parentRect = b.el.parentElement.getBoundingClientRect();

      const x = rect.left - parentRect.left;
      const y = rect.top - parentRect.top;

      const blockData = {
        opcode,
        next: null,
        parent: null,
        inputs: DEFAULT_INPUTS[opcode] || {},
        fields: {},
        topLevel: true,
        x,
        y
      };

      blocksObj[id] = blockData;
      topBlocks.push(id);
    });

    // Link blocks linearly for now (simple stack)
    for (let i = 0; i < topBlocks.length - 1; i++) {
      const currentId = topBlocks[i];
      const nextId = topBlocks[i + 1];
      blocksObj[currentId].next = nextId;
    }

    const project = {
      targets: [
        {
          isStage: true,
          name: "Stage",
          variables: {},
          lists: {},
          broadcasts: {},
          blocks: blocksObj,
          currentCostume: 0,
          costumes: [],
          sounds: [],
          volume: 100
        }
      ],
      meta: {
        semver: "3.0.0",
        vm: "snail",
        agent: "TurtleMod"
      }
    };

    return project;
  }

  /* ---------------------------------------------- */
  /* Run / Stop                                     */
  /* ---------------------------------------------- */

  Runtime.run = async function () {
    if (!window.SnailIDE || !window.SnailIDE.vm) {
      console.error("TurtleModRuntime: SnailIDE.vm not found");
      return;
    }

    const project = buildProjectFromWorkspace();
    if (!project) return;

    running = true;

    try {
      await window.SnailIDE.vm.loadProject(project);
      window.SnailIDE.vm.greenFlag();
    } catch (e) {
      console.error("TurtleModRuntime: failed to load/run project", e);
    }
  };

  Runtime.stop = function () {
    if (!window.SnailIDE || !window.SnailIDE.vm) return;
    running = false;
    if (window.SnailIDE.vm.stopAll) {
      window.SnailIDE.vm.stopAll();
    }
  };

  return Runtime;
})();

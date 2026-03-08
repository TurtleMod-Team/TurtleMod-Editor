// engine/renderer.js
//
// TurtleMod WebGL Renderer Wrapper
// Uses ScratchRender (WebGL) from scratch-render.
//

window.TurtleModRenderer = (() => {
  const Renderer = {};
  let renderer = null;
  let stageElement = null;

  /**
   * Initialize the stage renderer.
   * This creates the WebGL renderer used by the VM.
   */
  Renderer.initStage = function (stageEl) {
    stageElement = stageEl;

    // Create the WebGL renderer
    renderer = new ScratchRender(stageEl);

    // Initial size
    resizeRenderer();

    // Resize when the stage container changes
    window.addEventListener("resize", resizeRenderer);
  };

  /**
   * Resize the renderer to match the stage element.
   */
  function resizeRenderer() {
    if (!renderer || !stageElement) return;

    const width = stageElement.clientWidth;
    const height = stageElement.clientHeight;

    renderer.resize(width, height);
  }

  /**
   * Expose the renderer instance so snailvm.js can attach it.
   */
  Renderer.getRenderer = function () {
    return renderer;
  };

  return Renderer;
})();

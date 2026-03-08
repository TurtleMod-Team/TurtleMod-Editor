// engine/snailvm.js
//
// Creates and configures the Snail‑IDE VM instance for TurtleMod.
// Attaches: Renderer, Storage, SVG Renderer, Audio, Video.
// Exposes: window.SnailIDE.vm
//

window.SnailIDE = window.SnailIDE || {};

(function () {
  // Ensure Scratch VM exists
  if (typeof VirtualMachine === "undefined") {
    console.error("TurtleMod: VirtualMachine is not defined. Did you load the VM bundle?");
    return;
  }

  // Create VM instance
  const vm = new VirtualMachine();

  // ---------------------------------------------
  // STORAGE (required for costumes, sounds, SVGs)
  // ---------------------------------------------
  const storage = new ScratchStorage();
  vm.attachStorage(storage);

  // ---------------------------------------------
  // SVG RENDERER (required for vector costumes)
  // ---------------------------------------------
  const svgRenderer = new ScratchSVGRenderer();
  vm.attachV2SVGAdapter(svgRenderer);

  // ---------------------------------------------
  // RENDERER (WebGL) from TurtleModRenderer
  // ---------------------------------------------
  if (window.TurtleModRenderer && TurtleModRenderer.getRenderer) {
    const renderer = TurtleModRenderer.getRenderer();
    if (renderer) {
      vm.attachRenderer(renderer);
    } else {
      console.warn("TurtleMod: Renderer not ready yet.");
    }
  }

  // ---------------------------------------------
  // AUDIO ENGINE (optional)
  // ---------------------------------------------
  if (window.TurtleModIO && TurtleModIO.getAudioEngine) {
    const audio = TurtleModIO.getAudioEngine();
    if (audio) vm.attachAudioEngine(audio);
  }

  // ---------------------------------------------
  // VIDEO PROVIDER (optional)
  // ---------------------------------------------
  if (window.TurtleModIO && TurtleModIO.getVideoProvider) {
    const video = TurtleModIO.getVideoProvider();
    if (video) vm.setVideoProvider(video);
  }

  // ---------------------------------------------
  // EDITOR MODE (optional but recommended)
  // ---------------------------------------------
  if (vm.setInEditor) {
    vm.setInEditor(true);
  }

  // ---------------------------------------------
  // START VM TICK LOOP
  // ---------------------------------------------
  vm.start();

  // Expose globally
  window.SnailIDE.vm = vm;

  console.log("TurtleMod: Snail VM initialized and attached.");
})();

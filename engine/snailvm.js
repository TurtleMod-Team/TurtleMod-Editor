// engine/snailvm.js

window.SnailIDE = window.SnailIDE || {};

(function () {
  const vm = new VirtualMachine();

  // Attach renderer (if you have one)
  if (window.TurtleModRenderer && TurtleModRenderer.renderer) {
    vm.attachRenderer(TurtleModRenderer.renderer);
  }

  // Attach audio engine
  if (window.TurtleModIO && TurtleModIO.audio) {
    vm.attachAudioEngine(TurtleModIO.audio);
  }

  // Attach video provider
  if (window.TurtleModIO && TurtleModIO.video) {
    vm.setVideoProvider(TurtleModIO.video);
  }

  vm.start();

  window.SnailIDE.vm = vm;
})();

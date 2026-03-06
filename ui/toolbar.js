// ui/toolbar.js
//
// Simple top toolbar: Run, Stop, Save, Load, Upload.
//

window.TurtleModToolbar = (() => {
  const Toolbar = {};

  Toolbar.init = function () {
    const bar = document.createElement("div");
    bar.id = "tm-toolbar";
    bar.innerHTML = `
      <button data-action="run">Run</button>
      <button data-action="stop">Stop</button>
      <button data-action="save">Save</button>
      <button data-action="load">Load</button>
      <button data-action="upload">Upload</button>
    `;

    Object.assign(bar.style, {
      position: "absolute",
      top: "8px",
      left: "8px",
      zIndex: 30,
      display: "flex",
      gap: "6px"
    });

    Array.from(bar.querySelectorAll("button")).forEach(btn => {
      btn.style.padding = "4px 10px";
      btn.style.borderRadius = "6px";
      btn.style.border = "1px solid #c8e6d0";
      btn.style.background = "#ffffff";
      btn.style.cursor = "pointer";
      btn.style.fontSize = "0.85rem";
    });

    bar.addEventListener("click", e => {
      if (e.target.tagName !== "BUTTON") return;
      const action = e.target.dataset.action;

      if (action === "run") {
        window.TurtleModRuntime && TurtleModRuntime.run();
      } else if (action === "stop") {
        window.TurtleModRuntime && TurtleModRuntime.stop();
      } else if (action === "save") {
        window.TurtleModIO && TurtleModIO.downloadProject();
      } else if (action === "load") {
        window.TurtleModIO && TurtleModIO.openFilePicker();
      } else if (action === "upload") {
        if (window.TurtleModIO) {
          TurtleModIO.exportForUpload();
          window.location.href = "upload.html";
        }
      }
    });

    document.body.appendChild(bar);
  };

  return Toolbar;
})();

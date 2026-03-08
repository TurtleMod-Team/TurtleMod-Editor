// ui/toolbar.js
//
// SnailMod-Green Toolbar
// Corrected to attach inside #editor-root (your actual HTML structure)
// No dependency on #tm-topbar
//

window.TurtleModToolbar = (() => {
  const Toolbar = {};

  Toolbar.init = function () {
    const root = document.getElementById("editor-root");
    if (!root) {
      console.error("TurtleModToolbar: #editor-root not found");
      return;
    }

    // Create toolbar container
    const bar = document.createElement("div");
    bar.id = "tm-toolbar";

    Object.assign(bar.style, {
      width: "100%",
      height: "56px",
      background: "#1f7a3a",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 16px",
      boxSizing: "border-box",
      fontFamily: "Inter, sans-serif",
      userSelect: "none"
    });

    // -----------------------------
    // LEFT: Menus
    // -----------------------------
    const left = document.createElement("div");
    Object.assign(left.style, {
      display: "flex",
      alignItems: "center",
      gap: "18px"
    });

    const menuNames = ["File", "Edit", "Addons", "Settings"];
    menuNames.forEach(name => {
      const btn = document.createElement("button");
      btn.textContent = name;

      Object.assign(btn.style, {
        background: "transparent",
        border: "none",
        color: "white",
        padding: "0",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500"
      });

      btn.dataset.menu = name.toLowerCase();
      left.appendChild(btn);
    });

    // -----------------------------
    // CENTER: Project Name Input
    // -----------------------------
    const middle = document.createElement("div");
    Object.assign(middle.style, {
      display: "flex",
      alignItems: "center",
      flex: "1",
      justifyContent: "center"
    });

    const projectInput = document.createElement("input");
    projectInput.type = "text";
    projectInput.placeholder = "Untitled TurtleMod Project";

    Object.assign(projectInput.style, {
      minWidth: "240px",
      maxWidth: "360px",
      padding: "5px 10px",
      borderRadius: "6px",
      border: "none",
      outline: "none",
      fontSize: "14px",
      color: "#1f7a3a",
      background: "#ffffff",
      boxShadow: "0 0 4px rgba(0,0,0,0.15)"
    });

    middle.appendChild(projectInput);

    // -----------------------------
    // RIGHT: Actions + Block Counter + Sign-in/Join
    // -----------------------------
    const right = document.createElement("div");
    Object.assign(right.style, {
      display: "flex",
      alignItems: "center",
      gap: "12px"
    });

    const makeWhiteButton = (label) => {
      const btn = document.createElement("button");
      btn.textContent = label;

      Object.assign(btn.style, {
        background: "#ffffff",
        border: "none",
        borderRadius: "4px",
        padding: "4px 12px",
        fontSize: "13px",
        cursor: "pointer",
        color: "#1f7a3a",
        fontWeight: "500",
        boxShadow: "0 1px 3px rgba(0,0,0,0.15)"
      });

      return btn;
    };

    const seePageBtn = makeWhiteButton("See Project Page");
    seePageBtn.dataset.action = "see-page";

    const uploadBtn = makeWhiteButton("Upload");
    uploadBtn.dataset.action = "upload";

    const blocksCounter = document.createElement("span");
    blocksCounter.id = "tm-block-count";
    blocksCounter.textContent = "0 blocks";

    Object.assign(blocksCounter.style, {
      fontSize: "13px",
      opacity: "0.9"
    });

    // SIGN IN / JOIN — TurtleMod-Green Gradient
    const authBtn = document.createElement("button");
    authBtn.textContent = "Sign in / Join";
    authBtn.dataset.action = "auth";

    Object.assign(authBtn.style, {
      background: "linear-gradient(90deg, #1f7a3a, #4cce6a)",
      border: "none",
      borderRadius: "20px",
      padding: "6px 16px",
      fontSize: "13px",
      cursor: "pointer",
      color: "white",
      fontWeight: "600",
      boxShadow: "0 2px 4px rgba(0,0,0,0.25)"
    });

    // Append right-side items in correct Snail IDE order
    right.appendChild(seePageBtn);
    right.appendChild(uploadBtn);
    right.appendChild(blocksCounter);
    right.appendChild(authBtn); // LAST item

    // -----------------------------
    // Assemble toolbar
    // -----------------------------
    bar.appendChild(left);
    bar.appendChild(middle);
    bar.appendChild(right);

    // Insert toolbar at the top of editor-root
    root.prepend(bar);

    // -----------------------------
    // Actions
    // -----------------------------
    bar.addEventListener("click", e => {
      const action = e.target.dataset.action;
      if (!action) return;

      if (action === "upload") {
        if (window.TurtleModIO) {
          TurtleModIO.exportForUpload();
          window.location.href = "upload.html";
        }
      } else if (action === "see-page") {
        console.log("See Project Page clicked");
      } else if (action === "auth") {
        console.log("Sign in / Join clicked");
      }
    });

    // -----------------------------
    // Block counter updater
    // -----------------------------
    Toolbar.setBlockCount = function (n) {
      const el = document.getElementById("tm-block-count");
      if (el) el.textContent = `${n} block${n === 1 ? "" : "s"}`;
    };
  };

  return Toolbar;
})();

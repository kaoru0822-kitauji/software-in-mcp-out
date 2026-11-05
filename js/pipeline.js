/* Figure 1: the build loop. Click a step to show what it did in the FreeCAD build; toggle the memory-only ablation. */
(function () {
  "use strict";

  /* ---------------- Figure 1: the pipeline ---------------- */
  var STAGES = {
    1: {
      title: "Analyze",
      when: "Minutes 0–3 · 16 tool calls",
      what: "Read what the package is: which executables and libraries it ships, what they link against, and what they export. The goal is a short list of places where an outside program could take control.",
      run: [
        "Read the manifest: three Debian packages, 63 ELF files, their hashes and the launch command.",
        "Listed REA's 207 tools and picked the ones it would need: Frida sessions, script loading, binary inspection.",
        "Found that the console binary, <code>freecadcmd-python3</code>, links <code>libpython3.11</code> dynamically, so the whole CPython C API is reachable from inside the process."
      ],
      quote: { min: "3.1", text: "frida-node 17.23.2 works, and FreeCAD links <code>libpython3.11.so.1.0</code> dynamically. Now the critical runtime experiment: can a Frida thread acquire the GIL while FreeCADCmd's REPL blocks on stdin?" },
      mem: "REA and the target files are withheld, so there is nothing to inspect."
    },
    2: {
      title: "Look up / try",
      when: "Minutes 3–15.8 · 101 tool calls, 30 through REA",
      what: "Learn how the software behaves, from its documentation where that exists and from experiments on the running program. Documentation is off in all our runs. Each experiment is a small script injected into the live process.",
      run: [
        "Eleven probe scripts, then a series of REA sessions: a live inventory of object types and properties, the module APIs, end-to-end modelling, and a final run of every operation it planned to expose.",
        "Worked out how to keep FreeCAD alive and controllable, which exports exist, which exchange functions crash, and where imports land. Each finding changed the design (Figure 3)."
      ],
      quote: { min: "3.7", text: "FreeCADCmd exits immediately when stdin is a non-tty pipe. I need a PTY wrapper (<code>script</code>) to keep the REPL blocked." },
      mem: "FreeCAD cannot run, so whatever the agent believes about it stays untested."
    },
    3: {
      title: "Build",
      when: "Minutes 15.8–16.1 · 7 tool calls",
      what: "Write the MCP server from what was observed. The agent chooses the tools, their names and their schemas. Arguments must be data, never code.",
      run: [
        "<code>agent.js</code> (21.8 KB) runs inside FreeCAD and performs each operation through the CPython C API.",
        "<code>server.js</code> (15.0 KB) speaks MCP over stdio, starts FreeCAD under a PTY, attaches to it and forwards each call.",
        "19 tools: documents, objects, properties, placement, booleans, STEP, IGES, BREP and STL export and import, and meshing."
      ],
      quote: { min: "15.8", text: "Evidence collection is complete. Now writing the production agent — the runtime instrumentation layer implementing all tool operations via the CPython C API inside the target." },
      mem: "The server is written from the model's memory of FreeCAD's API."
    },
    4: {
      title: "Check & refine",
      when: "Minutes 16.1–18.3 · 28 tool calls",
      what: "Test the server the way a client will use it, against the real program, and fix what breaks. No benchmark task is involved: the agent writes its own end-to-end workflow.",
      run: [
        "Its own MCP client made 34 calls through a full create, edit, boolean, save, export and re-import workflow, and the server handled every one correctly.",
        "The image build caught a permissions problem in the base image, which runs as uid 1000. The agent changed the launcher, rebuilt, and passed the smoke test: 19 tools, no argument that accepts code, stdout carrying only JSON-RPC.",
        "It checked that every FreeCAD name in its code traces back to a recorded observation, tightened one error message, re-ran the end-to-end test and rebuilt the image."
      ],
      quote: { min: "16.8", text: "Smoke test passed: initialize echoed <code>2024-11-05</code>, all 19 tools listed, static interface check clean (<code>code_interfaces: []</code>), stdout carries only JSON-RPC." },
      mem: "It can still build the image and list its tools, but no call ever reaches a real FreeCAD."
    }
  };

  var pipe = document.getElementById("fig-pipe");
  var detail = document.getElementById("stage-detail");
  var current = 1;
  var mode = "rea";

  function renderStage() {
    var s = STAGES[current];
    var html = '<div class="sd-head"><span class="sd-num">' + current + '</span><span class="sd-title">' + s.title + '</span><span class="sd-when">' + s.when + '</span></div>';
    html += '<p>' + s.what + '</p>';
    if (mode === "rea") {
      html += '<p class="sd-label">In the FreeCAD build</p><ul>';
      s.run.forEach(function (r) { html += '<li>' + r + '</li>'; });
      html += '</ul>';
      html += '<div class="quote">\u201c' + s.quote.text + '\u201d<cite>GLM-5.3, minute ' + s.quote.min + ' of the build</cite></div>';
    } else {
      html += '<p class="sd-mem"><b>Memory only:</b> ' + s.mem + '</p>';
    }
    detail.innerHTML = html;
    pipe.querySelectorAll(".stage").forEach(function (g) {
      var on = Number(g.getAttribute("data-stage")) === current;
      g.classList.toggle("is-active", on);
      g.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  pipe.querySelectorAll(".stage").forEach(function (g) {
    function pick() { current = Number(g.getAttribute("data-stage")); renderStage(); }
    g.addEventListener("click", pick);
    g.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); }
    });
  });
  pipe.querySelectorAll(".seg button").forEach(function (b) {
    b.addEventListener("click", function () {
      mode = b.getAttribute("data-mode");
      pipe.classList.toggle("mem", mode === "mem");
      pipe.querySelectorAll(".seg button").forEach(function (o) { o.setAttribute("aria-pressed", o === b ? "true" : "false"); });
      renderStage();
    });
  });
  renderStage();


})();

/* Figure 12: the six steps inside one Fruit Ninja slice call. */
(function () {
  "use strict";

  /* ---------------- Figure 12: Fruit Ninja slice pipeline ---------------- */
  var FN = {
    1: { title: "Frames", text: "Each <code>clearRect</code> closes a frame. A 320×320 sprite drawn outside a clip is a fruit, a sprite under a clip is a sliced half, and the fuse-shaped <code>fillRect</code> marks a bomb.", quote: { who: "reading the game code, minute 1", text: "<code>fillRect</code> during play is only in drawBomb" } },
    2: { title: "Tracks", text: "Greedy nearest-neighbour matching with a 170 px gate links each object to the previous frame and keeps up to 26 samples per track. Objects that stop being drawn are dropped at once." },
    3: { title: "Fit", text: "A least-squares fit of position over time, using the game's own gravity <code>g = H × 1.03</code>, gives each fruit's velocity and its path for the next second.", quote: { who: "turn 89, tuning with practice rounds", text: "the velocity fit returns velocity at the <em>start</em> of the sample window" } },
    4: { title: "Plan", text: "Starting near the bottom centre, it chains the nearest fruit, solves when the blade can reach each one, and skips any segment that passes too close to a predicted bomb. A chain held 3 to 13 fruit, 6.9 on average." },
    5: { title: "Execute", text: "The chain becomes one native mouse path, capped at 4800 px/s and 1 second, with a minimum time per segment.", quote: { who: "turn 97, tuning with practice rounds", text: "the executor's CDP latency (~40 ms/move) stretches short paths" } },
    6: { title: "Observe", text: "It waits 60 ms, observes the page again, and returns the new score to the player model." }
  };
  var fnDetail = document.getElementById("fn-detail");
  var fnButtons = document.querySelectorAll("[data-fn]");
  function renderFn(k) {
    var s = FN[k];
    var h = '<div class="sd-head"><span class="sd-num">' + k + '</span><span class="sd-title">' + s.title + '</span></div><p>' + s.text + '</p>';
    if (s.quote) h += '<div class="quote">“' + s.quote.text + '”<cite>DeepSeek V4.1 Flash, ' + s.quote.who + '</cite></div>';
    fnDetail.innerHTML = h;
    fnButtons.forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-fn") === String(k) ? "true" : "false"); });
  }
  fnButtons.forEach(function (b) {
    b.addEventListener("click", function () { renderFn(Number(b.getAttribute("data-fn"))); });
  });
  renderFn(1);
})();

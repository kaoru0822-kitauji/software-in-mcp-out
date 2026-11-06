/* Figure 5: run videos, one tab per task. */
(function () {
  "use strict";

  /* ---------------- Figure 5: run videos ---------------- */
  var VIDEOS = {
    enclosure: { src: "media/enclosure.mp4", poster: "media/enclosure.jpg", stat: "MCP 18/21 in 16 min · computer use 2/21 in 47 min", label: "the enclosure task" },
    lid: { src: "media/lid-vents.mp4", poster: "media/lid-vents.jpg", stat: "MCP 13/13 in 4 min · computer use 2/13 in 40 min", label: "the lid-vent task" },
    plate: { src: "media/board-plate.mp4", poster: "media/board-plate.jpg", stat: "Both 9/9 · the MCP run used 4.9× fewer tokens", label: "the board-plate task" }
  };
  var video = document.getElementById("vid");
  var vidStat = document.getElementById("vid-stat");
  document.querySelectorAll("[data-vid]").forEach(function (b) {
    b.addEventListener("click", function () {
      var v = VIDEOS[b.getAttribute("data-vid")];
      video.pause();
      video.poster = v.poster;
      video.src = v.src;
      video.setAttribute("aria-label", "Kimi K2.6 on " + v.label + ", computer use on the left and its own MCP on the right");
      vidStat.textContent = v.stat;
      document.querySelectorAll("[data-vid]").forEach(function (o) { o.setAttribute("aria-pressed", o === b ? "true" : "false"); });
    });
  });


})();

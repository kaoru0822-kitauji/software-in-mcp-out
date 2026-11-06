# Software In, MCP Out

Static blog post. No build step and no dependencies besides Google Fonts.

```
index.html          the post
css/style.css       layout, light and dark themes
js/pipeline.js      Figure 1, the clickable build loop
js/timeline.js      Figure 2, the build timeline
js/video.js         Figure 5, run videos (one tab per task)
js/charts.js        Figures 6 and 7, the score charts
media/*.mp4         computer use vs MCP runs (Kimi K2.6), sped up
media/*.jpg         video posters
```

Preview locally:

```sh
python3 -m http.server 8000
# open http://localhost:8000/
```

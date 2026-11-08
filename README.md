# Software In, MCP Out

Static blog post. No build step and no dependencies besides Google Fonts.

```
index.html          the post
css/style.css       layout, light and dark themes
js/pipeline.js      Figure 1, the clickable build loop
js/timeline.js      Figure 2, the build timeline
js/video.js         Figure 5, run videos (one tab per task)
js/charts.js        Figures 6 and 7, the score charts
js/fruit.js         Figure 12, the Fruit Ninja slice pipeline
media/*.mp4         computer use vs MCP runs (FreeCAD with Kimi K2.6; Fruit Ninja with DeepSeek V4.1 Flash)
media/*.jpg         video posters
```

Preview locally:

```sh
python3 -m http.server 8000
# open http://localhost:8000/
```

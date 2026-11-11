# Blind Computer Use

Static blog post. No build step and no dependencies besides Google Fonts.

```
index.html          the post
css/style.css       layout, light and dark themes
js/pipeline.js      Figure 1, the clickable build loop
js/timeline.js      Figure 2, the build timeline
js/charts.js        Figures 4 and 6, the score charts
js/video.js         Figure 5, the run videos with one tab per task
media/v6/*.mp4      computer use vs MCP runs used by the current post (FreeCAD with Kimi K2.6; Fruit Ninja with DeepSeek V4.1 Flash)
media/v6/*.jpg      video posters
media/*.mp4, *.jpg  videos and posters used by v4/ and v5/
v5/, v4/            previous versions of the post, linked from the footer; they share media/
```

Preview locally:

```sh
python3 -m http.server 8000
# open http://localhost:8000/
```

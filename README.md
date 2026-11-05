# Software In, MCP Out

Static blog post. No build step and no dependencies besides Google Fonts.

```
index.html        the post
css/style.css     layout, light and dark themes
js/pipeline.js    Figure 1, the clickable build loop
js/timeline.js    Figure 2, the build timeline
js/charts.js      Figures 6 and 7, the score charts
```

Preview locally:

```sh
python3 -m http.server 8000
# open http://localhost:8000/
```

To publish, copy the folder into a static site (for example `blog/software-in-mcp-out/` on GitHub Pages).

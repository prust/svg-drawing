# SVG Drawing

You can play with this online at http://prust.github.com/svg-drawing.

This is a *very* simple drawing app that I wrote in a few evenings & mornings. The first evening I had my six-year-old son sitting next to me and testing it as I created it.

It supports drawing a series of straight lines (no curves) and -- if you complete a shape by connecting with the start point -- it will automatically fill in the shape. It snaps to a grid, but does allow you to draw outside the grid (just not above it). You can undo with Ctrl+Z and create a new shape with the New Shape button.

## Known Bugs

There is one known bug: occasionally when clicking, the click doesn't register (doesn't add a point). I haven't been able to reproduce it consistently enough to know exactly why. I tried changing my click handler from the `svg` element to the `document` element, but that didn't fix the problem.

## Drawing Functionality Ideas

There are many things this little app lacks:

1. **The ability to save your work**. I had envisioned a simple text box so that you could give your drawing (a few shapes) a name. It would be saved to local storage via Backbone and Backbone's localStorage plugin. You would also need to be able to flip between drawings, perhaps with a Bootstrap drop-down.
2. **The ability to make a line curved**. For this, I had envisioned a simple UI like being able to click on a line to toggle which way it curved or being able to drag it, but it wouldn't allow a discrete amount of curvedness, but would rather snap to different amounts.
3. **The ability to draw circles and ellipses**. It's easy enough to do squares, rectangles and triangles, but it's impossible to draw circles and ellipses and even with the above ability to create a curved line, it would be a pain.
4. **The ability to edit** (via selecting a shape or a point and dragging it).
5. **The ability to change the granularity of grid snapping** or turn it off.

## Code Cleanup

Instead of explicitly creating the SVGShape and SVGLine instances (views that wrap the models), I would like them to auto-create in response to a Backbone.Collection `add` event and instead of manually calling `update()` on them, I would like for them to auto-update in response to a Backbone.Model `change` event (essentially just introducing and using Backbone).

I would also like to include Bootstrap and convert the button & color picker to bootstrap.

## Future Directions

My goal in making this little app was to be able to create custom sprites (trees, rocks, houses, roads, spaceships, etc) for a separate app or mode that I envisioned that would allow you to build maps. That, in turn, would be used for another app or mode that would allow you to play multiplayer games online (via a simple nodejs server for syncing).

I realize there are a lot of game engines available -- and even a lot of Javascript game engines. I've played with some of them a bit, but never got excited about any of them. My goal here was to create an open-source project for fun (the joy of creating; in spite of the fact that hundreds of people have written game engines and the vast majority of them will probably be better than mine) and also to create a game engine that makes sense to a web developer:

* Using jQuery and the DOM Elements instead of a bitmap/canvas approach
* Using Underscore and Backbone
* Using an event-driven approach instead of the traditional "game loop"

Not that this is a superior approach to create a game engine (it probably isn't), but it is familiar to web developers and makes game creation more accessible and fun for them.

Another thing that is important to me is extensibility -- creating a really open, customizable framework instead of a single game, that exposes all the power one might need for creating a variety of kinds of games. I thought it would be really cool to allow end-users to create sprites and maps and perhaps even write their own event handlers to further customize gameplay. This necessitates a well-abstracted, clean and simple API.

And lastly, the most fun games for me are multiplayer, so I hope to someday allow both playing offline (solo) and playing with others online (via a nodejs server that would allow you to choose a nickname and then start a new game session with any number of other online users who have chosen nicknames and are not yet in an active game).

Anyway, those are my ideas. We'll see if they happen someday. In the meantime, enjoy this little app!
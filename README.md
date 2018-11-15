# webgl-stats

Keep tracks of the number of WebGL calls on your application by hooking the WebGL1 and WebGL2 APIs:
* DrawCalls:
  * DrawArrays
  * DrawArraysInstanced
  * DrawElements
  * DrawElementsInstanced
* numFaces
* numVertices
* numPoints
* useProgram
* bindTextures

## Installation

### NPM

Install via NPM:
```
npm install --save webgl-stats
```

Then import to use it:
```javascript
import WEBGLSTATS from 'webgl-stats';
```

or

```javascript
WEBGLSTATS = require('webgl-stats');
```

### Browser

```html
  <script src="unpkg.com/webgl-stats@0.2.0/dist/webgl-stats.js"></script>
```

## Usage

`webgl-stats` will hook the WebGL1 and WebGL2 automatically, but you should provide your context once you have created it in your app, and before you start using it:

```javascript
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

WEBGLSTATS.setupExtensions(ctx);
```

On every frame you should call `frameStart` before your render call and `frameEnd` after that.

```javascript
function animate() {
  requestAnimationFrame( animate );
  WEBGLSTATS.frameStart();
  render();
  WEBGLSTATS.frameEnd();
  showStats();
}
```

After that you could query the current frame data or the accumulated stats:

* `getCurrentData()`:
```json
{
  "numDrawCalls": 0,

  "numDrawArraysCalls": 0,
  "numDrawArraysInstancedCalls": 0,
  "numDrawElementsCalls": 0,
  "numDrawElementsInstancedCalls": 0,

  "numUseProgramCalls": 0,
  "numFaces": 0,
  "numVertices": 0,
  "numPoints": 0,
  "numBindTextures": 0
}
```

* `getSummary()`:
```json
{
  "drawCalls": {
    "min": 0,
    "max": 0,
    "avg": 0,
    "standard_deviation": 0
  },
  "useProgramCalls": {
    "min": 0,
    "max": 0,
    "avg": 0,
    "standard_deviation": 0
  },
  "faces": {
    "min": 0,
    "max": 0,
    "avg": 0,
    "standard_deviation": 0
  },
  "vertices": {
    "min": 0,
    "max": 0,
    "avg": 0,
    "standard_deviation": 0
  },
  "bindTextures": {
    "min": 0,
    "max": 0,
    "avg": 0,
    "standard_deviation": 0
  }
}
```

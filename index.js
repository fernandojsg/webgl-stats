import Stats from 'incremental-stats-lite';

'use strict';

function WebGLStats () {

  var data = {
    numDrawCalls: 0,

    numDrawArraysCalls:0,
    numDrawArraysInstancedCalls:0,
    numDrawElementsCalls:0,
    numDrawElementsInstancedCalls: 0,

    numUseProgramCalls:0,
    numFaces:0,
    numVertices:0,
    numPoints:0,
    numBindTextures:0
  }

  var stats = {
    drawCalls: new Stats(),
    useProgramCalls: new Stats(),
    faces: new Stats(),
    vertices: new Stats(),
    bindTextures: new Stats()
  };

  function frameEnd() {
    for (let stat in stats) {
      var counterName = 'num' + stat.charAt(0).toUpperCase() + stat.slice(1);
      stats[stat].update(data[counterName]);
    }
  }

  function _h ( f, c ) {
    return function () {
        c.apply( this, arguments );
        f.apply( this, arguments );
    };
  }
  
  if ('WebGL2RenderingContext' in window) {
    WebGL2RenderingContext.prototype.drawArraysInstanced = _h( WebGL2RenderingContext.prototype.drawArraysInstanced, function () {
      data.numDrawArraysInstancedCalls++;
      data.numDrawCalls++;
      if ( arguments[ 0 ] == this.POINTS ) data.numPoints += arguments[ 2 ];
      else data.numVertices += arguments[ 2 ];
    });

    WebGL2RenderingContext.prototype.drawElementsInstanced = _h( WebGL2RenderingContext.prototype.drawElementsInstanced, function () {
      data.numDrawElementsInstancedCalls++;
      data.numDrawCalls++;
      if ( arguments[ 0 ] == this.POINTS ) data.numPoints += arguments[ 2 ];
      else data.numVertices += arguments[ 2 ];
    });

    WebGL2RenderingContext.prototype.drawArrays = _h( WebGL2RenderingContext.prototype.drawArrays, function () {
      data.numDrawArraysCalls++;
      data.numDrawCalls++;
      if ( arguments[ 0 ] == this.POINTS ) data.numPoints += arguments[ 2 ];
      else data.numVertices += arguments[ 2 ];
    } );
    
    WebGL2RenderingContext.prototype.drawElements = _h( WebGL2RenderingContext.prototype.drawElements, function () {
      data.numDrawElementsCalls++;
      data.numDrawCalls++;
      data.numFaces += arguments[ 1 ] / 3;
      data.numVertices += arguments[ 1 ];
    } );
    
    WebGL2RenderingContext.prototype.useProgram = _h( WebGL2RenderingContext.prototype.useProgram, function () {
      data.numUseProgramCalls++;
    } );
    
    WebGL2RenderingContext.prototype.bindTexture = _h( WebGL2RenderingContext.prototype.bindTexture, function () {
      data.numBindTextures++;
    } );
  
  }

  
  WebGLRenderingContext.prototype.drawArrays = _h( WebGLRenderingContext.prototype.drawArrays, function () {
    data.numDrawArraysCalls++;
    data.numDrawCalls++;
    if ( arguments[ 0 ] == this.POINTS ) data.numPoints += arguments[ 2 ];
    else data.numVertices += arguments[ 2 ];
  } );
  
  WebGLRenderingContext.prototype.drawElements = _h( WebGLRenderingContext.prototype.drawElements, function () {
    data.numDrawElementsCalls++;
    data.numDrawCalls++;
    data.numFaces += arguments[ 1 ] / 3;
    data.numVertices += arguments[ 1 ];
  } );
  
  WebGLRenderingContext.prototype.useProgram = _h( WebGLRenderingContext.prototype.useProgram, function () {
    data.numUseProgramCalls++;
  } );
  
  WebGLRenderingContext.prototype.bindTexture = _h( WebGLRenderingContext.prototype.bindTexture, function () {
    data.numBindTextures++;
  } );
  
  function frameStart () {
    data.numDrawCalls = 0;
    data.numDrawArraysCalls = 0;
    data.numDrawArraysInstancedCalls = 0;
    data.numDrawElementsCalls = 0;
    data.numDrawElementsInstancedCalls = 0;
    data.numUseProgramCalls = 0;
    data.numFaces = 0;
    data.numVertices = 0;
    data.numPoints = 0;
    data.numBindTextures = 0;
  }

  function isWebGLContext(ctx) {
    return (ctx instanceof WebGLRenderingContext) || (window.WebGL2RenderingContext && (ctx instanceof WebGL2RenderingContext));
  }

  function setupExtensions(context) {
    if (!isWebGLContext(context)) {
      console.warn("WEBGL-STATS: Provided context is not WebGL");
      return;
    }

    var ext = context.getExtension('ANGLE_instanced_arrays');
    if (!ext) {
      return;
    }
    ext.drawArraysInstancedANGLE = _h( ext.drawArraysInstancedANGLE, function () {
      data.numDrawArraysInstancedCalls++;
      data.numDrawCalls++;
      if ( arguments[ 0 ] == this.POINTS ) data.numPoints += arguments[ 2 ];
      else data.numVertices += arguments[ 2 ];
    });
  
    ext.drawElementsInstancedANGLE = _h( ext.drawElementsInstancedANGLE, function () {
      data.numDrawElementsInstancedCalls++;
      data.numDrawCalls++;
      if ( arguments[ 0 ] == this.POINTS ) data.numPoints += arguments[ 2 ];
      else data.numVertices += arguments[ 2 ];
    });
  }

  function getSummary() {
    var result = {};
    Object.keys(stats).forEach(key => {
      result[key] = {
        min: stats[key].min,
        max: stats[key].max,
        avg: stats[key].mean,
        standard_deviation: stats[key].standard_deviation
      };
    });
    return result;
  }
  
  return {
    getCurrentData: () => {return data;},
    setupExtensions: setupExtensions,
    getSummary: getSummary,
    frameStart: frameStart,
    frameEnd: frameEnd
    
    //enable: enable,
    //disable: disable
  }
}

export default WebGLStats();
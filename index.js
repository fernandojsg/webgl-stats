'use strict';

module.exports = WebGLStats;

function WebGLStats () {

  var data = {
    totalDrawCalls: 0,
    totalDrawArraysCalls:0,
    totalDrawElementsCalls:0,
    totalUseProgramCalls:0,
    totalFaces:0,
    totalVertices:0,
    totalPoints:0,
    totalBindTexures:0
  }

  function _h ( f, c ) {
    return function () {
        c.apply( this, arguments );
        f.apply( this, arguments );
    };
  }

  WebGLRenderingContext.prototype.drawArrays = _h( WebGLRenderingContext.prototype.drawArrays, function () {
      data.totalDrawArraysCalls++;
      data.totalDrawCalls++;
      if ( arguments[ 0 ] == this.POINTS ) data.totalPoints += arguments[ 2 ];
      else data.totalVertices += arguments[ 2 ];
  } );

  WebGLRenderingContext.prototype.drawElements = _h( WebGLRenderingContext.prototype.drawElements, function () {
      data.totalDrawElementsCalls++;
      data.totalDrawCalls++;
      data.totalFaces += arguments[ 1 ] / 3;
      data.totalVertices += arguments[ 1 ];
  } );

  WebGLRenderingContext.prototype.useProgram = _h( WebGLRenderingContext.prototype.useProgram, function () {
      data.totalUseProgramCalls++;
  } );

  WebGLRenderingContext.prototype.bindTexture = _h( WebGLRenderingContext.prototype.bindTexture, function () {
      data.totalBindTexures++;
  } );

  function reset () {
    data.totalDrawCalls = 0;
    data.totalDrawArraysCalls = 0;
    data.totalDrawElementsCalls = 0;
    data.totalUseProgramCalls = 0;
    data.totalFaces = 0;
    data.totalVertices = 0;
    data.totalPoints = 0;
    data.totalBindTexures = 0;
  }

  return {
    startFrame: startFrame,
    data: data
    //enable: enable,
    //disable: disable
  }
}
// Forked from https://github.com/webpack/webpack/blob/master/lib/ids/NamedChunkIdsPlugin.js
'use strict';

const { compareChunksNatural } = require('webpack/lib/util/comparators');
const {
  getLongChunkName,
  assignNames,
  getUsedChunkIds,
  assignAscendingChunkIds,
  requestToId,
  getShortModuleName,
} = require('webpack/lib/ids/IdHelpers');

/** @typedef {import("../Chunk")} Chunk */
/** @typedef {import("../Compiler")} Compiler */
/** @typedef {import("../Module")} Module */

class CustomNamedChunkIdsPlugin {
  constructor(options) {
    this.delimiter = (options && options.delimiter) || '$';
    this.context = options && options.context;
  }

  /**
   * Apply the plugin
   * @param {Compiler} compiler the compiler instance
   * @returns {void}
   */
  apply(compiler) {
    compiler.hooks.compilation.tap('CustomNamedChunkIdsPlugin', (compilation) => {
      compilation.hooks.chunkIds.tap('CustomNamedChunkIdsPlugin', (chunks) => {
        const chunkGraph = compilation.chunkGraph;
        const context = this.context ? this.context : compiler.context;
        const delimiter = this.delimiter;

        const unnamedChunks = assignNames(
          Array.from(chunks).filter((chunk) => {
            if (chunk.name) {
              chunk.id = chunk.name;
              chunk.ids = [chunk.name];
            }
            return chunk.id === null;
          }),
          (chunk) => customGetShortChunkName(chunk, chunkGraph, context, delimiter, compiler.root),
          (chunk) => getLongChunkName(chunk, chunkGraph, context, delimiter, compiler.root),
          compareChunksNatural(chunkGraph),
          getUsedChunkIds(compilation),
          (chunk, name) => {
            chunk.id = name;
            chunk.ids = [name];
          }
        );

        if (unnamedChunks.length > 0) {
          assignAscendingChunkIds(unnamedChunks, compilation);
        }
      });
    });
  }
}

/**
 * @param {Chunk} chunk the chunk
 * @param {ChunkGraph} chunkGraph the chunk graph
 * @param {string} context context directory
 * @param {string} delimiter delimiter for names
 * @param {Object=} associatedObjectForCache an object to which the cache will be attached
 * @returns {string} short chunk name
 */
const customGetShortChunkName = (chunk, chunkGraph, context, delimiter, associatedObjectForCache) => {
  const modules = chunkGraph.getChunkRootModules(chunk);
  const shortModuleNames = modules
    .map((m) => requestToId(getShortModuleName(m, context, associatedObjectForCache)))
    .map((m) => {
      const chunkName = /p-([a-z-]*)/.exec(m)[1];
      console.log('Short Chunk Name:', chunkName);
      return chunkName;
    }); // extract component name from something like: porsche-design-system.components_dist_esm_p-banner_entry_js.848dce0f7bfd1fde6bd3.js

  chunk.idNameHints.sort();
  const chunkName = Array.from(chunk.idNameHints).concat(shortModuleNames).filter(Boolean).join(delimiter);
  return chunkName;
};

module.exports = CustomNamedChunkIdsPlugin;

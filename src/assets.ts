/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AssetType, defineAssets } from '@iwsdk/core';
import {
  createGallerySet,
  createSideboardSet,
} from './scene-assets/decor.scene-asset.js';
import {
  createGraphiteCube,
  createGraphiteGem,
  createGraphiteKnot,
  createGraphiteRing,
  createPlinth,
  createStage,
  createStudioFloor,
} from './scene-assets/studio.scene-asset.js';

export default defineAssets({
  'studio-floor': createStudioFloor(),
  stage: createStage(),
  plinth: createPlinth(),
  'graphite-cube': createGraphiteCube(),
  'graphite-gem': createGraphiteGem(),
  'graphite-knot': createGraphiteKnot(),
  'graphite-ring': createGraphiteRing(),
  'gallery-set': createGallerySet(),
  'sideboard-set': createSideboardSet(),
});
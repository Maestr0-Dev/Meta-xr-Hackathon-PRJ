/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineComponents, createComponent, Types } from '@iwsdk/core';
import { Robot } from './robot-component.js';

export const Blocker = createComponent('Blocker', {
  size: { type: Types.Vec3, default: [1, 1, 1] },
  opacity: { type: Types.Float32, default: 1 },
  className: { type: Types.String, default: 'screen' },
});

export default defineComponents([Robot, Blocker]);

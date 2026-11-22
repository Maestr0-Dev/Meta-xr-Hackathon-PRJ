/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { World } from '@iwsdk/core';
import projectOptions from 'virtual:iwsdk-project';
import { PanelSystem } from './panel.js';
import { RobotSystem } from './robot.js';
import { BlockerSystem } from './blocker-system.js';
import { HandPinchSystem } from './hand-pinch-system.js';
import * as THREE from 'three';
import { Blocker } from './components.js';

World.create(
  document.getElementById('scene-container') as HTMLDivElement,
  projectOptions,
).then((world) => {
  world.registerSystem(RobotSystem);
  world.registerSystem(PanelSystem);
  world.registerSystem(BlockerSystem);
  world.registerSystem(HandPinchSystem);

  // Spawn test cube and set up event logging on XR session start
  const xr = world.renderer?.xr;
  if (xr) {
    xr.addEventListener('sessionstart', () => {
      console.log('TEST CUBE SPAWNED');
      const cubeEntity = world.createTransformEntity();
      cubeEntity.object3D?.position?.set(0, 0.15, -1.5);
      cubeEntity.object3D?.scale?.set(0.3, 0.3, 0.3);
      const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const cube = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
      cubeEntity.object3D?.add(cube);
      // No Blocker component - this is just a debug visual cube at Z=-3
      cubeEntity.object3D?.position?.set(0, 0.15, -3);

      // Log select start/end events with input source type
      const session = (xr as any).session;
      if (session) {
        const logSelectEvent = (event: Event, type: string) => {
          const inputSource = (event as any).inputSource;
          const sourceType = inputSource?.handedness || inputSource?.pointerId || 'unknown';
          console.log(`${type}: ${sourceType}`);
        };
        session.addEventListener('selectstart', (e: Event) => logSelectEvent(e, 'SELECT START'));
        session.addEventListener('selectend', (e: Event) => logSelectEvent(e, 'SELECT END'));
      }

      // Log scene data the session exposes (planes, meshes, labels)
      const scene = world.scene;
      const meshes = scene?.children ? scene.children.length : 0;
      const hasPlaneMeshes = scene?.children?.some((c: any) => c.type === 'Plane' || (c.geometry && c.geometry.type === 'plane'));
      const labelNodes = scene?.children?.filter((c: any) => c.name && c.name.includes('label')) || [];
      if (meshes > 0 && hasPlaneMeshes) {
        console.log(`Scene data: ${meshes} meshes, plane(s) present, ${labelNodes.length} label node(s)`);
      } else {
        console.log('NO SCENE DATA');
      }
    });
  }
});
import { createSystem } from '@iwsdk/core';
import { Blocker } from './components.js';
import * as THREE from 'three';

type Point = { x: number; y: number };

export class HandPinchSystem extends createSystem({
  active: { required: [] },
}) {
  private rectangle: Point[] = [];
  private dragging = false;

  init(): void {
    const canvas = document.body;

    canvas.addEventListener('pointerdown', (e: PointerEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      this.dragging = true;
      this.rectangle = [{ x: e.clientX, y: e.clientY }, { x: e.clientX, y: e.clientY }];
    });

    canvas.addEventListener('pointermove', (e: PointerEvent) => {
      if (!this.dragging) return;
      e.preventDefault();
      this.rectangle[1] = { x: e.clientX, y: e.clientY };
    });

    canvas.addEventListener('pointerup', (e: PointerEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      this.dragging = false;
      this.createBlockerFromRectangle();
    });
  }

  private createBlockerFromRectangle(): void {
    if (this.rectangle.length < 2) return;

    const [start, end] = this.rectangle;
    const width = Math.max(Math.abs(end.x - start.x) / 50, 0.5);
    const height = Math.max(Math.abs(end.y - start.y) / 50, 0.5);

    const entity = this.world.createTransformEntity();
    entity.object3D?.position?.set(0, 1.6, -1);
    entity.object3D?.scale?.set(width, height, 0.1);

    // Use getVectorView to write to the Vec3 field properly
    const sizeView = entity.getVectorView(Blocker, 'size') as Float32Array;
    sizeView[0] = width;
    sizeView[1] = height;
    sizeView[2] = 0.1;

    // Add a visible red cube mesh
    const geometry = new THREE.BoxGeometry(width, height, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material);
    entity.object3D?.add(cube);

    entity.setValue(Blocker, 'opacity', 0.8);
    entity.setValue(Blocker, 'className', 'blocker');

    console.log('BLOCKER SPAWNED at Z=-1, size:', [width, height, 0.1]);
  }
}
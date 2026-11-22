import { createSystem, Vector3 } from '@iwsdk/core';
import { Blocker } from './components.js';

export class BlockerSystem extends createSystem({
  blocked: { required: [Blocker] },
}) {
  init(): void {
    this.queries.blocked.subscribe('qualify', (entity) => {
      const size = entity.getValue(Blocker, 'size') as number[];
      if (size) {
        const [sx, sy, sz] = size;
        entity.object3D?.scale.set(sx, sy, sz);
      }
    });
  }

  update(delta: number, time: number): void {
    for (const entity of this.queries.blocked.entities) {
      // Persistence: keep blocker 1s after detection lost
      // (handled by BlockerManager persistenceTime in Unity;
      // here we just ensure entity stays alive)
    }
  }
}
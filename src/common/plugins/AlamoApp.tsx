import { registerPlugin } from '@capacitor/core';
import { AlamoAppPlugin } from './definitions';

const AlamoApp = registerPlugin<AlamoAppPlugin>('AlamoApp', {
  web: () => import('./AlamoAppWeb').then((m) => new m.AlamoAppWeb()),
});

export * from './definitions';
export { AlamoApp };

import { WebPlugin } from '@capacitor/core';
import { AppInfo, AlamoAppPlugin } from './definitions';

export class AlamoAppWeb extends WebPlugin implements AlamoAppPlugin {
  constructor() {
    super();
  }

  exitApp(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  openSettings(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  enableLocationServices(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }
  unsetBackButtonListeners(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  attachBackButtonListener(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }
  async getInfo(): Promise<AppInfo> {
    throw this.unimplemented('Not implemented on web.');
  }
}

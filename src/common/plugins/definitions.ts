import { PluginListenerHandle } from '@capacitor/core';

export interface AppInfo {
  /**
   * The name of the app.
   */
  name: string;

  /**
   * The identifier of the app.
   * On iOS it's the Bundle Identifier.
   * On Android it's the Application ID
   *
   * @since 1.0.0
   */
  id: string;

  /**
   * The build version.
   * On iOS it's the CFBundleVersion.
   * On Android it's the versionCode.
   */
  build: string;

  /**
   * The app version.
   * On iOS it's the CFBundleShortVersionString.
   * On Android it's package's versionName.
   *
   * @since 1.0.0
   */
  version: string;
}

export interface BackButtonListenerEvent {
  /**
   * Indicates whether the browser can go back in history.
   * False when the history stack is on the first entry.
   *
   */
  canGoBack: boolean;
}
export type BackButtonListener = (event: BackButtonListenerEvent) => void;

export interface AlamoAppPlugin {
  /**
   * Force exit the app. This should only be used in conjunction with the `backButton` handler for Android to
   * exit the app when navigation is complete.
   *
   * Ionic handles this itself so you shouldn't need to call this if using Ionic.
   */
  exitApp(): Promise<void>;

  unsetBackButtonListeners(): Promise<void>;

  attachBackButtonListener(): Promise<void>;

  /**
   * Return information about the app.
   */
  getInfo(): Promise<AppInfo>;
  /**
   * Open native settings screens for Android and iOS
   */
  openSettings(): Promise<void>;
  /**
   * Open the native Location services screen for Android
   */
  enableLocationServices(): Promise<void>;

  /**
   * Listen for the hardware back button event (Android only). Listening for this event will disable the
   * default back button behaviour, so you might want to call `window.history.back()` manually.
   * If you want to close the app, call `App.exitApp()`.
   *
   */
  addListener(
    eventName: 'backButton',
    listenerFunc: BackButtonListener,
  ): Promise<PluginListenerHandle>;

   /**
   * Listen for when the app or the activity are paused.
   *
   * On iOS it's fired when the native [UIApplication.didEnterBackgroundNotification](https://developer.apple.com/documentation/uikit/uiapplication/1623071-didenterbackgroundnotification) event gets fired.
   * On Android it's fired when the Capacitor's Activity [onPause](https://developer.android.com/reference/android/app/Activity#onPause()) method gets called.
   * On Web it's fired when the document's visibilitychange gets fired and document.hidden is true.
   */
   addListener(
    eventName: 'pause',
    listenerFunc: () => void,
  ): Promise<PluginListenerHandle>;

  /**
   * Listen for when the app or activity are resumed.
   *
   * On iOS it's fired when the native [UIApplication.willEnterForegroundNotification](https://developer.apple.com/documentation/uikit/uiapplication/1622944-willenterforegroundnotification) event gets fired.
   * On Android it's fired when the Capacitor's Activity [onResume](https://developer.android.com/reference/android/app/Activity#onResume()) method gets called,
   * but only after resume has fired first.
   * On Web it's fired when the document's visibilitychange gets fired and document.hidden is false.

   */
  addListener(
    eventName: 'resume',
    listenerFunc: () => void,
  ): Promise<PluginListenerHandle>;


  /**
   * Remove all native listeners for this plugin
   */
  removeAllListeners(): Promise<void>;
}

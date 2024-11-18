package io.ionic.starter

import android.app.Application
import io.ionic.portals.PortalManager
import timber.log.Timber

class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        PortalManager.register(BuildConfig.apiKey)
//        if (BuildConfig.DEBUG) {
            Timber.plant(Timber.DebugTree())
//        }
    }

}
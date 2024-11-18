package io.ionic.starter.plugins

import android.content.Intent
import android.net.Uri
import androidx.activity.OnBackPressedCallback
import androidx.core.content.pm.PackageInfoCompat
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.getcapacitor.util.InternalUtils
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import android.provider.Settings
import timber.log.Timber

@CapacitorPlugin(name = "AlamoApp")
class AlamoAppPlugin : Plugin() {

    val callback: OnBackPressedCallback = object : OnBackPressedCallback(true) {
        override fun handleOnBackPressed() {
            if (!hasListeners(EVENT_BACK_BUTTON)) {
                if (bridge.webView.canGoBack()) {
                    bridge.webView.goBack()
                }
            } else {
                val data = JSObject()
                data.put("canGoBack", bridge.webView.canGoBack())
                notifyListeners(EVENT_BACK_BUTTON, data, true)
                bridge.triggerJSEvent("backbutton", "document")
            }
        }
    }
    private var hasPausedEver = false
    override fun load() {
        activity.onBackPressedDispatcher.addCallback(activity, callback)
    }

    @PluginMethod
    fun getInfo(call: PluginCall) {
        val data = JSObject()
        try {
            val packageInfo = InternalUtils.getPackageInfo(
                context.packageManager, context.packageName
            )
            val applicationInfo = context.applicationInfo
            val stringId = applicationInfo.labelRes
            val appName =
                if (stringId == 0) applicationInfo.nonLocalizedLabel.toString() else context.getString(
                    stringId
                )
            data.put("name", appName)
            data.put("id", packageInfo.packageName)
            data.put("build", PackageInfoCompat.getLongVersionCode(packageInfo).toInt().toString())
            data.put("version", packageInfo.versionName)
            call.resolve(data)
        } catch (ex: Exception) {
            call.reject("Unable to get App Info")
        }
    }

    @PluginMethod
    fun openSettings(call: PluginCall) {
        val intent = Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
        val uri = Uri.fromParts("package", context.packageName, null)
        intent.setData(uri)
        context.startActivity(intent)
        call.resolve()
    }

    @PluginMethod
    fun enableLocationServices(call: PluginCall) {
        val locationIntent = Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS)
        context.startActivity(locationIntent)
        call.resolve()
    }

    @PluginMethod
    fun unsetBackButtonListeners(call: PluginCall) {
        removeBackButtonCallback()
        call.resolve()
    }

    @PluginMethod
    fun exitApp(call: PluginCall) {
        removeBackButtonCallback()
        call.resolve()
        getBridge().activity.finish()
    }

    @PluginMethod
    fun attachBackButtonListener(call: PluginCall) {
        CoroutineScope(Dispatchers.Main).launch {
            activity.onBackPressedDispatcher.addCallback(activity, callback)
        }

        call.resolve()
    }

    override fun handleOnDestroy() {
        removeBackButtonCallback()
    }

    override fun handleOnPause() {
        super.handleOnPause()
        hasPausedEver = true
        notifyListeners(EVENT_PAUSE, null)
    }


    override fun handleOnResume() {
        super.handleOnResume()
        if (hasPausedEver) {
            notifyListeners(EVENT_RESUME, null)
        }
    }

    private fun removeBackButtonCallback() {
        CoroutineScope(Dispatchers.Main).launch {
            callback.remove()
        }
    }

    companion object {
        const val EVENT_BACK_BUTTON: String = "backButton"
        const val EVENT_PAUSE: String = "pause"
        const val EVENT_RESUME: String = "resume"
    }
}
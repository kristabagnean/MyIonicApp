package io.ionic.starter

import android.R
import android.animation.Animator
import android.animation.AnimatorListenerAdapter
import android.os.Bundle
import android.view.View
import android.webkit.WebView
import com.getcapacitor.WebViewListener
import io.ionic.portals.Portal
import io.ionic.portals.PortalFragment

class FadePortalFragment : PortalFragment {
    private var fadeView: View? = null

    private var duration: Long = 500
    private var colorResource = R.color.white

    constructor() : super() {
        addFadeListener()
    }

    constructor(portal: Portal?) : super(portal) {
        addFadeListener()
    }

    private fun addFadeListener() {
        addWebViewListener(object : WebViewListener() {
            override fun onPageLoaded(webView: WebView) {
                fadeView!!.animate()
                    .alpha(0f)
                    .setDuration(duration)
                    .setListener(object : AnimatorListenerAdapter() {
                        override fun onAnimationEnd(animation: Animator) {
                            fadeView!!.visibility = View.GONE
                        }
                    })
            }
        })
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        if (bridge != null) {
            this.fadeView = View(activity)
            fadeView!!.id = View.generateViewId()

            fadeView!!.layoutParams = bridge!!.webView.layoutParams
            fadeView!!.setBackgroundResource(colorResource)
            bridge!!.webView.addView(fadeView, 0)
            fadeView!!.bringToFront()
        }
    }

    fun getDuration(): Long {
        return duration
    }

    fun setDuration(duration: Long) {
        this.duration = duration
    }

    fun getColorResource(): Int {
        return colorResource
    }

    fun setColorResource(colorResource: Int) {
        this.colorResource = colorResource
        fadeView!!.setBackgroundResource(this.colorResource)
    }

    companion object {
        @JvmOverloads
        fun newInstance(
            startDir: String?,
            colorResource: Int = R.color.white,
            duration: Long = 500
        ): FadePortalFragment {
            val fragment = FadePortalFragment()
            fragment.duration = duration
            fragment.colorResource = colorResource
            return fragment
        }
    }
}
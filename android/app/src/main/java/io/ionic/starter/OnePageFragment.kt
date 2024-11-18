package io.ionic.starter

import android.graphics.Color
import android.os.Bundle
import android.os.Handler
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.WebView
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.lifecycle.ViewModelProvider
import com.getcapacitor.WebViewListener
import com.google.gson.Gson
import io.ionic.portals.PortalFragment
import io.ionic.portals.PortalManager
import io.ionic.portals.PortalsPlugin
import io.ionic.portals.PortalsPubSub
import io.ionic.portals.SubscriptionResult
import io.ionic.starter.databinding.OnePageFragmentBinding
import io.ionic.starter.models.Location
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import timber.log.Timber

class OnePageFragment : PortalFragment() {
    private val sharedViewModel: MainSharedViewModel by activityViewModels()
    private var _binding: OnePageFragmentBinding? = null
    private val binding get() = _binding!!
    private val pubSub = PortalsPubSub()
    private var refSubBack = -1
    private var refSubItemSelected = -1

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?,
    ): View {
        _binding = OnePageFragmentBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        addPortalSubscriber()
        val initialContext = HashMap<String, String>()
        initialContext["startingRoute"] = "/tabs/location"
        val portal = PortalManager.newPortal("my_portal")
            .setStartDir("public")
            .setInitialContext(initialContext)
            // .setPortalFragmentType(FadePortalFragment::class.java)
            .addPluginInstance(PortalsPlugin(pubSub))
            .create()
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        (activity as MainActivity).supportActionBar?.hide()
        val initialContext = HashMap<String, String>()
        initialContext["startingRoute"] = "/tabs/location"
        try {
            val portal = PortalManager.getPortal(PORTAL_NAME)
            portal.setInitialContext(initialContext)
            val portalFragment = PortalFragment(portal)
            childFragmentManager.beginTransaction()
                .replace(R.id.my_portal, portalFragment, FRAGMENT_TAG)
                .commit()
        } catch (e: Exception) {
            val portal = PortalManager.newPortal(PORTAL_NAME)
                .setStartDir("public")
                .setInitialContext(initialContext)
                // .setPortalFragmentType(FadePortalFragment::class.java)
                .addPluginInstance(PortalsPlugin(pubSub))
                .create()
            val portalFragment = PortalFragment(portal)
            childFragmentManager.beginTransaction()
                .add(R.id.my_portal, portalFragment, FRAGMENT_TAG)
                .commit()
        }
    }

    override fun onResume() {
        super.onResume()
        (childFragmentManager.findFragmentByTag(FRAGMENT_TAG) as PortalFragment?)?.getBridge()?.webView?.setBackgroundColor(Color.RED)
    }
    private fun addPortalSubscriber() {
        refSubBack = pubSub.subscribe("navigate:back") {
            CoroutineScope(Dispatchers.Main).launch {
                sharedViewModel.backButtonLiveEvent.value = Unit
            }
        }
        refSubItemSelected =
            pubSub.subscribe("item:select") { subscriptionResult: SubscriptionResult ->
                val data = subscriptionResult.data.toString()
                val location = Gson().fromJson(data, Location::class.java)
                CoroutineScope(Dispatchers.Main).launch {
                    sharedViewModel.selectLocationLiveEvent.value = location
                }
            }

    }

    override fun onDestroyView() {

        (activity as MainActivity).supportActionBar?.show()
        super.onDestroyView()

    }

    override fun onDestroy() {
        super.onDestroy()
        pubSub.unsubscribe("navigate:back", refSubBack)
        pubSub.unsubscribe("item:select", refSubItemSelected)
        PortalManager.removePortal(PORTAL_NAME)
        _binding = null
    }

    companion object {
        const val PORTAL_NAME = "onePagePortal"
        const val FRAGMENT_TAG = "test"
    }
}
package io.ionic.starter

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import com.capacitorjs.plugins.app.AppPlugin
import com.capacitorjs.plugins.geolocation.GeolocationPlugin
import com.equimaps.capacitor_background_geolocation.BackgroundGeolocation
import com.getcapacitor.App
import com.google.gson.Gson
import io.ionic.portals.PortalManager
import io.ionic.portals.PortalsPlugin
import io.ionic.portals.PortalsPubSub
import io.ionic.portals.SubscriptionResult
import io.ionic.starter.databinding.DetectLocationFragmentBinding
import io.ionic.starter.databinding.OnePageFragmentBinding
import io.ionic.starter.models.Location
import io.ionic.starter.plugins.AlamoAppPlugin
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class LocationDetectionFragment :Fragment(){
    private val sharedViewModel: MainSharedViewModel by activityViewModels()
    private var _binding: DetectLocationFragmentBinding? = null
    private val binding get() = _binding!!
    private var refSubBack = -1

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?,
    ): View {
        val initialContext = HashMap<String, String>()
        initialContext["startingRoute"] = "/tabs/detect-location"
        addPortalSubscriber()
        PortalManager.newPortal("location")
            .setStartDir("public")
            .setInitialContext(initialContext)
            .setPortalFragmentType(FadePortalFragment::class.java)
            .addPlugin(GeolocationPlugin::class.java)
          //  .addPlugin(BackgroundGeolocation::class.java)
            .addPlugin(AlamoAppPlugin::class.java)
            //.addPlugin(AppPlugin::class.java)
            .create()
        _binding = DetectLocationFragmentBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        (activity as MainActivity).supportActionBar?.hide()
    }
    private fun addPortalSubscriber() {
        refSubBack = PortalsPubSub.shared.subscribe("navigate:back") {
            CoroutineScope(Dispatchers.Main).launch {
                sharedViewModel.backButtonLiveEvent.value = Unit
            }
        }
    }

    override fun onDestroyView() {
        PortalsPubSub.shared.unsubscribe("navigate:back", refSubBack)
        (activity as MainActivity).supportActionBar?.show()
        super.onDestroyView()
        _binding = null
    }
}
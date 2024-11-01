package io.ionic.starter

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.capacitorjs.plugins.geolocation.GeolocationPlugin
import io.ionic.portals.PortalManager
import io.ionic.starter.databinding.FullAppFragmentBinding

class FullAppFragment :Fragment() {
    private var _binding: FullAppFragmentBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val initialContext = HashMap<String, String>()
        initialContext["startingRoute"] = "/tabs/current-location"
        PortalManager.newPortal("full")
            .setStartDir("public")
            .setInitialContext(initialContext)
            .setPortalFragmentType(FadePortalFragment::class.java)
            .addPlugin(GeolocationPlugin::class.java)
            .create()
        _binding = FullAppFragmentBinding.inflate(inflater, container, false)
        (activity as MainActivity).supportActionBar?.hide()
        return binding.root
    }

    override fun onDestroyView() {
        (activity as MainActivity).supportActionBar?.show()
        super.onDestroyView()
        _binding = null
    }
}
package io.ionic.starter

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.lifecycle.ViewModelProvider
import com.google.gson.Gson
import io.ionic.portals.PortalManager
import io.ionic.portals.PortalsPlugin
import io.ionic.portals.PortalsPubSub
import io.ionic.portals.SubscriptionResult
import io.ionic.starter.databinding.OnePageFragmentBinding
import io.ionic.starter.models.Location
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class OnePageFragment : Fragment() {
    private val sharedViewModel: MainSharedViewModel by activityViewModels()
    private var _binding: OnePageFragmentBinding? = null
    private val binding get() = _binding!!
    private val pubSub = PortalsPubSub()
    private var refSubBack = -1
    private var refSubItemSelected = -1;

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?,
    ): View {
        val initialContext = HashMap<String, String>()
        initialContext["startingRoute"] = "/tabs/location"
        addPortalSubscriber()
        PortalManager.newPortal("one")
            .setStartDir("public")
            .setInitialContext(initialContext)
            .setPortalFragmentType(FadePortalFragment::class.java)
            .addPluginInstance(PortalsPlugin(pubSub))
            .create()
        _binding = OnePageFragmentBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        (activity as MainActivity).supportActionBar?.hide()
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
        pubSub.unsubscribe("navigate:back", refSubBack)
        pubSub.unsubscribe("item:select", refSubItemSelected)
        (activity as MainActivity).supportActionBar?.show()
        super.onDestroyView()
        _binding = null
    }
}
package io.ionic.starter

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import io.ionic.starter.databinding.MainFragmentBinding

class MainFragment : Fragment() {
    private var _binding: MainFragmentBinding? = null
    private val binding get() = _binding!!
    private val sharedViewModel: MainSharedViewModel by activityViewModels()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?,
    ): View {
        _binding = MainFragmentBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.buttonFullApp.setOnClickListener {
            findNavController().navigate(R.id.action_full_app)
        }
        binding.buttonOnePage.setOnClickListener {
            findNavController().navigate(R.id.action_one_page)
        }
        sharedViewModel.selectedLocationName.observe(viewLifecycleOwner) { locationName ->
            binding.selectedLocation.text = locationName
        }
    }


    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
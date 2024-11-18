package io.ionic.starter

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.provider.Settings
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.navArgs
import com.fondesa.kpermissions.anyDenied
import com.fondesa.kpermissions.anyGranted
import com.fondesa.kpermissions.anyPermanentlyDenied
import com.fondesa.kpermissions.anyRequestRequired
import com.fondesa.kpermissions.anyShouldShowRationale
import com.fondesa.kpermissions.extension.permissionsBuilder
import com.fondesa.kpermissions.extension.send
import io.ionic.starter.databinding.LocationDetailsFragmentBinding
import timber.log.Timber

class LocationDetailsFragment : Fragment() {
    private var _binding: LocationDetailsFragmentBinding? = null
    private val binding get() = _binding!!
    val args: LocationDetailsFragmentArgs by navArgs()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?,
    ): View {
        _binding = LocationDetailsFragmentBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding.selectedLocation.text = args.locationName
        binding.selectedLocation.setOnClickListener {
            checkLocationPermissionStatus()
            requestPermi()
        }
    }

    override fun onResume() {
        super.onResume()
        checkLocationPermissionStatus()
    }

    private fun requestPermi() {
        permissionsBuilder(android.Manifest.permission.ACCESS_COARSE_LOCATION).build()
            .send { result ->
                // Handle the result, for example check if all the requested permissions are granted.
                when {
                    result.anyRequestRequired() -> {
                        Timber.tag("BBBB").d("permission")
                    }

                    result.anyShouldShowRationale() -> {
                        requestPermi()
                        Timber.tag("BBBB").d("permission")
                    }

                    result.anyDenied() -> {
                        Timber.tag("BBBB").d("denied ")
                        startEnableLocationActivity()

                    }

                    result.anyGranted() -> {
                        Timber.tag("BBBB").d("any granted")
                    }

                    result.anyPermanentlyDenied() -> {
                        Timber.tag("BBBB").d("perm denied")
                    }
                }
            }
    }

    private fun startEnableLocationActivity() {
        val intent = Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
        val uri = Uri.fromParts("package", context!!.packageName, null)
        intent.setData(uri)
        startActivity(intent)
    }
    private fun checkLocationPermissionStatus() {
        val permission = Manifest.permission.ACCESS_COARSE_LOCATION

        val isAccepted = ContextCompat.checkSelfPermission(
            requireContext(),
            permission
        )

        Timber.tag("BBBB").d("Accepted $isAccepted")
    }
}
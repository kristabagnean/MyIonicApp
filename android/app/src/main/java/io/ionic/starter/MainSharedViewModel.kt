package io.ionic.starter

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.hadilq.liveevent.LiveEvent
import io.ionic.starter.models.Location

class MainSharedViewModel : ViewModel() {
    val backButtonLiveEvent: LiveEvent<Unit> = LiveEvent()
    val selectLocationLiveEvent: LiveEvent<Location> = LiveEvent()

    val selectedLocationName = MutableLiveData<String>()
    fun setLocation(text: String) {
        selectedLocationName.value = text
    }
}
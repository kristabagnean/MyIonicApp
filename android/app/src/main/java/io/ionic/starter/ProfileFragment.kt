package io.ionic.starter

import android.os.Bundle
import android.view.View
import io.ionic.portals.Portal
import io.ionic.portals.PortalFragment
import io.ionic.portals.PortalManager.getPortal


class ProfileFragment : PortalFragment {
    constructor() : super()

    constructor(portal: Portal?) : super(portal)

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setHasOptionsMenu(false)
    }

    companion object {
        fun newInstance(): ProfileFragment {
            return ProfileFragment(getPortal("profile"))
        }
    }
}
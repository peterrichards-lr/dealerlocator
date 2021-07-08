package com.liferay.raybia.dealerlocator.config;

import com.liferay.portal.configuration.metatype.annotations.ExtendedObjectClassDefinition;
import com.liferay.portal.configuration.metatype.annotations.ExtendedObjectClassDefinition.Scope;
import com.liferay.raybia.dealerlocator.DealerLocatorPortletConstants;

import aQute.bnd.annotation.metatype.Meta;
import aQute.bnd.annotation.metatype.Meta.Type;

@ExtendedObjectClassDefinition(category = "raybia", scope = Scope.GROUP)

@Meta.OCD(id = DealerLocatorPortletConstants.CONFIGURATION_PID, localization = "content/Language", name = "raybia-dealerlocator-portlet-configuration-name")
public interface DealerLocatorPortletConfiguration {

	@Meta.AD(required = false, name = "raybia-dealerlocator-portlet-googlemaps-key", type = Type.String, description = "raybia-dealerlocator-portlet-googlemaps-key-description", deflt = "")
	public String googleMapsKey();

	@Meta.AD(required = false, name = "raybia-dealerlocator-portlet-location-lat", type = Type.Double, description = "raybia-dealerlocator-portlet-location-lat-description", deflt = "51.5074")
	public double locationLatitude();
	
	@Meta.AD(required = false, name = "raybia-dealerlocator-portlet-location-lng", type = Type.Double, description = "raybia-dealerlocator-portlet-location-lng-description", deflt = "0.1278")
	public double locationLongitude();
	
	@Meta.AD(required = false, name = "raybia-dealerlocator-portlet-zoom", type = Type.Integer, description = "raybia-dealerlocator-portlet-zoom-description", deflt = "9")
	public int initialZoom();
	
	@Meta.AD(required = false, name = "raybia-dealerlocator-map-container-style", type = Type.String, description = "raybia-dealerlocator-map-container-style-description", deflt = "{ height: '400px', width: '100%'  }")
	public String mapContainerStyle();
	
	@Meta.AD(required = false, name = "raybia-dealerlocator-marker-image-relative-url", type = Type.String, description = "raybia-dealerlocator-marker-image-relative-url-description", deflt = "")
	public String markerImageUrl();

	@Meta.AD(required = false, name = "raybia-dealerlocator-info-window-image-relative-url", type = Type.String, description = "raybia-dealerlocator-info-window-image-relative-url-description", deflt = "")
	public String infoWindowImageUrl();
}

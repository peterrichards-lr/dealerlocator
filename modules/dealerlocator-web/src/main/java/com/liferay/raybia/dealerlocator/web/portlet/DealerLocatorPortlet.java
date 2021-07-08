package com.liferay.raybia.dealerlocator.web.portlet;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonParser;
import com.liferay.frontend.js.loader.modules.extender.npm.NPMResolver;
import com.liferay.portal.kernel.module.configuration.ConfigurationException;
import com.liferay.portal.kernel.module.configuration.ConfigurationProvider;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCPortlet;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.Validator;
import com.liferay.portal.kernel.util.WebKeys;
import com.liferay.raybia.dealerlocator.DealerLocatorPortletConstants;
import com.liferay.raybia.dealerlocator.config.DealerLocatorPortletConfiguration;

import java.io.IOException;

import javax.portlet.Portlet;
import javax.portlet.PortletException;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author prich
 */
@Component(immediate = true, configurationPid = DealerLocatorPortletConstants.CONFIGURATION_PID, property = {
		"com.liferay.portlet.display-category=category.raybia", "com.liferay.portlet.header-portlet-css=/css/index.css",
		"com.liferay.portlet.instanceable=true", "javax.portlet.init-param.template-path=/",
		"javax.portlet.init-param.view-template=/view.jsp",
		"javax.portlet.name=" + DealerLocatorPortletConstants.PORTLET_NAME,
		"javax.portlet.resource-bundle=content.Language",
		"javax.portlet.security-role-ref=power-user,user" }, service = Portlet.class)
public class DealerLocatorPortlet extends MVCPortlet {

	@Override
	public void doView(
			RenderRequest renderRequest, RenderResponse renderResponse)
		throws IOException, PortletException {

		final ThemeDisplay themeDisplay = (ThemeDisplay) renderRequest.getAttribute(WebKeys.THEME_DISPLAY);
		final long groupId = themeDisplay.getSiteGroupId();
		final DealerLocatorPortletConfiguration config = getConfig(groupId);
		
		renderRequest.setAttribute("googleMapsKey", config.googleMapsKey());	
		
		if (config.locationLatitude() >= -90 && config.locationLatitude() <= 90) {
			renderRequest.setAttribute("locationLatitude", config.locationLatitude());
		} else {
			renderRequest.setAttribute("locationLatitude", 0);			
		}
		
		if (config.locationLongitude() >= -180 && config.locationLongitude() <= 180) {
			renderRequest.setAttribute("locationLongitude", config.locationLongitude());
		} else {
			renderRequest.setAttribute("locationLongitude", 0);			
		}
		
		if (config.initialZoom() >= 0 && config.initialZoom() <=20 ) {
			renderRequest.setAttribute("initialZoom", config.initialZoom());
		} else {
			renderRequest.setAttribute("initialZoom", 9);
		}

		if (config.mapContainerStyle() != null) {
			try{
				JsonFactory factory = new JsonFactory();
				factory.createParser(config.mapContainerStyle());
				renderRequest.setAttribute("mapContainerStyle", config.mapContainerStyle());
				} 
				catch(IOException jse){
					renderRequest.setAttribute("mapContainerStyle", "{ height: '400px', width: \"100%\"  }");				
				}
		} else {
			renderRequest.setAttribute("mapContainerStyle", "{ height: '400px', width: \"100%\"  }");
		}

		if (!Validator.isBlank(config.markerImageUrl())) {
			renderRequest.setAttribute("markerImageUrl", themeDisplay.getURLPortal() + config.markerImageUrl());
			renderRequest.setAttribute("hasMarkerImageUrl", true);
		} else {
			renderRequest.setAttribute("hasMarkerImageUrl", false);
		}
		if (!Validator.isBlank(config.infoWindowImageUrl())) {
			renderRequest.setAttribute("infoWindowImageUrl", themeDisplay.getURLPortal() + config.infoWindowImageUrl());
			renderRequest.setAttribute("hasInfoWindowImageUrl", true);
		} else {
			renderRequest.setAttribute("hasInfoWindowImageUrl", false);			
		}
		
		renderRequest.setAttribute(
			"mainRequire",
			_npmResolver.resolveModuleName("dealerlocator-web") + " as main");

		super.doView(renderRequest, renderResponse);
	}

	private DealerLocatorPortletConfiguration getConfig(final long groupId) {
		try {
			return _configurationProvider.getGroupConfiguration(DealerLocatorPortletConfiguration.class, groupId);
		} catch (ConfigurationException e) {
			_log.error("Error while getting configuration", e);
			return null;
		}
	}

	@Reference
	private NPMResolver _npmResolver;

	@Reference
	private ConfigurationProvider _configurationProvider;

	private static final Logger _log = LoggerFactory.getLogger(DealerLocatorPortlet.class);
}
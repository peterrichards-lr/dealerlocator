package com.liferay.raybia.dealerlocator.config;

import com.liferay.portal.kernel.settings.definition.ConfigurationBeanDeclaration;

import org.osgi.service.component.annotations.Component;

@Component(immediate = true, service = ConfigurationBeanDeclaration.class)
public class DealerLocatorPortletConfigurationBeanDeclaration implements ConfigurationBeanDeclaration {

	@Override
	public Class<?> getConfigurationBeanClass() {
		return DealerLocatorPortletConfiguration.class;
	}
}

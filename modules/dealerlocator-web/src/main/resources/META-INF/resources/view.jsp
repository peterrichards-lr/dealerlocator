<%@ include file="/init.jsp" %>

<div id="<portlet:namespace />-root"></div>

<%
boolean hasMarkerImageUrl = (boolean) request.getAttribute("hasMarkerImageUrl");
boolean hasInfoWindowImageUrl = (boolean) request.getAttribute("hasInfoWindowImageUrl");
%>

<aui:script require="<%= mainRequire %>">
	const googleMapsKey = '${googleMapsKey}';
	const location = { lat: ${locationLatitude}, lng: ${locationLongitude} };
	const zoom = ${initialZoom};
	const mapContainerStyle = ${mapContainerStyle};
    const markerImageSrc = <%= hasMarkerImageUrl ? "'" + request.getAttribute("markerImageUrl") + "'" : "null" %>; 
    const infoWindowImageSrc = <%= hasInfoWindowImageUrl ? "'" + request.getAttribute("infoWindowImageUrl") + "'" : "null" %>;
    
    main.default('<portlet:namespace />-root', googleMapsKey, markerImageSrc, infoWindowImageSrc, mapContainerStyle, location, zoom);
</aui:script>
/// <reference path="../typings/main.d.ts" />

import { WmsLayer } from './index';
import { layerApi } from '../layer/layer.spec';
import { IAbstractApiDescription, simpleApiTestFactory, cloneApiDescription } from '../abstraction/test-factory';

export var wmsLayerApi: IAbstractApiDescription = cloneApiDescription(layerApi);

/* tslint:disable:no-string-literal */
wmsLayerApi['type'] = {
    methodTypes: ['get'],
    testData: ['wms', 'wms']
};
wmsLayerApi['url'] = {
    methodTypes: ['get', 'set'],
    testData: ['http://{s}.wms.osm.org/{z}/{x}/{y}.png?{foo}', 'http://{s}.somedomain.com/blabla/{z}/{x}/{y}.png']
};
/* tslint:enable:no-string-literal */


describe('WMS Layer', (): void => {
    /* tslint:disable */
    const TEST_CAPABILITIES: string = `<?xml version="1.0" encoding="UTF-8"?>
<WMS_Capabilities xmlns="http://www.opengis.net/wms" xmlns:sld="http://www.opengis.net/sld" xmlns:ms="http://mapserver.gis.umn.edu/mapserver" xmlns:inspire_vs="http://inspire.ec.europa.eu/schemas/inspire_vs/1.0" xmlns:inspire_common="http://inspire.ec.europa.eu/schemas/common/1.0" xmlns:gco="http://www.isotc211.org/2005/gco" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:gmd="http://www.isotc211.org/2005/gmd" xmlns:srv="http://www.isotc211.org/2005/srv" xmlns:gml="http://www.opengis.net/gml" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.3.0" xsi:schemaLocation="http://inspire.ec.europa.eu/schemas/common/1.0 http://inspire.ec.europa.eu/schemas/common/1.0/common.xsd   http://inspire.ec.europa.eu/schemas/inspire_vs/1.0 http://inspire.ec.europa.eu/schemas/inspire_vs/1.0/inspire_vs.xsd http://www.opengis.net/wms http://schemas.opengis.net/wms/1.3.0/capabilities_1_3_0.xsd">
	<Service>
		<Name><![CDATA[WMS]]></Name>
		<Title><![CDATA[IS BK 5 Übersichtskarte (WMS)]]></Title>
		<Abstract><![CDATA[Dieser WMS zeigt, in welchen Bereichen des Landes großmaßstäbige Bodenkarten im Maßstab 1 : 5000 (IS BK 5) vorliegen. Er beschreibt jedes Kartierverfahren mit seinem Namen, den Kartierern, dem Erfassungszeitraum sowie der Angabe, ob die Karte gescannt und georeferenziert oder vollständig digitalisiert (alle Karten ab 1991) vorliegt. Für die digitalen Karten werden die verfügbaren Auswertungen angegeben.]]></Abstract>
		<KeywordList>
			<Keyword><![CDATA[Soil, Bodenkunde, Bodeninformationssystem, Bodenkarte, Bodenschutz, Kartierung, Informationssystem, Wasserleitfähigkeit, Geographisches Informationssystem, Datenbank, Karte, Bodenfunktion, Bodentyp, Bodenart, Wasserhaushalt, Nährstoffhaushalt, Bodenbonitierung, Regionale Verteilung, Ionenaustausch, Kationen, Landesvermessung, Sickerwasser, Naturschutz, Grundwasserschutz, Landschaftsplanung, Flurbereinigung, Beweissicherung, Wasserschutzgebiet, Bodennutzung, Bestandsaufnahme, Bodenbeschaffenheit]]></Keyword>
		</KeywordList>
		<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://www.wms.nrw.de/gd/BK05_Uebersichtskarte?"/>
		<ContactInformation>
			<ContactPersonPrimary>
				<ContactPerson><![CDATA[geodaten]]></ContactPerson>
				<ContactOrganization><![CDATA[Geologischer Dienst NRW]]></ContactOrganization>
			</ContactPersonPrimary>
			<ContactPosition><![CDATA[Ressourcenanbieter]]></ContactPosition>
			<ContactAddress>
				<AddressType><![CDATA[postalisch]]></AddressType>
				<Address><![CDATA[De-Greiff Str. 195]]></Address>
				<City><![CDATA[Krefeld]]></City>
				<StateOrProvince><![CDATA[Nordrhein-Westfalen]]></StateOrProvince>
				<PostCode><![CDATA[47803]]></PostCode>
				<Country><![CDATA[Deutschland]]></Country>
			</ContactAddress>
			<ContactVoiceTelephone><![CDATA[+49(0)2151 897-0]]></ContactVoiceTelephone>
			<ContactFacsimileTelephone><![CDATA[+49(0)2151 897-505]]></ContactFacsimileTelephone>
			<ContactElectronicMailAddress><![CDATA[geodaten@gd.nrw.de]]></ContactElectronicMailAddress>
		</ContactInformation>
		<Fees><![CDATA[https://www.govdata.de/dl-de/by-2-0]]></Fees>
		<AccessConstraints><![CDATA[unbeschränkt]]></AccessConstraints>
		<MaxWidth>4096</MaxWidth>
		<MaxHeight>4096</MaxHeight>
	</Service>
	<Capability>
		<Request>
			<GetCapabilities>
				<Format>application/vnd.ogc.wms_xml</Format>
				<Format>text/xml</Format>
				<DCPType>
					<HTTP>
						<Get>
							<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://www.wms.nrw.de/gd/BK05_Uebersichtskarte?"/>
						</Get>
					</HTTP>
				</DCPType>
			</GetCapabilities>
			<GetMap>
				<Format>image/bmp</Format>
				<Format>image/jpeg</Format>
				<Format>image/tiff</Format>
				<Format>image/png</Format>
				<Format>image/png8</Format>
				<Format>image/png24</Format>
				<Format>image/png32</Format>
				<Format>image/gif</Format>
				<Format>image/svg+xml</Format>
				<DCPType>
					<HTTP>
						<Get>
							<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://www.wms.nrw.de/gd/BK05_Uebersichtskarte?"/>
						</Get>
					</HTTP>
				</DCPType>
			</GetMap>
			<GetFeatureInfo>
				<Format>application/vnd.esri.wms_raw_xml</Format>
				<Format>application/vnd.esri.wms_featureinfo_xml</Format>
				<Format>application/vnd.ogc.wms_xml</Format>
				<Format>application/geojson</Format>
				<Format>text/xml</Format>
				<Format>text/html</Format>
				<Format>text/plain</Format>
				<DCPType>
					<HTTP>
						<Get>
							<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://www.wms.nrw.de/gd/BK05_Uebersichtskarte?"/>
						</Get>
					</HTTP>
				</DCPType>
			</GetFeatureInfo>
		</Request>
		<Exception>
			<Format>application/vnd.ogc.se_xml</Format>
			<Format>application/vnd.ogc.se_inimage</Format>
			<Format>application/vnd.ogc.se_blank</Format>
			<Format>text/xml</Format>
			<Format>XML</Format>
		</Exception>
		<inspire_vs:ExtendedCapabilities>
			<inspire_common:MetadataUrl>
				<inspire_common:URL>https://www.geoportal1.nrw.de/soapServices/CSWStartup?Service=CSW&amp;Request=GetRecordById&amp;Version=2.0.2&amp;outputSchema=http://www.isotc211.org/2005/gmd&amp;elementSetName=full&amp;id=845DC6D2-39C1-497E-B9D8-07D5D188E826</inspire_common:URL>
				<inspire_common:MediaType>application/vnd.iso.19139+xml</inspire_common:MediaType>
			</inspire_common:MetadataUrl>
			<inspire_common:SupportedLanguages>
				<inspire_common:DefaultLanguage>
					<inspire_common:Language>ger</inspire_common:Language>
				</inspire_common:DefaultLanguage>
				<inspire_common:SupportedLanguage>
					<inspire_common:Language>ger</inspire_common:Language>
				</inspire_common:SupportedLanguage>
			</inspire_common:SupportedLanguages>
			<inspire_common:ResponseLanguage>
				<inspire_common:Language>ger</inspire_common:Language>
			</inspire_common:ResponseLanguage>
		</inspire_vs:ExtendedCapabilities>
		<Layer>
			<Name>UEK_BK5_NRW</Name>
			<Title><![CDATA[IS BK 5 Übersichtskarte (WMS)]]></Title>
			<Abstract>Dieser WMS zeigt, in welchen Bereichen des Landes großmaßstäbige Bodenkarten im Maßstab 1 : 5000 (IS BK 5) vorliegen. Er beschreibt jedes Kartierverfahren mit seinem Namen, den Kartierern, dem Erfassungszeitraum sowie der Angabe, ob die Karte gescannt und georeferenziert oder vollständig digitalisiert (alle Karten ab 1991) vorliegt. Für die digitalen Karten werden die verfügbaren Auswertungen angegeben.</Abstract>
			<CRS>CRS:84</CRS>
			<CRS>EPSG:4326</CRS>
			<CRS>EPSG:31466</CRS>
			<CRS>EPSG:3034</CRS>
			<CRS>EPSG:3035</CRS>
			<CRS>EPSG:3043</CRS>
			<CRS>EPSG:3044</CRS>
			<CRS>EPSG:3045</CRS>
			<CRS>EPSG:3857</CRS>
			<CRS>EPSG:4258</CRS>
			<CRS>EPSG:4647</CRS>
			<CRS>EPSG:5649</CRS>
			<CRS>EPSG:5650</CRS>
			<CRS>EPSG:5651</CRS>
			<CRS>EPSG:5652</CRS>
			<CRS>EPSG:5653</CRS>
			<CRS>EPSG:25831</CRS>
			<CRS>EPSG:25832</CRS>
			<CRS>EPSG:25833</CRS>
			<CRS>EPSG:31467</CRS>
			<EX_GeographicBoundingBox>
				<westBoundLongitude>-38.999996</westBoundLongitude>
				<eastBoundLongitude>50.999991</eastBoundLongitude>
				<southBoundLatitude>-89.999991</southBoundLatitude>
				<northBoundLatitude>89.999991</northBoundLatitude>
			</EX_GeographicBoundingBox>
			<BoundingBox CRS="CRS:84" minx="-38.999996" miny="-89.999991" maxx="50.999991" maxy="89.999991"/>
			<BoundingBox CRS="EPSG:4326" minx="-89.999991" miny="-38.999996" maxx="89.999991" maxy="50.999991"/>
			<BoundingBox CRS="EPSG:31466" minx="-10000855.764432" miny="-2662445.801245" maxx="10000855.764432" maxy="8122345.712639"/>
			<BoundingBox CRS="EPSG:3034" minx="-27510234.269928" miny="-17675402.719508" maxx="7701384.319723" maxy="22550094.523864"/>
			<BoundingBox CRS="EPSG:3035" minx="-8828174.185426" miny="-1746002.219328" maxx="7369715.312884" maxy="9462469.833589"/>
			<BoundingBox CRS="EPSG:3043" minx="-9997963.944580" miny="-4262085.011748" maxx="9997963.944580" maxy="6120763.767724"/>
			<BoundingBox CRS="EPSG:3044" minx="-9997963.944580" miny="-5120763.767724" maxx="9997963.944580" maxy="5660990.724710"/>
			<BoundingBox CRS="EPSG:3045" minx="-9997963.955519" miny="-5120763.767724" maxx="9997963.955519" maxy="4800743.392986"/>
			<BoundingBox CRS="EPSG:3857" minx="-4341459.099842" miny="-30240971.958386" maxx="5677292.989362" maxy="30240971.958386"/>
			<BoundingBox CRS="EPSG:4258" minx="-89.999991" miny="-38.999996" maxx="89.999991" maxy="50.999991"/>
			<BoundingBox CRS="EPSG:4647" minx="26879236.232276" miny="-9997963.944580" maxx="37660990.724710" maxy="9997963.944580"/>
			<BoundingBox CRS="EPSG:5649" minx="26737914.988252" miny="-9997963.944580" maxx="37120763.767724" maxy="9997963.944580"/>
			<BoundingBox CRS="EPSG:5650" minx="27879236.232276" miny="-9997963.955519" maxx="37800743.392986" maxy="9997963.955519"/>
			<BoundingBox CRS="EPSG:5651" minx="26737914.988252" miny="-9997963.944580" maxx="37120763.767724" maxy="9997963.944580"/>
			<BoundingBox CRS="EPSG:5652" minx="26879236.232276" miny="-9997963.944580" maxx="37660990.724710" maxy="9997963.944580"/>
			<BoundingBox CRS="EPSG:5653" minx="27879236.232276" miny="-9997963.955519" maxx="37800743.392986" maxy="9997963.955519"/>
			<BoundingBox CRS="EPSG:25831" minx="-4262085.011748" miny="-9997963.944580" maxx="6120763.767724" maxy="9997963.944580"/>
			<BoundingBox CRS="EPSG:25832" minx="-5120763.767724" miny="-9997963.944580" maxx="5660990.724710" maxy="9997963.944580"/>
			<BoundingBox CRS="EPSG:25833" minx="-5120763.767724" miny="-9997963.955519" maxx="4800743.392986" maxy="9997963.955519"/>
			<BoundingBox CRS="EPSG:31467" minx="-10000854.765801" miny="-2122345.712639" maxx="10000854.765801" maxy="8662445.324714"/>
			<Layer queryable="1">
				<Name>BK5_Uebersichtskarte</Name>
				<Title><![CDATA[BK5 Uebersichtskarte]]></Title>
				<Abstract><![CDATA[BK5_Uebersichtskarte]]></Abstract>
				<CRS>CRS:84</CRS>
				<CRS>EPSG:4326</CRS>
				<CRS>EPSG:31466</CRS>
				<CRS>EPSG:3034</CRS>
				<CRS>EPSG:3035</CRS>
				<CRS>EPSG:3043</CRS>
				<CRS>EPSG:3044</CRS>
				<CRS>EPSG:3045</CRS>
				<CRS>EPSG:3857</CRS>
				<CRS>EPSG:4258</CRS>
				<CRS>EPSG:4647</CRS>
				<CRS>EPSG:5649</CRS>
				<CRS>EPSG:5650</CRS>
				<CRS>EPSG:5651</CRS>
				<CRS>EPSG:5652</CRS>
				<CRS>EPSG:5653</CRS>
				<CRS>EPSG:25831</CRS>
				<CRS>EPSG:25832</CRS>
				<CRS>EPSG:25833</CRS>
				<CRS>EPSG:31467</CRS>
				<EX_GeographicBoundingBox>
					<westBoundLongitude>5.764282</westBoundLongitude>
					<eastBoundLongitude>9.610316</eastBoundLongitude>
					<southBoundLatitude>50.268010</southBoundLatitude>
					<northBoundLatitude>52.583696</northBoundLatitude>
				</EX_GeographicBoundingBox>
				<BoundingBox CRS="CRS:84" minx="5.764282" miny="50.268010" maxx="9.610316" maxy="52.583696"/>
				<BoundingBox CRS="EPSG:4326" minx="50.268010" miny="5.764282" maxx="52.583696" maxy="9.610316"/>
				<BoundingBox CRS="EPSG:31466" minx="5575739.457260" miny="2484024.643703" maxx="5827692.729233" maxy="2744946.110326"/>
				<BoundingBox CRS="EPSG:3034" minx="2614077.162915" miny="3709628.551371" maxx="2870659.384865" maxy="3974451.692717"/>
				<BoundingBox CRS="EPSG:3035" minx="3017473.299965" miny="4020308.390168" maxx="3283279.345047" maxy="4294553.220463"/>
				<BoundingBox CRS="EPSG:3043" minx="5577741.144019" miny="687273.449890" maxx="5840393.740616" maxy="958531.117970"/>
				<BoundingBox CRS="EPSG:3044" minx="5568521.072725" miny="270474.375497" maxx="5830853.990948" maxy="541402.982529"/>
				<BoundingBox CRS="EPSG:3045" minx="5583251.820510" miny="-156169.626351" maxx="5866098.332432" maxy="134509.605084"/>
				<BoundingBox CRS="EPSG:3857" minx="641676.956523" miny="6492820.498139" maxx="1069815.428784" maxy="6906361.099398"/>
				<BoundingBox CRS="EPSG:4258" minx="50.268010" miny="5.764282" maxx="52.583696" maxy="9.610316"/>
				<BoundingBox CRS="EPSG:4647" minx="32270474.375497" miny="5568521.072725" maxx="32541402.982529" maxy="5830853.990948"/>
				<BoundingBox CRS="EPSG:5649" minx="31687273.449890" miny="5577741.144019" maxx="31958531.117970" maxy="5840393.740616"/>
				<BoundingBox CRS="EPSG:5650" minx="32843830.373649" miny="5583251.820510" maxx="33134509.605084" maxy="5866098.332432"/>
				<BoundingBox CRS="EPSG:5651" minx="31687273.449890" miny="5577741.144019" maxx="31958531.117970" maxy="5840393.740616"/>
				<BoundingBox CRS="EPSG:5652" minx="32270474.375497" miny="5568521.072725" maxx="32541402.982529" maxy="5830853.990948"/>
				<BoundingBox CRS="EPSG:5653" minx="32843830.373649" miny="5583251.820510" maxx="33134509.605084" maxy="5866098.332432"/>
				<BoundingBox CRS="EPSG:25831" minx="687273.449890" miny="5577741.144019" maxx="958531.117970" maxy="5840393.740616"/>
				<BoundingBox CRS="EPSG:25832" minx="270474.375497" miny="5568521.072725" maxx="541402.982529" maxy="5830853.990948"/>
				<BoundingBox CRS="EPSG:25833" minx="-156169.626351" miny="5583251.820510" maxx="134509.605084" maxy="5866098.332432"/>
				<BoundingBox CRS="EPSG:31467" minx="5570178.475042" miny="3270410.529649" maxx="5832586.339935" maxy="3541414.483729"/>
				<MaxScaleDenominator>141741.071429</MaxScaleDenominator>
				<Layer queryable="1">
					<Name>1</Name>
					<Title><![CDATA[Forst]]></Title>
					<Abstract><![CDATA[Forst]]></Abstract>
					<CRS>CRS:84</CRS>
					<CRS>EPSG:4326</CRS>
					<CRS>EPSG:31466</CRS>
					<CRS>EPSG:3034</CRS>
					<CRS>EPSG:3035</CRS>
					<CRS>EPSG:3043</CRS>
					<CRS>EPSG:3044</CRS>
					<CRS>EPSG:3045</CRS>
					<CRS>EPSG:3857</CRS>
					<CRS>EPSG:4258</CRS>
					<CRS>EPSG:4647</CRS>
					<CRS>EPSG:5649</CRS>
					<CRS>EPSG:5650</CRS>
					<CRS>EPSG:5651</CRS>
					<CRS>EPSG:5652</CRS>
					<CRS>EPSG:5653</CRS>
					<CRS>EPSG:25831</CRS>
					<CRS>EPSG:25832</CRS>
					<CRS>EPSG:25833</CRS>
					<CRS>EPSG:31467</CRS>
					<EX_GeographicBoundingBox>
						<westBoundLongitude>5.771591</westBoundLongitude>
						<eastBoundLongitude>9.604814</eastBoundLongitude>
						<southBoundLatitude>50.268068</southBoundLatitude>
						<northBoundLatitude>52.516422</northBoundLatitude>
					</EX_GeographicBoundingBox>
					<BoundingBox CRS="CRS:84" minx="5.771591" miny="50.268068" maxx="9.604814" maxy="52.516422"/>
					<BoundingBox CRS="EPSG:4326" minx="50.268068" miny="5.771591" maxx="52.516422" maxy="9.604814"/>
					<BoundingBox CRS="EPSG:31466" minx="5575745.945855" miny="2484496.297212" maxx="5820207.575781" maxy="2744946.110326"/>
					<BoundingBox CRS="EPSG:3034" minx="2614083.415805" miny="3710083.734872" maxx="2863413.432706" maxy="3974052.384378"/>
					<BoundingBox CRS="EPSG:3035" minx="3017479.774633" miny="4020779.663091" maxx="3275777.056924" maxy="4294139.048114"/>
					<BoundingBox CRS="EPSG:3043" minx="5577766.638906" miny="688055.945591" maxx="5832904.270497" maxy="958530.855535"/>
					<BoundingBox CRS="EPSG:3044" minx="5568527.549503" miny="270946.079224" maxx="5823353.441483" maxy="541092.284890"/>
					<BoundingBox CRS="EPSG:3045" minx="5583258.267566" miny="-155698.306465" maxx="5858579.035425" maxy="133577.904906"/>
					<BoundingBox CRS="EPSG:3857" minx="642490.564171" miny="6492830.639955" maxx="1069202.959679" maxy="6894045.337851"/>
					<BoundingBox CRS="EPSG:4258" minx="50.268068" miny="5.771591" maxx="52.516422" maxy="9.604814"/>
					<BoundingBox CRS="EPSG:4647" minx="32270946.079224" miny="5568527.549503" maxx="32541092.284890" maxy="5823353.441483"/>
					<BoundingBox CRS="EPSG:5649" minx="31688055.945591" miny="5577766.638906" maxx="31958530.855535" maxy="5832904.270497"/>
					<BoundingBox CRS="EPSG:5650" minx="32844301.693535" miny="5583258.267566" maxx="33133577.904906" maxy="5858579.035425"/>
					<BoundingBox CRS="EPSG:5651" minx="31688055.945591" miny="5577766.638906" maxx="31958530.855535" maxy="5832904.270497"/>
					<BoundingBox CRS="EPSG:5652" minx="32270946.079224" miny="5568527.549503" maxx="32541092.284890" maxy="5823353.441483"/>
					<BoundingBox CRS="EPSG:5653" minx="32844301.693535" miny="5583258.267566" maxx="33133577.904906" maxy="5858579.035425"/>
					<BoundingBox CRS="EPSG:25831" minx="688055.945591" miny="5577766.638906" maxx="958530.855535" maxy="5832904.270497"/>
					<BoundingBox CRS="EPSG:25832" minx="270946.079224" miny="5568527.549503" maxx="541092.284890" maxy="5823353.441483"/>
					<BoundingBox CRS="EPSG:25833" minx="-155698.306465" miny="5583258.267566" maxx="133577.904906" maxy="5858579.035425"/>
					<BoundingBox CRS="EPSG:31467" minx="5570184.953676" miny="3270882.364589" maxx="5825083.651029" maxy="3541103.700252"/>
					<AuthorityURL name="GD">
						<OnlineResource xlink:href="http://www.geoportal.nrw.de"/>
					</AuthorityURL>
					<Identifier authority="GDI-NW">https://registry.gdi-de.org/id/de.nw/ISBK05UebDS</Identifier>
					<MetadataURL type="ISO19115:2003">
						<Format>application/xml</Format>
						<OnlineResource xlink:type="simple" xlink:href="https://www.geoportal1.nrw.de/soapServices/CSWStartup?Service=CSW&amp;Request=GetRecordById&amp;Version=2.0.2&amp;outputSchema=http://www.isotc211.org/2005/gmd&amp;elementSetName=full&amp;id=498f4642-b317-40dd-8494-51b0163bc58c"/>
					</MetadataURL>
					<Style>
						<Name>default</Name>
						<Title>1</Title>
						<LegendURL width="106" height="32">
							<Format>image/png</Format>
							<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://www.wms.nrw.de/gd/BK05_Uebersichtskarte?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=1" xlink:type="simple"/>
						</LegendURL>
					</Style>
				</Layer>
				<Layer queryable="1">
					<Name>2</Name>
					<Title><![CDATA[Landwirtschaft]]></Title>
					<Abstract><![CDATA[Landwirtschaft]]></Abstract>
					<CRS>CRS:84</CRS>
					<CRS>EPSG:4326</CRS>
					<CRS>EPSG:31466</CRS>
					<CRS>EPSG:3034</CRS>
					<CRS>EPSG:3035</CRS>
					<CRS>EPSG:3043</CRS>
					<CRS>EPSG:3044</CRS>
					<CRS>EPSG:3045</CRS>
					<CRS>EPSG:3857</CRS>
					<CRS>EPSG:4258</CRS>
					<CRS>EPSG:4647</CRS>
					<CRS>EPSG:5649</CRS>
					<CRS>EPSG:5650</CRS>
					<CRS>EPSG:5651</CRS>
					<CRS>EPSG:5652</CRS>
					<CRS>EPSG:5653</CRS>
					<CRS>EPSG:25831</CRS>
					<CRS>EPSG:25832</CRS>
					<CRS>EPSG:25833</CRS>
					<CRS>EPSG:31467</CRS>
					<EX_GeographicBoundingBox>
						<westBoundLongitude>5.764283</westBoundLongitude>
						<eastBoundLongitude>9.603440</eastBoundLongitude>
						<southBoundLatitude>50.271150</southBoundLatitude>
						<northBoundLatitude>52.583526</northBoundLatitude>
					</EX_GeographicBoundingBox>
					<BoundingBox CRS="CRS:84" minx="5.764283" miny="50.271150" maxx="9.603440" maxy="52.583526"/>
					<BoundingBox CRS="EPSG:4326" minx="50.271150" miny="5.764283" maxx="52.583526" maxy="9.603440"/>
					<BoundingBox CRS="EPSG:31466" minx="5576067.743987" miny="2484024.643703" maxx="5827673.865684" maxy="2744479.544640"/>
					<BoundingBox CRS="EPSG:3034" minx="2614417.726505" miny="3709645.712569" maxx="2870641.185856" maxy="3974000.926643"/>
					<BoundingBox CRS="EPSG:3035" minx="3017825.970915" miny="4020326.123937" maxx="3283260.503667" maxy="4294086.603395"/>
					<BoundingBox CRS="EPSG:3043" minx="5578069.226419" miny="687274.234448" maxx="5840355.395896" maxy="958050.924861"/>
					<BoundingBox CRS="EPSG:3044" minx="5568867.536087" miny="270487.611902" maxx="5830835.138037" maxy="540936.498816"/>
					<BoundingBox CRS="EPSG:3045" minx="5583634.339344" miny="-156129.693336" maxx="5866079.532036" maxy="134044.026248"/>
					<BoundingBox CRS="EPSG:3857" minx="641677.057763" miny="6493367.283401" maxx="1069050.008647" maxy="6906330.038665"/>
					<BoundingBox CRS="EPSG:4258" minx="50.271150" miny="5.764283" maxx="52.583526" maxy="9.603440"/>
					<BoundingBox CRS="EPSG:4647" minx="32270487.611902" miny="5568867.536087" maxx="32540936.498816" maxy="5830835.138037"/>
					<BoundingBox CRS="EPSG:5649" minx="31687274.234448" miny="5578069.226419" maxx="31958050.924861" maxy="5840355.395896"/>
					<BoundingBox CRS="EPSG:5650" minx="32843870.306664" miny="5583634.339344" maxx="33134044.026248" maxy="5866079.532036"/>
					<BoundingBox CRS="EPSG:5651" minx="31687274.234448" miny="5578069.226419" maxx="31958050.924861" maxy="5840355.395896"/>
					<BoundingBox CRS="EPSG:5652" minx="32270487.611902" miny="5568867.536087" maxx="32540936.498816" maxy="5830835.138037"/>
					<BoundingBox CRS="EPSG:5653" minx="32843870.306664" miny="5583634.339344" maxx="33134044.026248" maxy="5866079.532036"/>
					<BoundingBox CRS="EPSG:25831" minx="687274.234448" miny="5578069.226419" maxx="958050.924861" maxy="5840355.395896"/>
					<BoundingBox CRS="EPSG:25832" minx="270487.611902" miny="5568867.536087" maxx="540936.498816" maxy="5830835.138037"/>
					<BoundingBox CRS="EPSG:25833" minx="-156129.693336" miny="5583634.339344" maxx="134044.026248" maxy="5866079.532036"/>
					<BoundingBox CRS="EPSG:31467" minx="5570525.037666" miny="3270423.769853" maxx="5832567.481647" maxy="3540947.870434"/>
					<AuthorityURL name="GD">
						<OnlineResource xlink:href="http://www.geoportal.nrw.de"/>
					</AuthorityURL>
					<Identifier authority="GDI-NW">https://registry.gdi-de.org/id/de.nw/ISBK05UebDS</Identifier>
					<MetadataURL type="ISO19115:2003">
						<Format>application/xml</Format>
						<OnlineResource xlink:type="simple" xlink:href="https://www.geoportal1.nrw.de/soapServices/CSWStartup?Service=CSW&amp;Request=GetRecordById&amp;Version=2.0.2&amp;outputSchema=http://www.isotc211.org/2005/gmd&amp;elementSetName=full&amp;id=498f4642-b317-40dd-8494-51b0163bc58c"/>
					</MetadataURL>
					<Style>
						<Name>default</Name>
						<Title>2</Title>
						<LegendURL width="160" height="32">
							<Format>image/png</Format>
							<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://www.wms.nrw.de/gd/BK05_Uebersichtskarte?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=2" xlink:type="simple"/>
						</LegendURL>
					</Style>
				</Layer>
			</Layer>
			<Layer queryable="1">
				<Name>Schutzgebiete NSG und WSG</Name>
				<Title><![CDATA[Schutzgebiete NSG und WSG]]></Title>
				<Abstract><![CDATA[Schutzgebiete NSG und WSG]]></Abstract>
				<CRS>CRS:84</CRS>
				<CRS>EPSG:4326</CRS>
				<CRS>EPSG:31466</CRS>
				<CRS>EPSG:3034</CRS>
				<CRS>EPSG:3035</CRS>
				<CRS>EPSG:3043</CRS>
				<CRS>EPSG:3044</CRS>
				<CRS>EPSG:3045</CRS>
				<CRS>EPSG:3857</CRS>
				<CRS>EPSG:4258</CRS>
				<CRS>EPSG:4647</CRS>
				<CRS>EPSG:5649</CRS>
				<CRS>EPSG:5650</CRS>
				<CRS>EPSG:5651</CRS>
				<CRS>EPSG:5652</CRS>
				<CRS>EPSG:5653</CRS>
				<CRS>EPSG:25831</CRS>
				<CRS>EPSG:25832</CRS>
				<CRS>EPSG:25833</CRS>
				<CRS>EPSG:31467</CRS>
				<EX_GeographicBoundingBox>
					<westBoundLongitude>-38.999996</westBoundLongitude>
					<eastBoundLongitude>50.999991</eastBoundLongitude>
					<southBoundLatitude>-89.999991</southBoundLatitude>
					<northBoundLatitude>89.999991</northBoundLatitude>
				</EX_GeographicBoundingBox>
				<BoundingBox CRS="CRS:84" minx="-38.999996" miny="-89.999991" maxx="50.999991" maxy="89.999991"/>
				<BoundingBox CRS="EPSG:4326" minx="-89.999991" miny="-38.999996" maxx="89.999991" maxy="50.999991"/>
				<BoundingBox CRS="EPSG:31466" minx="-10000855.764432" miny="-2662445.801245" maxx="10000855.764432" maxy="8122345.712639"/>
				<BoundingBox CRS="EPSG:3034" minx="-27510234.269928" miny="-17675402.719508" maxx="7701384.319723" maxy="22550094.523864"/>
				<BoundingBox CRS="EPSG:3035" minx="-8828174.185426" miny="-1746002.219328" maxx="7369715.312884" maxy="9462469.833589"/>
				<BoundingBox CRS="EPSG:3043" minx="-9997963.944580" miny="-4262085.011748" maxx="9997963.944580" maxy="6120763.767724"/>
				<BoundingBox CRS="EPSG:3044" minx="-9997963.944580" miny="-5120763.767724" maxx="9997963.944580" maxy="5660990.724710"/>
				<BoundingBox CRS="EPSG:3045" minx="-9997963.955519" miny="-5120763.767724" maxx="9997963.955519" maxy="4800743.392986"/>
				<BoundingBox CRS="EPSG:3857" minx="-4341459.099842" miny="-30240971.958386" maxx="5677292.989362" maxy="30240971.958386"/>
				<BoundingBox CRS="EPSG:4258" minx="-89.999991" miny="-38.999996" maxx="89.999991" maxy="50.999991"/>
				<BoundingBox CRS="EPSG:4647" minx="26879236.232276" miny="-9997963.944580" maxx="37660990.724710" maxy="9997963.944580"/>
				<BoundingBox CRS="EPSG:5649" minx="26737914.988252" miny="-9997963.944580" maxx="37120763.767724" maxy="9997963.944580"/>
				<BoundingBox CRS="EPSG:5650" minx="27879236.232276" miny="-9997963.955519" maxx="37800743.392986" maxy="9997963.955519"/>
				<BoundingBox CRS="EPSG:5651" minx="26737914.988252" miny="-9997963.944580" maxx="37120763.767724" maxy="9997963.944580"/>
				<BoundingBox CRS="EPSG:5652" minx="26879236.232276" miny="-9997963.944580" maxx="37660990.724710" maxy="9997963.944580"/>
				<BoundingBox CRS="EPSG:5653" minx="27879236.232276" miny="-9997963.955519" maxx="37800743.392986" maxy="9997963.955519"/>
				<BoundingBox CRS="EPSG:25831" minx="-4262085.011748" miny="-9997963.944580" maxx="6120763.767724" maxy="9997963.944580"/>
				<BoundingBox CRS="EPSG:25832" minx="-5120763.767724" miny="-9997963.944580" maxx="5660990.724710" maxy="9997963.944580"/>
				<BoundingBox CRS="EPSG:25833" minx="-5120763.767724" miny="-9997963.955519" maxx="4800743.392986" maxy="9997963.955519"/>
				<BoundingBox CRS="EPSG:31467" minx="-10000854.765801" miny="-2122345.712639" maxx="10000854.765801" maxy="8662445.324714"/>
				<MinScaleDenominator>5669.642857</MinScaleDenominator>
				<MaxScaleDenominator>94494.047619</MaxScaleDenominator>
				<Layer queryable="1">
					<Name>4</Name>
					<Title><![CDATA[Wasserschutzgebiete]]></Title>
					<Abstract><![CDATA[Wasserschutzgebiete]]></Abstract>
					<CRS>CRS:84</CRS>
					<CRS>EPSG:4326</CRS>
					<CRS>EPSG:31466</CRS>
					<CRS>EPSG:3034</CRS>
					<CRS>EPSG:3035</CRS>
					<CRS>EPSG:3043</CRS>
					<CRS>EPSG:3044</CRS>
					<CRS>EPSG:3045</CRS>
					<CRS>EPSG:3857</CRS>
					<CRS>EPSG:4258</CRS>
					<CRS>EPSG:4647</CRS>
					<CRS>EPSG:5649</CRS>
					<CRS>EPSG:5650</CRS>
					<CRS>EPSG:5651</CRS>
					<CRS>EPSG:5652</CRS>
					<CRS>EPSG:5653</CRS>
					<CRS>EPSG:25831</CRS>
					<CRS>EPSG:25832</CRS>
					<CRS>EPSG:25833</CRS>
					<CRS>EPSG:31467</CRS>
					<EX_GeographicBoundingBox>
						<westBoundLongitude>-38.999996</westBoundLongitude>
						<eastBoundLongitude>50.999991</eastBoundLongitude>
						<southBoundLatitude>-89.999991</southBoundLatitude>
						<northBoundLatitude>89.999991</northBoundLatitude>
					</EX_GeographicBoundingBox>
					<BoundingBox CRS="CRS:84" minx="-38.999996" miny="-89.999991" maxx="50.999991" maxy="89.999991"/>
					<BoundingBox CRS="EPSG:4326" minx="-89.999991" miny="-38.999996" maxx="89.999991" maxy="50.999991"/>
					<BoundingBox CRS="EPSG:31466" minx="-10000855.764432" miny="-2662445.801245" maxx="10000855.764432" maxy="8122345.712639"/>
					<BoundingBox CRS="EPSG:3034" minx="-27510234.269928" miny="-17675402.719508" maxx="7701384.319723" maxy="22550094.523864"/>
					<BoundingBox CRS="EPSG:3035" minx="-8828174.185426" miny="-1746002.219328" maxx="7369715.312884" maxy="9462469.833589"/>
					<BoundingBox CRS="EPSG:3043" minx="-9997963.944580" miny="-4262085.011748" maxx="9997963.944580" maxy="6120763.767724"/>
					<BoundingBox CRS="EPSG:3044" minx="-9997963.944580" miny="-5120763.767724" maxx="9997963.944580" maxy="5660990.724710"/>
					<BoundingBox CRS="EPSG:3045" minx="-9997963.955519" miny="-5120763.767724" maxx="9997963.955519" maxy="4800743.392986"/>
					<BoundingBox CRS="EPSG:3857" minx="-4341459.099842" miny="-30240971.958386" maxx="5677292.989362" maxy="30240971.958386"/>
					<BoundingBox CRS="EPSG:4258" minx="-89.999991" miny="-38.999996" maxx="89.999991" maxy="50.999991"/>
					<BoundingBox CRS="EPSG:4647" minx="26879236.232276" miny="-9997963.944580" maxx="37660990.724710" maxy="9997963.944580"/>
					<BoundingBox CRS="EPSG:5649" minx="26737914.988252" miny="-9997963.944580" maxx="37120763.767724" maxy="9997963.944580"/>
					<BoundingBox CRS="EPSG:5650" minx="27879236.232276" miny="-9997963.955519" maxx="37800743.392986" maxy="9997963.955519"/>
					<BoundingBox CRS="EPSG:5651" minx="26737914.988252" miny="-9997963.944580" maxx="37120763.767724" maxy="9997963.944580"/>
					<BoundingBox CRS="EPSG:5652" minx="26879236.232276" miny="-9997963.944580" maxx="37660990.724710" maxy="9997963.944580"/>
					<BoundingBox CRS="EPSG:5653" minx="27879236.232276" miny="-9997963.955519" maxx="37800743.392986" maxy="9997963.955519"/>
					<BoundingBox CRS="EPSG:25831" minx="-4262085.011748" miny="-9997963.944580" maxx="6120763.767724" maxy="9997963.944580"/>
					<BoundingBox CRS="EPSG:25832" minx="-5120763.767724" miny="-9997963.944580" maxx="5660990.724710" maxy="9997963.944580"/>
					<BoundingBox CRS="EPSG:25833" minx="-5120763.767724" miny="-9997963.955519" maxx="4800743.392986" maxy="9997963.955519"/>
					<BoundingBox CRS="EPSG:31467" minx="-10000854.765801" miny="-2122345.712639" maxx="10000854.765801" maxy="8662445.324714"/>
					<AuthorityURL name="GD">
						<OnlineResource xlink:href="http://www.geoportal.nrw.de"/>
					</AuthorityURL>
					<Identifier authority="GDI-NW">https://registry.gdi-de.org/id/de.nw/ISBK05UebDS</Identifier>
					<MetadataURL type="ISO19115:2003">
						<Format>application/xml</Format>
						<OnlineResource xlink:type="simple" xlink:href="https://www.geoportal1.nrw.de/soapServices/CSWStartup?Service=CSW&amp;Request=GetRecordById&amp;Version=2.0.2&amp;outputSchema=http://www.isotc211.org/2005/gmd&amp;elementSetName=full&amp;id=498f4642-b317-40dd-8494-51b0163bc58c"/>
					</MetadataURL>
					<Style>
						<Name>default</Name>
						<Title>4</Title>
						<LegendURL width="16" height="16">
							<Format>image/png</Format>
							<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://www.wms.nrw.de/gd/BK05_Uebersichtskarte?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=4" xlink:type="simple"/>
						</LegendURL>
					</Style>
				</Layer>
				<Layer queryable="1">
					<Name>5</Name>
					<Title><![CDATA[Naturschutzgebiete]]></Title>
					<Abstract><![CDATA[Naturschutzgebiete]]></Abstract>
					<CRS>CRS:84</CRS>
					<CRS>EPSG:4326</CRS>
					<CRS>EPSG:31466</CRS>
					<CRS>EPSG:3034</CRS>
					<CRS>EPSG:3035</CRS>
					<CRS>EPSG:3043</CRS>
					<CRS>EPSG:3044</CRS>
					<CRS>EPSG:3045</CRS>
					<CRS>EPSG:3857</CRS>
					<CRS>EPSG:4258</CRS>
					<CRS>EPSG:4647</CRS>
					<CRS>EPSG:5649</CRS>
					<CRS>EPSG:5650</CRS>
					<CRS>EPSG:5651</CRS>
					<CRS>EPSG:5652</CRS>
					<CRS>EPSG:5653</CRS>
					<CRS>EPSG:25831</CRS>
					<CRS>EPSG:25832</CRS>
					<CRS>EPSG:25833</CRS>
					<CRS>EPSG:31467</CRS>
					<EX_GeographicBoundingBox>
						<westBoundLongitude>5.787825</westBoundLongitude>
						<eastBoundLongitude>9.595412</eastBoundLongitude>
						<southBoundLatitude>50.273110</southBoundLatitude>
						<northBoundLatitude>52.566724</northBoundLatitude>
					</EX_GeographicBoundingBox>
					<BoundingBox CRS="CRS:84" minx="5.787825" miny="50.273110" maxx="9.595412" maxy="52.566724"/>
					<BoundingBox CRS="EPSG:4326" minx="50.273110" miny="5.787825" maxx="52.566724" maxy="9.595412"/>
					<BoundingBox CRS="EPSG:31466" minx="5576265.365425" miny="2485614.646826" maxx="5825804.365610" maxy="2744026.972814"/>
					<BoundingBox CRS="EPSG:3034" minx="2614631.646800" miny="3711189.379692" maxx="2868754.547923" maxy="3973464.898631"/>
					<BoundingBox CRS="EPSG:3035" minx="3018047.506393" miny="4021924.339228" maxx="3281305.838874" maxy="4293531.515473"/>
					<BoundingBox CRS="EPSG:3043" minx="5578330.815723" miny="688940.853523" maxx="5838465.943479" maxy="957590.021975"/>
					<BoundingBox CRS="EPSG:3044" minx="5569083.010003" miny="272084.865676" maxx="5828900.555149" maxy="540407.138844"/>
					<BoundingBox CRS="EPSG:3045" minx="5583885.343113" miny="-154519.452835" maxx="5864016.932120" maxy="133361.903143"/>
					<BoundingBox CRS="EPSG:3857" minx="644297.684046" miny="6493708.781409" maxx="1068156.411861" maxy="6903252.296197"/>
					<BoundingBox CRS="EPSG:4258" minx="50.273110" miny="5.787825" maxx="52.566724" maxy="9.595412"/>
					<BoundingBox CRS="EPSG:4647" minx="32272084.865676" miny="5569083.010003" maxx="32540407.138844" maxy="5828900.555149"/>
					<BoundingBox CRS="EPSG:5649" minx="31688940.853523" miny="5578330.815723" maxx="31957590.021975" maxy="5838465.943479"/>
					<BoundingBox CRS="EPSG:5650" minx="32845480.547165" miny="5583885.343113" maxx="33133361.903143" maxy="5864016.932120"/>
					<BoundingBox CRS="EPSG:5651" minx="31688940.853523" miny="5578330.815723" maxx="31957590.021975" maxy="5838465.943479"/>
					<BoundingBox CRS="EPSG:5652" minx="32272084.865676" miny="5569083.010003" maxx="32540407.138844" maxy="5828900.555149"/>
					<BoundingBox CRS="EPSG:5653" minx="32845480.547165" miny="5583885.343113" maxx="33133361.903143" maxy="5864016.932120"/>
					<BoundingBox CRS="EPSG:25831" minx="688940.853523" miny="5578330.815723" maxx="957590.021975" maxy="5838465.943479"/>
					<BoundingBox CRS="EPSG:25832" minx="272084.865676" miny="5569083.010003" maxx="540407.138844" maxy="5828900.555149"/>
					<BoundingBox CRS="EPSG:25833" minx="-154519.452835" miny="5583885.343113" maxx="133361.903143" maxy="5864016.932120"/>
					<BoundingBox CRS="EPSG:31467" minx="5570740.573323" miny="3272021.467991" maxx="5830632.347458" maxy="3540418.363526"/>
					<AuthorityURL name="GD">
						<OnlineResource xlink:href="http://www.geoportal.nrw.de"/>
					</AuthorityURL>
					<Identifier authority="GDI-NW">https://registry.gdi-de.org/id/de.nw/ISBK05UebDS</Identifier>
					<MetadataURL type="ISO19115:2003">
						<Format>application/xml</Format>
						<OnlineResource xlink:type="simple" xlink:href="https://www.geoportal1.nrw.de/soapServices/CSWStartup?Service=CSW&amp;Request=GetRecordById&amp;Version=2.0.2&amp;outputSchema=http://www.isotc211.org/2005/gmd&amp;elementSetName=full&amp;id=498f4642-b317-40dd-8494-51b0163bc58c"/>
					</MetadataURL>
					<Style>
						<Name>default</Name>
						<Title>5</Title>
						<LegendURL width="16" height="16">
							<Format>image/png</Format>
							<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://www.wms.nrw.de/gd/BK05_Uebersichtskarte?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=5" xlink:type="simple"/>
						</LegendURL>
					</Style>
				</Layer>
				<Layer queryable="1">
					<Name>6</Name>
					<Title><![CDATA[Nationalpark_Eifel]]></Title>
					<Abstract><![CDATA[Nationalpark_Eifel]]></Abstract>
					<CRS>CRS:84</CRS>
					<CRS>EPSG:4326</CRS>
					<CRS>EPSG:31466</CRS>
					<CRS>EPSG:3034</CRS>
					<CRS>EPSG:3035</CRS>
					<CRS>EPSG:3043</CRS>
					<CRS>EPSG:3044</CRS>
					<CRS>EPSG:3045</CRS>
					<CRS>EPSG:3857</CRS>
					<CRS>EPSG:4258</CRS>
					<CRS>EPSG:4647</CRS>
					<CRS>EPSG:5649</CRS>
					<CRS>EPSG:5650</CRS>
					<CRS>EPSG:5651</CRS>
					<CRS>EPSG:5652</CRS>
					<CRS>EPSG:5653</CRS>
					<CRS>EPSG:25831</CRS>
					<CRS>EPSG:25832</CRS>
					<CRS>EPSG:25833</CRS>
					<CRS>EPSG:31467</CRS>
					<EX_GeographicBoundingBox>
						<westBoundLongitude>6.256475</westBoundLongitude>
						<eastBoundLongitude>6.566831</eastBoundLongitude>
						<southBoundLatitude>50.495475</southBoundLatitude>
						<northBoundLatitude>50.694839</northBoundLatitude>
					</EX_GeographicBoundingBox>
					<BoundingBox CRS="CRS:84" minx="6.256475" miny="50.495475" maxx="6.566831" maxy="50.694839"/>
					<BoundingBox CRS="EPSG:4326" minx="50.495475" miny="6.256475" maxx="50.694839" maxy="6.566831"/>
					<BoundingBox CRS="EPSG:31466" minx="5595539.017416" miny="2518195.843735" maxx="5617593.382210" maxy="2540046.541553"/>
					<BoundingBox CRS="EPSG:3034" minx="2643833.659955" miny="3743616.202659" maxx="2666242.378335" maxy="3765839.362933"/>
					<BoundingBox CRS="EPSG:3035" minx="3048333.956708" miny="4055497.579659" maxx="3071552.666740" maxy="4078509.140578"/>
					<BoundingBox CRS="EPSG:3043" minx="5598909.371355" miny="730053.022701" maxx="5621839.551395" maxy="752788.033364"/>
					<BoundingBox CRS="EPSG:3044" minx="5596555.727485" miny="305426.281813" maxx="5619478.687528" maxy="328154.133233"/>
					<BoundingBox CRS="EPSG:3045" minx="5627793.807775" miny="-119679.808345" maxx="5652442.242288" maxy="-95209.391559"/>
					<BoundingBox CRS="EPSG:3857" minx="696467.603764" miny="6532529.614384" maxx="731016.231881" maxy="6567490.836092"/>
					<BoundingBox CRS="EPSG:4258" minx="50.495475" miny="6.256475" maxx="50.694839" maxy="6.566831"/>
					<BoundingBox CRS="EPSG:4647" minx="32305426.281813" miny="5596555.727485" maxx="32328154.133233" maxy="5619478.687528"/>
					<BoundingBox CRS="EPSG:5649" minx="31730053.022701" miny="5598909.371355" maxx="31752788.033364" maxy="5621839.551395"/>
					<BoundingBox CRS="EPSG:5650" minx="32880320.191655" miny="5627793.807775" maxx="32904790.608441" maxy="5652442.242288"/>
					<BoundingBox CRS="EPSG:5651" minx="31730053.022701" miny="5598909.371355" maxx="31752788.033364" maxy="5621839.551395"/>
					<BoundingBox CRS="EPSG:5652" minx="32305426.281813" miny="5596555.727485" maxx="32328154.133233" maxy="5619478.687528"/>
					<BoundingBox CRS="EPSG:5653" minx="32880320.191655" miny="5627793.807775" maxx="32904790.608441" maxy="5652442.242288"/>
					<BoundingBox CRS="EPSG:25831" minx="730053.022701" miny="5598909.371355" maxx="752788.033364" maxy="5621839.551395"/>
					<BoundingBox CRS="EPSG:25832" minx="305426.281813" miny="5596555.727485" maxx="328154.133233" maxy="5619478.687528"/>
					<BoundingBox CRS="EPSG:25833" minx="-119679.808345" miny="5627793.807775" maxx="-95209.391559" maxy="5652442.242288"/>
					<BoundingBox CRS="EPSG:31467" minx="5598221.135753" miny="3305372.164229" maxx="5621150.651682" maxy="3328106.342842"/>
					<AuthorityURL name="GD">
						<OnlineResource xlink:href="http://www.geoportal.nrw.de"/>
					</AuthorityURL>
					<Identifier authority="GDI-NW">https://registry.gdi-de.org/id/de.nw/ISBK05UebDS</Identifier>
					<MetadataURL type="ISO19115:2003">
						<Format>application/xml</Format>
						<OnlineResource xlink:type="simple" xlink:href="https://www.geoportal1.nrw.de/soapServices/CSWStartup?Service=CSW&amp;Request=GetRecordById&amp;Version=2.0.2&amp;outputSchema=http://www.isotc211.org/2005/gmd&amp;elementSetName=full&amp;id=498f4642-b317-40dd-8494-51b0163bc58c"/>
					</MetadataURL>
					<Style>
						<Name>default</Name>
						<Title>6</Title>
						<LegendURL width="16" height="16">
							<Format>image/png</Format>
							<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://www.wms.nrw.de/gd/BK05_Uebersichtskarte?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=6" xlink:type="simple"/>
						</LegendURL>
					</Style>
				</Layer>
			</Layer>
			<Layer queryable="1">
				<Name>Verwaltungsgrenzen</Name>
				<Title><![CDATA[Verwaltungsgrenzen]]></Title>
				<Abstract><![CDATA[Verwaltungsgrenzen]]></Abstract>
				<CRS>CRS:84</CRS>
				<CRS>EPSG:4326</CRS>
				<CRS>EPSG:31466</CRS>
				<CRS>EPSG:3034</CRS>
				<CRS>EPSG:3035</CRS>
				<CRS>EPSG:3043</CRS>
				<CRS>EPSG:3044</CRS>
				<CRS>EPSG:3045</CRS>
				<CRS>EPSG:3857</CRS>
				<CRS>EPSG:4258</CRS>
				<CRS>EPSG:4647</CRS>
				<CRS>EPSG:5649</CRS>
				<CRS>EPSG:5650</CRS>
				<CRS>EPSG:5651</CRS>
				<CRS>EPSG:5652</CRS>
				<CRS>EPSG:5653</CRS>
				<CRS>EPSG:25831</CRS>
				<CRS>EPSG:25832</CRS>
				<CRS>EPSG:25833</CRS>
				<CRS>EPSG:31467</CRS>
				<EX_GeographicBoundingBox>
					<westBoundLongitude>5.765339</westBoundLongitude>
					<eastBoundLongitude>9.615914</eastBoundLongitude>
					<southBoundLatitude>50.260846</southBoundLatitude>
					<northBoundLatitude>52.583465</northBoundLatitude>
				</EX_GeographicBoundingBox>
				<BoundingBox CRS="CRS:84" minx="5.765339" miny="50.260846" maxx="9.615914" maxy="52.583465"/>
				<BoundingBox CRS="EPSG:4326" minx="50.260846" miny="5.765339" maxx="52.583465" maxy="9.615914"/>
				<BoundingBox CRS="EPSG:31466" minx="5574958.877434" miny="2484096.207624" maxx="5827667.052923" maxy="2745328.063557"/>
				<BoundingBox CRS="EPSG:3034" minx="2613305.127446" miny="3709656.759879" maxx="2870630.877363" maxy="3974818.516075"/>
				<BoundingBox CRS="EPSG:3035" minx="3016673.860096" miny="4020337.679111" maxx="3283249.766833" maxy="4294932.938585"/>
				<BoundingBox CRS="EPSG:3043" minx="5576963.933991" miny="687346.030533" maxx="5840383.989019" maxy="958944.927774"/>
				<BoundingBox CRS="EPSG:3044" minx="5567726.546971" miny="270514.437003" maxx="5830825.351720" maxy="541783.160292"/>
				<BoundingBox CRS="EPSG:3045" minx="5582430.126360" miny="-156193.175968" maxx="5866063.767362" maxy="134885.627611"/>
				<BoundingBox CRS="EPSG:3857" minx="641794.638460" miny="6491572.944313" maxx="1070438.659688" maxy="6906318.820732"/>
				<BoundingBox CRS="EPSG:4258" minx="50.260846" miny="5.765339" maxx="52.583465" maxy="9.615914"/>
				<BoundingBox CRS="EPSG:4647" minx="32270514.437003" miny="5567726.546971" maxx="32541783.160292" maxy="5830825.351720"/>
				<BoundingBox CRS="EPSG:5649" minx="31687346.030533" miny="5576963.933991" maxx="31958944.927774" maxy="5840383.989019"/>
				<BoundingBox CRS="EPSG:5650" minx="32843806.824032" miny="5582430.126360" maxx="33134885.627611" maxy="5866063.767362"/>
				<BoundingBox CRS="EPSG:5651" minx="31687346.030533" miny="5576963.933991" maxx="31958944.927774" maxy="5840383.989019"/>
				<BoundingBox CRS="EPSG:5652" minx="32270514.437003" miny="5567726.546971" maxx="32541783.160292" maxy="5830825.351720"/>
				<BoundingBox CRS="EPSG:5653" minx="32843806.824032" miny="5582430.126360" maxx="33134885.627611" maxy="5866063.767362"/>
				<BoundingBox CRS="EPSG:25831" minx="687346.030533" miny="5576963.933991" maxx="958944.927774" maxy="5840383.989019"/>
				<BoundingBox CRS="EPSG:25832" minx="270514.437003" miny="5567726.546971" maxx="541783.160292" maxy="5830825.351720"/>
				<BoundingBox CRS="EPSG:25833" minx="-156193.175968" miny="5582430.126360" maxx="134885.627611" maxy="5866063.767362"/>
				<BoundingBox CRS="EPSG:31467" minx="5569383.721686" miny="3270450.602021" maxx="5832557.692562" maxy="3541794.767104"/>
				<Layer queryable="1">
					<Name>8</Name>
					<Title><![CDATA[Gemeinden]]></Title>
					<Abstract><![CDATA[VG250_2_2010_NRW_Gemeinden]]></Abstract>
					<CRS>CRS:84</CRS>
					<CRS>EPSG:4326</CRS>
					<CRS>EPSG:31466</CRS>
					<CRS>EPSG:3034</CRS>
					<CRS>EPSG:3035</CRS>
					<CRS>EPSG:3043</CRS>
					<CRS>EPSG:3044</CRS>
					<CRS>EPSG:3045</CRS>
					<CRS>EPSG:3857</CRS>
					<CRS>EPSG:4258</CRS>
					<CRS>EPSG:4647</CRS>
					<CRS>EPSG:5649</CRS>
					<CRS>EPSG:5650</CRS>
					<CRS>EPSG:5651</CRS>
					<CRS>EPSG:5652</CRS>
					<CRS>EPSG:5653</CRS>
					<CRS>EPSG:25831</CRS>
					<CRS>EPSG:25832</CRS>
					<CRS>EPSG:25833</CRS>
					<CRS>EPSG:31467</CRS>
					<EX_GeographicBoundingBox>
						<westBoundLongitude>5.765339</westBoundLongitude>
						<eastBoundLongitude>9.615914</eastBoundLongitude>
						<southBoundLatitude>50.260846</southBoundLatitude>
						<northBoundLatitude>52.583465</northBoundLatitude>
					</EX_GeographicBoundingBox>
					<BoundingBox CRS="CRS:84" minx="5.765339" miny="50.260846" maxx="9.615914" maxy="52.583465"/>
					<BoundingBox CRS="EPSG:4326" minx="50.260846" miny="5.765339" maxx="52.583465" maxy="9.615914"/>
					<BoundingBox CRS="EPSG:31466" minx="5574958.877434" miny="2484096.207624" maxx="5827667.052923" maxy="2745328.063557"/>
					<BoundingBox CRS="EPSG:3034" minx="2613305.127446" miny="3709656.759879" maxx="2870630.877363" maxy="3974818.516075"/>
					<BoundingBox CRS="EPSG:3035" minx="3016673.860096" miny="4020337.679111" maxx="3283249.766833" maxy="4294932.938585"/>
					<BoundingBox CRS="EPSG:3043" minx="5576963.933991" miny="687346.030533" maxx="5840383.989019" maxy="958944.927774"/>
					<BoundingBox CRS="EPSG:3044" minx="5567726.546971" miny="270514.437003" maxx="5830825.351720" maxy="541783.160292"/>
					<BoundingBox CRS="EPSG:3045" minx="5582430.126360" miny="-156193.175968" maxx="5866063.767362" maxy="134885.627611"/>
					<BoundingBox CRS="EPSG:3857" minx="641794.638460" miny="6491572.944313" maxx="1070438.659688" maxy="6906318.820732"/>
					<BoundingBox CRS="EPSG:4258" minx="50.260846" miny="5.765339" maxx="52.583465" maxy="9.615914"/>
					<BoundingBox CRS="EPSG:4647" minx="32270514.437003" miny="5567726.546971" maxx="32541783.160292" maxy="5830825.351720"/>
					<BoundingBox CRS="EPSG:5649" minx="31687346.030533" miny="5576963.933991" maxx="31958944.927774" maxy="5840383.989019"/>
					<BoundingBox CRS="EPSG:5650" minx="32843806.824032" miny="5582430.126360" maxx="33134885.627611" maxy="5866063.767362"/>
					<BoundingBox CRS="EPSG:5651" minx="31687346.030533" miny="5576963.933991" maxx="31958944.927774" maxy="5840383.989019"/>
					<BoundingBox CRS="EPSG:5652" minx="32270514.437003" miny="5567726.546971" maxx="32541783.160292" maxy="5830825.351720"/>
					<BoundingBox CRS="EPSG:5653" minx="32843806.824032" miny="5582430.126360" maxx="33134885.627611" maxy="5866063.767362"/>
					<BoundingBox CRS="EPSG:25831" minx="687346.030533" miny="5576963.933991" maxx="958944.927774" maxy="5840383.989019"/>
					<BoundingBox CRS="EPSG:25832" minx="270514.437003" miny="5567726.546971" maxx="541783.160292" maxy="5830825.351720"/>
					<BoundingBox CRS="EPSG:25833" minx="-156193.175968" miny="5582430.126360" maxx="134885.627611" maxy="5866063.767362"/>
					<BoundingBox CRS="EPSG:31467" minx="5569383.721686" miny="3270450.602021" maxx="5832557.692562" maxy="3541794.767104"/>
					<AuthorityURL name="GD">
						<OnlineResource xlink:href="http://www.geoportal.nrw.de"/>
					</AuthorityURL>
					<Identifier authority="GDI-NW">https://registry.gdi-de.org/id/de.nw/ISBK05UebDS</Identifier>
					<MetadataURL type="ISO19115:2003">
						<Format>application/xml</Format>
						<OnlineResource xlink:type="simple" xlink:href="https://www.geoportal1.nrw.de/soapServices/CSWStartup?Service=CSW&amp;Request=GetRecordById&amp;Version=2.0.2&amp;outputSchema=http://www.isotc211.org/2005/gmd&amp;elementSetName=full&amp;id=498f4642-b317-40dd-8494-51b0163bc58c"/>
					</MetadataURL>
					<Style>
						<Name>default</Name>
						<Title>8</Title>
						<LegendURL width="16" height="16">
							<Format>image/png</Format>
							<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://www.wms.nrw.de/gd/BK05_Uebersichtskarte?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=8" xlink:type="simple"/>
						</LegendURL>
					</Style>
				</Layer>
				<Layer queryable="1">
					<Name>9</Name>
					<Title><![CDATA[Kreise]]></Title>
					<Abstract><![CDATA[VG250_2_2010_NRW_Kreise]]></Abstract>
					<CRS>CRS:84</CRS>
					<CRS>EPSG:4326</CRS>
					<CRS>EPSG:31466</CRS>
					<CRS>EPSG:3034</CRS>
					<CRS>EPSG:3035</CRS>
					<CRS>EPSG:3043</CRS>
					<CRS>EPSG:3044</CRS>
					<CRS>EPSG:3045</CRS>
					<CRS>EPSG:3857</CRS>
					<CRS>EPSG:4258</CRS>
					<CRS>EPSG:4647</CRS>
					<CRS>EPSG:5649</CRS>
					<CRS>EPSG:5650</CRS>
					<CRS>EPSG:5651</CRS>
					<CRS>EPSG:5652</CRS>
					<CRS>EPSG:5653</CRS>
					<CRS>EPSG:25831</CRS>
					<CRS>EPSG:25832</CRS>
					<CRS>EPSG:25833</CRS>
					<CRS>EPSG:31467</CRS>
					<EX_GeographicBoundingBox>
						<westBoundLongitude>5.765339</westBoundLongitude>
						<eastBoundLongitude>9.615914</eastBoundLongitude>
						<southBoundLatitude>50.260846</southBoundLatitude>
						<northBoundLatitude>52.583465</northBoundLatitude>
					</EX_GeographicBoundingBox>
					<BoundingBox CRS="CRS:84" minx="5.765339" miny="50.260846" maxx="9.615914" maxy="52.583465"/>
					<BoundingBox CRS="EPSG:4326" minx="50.260846" miny="5.765339" maxx="52.583465" maxy="9.615914"/>
					<BoundingBox CRS="EPSG:31466" minx="5574958.877434" miny="2484096.207624" maxx="5827667.052923" maxy="2745328.063557"/>
					<BoundingBox CRS="EPSG:3034" minx="2613305.127446" miny="3709656.759879" maxx="2870630.877363" maxy="3974818.516075"/>
					<BoundingBox CRS="EPSG:3035" minx="3016673.860096" miny="4020337.679111" maxx="3283249.766833" maxy="4294932.938585"/>
					<BoundingBox CRS="EPSG:3043" minx="5576963.933991" miny="687346.030533" maxx="5840383.989019" maxy="958944.927774"/>
					<BoundingBox CRS="EPSG:3044" minx="5567726.546971" miny="270514.437003" maxx="5830825.351720" maxy="541783.160292"/>
					<BoundingBox CRS="EPSG:3045" minx="5582430.126360" miny="-156193.175968" maxx="5866063.767362" maxy="134885.627611"/>
					<BoundingBox CRS="EPSG:3857" minx="641794.638460" miny="6491572.944313" maxx="1070438.659688" maxy="6906318.820732"/>
					<BoundingBox CRS="EPSG:4258" minx="50.260846" miny="5.765339" maxx="52.583465" maxy="9.615914"/>
					<BoundingBox CRS="EPSG:4647" minx="32270514.437003" miny="5567726.546971" maxx="32541783.160292" maxy="5830825.351720"/>
					<BoundingBox CRS="EPSG:5649" minx="31687346.030533" miny="5576963.933991" maxx="31958944.927774" maxy="5840383.989019"/>
					<BoundingBox CRS="EPSG:5650" minx="32843806.824032" miny="5582430.126360" maxx="33134885.627611" maxy="5866063.767362"/>
					<BoundingBox CRS="EPSG:5651" minx="31687346.030533" miny="5576963.933991" maxx="31958944.927774" maxy="5840383.989019"/>
					<BoundingBox CRS="EPSG:5652" minx="32270514.437003" miny="5567726.546971" maxx="32541783.160292" maxy="5830825.351720"/>
					<BoundingBox CRS="EPSG:5653" minx="32843806.824032" miny="5582430.126360" maxx="33134885.627611" maxy="5866063.767362"/>
					<BoundingBox CRS="EPSG:25831" minx="687346.030533" miny="5576963.933991" maxx="958944.927774" maxy="5840383.989019"/>
					<BoundingBox CRS="EPSG:25832" minx="270514.437003" miny="5567726.546971" maxx="541783.160292" maxy="5830825.351720"/>
					<BoundingBox CRS="EPSG:25833" minx="-156193.175968" miny="5582430.126360" maxx="134885.627611" maxy="5866063.767362"/>
					<BoundingBox CRS="EPSG:31467" minx="5569383.721686" miny="3270450.602021" maxx="5832557.692562" maxy="3541794.767104"/>
					<AuthorityURL name="GD">
						<OnlineResource xlink:href="http://www.geoportal.nrw.de"/>
					</AuthorityURL>
					<Identifier authority="GDI-NW">https://registry.gdi-de.org/id/de.nw/ISBK05UebDS</Identifier>
					<MetadataURL type="ISO19115:2003">
						<Format>application/xml</Format>
						<OnlineResource xlink:type="simple" xlink:href="https://www.geoportal1.nrw.de/soapServices/CSWStartup?Service=CSW&amp;Request=GetRecordById&amp;Version=2.0.2&amp;outputSchema=http://www.isotc211.org/2005/gmd&amp;elementSetName=full&amp;id=498f4642-b317-40dd-8494-51b0163bc58c"/>
					</MetadataURL>
					<Style>
						<Name>default</Name>
						<Title>9</Title>
						<LegendURL width="16" height="16">
							<Format>image/png</Format>
							<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://www.wms.nrw.de/gd/BK05_Uebersichtskarte?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=9" xlink:type="simple"/>
						</LegendURL>
					</Style>
				</Layer>
				<Layer queryable="1">
					<Name>10</Name>
					<Title><![CDATA[Regierungsbezirke]]></Title>
					<Abstract><![CDATA[VG250_2_2010_NRW_Reg_Bez]]></Abstract>
					<CRS>CRS:84</CRS>
					<CRS>EPSG:4326</CRS>
					<CRS>EPSG:31466</CRS>
					<CRS>EPSG:3034</CRS>
					<CRS>EPSG:3035</CRS>
					<CRS>EPSG:3043</CRS>
					<CRS>EPSG:3044</CRS>
					<CRS>EPSG:3045</CRS>
					<CRS>EPSG:3857</CRS>
					<CRS>EPSG:4258</CRS>
					<CRS>EPSG:4647</CRS>
					<CRS>EPSG:5649</CRS>
					<CRS>EPSG:5650</CRS>
					<CRS>EPSG:5651</CRS>
					<CRS>EPSG:5652</CRS>
					<CRS>EPSG:5653</CRS>
					<CRS>EPSG:25831</CRS>
					<CRS>EPSG:25832</CRS>
					<CRS>EPSG:25833</CRS>
					<CRS>EPSG:31467</CRS>
					<EX_GeographicBoundingBox>
						<westBoundLongitude>5.765339</westBoundLongitude>
						<eastBoundLongitude>9.615914</eastBoundLongitude>
						<southBoundLatitude>50.260846</southBoundLatitude>
						<northBoundLatitude>52.583465</northBoundLatitude>
					</EX_GeographicBoundingBox>
					<BoundingBox CRS="CRS:84" minx="5.765339" miny="50.260846" maxx="9.615914" maxy="52.583465"/>
					<BoundingBox CRS="EPSG:4326" minx="50.260846" miny="5.765339" maxx="52.583465" maxy="9.615914"/>
					<BoundingBox CRS="EPSG:31466" minx="5574958.877434" miny="2484096.207624" maxx="5827667.052923" maxy="2745328.063557"/>
					<BoundingBox CRS="EPSG:3034" minx="2613305.127446" miny="3709656.759879" maxx="2870630.877363" maxy="3974818.516075"/>
					<BoundingBox CRS="EPSG:3035" minx="3016673.860096" miny="4020337.679111" maxx="3283249.766833" maxy="4294932.938585"/>
					<BoundingBox CRS="EPSG:3043" minx="5576963.933991" miny="687346.030533" maxx="5840383.989019" maxy="958944.927774"/>
					<BoundingBox CRS="EPSG:3044" minx="5567726.546971" miny="270514.437003" maxx="5830825.351720" maxy="541783.160292"/>
					<BoundingBox CRS="EPSG:3045" minx="5582430.126360" miny="-156193.175968" maxx="5866063.767362" maxy="134885.627611"/>
					<BoundingBox CRS="EPSG:3857" minx="641794.638460" miny="6491572.944313" maxx="1070438.659688" maxy="6906318.820732"/>
					<BoundingBox CRS="EPSG:4258" minx="50.260846" miny="5.765339" maxx="52.583465" maxy="9.615914"/>
					<BoundingBox CRS="EPSG:4647" minx="32270514.437003" miny="5567726.546971" maxx="32541783.160292" maxy="5830825.351720"/>
					<BoundingBox CRS="EPSG:5649" minx="31687346.030533" miny="5576963.933991" maxx="31958944.927774" maxy="5840383.989019"/>
					<BoundingBox CRS="EPSG:5650" minx="32843806.824032" miny="5582430.126360" maxx="33134885.627611" maxy="5866063.767362"/>
					<BoundingBox CRS="EPSG:5651" minx="31687346.030533" miny="5576963.933991" maxx="31958944.927774" maxy="5840383.989019"/>
					<BoundingBox CRS="EPSG:5652" minx="32270514.437003" miny="5567726.546971" maxx="32541783.160292" maxy="5830825.351720"/>
					<BoundingBox CRS="EPSG:5653" minx="32843806.824032" miny="5582430.126360" maxx="33134885.627611" maxy="5866063.767362"/>
					<BoundingBox CRS="EPSG:25831" minx="687346.030533" miny="5576963.933991" maxx="958944.927774" maxy="5840383.989019"/>
					<BoundingBox CRS="EPSG:25832" minx="270514.437003" miny="5567726.546971" maxx="541783.160292" maxy="5830825.351720"/>
					<BoundingBox CRS="EPSG:25833" minx="-156193.175968" miny="5582430.126360" maxx="134885.627611" maxy="5866063.767362"/>
					<BoundingBox CRS="EPSG:31467" minx="5569383.721686" miny="3270450.602021" maxx="5832557.692562" maxy="3541794.767104"/>
					<AuthorityURL name="GD">
						<OnlineResource xlink:href="http://www.geoportal.nrw.de"/>
					</AuthorityURL>
					<Identifier authority="GDI-NW">https://registry.gdi-de.org/id/de.nw/ISBK05UebDS</Identifier>
					<MetadataURL type="ISO19115:2003">
						<Format>application/xml</Format>
						<OnlineResource xlink:type="simple" xlink:href="https://www.geoportal1.nrw.de/soapServices/CSWStartup?Service=CSW&amp;Request=GetRecordById&amp;Version=2.0.2&amp;outputSchema=http://www.isotc211.org/2005/gmd&amp;elementSetName=full&amp;id=498f4642-b317-40dd-8494-51b0163bc58c"/>
					</MetadataURL>
					<Style>
						<Name>default</Name>
						<Title>10</Title>
						<LegendURL width="16" height="16">
							<Format>image/png</Format>
							<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://www.wms.nrw.de/gd/BK05_Uebersichtskarte?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=10" xlink:type="simple"/>
						</LegendURL>
					</Style>
				</Layer>
			</Layer>
			<Layer queryable="1">
				<Name>Blattschnitte</Name>
				<Title><![CDATA[Blattschnitte]]></Title>
				<Abstract><![CDATA[Blattschnitte]]></Abstract>
				<CRS>CRS:84</CRS>
				<CRS>EPSG:4326</CRS>
				<CRS>EPSG:31466</CRS>
				<CRS>EPSG:3034</CRS>
				<CRS>EPSG:3035</CRS>
				<CRS>EPSG:3043</CRS>
				<CRS>EPSG:3044</CRS>
				<CRS>EPSG:3045</CRS>
				<CRS>EPSG:3857</CRS>
				<CRS>EPSG:4258</CRS>
				<CRS>EPSG:4647</CRS>
				<CRS>EPSG:5649</CRS>
				<CRS>EPSG:5650</CRS>
				<CRS>EPSG:5651</CRS>
				<CRS>EPSG:5652</CRS>
				<CRS>EPSG:5653</CRS>
				<CRS>EPSG:25831</CRS>
				<CRS>EPSG:25832</CRS>
				<CRS>EPSG:25833</CRS>
				<CRS>EPSG:31467</CRS>
				<EX_GeographicBoundingBox>
					<westBoundLongitude>5.541908</westBoundLongitude>
					<eastBoundLongitude>9.844806</eastBoundLongitude>
					<southBoundLatitude>50.114022</southBoundLatitude>
					<northBoundLatitude>52.657244</northBoundLatitude>
				</EX_GeographicBoundingBox>
				<BoundingBox CRS="CRS:84" minx="5.541908" miny="50.114022" maxx="9.844806" maxy="52.657244"/>
				<BoundingBox CRS="EPSG:4326" minx="50.114022" miny="5.541908" maxx="52.657244" maxy="9.844806"/>
				<BoundingBox CRS="EPSG:31466" minx="5559317.111688" miny="2469005.241651" maxx="5835876.126160" maxy="2760456.583256"/>
				<BoundingBox CRS="EPSG:3034" minx="2597448.269600" miny="3694285.571606" maxx="2879338.111451" maxy="3989840.166909"/>
				<BoundingBox CRS="EPSG:3035" minx="3000254.298163" miny="4004425.848259" maxx="3292278.305182" maxy="4310483.190598"/>
				<BoundingBox CRS="EPSG:3043" minx="5560724.936765" miny="671924.878067" maxx="5849229.800105" maxy="974717.535394"/>
				<BoundingBox CRS="EPSG:3044" minx="5551505.859163" miny="254799.563567" maxx="5839658.299042" maxy="557224.051543"/>
				<BoundingBox CRS="EPSG:3045" minx="5565065.831272" miny="-173151.526751" maxx="5876139.989875" maxy="150926.541525"/>
				<BoundingBox CRS="EPSG:3857" minx="616922.405024" miny="6466045.954301" maxx="1095918.816685" maxy="6919847.209964"/>
				<BoundingBox CRS="EPSG:4258" minx="50.114022" miny="5.541908" maxx="52.657244" maxy="9.844806"/>
				<BoundingBox CRS="EPSG:4647" minx="32254799.563567" miny="5551505.859163" maxx="32557224.051543" maxy="5839658.299042"/>
				<BoundingBox CRS="EPSG:5649" minx="31671924.878067" miny="5560724.936765" maxx="31974717.535394" maxy="5849229.800105"/>
				<BoundingBox CRS="EPSG:5650" minx="32826848.473249" miny="5565065.831272" maxx="33150926.541525" maxy="5876139.989875"/>
				<BoundingBox CRS="EPSG:5651" minx="31671924.878067" miny="5560724.936765" maxx="31974717.535394" maxy="5849229.800105"/>
				<BoundingBox CRS="EPSG:5652" minx="32254799.563567" miny="5551505.859163" maxx="32557224.051543" maxy="5839658.299042"/>
				<BoundingBox CRS="EPSG:5653" minx="32826848.473249" miny="5565065.831272" maxx="33150926.541525" maxy="5876139.989875"/>
				<BoundingBox CRS="EPSG:25831" minx="671924.878067" miny="5560724.936765" maxx="974717.535394" maxy="5849229.800105"/>
				<BoundingBox CRS="EPSG:25832" minx="254799.563567" miny="5551505.859163" maxx="557224.051543" maxy="5839658.299042"/>
				<BoundingBox CRS="EPSG:25833" minx="-173151.526751" miny="5565065.831272" maxx="150926.541525" maxy="5876139.989875"/>
				<BoundingBox CRS="EPSG:31467" minx="5553158.386091" miny="3254731.351318" maxx="5841393.154008" maxy="3557239.946980"/>
				<Layer queryable="1">
					<Name>12</Name>
					<Title><![CDATA[TK50]]></Title>
					<Abstract><![CDATA[TK50]]></Abstract>
					<CRS>CRS:84</CRS>
					<CRS>EPSG:4326</CRS>
					<CRS>EPSG:31466</CRS>
					<CRS>EPSG:3034</CRS>
					<CRS>EPSG:3035</CRS>
					<CRS>EPSG:3043</CRS>
					<CRS>EPSG:3044</CRS>
					<CRS>EPSG:3045</CRS>
					<CRS>EPSG:3857</CRS>
					<CRS>EPSG:4258</CRS>
					<CRS>EPSG:4647</CRS>
					<CRS>EPSG:5649</CRS>
					<CRS>EPSG:5650</CRS>
					<CRS>EPSG:5651</CRS>
					<CRS>EPSG:5652</CRS>
					<CRS>EPSG:5653</CRS>
					<CRS>EPSG:25831</CRS>
					<CRS>EPSG:25832</CRS>
					<CRS>EPSG:25833</CRS>
					<CRS>EPSG:31467</CRS>
					<EX_GeographicBoundingBox>
						<westBoundLongitude>5.541909</westBoundLongitude>
						<eastBoundLongitude>9.844806</eastBoundLongitude>
						<southBoundLatitude>50.114022</southBoundLatitude>
						<northBoundLatitude>52.657237</northBoundLatitude>
					</EX_GeographicBoundingBox>
					<BoundingBox CRS="CRS:84" minx="5.541909" miny="50.114022" maxx="9.844806" maxy="52.657237"/>
					<BoundingBox CRS="EPSG:4326" minx="50.114022" miny="5.541909" maxx="52.657237" maxy="9.844806"/>
					<BoundingBox CRS="EPSG:31466" minx="5559317.111688" miny="2469005.273545" maxx="5835875.358954" maxy="2760456.583256"/>
					<BoundingBox CRS="EPSG:3034" minx="2597448.269600" miny="3694285.602364" maxx="2879337.369584" maxy="3989840.125871"/>
					<BoundingBox CRS="EPSG:3035" minx="3000254.298163" miny="4004425.880103" maxx="3292277.537116" maxy="4310483.148084"/>
					<BoundingBox CRS="EPSG:3043" minx="5560724.938048" miny="671924.941872" maxx="5849229.032403" maxy="974717.535394"/>
					<BoundingBox CRS="EPSG:3044" minx="5551505.859163" miny="254799.595450" maxx="5839657.530885" maxy="557224.019654"/>
					<BoundingBox CRS="EPSG:3045" minx="5565065.831272" miny="-173151.494923" maxx="5876139.221089" maxy="150926.445929"/>
					<BoundingBox CRS="EPSG:3857" minx="616922.465519" miny="6466045.954301" maxx="1095918.749545" maxy="6919845.944566"/>
					<BoundingBox CRS="EPSG:4258" minx="50.114022" miny="5.541909" maxx="52.657237" maxy="9.844806"/>
					<BoundingBox CRS="EPSG:4647" minx="32254799.595450" miny="5551505.859163" maxx="32557224.019654" maxy="5839657.530885"/>
					<BoundingBox CRS="EPSG:5649" minx="31671924.941872" miny="5560724.938048" maxx="31974717.535394" maxy="5849229.032403"/>
					<BoundingBox CRS="EPSG:5650" minx="32826848.505077" miny="5565065.831272" maxx="33150926.445929" maxy="5876139.221089"/>
					<BoundingBox CRS="EPSG:5651" minx="31671924.941872" miny="5560724.938048" maxx="31974717.535394" maxy="5849229.032403"/>
					<BoundingBox CRS="EPSG:5652" minx="32254799.595450" miny="5551505.859163" maxx="32557224.019654" maxy="5839657.530885"/>
					<BoundingBox CRS="EPSG:5653" minx="32826848.505077" miny="5565065.831272" maxx="33150926.445929" maxy="5876139.221089"/>
					<BoundingBox CRS="EPSG:25831" minx="671924.941872" miny="5560724.938048" maxx="974717.535394" maxy="5849229.032403"/>
					<BoundingBox CRS="EPSG:25832" minx="254799.595450" miny="5551505.859163" maxx="557224.019654" maxy="5839657.530885"/>
					<BoundingBox CRS="EPSG:25833" minx="-173151.494923" miny="5565065.831272" maxx="150926.445929" maxy="5876139.221089"/>
					<BoundingBox CRS="EPSG:31467" minx="5553158.386091" miny="3254731.383210" maxx="5841392.385633" maxy="3557239.915082"/>
					<AuthorityURL name="GD">
						<OnlineResource xlink:href="http://www.geoportal.nrw.de"/>
					</AuthorityURL>
					<Identifier authority="GDI-NW">https://registry.gdi-de.org/id/de.nw/ISBK05UebDS</Identifier>
					<MetadataURL type="ISO19115:2003">
						<Format>application/xml</Format>
						<OnlineResource xlink:type="simple" xlink:href="https://www.geoportal1.nrw.de/soapServices/CSWStartup?Service=CSW&amp;Request=GetRecordById&amp;Version=2.0.2&amp;outputSchema=http://www.isotc211.org/2005/gmd&amp;elementSetName=full&amp;id=498f4642-b317-40dd-8494-51b0163bc58c"/>
					</MetadataURL>
					<Style>
						<Name>default</Name>
						<Title>12</Title>
						<LegendURL width="16" height="16">
							<Format>image/png</Format>
							<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://www.wms.nrw.de/gd/BK05_Uebersichtskarte?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=12" xlink:type="simple"/>
						</LegendURL>
					</Style>
				</Layer>
				<Layer queryable="1">
					<Name>13</Name>
					<Title><![CDATA[TK25]]></Title>
					<Abstract><![CDATA[TK25]]></Abstract>
					<CRS>CRS:84</CRS>
					<CRS>EPSG:4326</CRS>
					<CRS>EPSG:31466</CRS>
					<CRS>EPSG:3034</CRS>
					<CRS>EPSG:3035</CRS>
					<CRS>EPSG:3043</CRS>
					<CRS>EPSG:3044</CRS>
					<CRS>EPSG:3045</CRS>
					<CRS>EPSG:3857</CRS>
					<CRS>EPSG:4258</CRS>
					<CRS>EPSG:4647</CRS>
					<CRS>EPSG:5649</CRS>
					<CRS>EPSG:5650</CRS>
					<CRS>EPSG:5651</CRS>
					<CRS>EPSG:5652</CRS>
					<CRS>EPSG:5653</CRS>
					<CRS>EPSG:25831</CRS>
					<CRS>EPSG:25832</CRS>
					<CRS>EPSG:25833</CRS>
					<CRS>EPSG:31467</CRS>
					<EX_GeographicBoundingBox>
						<westBoundLongitude>5.721703</westBoundLongitude>
						<eastBoundLongitude>9.665730</eastBoundLongitude>
						<southBoundLatitude>50.226254</southBoundLatitude>
						<northBoundLatitude>52.652874</northBoundLatitude>
					</EX_GeographicBoundingBox>
					<BoundingBox CRS="CRS:84" minx="5.721703" miny="50.226254" maxx="9.665730" maxy="52.652874"/>
					<BoundingBox CRS="EPSG:4326" minx="50.226254" miny="5.721703" maxx="52.652874" maxy="9.665730"/>
					<BoundingBox CRS="EPSG:31466" minx="5571243.694681" miny="2481168.568462" maxx="5835389.931691" maxy="2748322.545121"/>
					<BoundingBox CRS="EPSG:3034" minx="2609569.652474" miny="3706639.226747" maxx="2878234.633327" maxy="3978117.561038"/>
					<BoundingBox CRS="EPSG:3035" minx="3012805.754331" miny="4017213.936264" maxx="3291124.428013" maxy="4298348.724809"/>
					<BoundingBox CRS="EPSG:3043" minx="5573133.128367" miny="684099.163210" maxx="5848236.379464" maxy="962091.906981"/>
					<BoundingBox CRS="EPSG:3044" minx="5563897.715560" miny="267438.339004" maxx="5838665.777401" maxy="545092.909499"/>
					<BoundingBox CRS="EPSG:3045" minx="5578377.403611" miny="-159565.725660" maxx="5874128.165734" maxy="138820.678000"/>
					<BoundingBox CRS="EPSG:3857" minx="636937.029567" miny="6485551.643006" maxx="1075984.153009" maxy="6919045.340229"/>
					<BoundingBox CRS="EPSG:4258" minx="50.226254" miny="5.721703" maxx="52.652874" maxy="9.665730"/>
					<BoundingBox CRS="EPSG:4647" minx="32267438.339004" miny="5563897.715560" maxx="32545092.909499" maxy="5838665.777401"/>
					<BoundingBox CRS="EPSG:5649" minx="31684099.163210" miny="5573133.128367" maxx="31962091.906981" maxy="5848236.379464"/>
					<BoundingBox CRS="EPSG:5650" minx="32840434.274340" miny="5578377.403611" maxx="33138820.678000" maxy="5874128.165734"/>
					<BoundingBox CRS="EPSG:5651" minx="31684099.163210" miny="5573133.128367" maxx="31962091.906981" maxy="5848236.379464"/>
					<BoundingBox CRS="EPSG:5652" minx="32267438.339004" miny="5563897.715560" maxx="32545092.909499" maxy="5838665.777401"/>
					<BoundingBox CRS="EPSG:5653" minx="32840434.274340" miny="5578377.403611" maxx="33138820.678000" maxy="5874128.165734"/>
					<BoundingBox CRS="EPSG:25831" minx="684099.163210" miny="5573133.128367" maxx="962091.906981" maxy="5848236.379464"/>
					<BoundingBox CRS="EPSG:25832" minx="267438.339004" miny="5563897.715560" maxx="545092.909499" maxy="5838665.777401"/>
					<BoundingBox CRS="EPSG:25833" minx="-159565.725660" miny="5578377.403611" maxx="138820.678000" maxy="5874128.165734"/>
					<BoundingBox CRS="EPSG:31467" minx="5565553.793354" miny="3267373.647021" maxx="5840400.353534" maxy="3545105.435194"/>
					<AuthorityURL name="GD">
						<OnlineResource xlink:href="http://www.geoportal.nrw.de"/>
					</AuthorityURL>
					<Identifier authority="GDI-NW">https://registry.gdi-de.org/id/de.nw/ISBK05UebDS</Identifier>
					<MetadataURL type="ISO19115:2003">
						<Format>application/xml</Format>
						<OnlineResource xlink:type="simple" xlink:href="https://www.geoportal1.nrw.de/soapServices/CSWStartup?Service=CSW&amp;Request=GetRecordById&amp;Version=2.0.2&amp;outputSchema=http://www.isotc211.org/2005/gmd&amp;elementSetName=full&amp;id=498f4642-b317-40dd-8494-51b0163bc58c"/>
					</MetadataURL>
					<Style>
						<Name>default</Name>
						<Title>13</Title>
						<LegendURL width="16" height="16">
							<Format>image/png</Format>
							<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://www.wms.nrw.de/gd/BK05_Uebersichtskarte?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=13" xlink:type="simple"/>
						</LegendURL>
					</Style>
				</Layer>
				<Layer queryable="1">
					<Name>14</Name>
					<Title><![CDATA[DGK5]]></Title>
					<Abstract><![CDATA[DGK5]]></Abstract>
					<CRS>CRS:84</CRS>
					<CRS>EPSG:4326</CRS>
					<CRS>EPSG:31466</CRS>
					<CRS>EPSG:3034</CRS>
					<CRS>EPSG:3035</CRS>
					<CRS>EPSG:3043</CRS>
					<CRS>EPSG:3044</CRS>
					<CRS>EPSG:3045</CRS>
					<CRS>EPSG:3857</CRS>
					<CRS>EPSG:4258</CRS>
					<CRS>EPSG:4647</CRS>
					<CRS>EPSG:5649</CRS>
					<CRS>EPSG:5650</CRS>
					<CRS>EPSG:5651</CRS>
					<CRS>EPSG:5652</CRS>
					<CRS>EPSG:5653</CRS>
					<CRS>EPSG:25831</CRS>
					<CRS>EPSG:25832</CRS>
					<CRS>EPSG:25833</CRS>
					<CRS>EPSG:31467</CRS>
					<EX_GeographicBoundingBox>
						<westBoundLongitude>5.752182</westBoundLongitude>
						<eastBoundLongitude>9.618139</eastBoundLongitude>
						<southBoundLatitude>50.255338</southBoundLatitude>
						<northBoundLatitude>52.582526</northBoundLatitude>
					</EX_GeographicBoundingBox>
					<BoundingBox CRS="CRS:84" minx="5.752182" miny="50.255338" maxx="9.618139" maxy="52.582526"/>
					<BoundingBox CRS="EPSG:4326" minx="50.255338" miny="5.752182" maxx="52.582526" maxy="9.618139"/>
					<BoundingBox CRS="EPSG:31466" minx="5574352.391195" miny="2483204.113100" maxx="5827562.616550" maxy="2745484.591162"/>
					<BoundingBox CRS="EPSG:3034" minx="2612712.554708" miny="3708764.752791" maxx="2870576.687096" maxy="3974963.830677"/>
					<BoundingBox CRS="EPSG:3035" minx="3016060.262569" miny="4019414.209275" maxx="3283194.468608" maxy="4295083.351220"/>
					<BoundingBox CRS="EPSG:3043" minx="5576321.874926" miny="686458.919477" maxx="5840286.024543" maxy="959126.099751"/>
					<BoundingBox CRS="EPSG:3044" minx="5567114.869161" miny="269598.289587" maxx="5830758.089333" maxy="541935.060149"/>
					<BoundingBox CRS="EPSG:3045" minx="5581808.629477" miny="-157156.921406" maxx="5866071.556950" maxy="135028.029507"/>
					<BoundingBox CRS="EPSG:3857" minx="640329.958632" miny="6490613.882063" maxx="1070686.345085" maxy="6906146.857293"/>
					<BoundingBox CRS="EPSG:4258" minx="50.255338" miny="5.752182" maxx="52.582526" maxy="9.618139"/>
					<BoundingBox CRS="EPSG:4647" minx="32269598.289587" miny="5567114.869161" maxx="32541935.060149" maxy="5830758.089333"/>
					<BoundingBox CRS="EPSG:5649" minx="31686458.919477" miny="5576321.874926" maxx="31959126.099751" maxy="5840286.024543"/>
					<BoundingBox CRS="EPSG:5650" minx="32842843.078594" miny="5581808.629477" maxx="33135028.029507" maxy="5866071.556950"/>
					<BoundingBox CRS="EPSG:5651" minx="31686458.919477" miny="5576321.874926" maxx="31959126.099751" maxy="5840286.024543"/>
					<BoundingBox CRS="EPSG:5652" minx="32269598.289587" miny="5567114.869161" maxx="32541935.060149" maxy="5830758.089333"/>
					<BoundingBox CRS="EPSG:5653" minx="32842843.078594" miny="5581808.629477" maxx="33135028.029507" maxy="5866071.556950"/>
					<BoundingBox CRS="EPSG:25831" minx="686458.919477" miny="5576321.874926" maxx="959126.099751" maxy="5840286.024543"/>
					<BoundingBox CRS="EPSG:25832" minx="269598.289587" miny="5567114.869161" maxx="541935.060149" maxy="5830758.089333"/>
					<BoundingBox CRS="EPSG:25833" minx="-157156.921406" miny="5581808.629477" maxx="135028.029507" maxy="5866071.556950"/>
					<BoundingBox CRS="EPSG:31467" minx="5568771.868658" miny="3269534.199549" maxx="5832490.410689" maxy="3541946.709164"/>
					<AuthorityURL name="GD">
						<OnlineResource xlink:href="http://www.geoportal.nrw.de"/>
					</AuthorityURL>
					<Identifier authority="GDI-NW">https://registry.gdi-de.org/id/de.nw/ISBK05UebDS</Identifier>
					<MetadataURL type="ISO19115:2003">
						<Format>application/xml</Format>
						<OnlineResource xlink:type="simple" xlink:href="https://www.geoportal1.nrw.de/soapServices/CSWStartup?Service=CSW&amp;Request=GetRecordById&amp;Version=2.0.2&amp;outputSchema=http://www.isotc211.org/2005/gmd&amp;elementSetName=full&amp;id=498f4642-b317-40dd-8494-51b0163bc58c"/>
					</MetadataURL>
					<Style>
						<Name>default</Name>
						<Title>14</Title>
						<LegendURL width="172" height="64">
							<Format>image/png</Format>
							<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://www.wms.nrw.de/gd/BK05_Uebersichtskarte?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=14" xlink:type="simple"/>
						</LegendURL>
					</Style>
					<MinScaleDenominator>2362.351190</MinScaleDenominator>
					<MaxScaleDenominator>472470.238095</MaxScaleDenominator>
				</Layer>
			</Layer>
			<Layer queryable="1">
				<Name>15</Name>
				<Title><![CDATA[Abfrage]]></Title>
				<Abstract><![CDATA[Abfrage]]></Abstract>
				<CRS>CRS:84</CRS>
				<CRS>EPSG:4326</CRS>
				<CRS>EPSG:31466</CRS>
				<CRS>EPSG:3034</CRS>
				<CRS>EPSG:3035</CRS>
				<CRS>EPSG:3043</CRS>
				<CRS>EPSG:3044</CRS>
				<CRS>EPSG:3045</CRS>
				<CRS>EPSG:3857</CRS>
				<CRS>EPSG:4258</CRS>
				<CRS>EPSG:4647</CRS>
				<CRS>EPSG:5649</CRS>
				<CRS>EPSG:5650</CRS>
				<CRS>EPSG:5651</CRS>
				<CRS>EPSG:5652</CRS>
				<CRS>EPSG:5653</CRS>
				<CRS>EPSG:25831</CRS>
				<CRS>EPSG:25832</CRS>
				<CRS>EPSG:25833</CRS>
				<CRS>EPSG:31467</CRS>
				<EX_GeographicBoundingBox>
					<westBoundLongitude>5.764282</westBoundLongitude>
					<eastBoundLongitude>9.610316</eastBoundLongitude>
					<southBoundLatitude>50.268010</southBoundLatitude>
					<northBoundLatitude>52.583696</northBoundLatitude>
				</EX_GeographicBoundingBox>
				<BoundingBox CRS="CRS:84" minx="5.764282" miny="50.268010" maxx="9.610316" maxy="52.583696"/>
				<BoundingBox CRS="EPSG:4326" minx="50.268010" miny="5.764282" maxx="52.583696" maxy="9.610316"/>
				<BoundingBox CRS="EPSG:31466" minx="5575739.457260" miny="2484024.643703" maxx="5827692.729233" maxy="2744946.110326"/>
				<BoundingBox CRS="EPSG:3034" minx="2614077.162915" miny="3709628.551371" maxx="2870659.384865" maxy="3974451.692717"/>
				<BoundingBox CRS="EPSG:3035" minx="3017473.299965" miny="4020308.390168" maxx="3283279.345047" maxy="4294553.220463"/>
				<BoundingBox CRS="EPSG:3043" minx="5577741.144019" miny="687273.449890" maxx="5840393.740616" maxy="958531.117970"/>
				<BoundingBox CRS="EPSG:3044" minx="5568521.072725" miny="270474.375497" maxx="5830853.990948" maxy="541402.982529"/>
				<BoundingBox CRS="EPSG:3045" minx="5583251.820510" miny="-156169.626351" maxx="5866098.332432" maxy="134509.605084"/>
				<BoundingBox CRS="EPSG:3857" minx="641676.956523" miny="6492820.498139" maxx="1069815.428784" maxy="6906361.099398"/>
				<BoundingBox CRS="EPSG:4258" minx="50.268010" miny="5.764282" maxx="52.583696" maxy="9.610316"/>
				<BoundingBox CRS="EPSG:4647" minx="32270474.375497" miny="5568521.072725" maxx="32541402.982529" maxy="5830853.990948"/>
				<BoundingBox CRS="EPSG:5649" minx="31687273.449890" miny="5577741.144019" maxx="31958531.117970" maxy="5840393.740616"/>
				<BoundingBox CRS="EPSG:5650" minx="32843830.373649" miny="5583251.820510" maxx="33134509.605084" maxy="5866098.332432"/>
				<BoundingBox CRS="EPSG:5651" minx="31687273.449890" miny="5577741.144019" maxx="31958531.117970" maxy="5840393.740616"/>
				<BoundingBox CRS="EPSG:5652" minx="32270474.375497" miny="5568521.072725" maxx="32541402.982529" maxy="5830853.990948"/>
				<BoundingBox CRS="EPSG:5653" minx="32843830.373649" miny="5583251.820510" maxx="33134509.605084" maxy="5866098.332432"/>
				<BoundingBox CRS="EPSG:25831" minx="687273.449890" miny="5577741.144019" maxx="958531.117970" maxy="5840393.740616"/>
				<BoundingBox CRS="EPSG:25832" minx="270474.375497" miny="5568521.072725" maxx="541402.982529" maxy="5830853.990948"/>
				<BoundingBox CRS="EPSG:25833" minx="-156169.626351" miny="5583251.820510" maxx="134509.605084" maxy="5866098.332432"/>
				<BoundingBox CRS="EPSG:31467" minx="5570178.475042" miny="3270410.529649" maxx="5832586.339935" maxy="3541414.483729"/>
				<AuthorityURL name="GD">
					<OnlineResource xlink:href="http://www.geoportal.nrw.de"/>
				</AuthorityURL>
				<Identifier authority="GDI-NW">https://registry.gdi-de.org/id/de.nw/ISBK05UebDS</Identifier>
				<MetadataURL type="ISO19115:2003">
					<Format>application/xml</Format>
					<OnlineResource xlink:type="simple" xlink:href="https://www.geoportal1.nrw.de/soapServices/CSWStartup?Service=CSW&amp;Request=GetRecordById&amp;Version=2.0.2&amp;outputSchema=http://www.isotc211.org/2005/gmd&amp;elementSetName=full&amp;id=498f4642-b317-40dd-8494-51b0163bc58c"/>
				</MetadataURL>
				<Style>
					<Name>default</Name>
					<Title>15</Title>
					<LegendURL width="16" height="16">
						<Format>image/png</Format>
						<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://www.wms.nrw.de/gd/BK05_Uebersichtskarte?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=15" xlink:type="simple"/>
					</LegendURL>
				</Style>
				<MaxScaleDenominator>141741.071429</MaxScaleDenominator>
			</Layer>
		</Layer>
	</Capability>
</WMS_Capabilities>
`;
    /* tslint:enable */

    var wmsLayer: WmsLayer = new WmsLayer({
        name: 'test',
        type: 'wms',
        url: 'not important'
    });

    it('should be able to parse some wms-capabilities', (): void => {
        wmsLayer.parseCapabilities(TEST_CAPABILITIES);
        if (wmsLayer.availableLayers.length !== 17) {
            throw new Error('Unexpected length of availabale layers');
        }
    });



    simpleApiTestFactory('WmsLayer', WmsLayer, wmsLayerApi);
});

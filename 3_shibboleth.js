<resolver:AttributeDefinition id="mthscID" xsi:type="Script" xmlns="urn:mace:shibboleth:2.0:resolver:ad">

	<!-- Dependency that provides the source attribute. -->
	<resolver:Dependency ref="CUID_CN" />
	<resolver:Dependency ref="user" />

	<!-- SAML 1 and 2 encoders for the attribute. -->
	<resolver:AttributeEncoder xsi:type="SAML1String" xmlns="urn:mace:shibboleth:2.0:attribute:encoder" name="urn:mace:dir:attribute-def:mthscID" />
	<resolver:AttributeEncoder xsi:type="SAML2String" xmlns="urn:mace:shibboleth:2.0:attribute:encoder" name="urn:mace:dir:attribute-def:mthscID" friendlyName="mthscID" />

	<!-- The script, wrapped in a CDATA section so that special XML characters don't need to be removed -->
	<Script><![CDATA[
		var DigestUtils = Java.type("org.apache.commons.codec.digest.DigestUtils");
		var logger = Java.type("org.slf4j.LoggerFactory").getLogger("edu.internet2.middleware.shibboleth.resolver.Script.mthscID");



		// Get the unique value
		uniqueValue = new String( user.getValues().get(0)).concat("qweasdzxc123");
		//logger.info("uniqueValue is " + uniqueValue);

		var hex = DigestUtils.md5Hex(uniqueValue);

		//logger.info("hex digest is "+ hex);
		mthscID.addValue(hex);

	]]></Script>
</resolver:AttributeDefinition>

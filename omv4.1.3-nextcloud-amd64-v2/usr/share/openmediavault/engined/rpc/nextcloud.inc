<?php
class OMVRpcServiceNextcloud extends \OMV\Rpc\ServiceAbstract {

	public function getName() {
		return "Nextcloud";
	}

	public function initialize() {
		$this->registerMethod("getSettings");
		$this->registerMethod("setSettings");
	}

	public function getSettings($params, $context) {
		// Validate the RPC caller context.
		$this->validateMethodContext($context, [
			"role" => OMV_ROLE_ADMINISTRATOR
		]);
		// Get the configuration object.
		$db = \OMV\Config\Database::getInstance();
		$object = $db->get("conf.service.nextcloud");
		// Remove useless properties from the object.
		return $object->getAssoc();
	}

	public function setSettings($params, $context) {
		// Validate the RPC caller context.
		$this->validateMethodContext($context, [
			"role" => OMV_ROLE_ADMINISTRATOR
		]);
		// Validate the parameters of the RPC service method.
		$this->validateMethodParams($params, "rpc.nextcloud.setsettings");
		// Get the existing configuration object.
		$db = \OMV\Config\Database::getInstance();
		$object = $db->get("conf.service.nextcloud");
		$object->setAssoc($params);
		$db->set($object);
		// Return the configuration object.
		return $object->getAssoc();
	}
}
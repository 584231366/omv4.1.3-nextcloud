<?php
class OMVModuleNextcloud extends \OMV\Engine\Module\ServiceAbstract
  implements \OMV\Engine\Notify\IListener {
	public function getName() {
		return "Nextcloud";
	}

	public function applyConfig() {
		echo "applyConfig";
		$cmd = new \OMV\System\Process("omv-mkconf", "nextcloud");
		$cmd->setRedirect2to1();
		$cmd->execute();
	}

	function bindListeners(\OMV\Engine\Notify\Dispatcher $dispatcher) {
		$dispatcher->addListener(OMV_NOTIFY_MODIFY,
			"org.openmediavault.conf.service.nextcloud",
			[ $this, "setDirty" ]);
	}
}
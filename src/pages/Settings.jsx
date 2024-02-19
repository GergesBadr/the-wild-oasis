import CurrentSettings from "../features/settings/CurrentSettings";
import SettingsForm from "../features/settings/SettingsForm";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";

function Settings() {
  return (
    <Modal>
      <h1 className="heading-1">Update hotel settings</h1>
      <CurrentSettings />

      <Modal.OpenButton id="settings-modal" widthFit={true}>
        <Button>Update settings</Button>
      </Modal.OpenButton>

      <Modal.Window id="settings-modal" nameForA11y="Settings modal">
        <SettingsForm />
      </Modal.Window>
    </Modal>
  );
}

export default Settings;

import { bind } from "astal";
import { Widget } from "astal/gtk3";
import Bluetooth from "gi://AstalBluetooth";

export default () => {
  const bluetooth = Bluetooth.get_default();

  return new Widget.Box({
    className: "bluetooth",
    setup: (self) =>
      self.hook(bluetooth, "notify::connected-devices", (self) => {
        self.children = bluetooth.devices.map(
          ({ icon, name }) =>
            new Widget.Box({
              tooltip_text: name,
              children: [new Widget.Icon({ icon: icon + "-symbolic" })],
            }),
        );

        self.visible = bluetooth.devices.length > 0;
      }),

    visible: bind(bluetooth, "devices").as((devices) => devices.length > 0),
  });
};

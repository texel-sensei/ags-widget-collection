import Gtk from "gi://Gtk?version=3.0";

export function HelloButton(text: string): Gtk.Widget {
	return Widget.Button({
		label: "Click Me",
		on_clicked: () => Utils.notify(text),
	});
}

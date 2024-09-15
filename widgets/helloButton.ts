
export function HelloButton(text: string) {
	return Widget.Button({
		label: "Click Me",
		on_clicked: () => Utils.notify(text),
	});
}

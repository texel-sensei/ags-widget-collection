import Gtk from "gi://Gtk?version=3.0";

const hyprland = await Service.import("hyprland")

/**
 * Display list of all workspaces on the given monitor.
 * Clicking on a workspace button will switch to that workspace.
 */
export const WorkspaceList = (monitor: number): Gtk.Widget => {
    const workspaces = hyprland.bind("workspaces")
        .as(ws => ws
                // Filter workspaces on current monitor and special workspaces
                .filter(ws => ws.monitorID === monitor && ws.id > 0)
                .map(({ id }) => Widget.Button({
                    attribute: {
                        id: id,
                        is_urgent: false,
                    },
                    setup: self => {
                        self.hook(hyprland, () => {
                            //unset urgent if ws gets focus
                            if(hyprland.active.workspace.id === id) self.attribute.is_urgent = false;
                        });
                        self.hook(hyprland, (_, address) => {
                            //set urgent on ws containing the urgent window
                            if(hyprland.getClient(address)?.workspace.id === self.attribute.id) {
                                self.attribute.is_urgent = true
                                self.toggleClassName("urgent", self.attribute.is_urgent)
                                print("Urgent window!", address)
                            }
                        }, "urgent-window")
                    },
                    on_clicked: () => hyprland.messageAsync(`dispatch workspace ${id}`),
                    child: Widget.Label(`${id}`),
        })))

    return Widget.Box({
        class_name: "workspaces",
        children: workspaces,
    })
}

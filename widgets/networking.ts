import { Wifi } from "types/service/network";

const network = await Service.import('network')

const WifiRevealer = Widget.Revealer({
    revealChild: false,
    transitionDuration: 500,
    transition: 'slide_down',
    child: Widget.Box({
        children: [
            Widget.Icon({
            icon: network.wifi.bind('icon_name'),
            }),
            Widget.Label({
                label: network.wifi.bind('ssid')
                    .as(ssid => ssid || 'Unknown'),
            }),
        ],
    }),
})

export const WifiMenu = () => Widget.Window({
    keymode: 'on-demand',
    anchor: ['top'],
    child: Widget.Box({
        vertical: true,
        css: 'padding: 1px;',
        children: [
            WifiRevealer,
        ],
    }),
})


const WifiIndicator = () => Widget.Box({
    children: [
        Widget.Button({
            child: Widget.Box({
                children: [
                    Widget.Icon({
                        icon: network.wifi.bind('icon_name'),
                    }),
                    Widget.Label({
                        label: network.wifi.bind('ssid')
                            .as(ssid => ssid || 'Unknown'),
                    }),
                ]
            }),
            onClicked: () => toggleWifiMenu(),
        }),
    ],
})

const WiredIndicator = () => Widget.Icon({
    icon: network.wired.bind('icon_name'),
})

export const NetworkIndicator = () => Widget.Stack({
    children: {
        wifi: WifiIndicator(),
        wired: WiredIndicator(),
    },
    shown: network.bind('primary').as(p => p || 'wifi'),
})

function toggleWifiMenu() {
    WifiRevealer.reveal_child = !WifiRevealer.reveal_child;
}

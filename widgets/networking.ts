import { Wifi } from "types/service/network";

const network = await Service.import('network')

const WifiName = Widget.Box({
    children: [
        Widget.Icon().hook(network, self => {
            self.icon = network.wifi.icon_name
        }, "changed"),
        Widget.Label().hook(network, self => {
            let ssid = network.wifi.ssid
            self.label = ssid ? ssid : 'Unknown'
        }, "changed"),
    ],
})

const WifiStrength = Widget.Box({
    children: [
        Widget.Icon().hook(network, self => {
            self.icon = setWifiIcon(network.wifi.strength)
        }, "changed"),
        Widget.Label().hook(network, self => {
            self.label = String(network.wifi.strength)
        }, "changed"),
    ],
})

const WifiRevealer = Widget.Revealer({
    revealChild: false,
    transitionDuration: 500,
    transition: 'slide_down',
    child: Widget.Box({
        vertical: true,
        children: [
            WifiName,
            WifiStrength,
        ],
    }),
})

export const WifiMenu = () => Widget.Window({
    name: 'WifiMenu',
    keymode: 'on-demand',
    anchor: ['top'],
    child: Widget.Box({
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
                    Widget.Icon().hook(network, self => {
                        self.icon = network.wifi.icon_name
                    }, "changed"),
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

function setWifiIcon(strength) {
    if (strength > 90) {
        let ico = Utils.lookUpIcon('network-wireless-100');
        let ret = ico ? ico.get_filename() : network.wifi.bind('icon_name');
        return ret;
    }
    if (strength > 80) {
        let ico = Utils.lookUpIcon('network-wireless-80');
        let ret = ico ? ico.get_filename() : network.wifi.bind('icon_name');
        return ret;
    }
    if (strength > 60) {
        let ico = Utils.lookUpIcon('network-wireless-60');
        let ret = ico ? ico.get_filename() : network.wifi.bind('icon_name');
        return ret;
    }
    if (strength > 40) {
        let ico = Utils.lookUpIcon('network-wireless-40');
        let ret = ico ? ico.get_filename() : network.wifi.bind('icon_name');
        return ret;
    }
    if (strength > 20) {
        let ico = Utils.lookUpIcon('network-wireless-20');
        let ret = ico ? ico.get_filename() : network.wifi.bind('icon_name');
        return ret;
    }
    let ico = Utils.lookUpIcon('network-wireless-0');
        let ret = ico ? ico.get_filename() : network.wifi.bind('icon_name');
        return ret;
}
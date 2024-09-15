const network = await Service.import('network')

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
            onClicked: (btn) => {
                btn.get_parent().children[1].reveal_child =
                !btn.get_parent().children[1].reveal_child;},
        }),
        Widget.Revealer({
            revealChild: false,
            transitionDuration: 1000,
            transition: 'slide_right',
            child: Widget.Label('hello!'),
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
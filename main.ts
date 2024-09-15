import { HelloButton } from "widgets/helloButton";

const css = `${Utils.CACHE_DIR}/style.css`;

const time = Variable('', {
    poll: [1000, function() {
        return Date().toString();
    }],
});

const Bar = (monitor: number) => Widget.Window({
    monitor,
    name: `bar${monitor}`,
    anchor: ['top', 'left', 'right'],
    exclusivity: 'exclusive',
    child: Widget.CenterBox({
        start_widget: Widget.Label({
            hpack: 'center',
            label: 'Welcome to AGS!',
        }),
		center_widget: HelloButton("Hello World!"),
        end_widget: Widget.Label({
            hpack: 'center',
            label: time.bind(),
        }),
    }),
});

App.config({
    style:css,
    windows: [Bar(0)],
});

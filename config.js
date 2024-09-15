import Gio from "gi://Gio";

export { };

const main = `${Utils.CACHE_DIR}/main.js`;

// main scss file
const scss = `${App.configDir}/style/style.scss`

// target css file
const css = `${Utils.CACHE_DIR}/style.css`;

// build css
Utils.exec(`sassc ${scss} ${css}`);

// Auto reload CSS

Utils.monitorFile(
    `${App.configDir}/style`,
    function() {
        // compile, reset, apply
        Utils.exec(`sassc ${scss} ${css}`)
        App.resetCss()
        App.applyCss(css)
    },
	{
		flags: Gio.FileMonitorFlags.NONE,
		recursive: true
	}
)

try {
    await Utils.execAsync([
        'bun', 'build', `${App.configDir}/main.ts`,
        '--outfile', main,
        '--external', 'resource://*',
        '--external', 'gi://*',
        '--external', 'file://*',
    ]);
    await import(`file://${main}`);
} catch (error) {
    console.error(error);
    App.quit();
}

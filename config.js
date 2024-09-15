export { };

const main = '/tmp/ags/main.js';

// main scss file
const scss = `${App.configDir}/style.scss`

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

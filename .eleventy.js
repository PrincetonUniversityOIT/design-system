const fs = require('fs');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const configObj = {
    dir: {
        input: "docs"
    }
};

// function escapeHTML(str) {
//     return str.replace(/[&<>'"]/g,
//         tag => ({
//             '&': '&amp;',
//             '<': '&lt;',
//             '>': '&gt;',
//             "'": '&#39;',
//             '"': '&quot;'
//         }[tag]));
// }

function getSourceCode(config, path) {
    // return process.cwd() + '/' + config.dir.input + '/' + path + '.code';
    var fileToProcess = process.cwd() + '/' + config.dir.input + '/' + path + '.code';
    fileToProcess = fileToProcess.replace('/./', '/');
    fileToProcess = fileToProcess.replace('/', '\\');
    return fs.readFileSync(fileToProcess, 'utf8');
}

module.exports = function(eleventyConfig) {

    eleventyConfig.setUseGitIgnore(false);

    eleventyConfig.addWatchTarget("./dist/");
    eleventyConfig.addWatchTarget("./docs/**/*.code");

    eleventyConfig.addPassthroughCopy({ "dist/styles.css": "styles.css" });
    eleventyConfig.addPassthroughCopy({ "dist/fonts.css": "fonts.css" });
    eleventyConfig.addPassthroughCopy({ "dist/fonts": "fonts" });
    eleventyConfig.addPassthroughCopy({ "dist/icons": "icons" });
    eleventyConfig.addPassthroughCopy({ "dist/img": "img" });
    eleventyConfig.addPassthroughCopy({ "dist/logos": "logos" });
    eleventyConfig.addPassthroughCopy({ "dist/design_system.js": "design_system.js" });
    eleventyConfig.addPassthroughCopy({ "docs/css/prism-atom-dark.css": "prism-atom-dark.css" });

    eleventyConfig.addNunjucksShortcode("src", function(path) { return getSourceCode(configObj, path); });

    eleventyConfig.addPlugin(syntaxHighlight, {
        lineSeparator: "\n",
    });

    return configObj;
};

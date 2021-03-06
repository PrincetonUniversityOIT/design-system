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
    var fileToProcess = process.cwd() + '/' + config.dir.input + path + '.code';
    // console.log('fileToProcess 1', fileToProcess)
    fileToProcess = fileToProcess.replace('/./', '/');
    // fileToProcess = fileToProcess.replace('/', '\\');
    // console.log('fileToProcess 2', fileToProcess)
    return fs.readFileSync(fileToProcess, 'utf8');
}

module.exports = function(eleventyConfig) {

    eleventyConfig.setUseGitIgnore(false);

    eleventyConfig.addWatchTarget("./dist/");
    eleventyConfig.addWatchTarget("./docs/**/*.code");

    eleventyConfig.addPassthroughCopy({ "dist/jazz_sans.css": "jazz_sans.css" });
    eleventyConfig.addPassthroughCopy({ "dist/jazz_serif.css": "jazz_serif.css" });
    eleventyConfig.addPassthroughCopy({ "dist/jazz_fonts.css": "jazz_fonts.css" });
    eleventyConfig.addPassthroughCopy({ "dist/jazz_curated_icons.css": "jazz_curated_icons.css" });
    eleventyConfig.addPassthroughCopy({ "dist/fonts": "fonts" });
    eleventyConfig.addPassthroughCopy({ "dist/icons": "icons" });
    eleventyConfig.addPassthroughCopy({ "dist/img": "img" });
    eleventyConfig.addPassthroughCopy({ "dist/logos": "logos" });
    eleventyConfig.addPassthroughCopy({ "docs/favicon.ico": "favicon.ico" });
    eleventyConfig.addPassthroughCopy({ "dist/jazz_behavior.js": "jazz_behavior.js" });
    eleventyConfig.addPassthroughCopy({ "docs/css/prism-atom-dark.css": "prism-atom-dark.css" });

    eleventyConfig.addNunjucksShortcode("src", function(path) { return getSourceCode(configObj, path); });

    eleventyConfig.addPlugin(syntaxHighlight, {
        lineSeparator: "\n",
    });

    return configObj;
};

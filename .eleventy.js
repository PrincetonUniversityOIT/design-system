module.exports = function(eleventyConfig) {

    eleventyConfig.setUseGitIgnore(false);
    eleventyConfig.addWatchTarget("./dist/");
    eleventyConfig.addPassthroughCopy({ "dist/styles.css": "styles.css" });
    eleventyConfig.addPassthroughCopy({ "dist/fonts.css": "fonts.css" });
    eleventyConfig.addPassthroughCopy({ "dist/fonts": "fonts" });
    eleventyConfig.addPassthroughCopy({ "dist/icons": "icons" });
    eleventyConfig.addPassthroughCopy({ "dist/img": "img" });
    eleventyConfig.addPassthroughCopy({ "dist/logos": "logos" });
    eleventyConfig.addPassthroughCopy({ "dist/design_system.js": "design_system.js" });

    return {
        dir: {
            input: "docs"
        }
    };
};

# Princeton Design System 

## Installation

This section describes the Jazz Design System installation process for projects that use
<a href="https://docs.npmjs.com/about-npm">NPM</a> (Node Package Manager) to manage project dependencies.

```
npm install @princeton-design/design-system --save
```

The Jazz Design System project structure should accommodate most use cases.  Some options are described below:

<ul>
    <li>As part of your build process, copy the appropriate files (i.e. resources folder, jazz_serif.css,
        jazz_fonts.css, and jazz_behavior.js) from the Jazz Design System node_modules folder into the appropriate
        location in your project.  Then follow the steps in the “Basic Installation” to link the CSS and javascript
        resources into your project.
    </li>
    <li>
        If you plan to integrate the Jazz Design System with other resources in your build pipeline, you would be most
        interested in source code provided in the “src/scss” and “src/js” folders.  It is recommended that
        customizations to the Design System be made alongside Design System resources as opposed to directly
        modifying the Design System sources themselves.
    </li>
</ul>

Link the script file at the bottom of your web page body (<body>) and execute the logic to enable the Princeton Design System:

```
<script src="/jazz_behavior.js"></script>
<script type="text/javascript">
    PrincetonDesignSystem.enable();
</script>
```

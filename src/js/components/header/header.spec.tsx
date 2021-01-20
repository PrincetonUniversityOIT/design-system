import {HeaderBehavior} from "./header";

it('We should be able to call new() on HeaderBehavior', () => {
    // Ensure constructor created the object:
    const header = new HeaderBehavior();
    expect(header).toBeTruthy();
});

const template = `
    <header role="banner" class="emc-header">
            <h1 class="emc-sr-only">Princeton University Design System</h1>
            <div class="emc-skip-links">
                <a href="#main-content" class="emc-skip-link">Skip to main content</a>
                <a href="#search" class="emc-skip-link">Skip to search options</a>
            </div>
            <!-- div class="emc-container" -->
                <div class="emc-header__pu-branding">
                    <div class="emc-container">
                    <a href="https://www.princeton.edu" title="Princeton University"><img src="/logos/pu-logo.svg" alt="Princeton University" /></a>
                    </div>
                </div>
                <div class="emc-header__site-branding">
                    <div class="emc-container emc-header__site-branding-contents">
                    <a href="javascript:void(0)" title="Home" rel="home" tabindex="-1" aria-hidden="true" class="emc-header__site-branding-home-link"><img src="/logos/shield.svg" /></a>
                    <div class="emc-header__site-branding-info">
                        <div class="emc-header__site-branding-name">
                            <a href="javascript:void(0);" title="Home" rel="home">Relativity</a>
                        </div>
                        <div class="emc-header__site-branding-slogan">
                            The Princeton University Design System
                        </div>
                    </div>
                    </div>
                </div>
                <nav aria-label="Main Menu" class="emc-header__main-menu">
                    <h2 class="emc-sr-only">Main Menu</h2>
                    <div class="emc-container">
                    <div class="emc-header__main-menu-navbar">
                        <button id="emc-header-menu-toggle" class="emc-header__menu-toggle" aria-expanded="false" aria-label="Navigation Menu Toggle">Menu<i id="main-icon" class="emc-icon emc-icon-menu" aria-hidden="true"></i></button>
                        <div id="emc-header__nav-container" class="emc-header__nav-container">
                            <ul class="emc-menubar" role="list">
                                <li class="emc-menubar__submenu" aria-current="true">
                                    <a href="/blocks/accordion" aria-current="page">Content Types</a>
                                    <button id="emc-header-sub-menu-toggle" type="button" class="emc-header__submenu-toggle" type="button" aria-expanded="false" aria-label="Navigation Sub Menu Toggle">
                                        <span class="emc-sr-only">
                                            Content Types
                                            SubMenu
                                        </span>
                                    </button>
                                    <div id="emc-header__subnav-container" class="emc-header__subnav-container">
                                        <ul>
                                            <li class="emc-menubar__submenu">
                                                <a href="/content-types/page">Page</a>
                                                <button class="emc-header__submenu-toggle" type="button" aria-expanded="false" aria-label="Navigation Sub Menu Toggle">
                                                    <span class="emc-sr-only">
                                                        Page
                                                        SubMenu
                                                    </span>
                                                </button>
                                                <div class="emc-header__subnav-container">
                                                    <ul role="list">
                                                        <li><a href="javascript:void(0);">Page List</a></li>
                                                        <li><a href="javascript:void(0);" aria-current="page">Sub Page</a></li>
                                                        <li><a href="javascript:void(0);">Sub Page with Right Sidebar</a></li>
                                                        <li><a href="javascript:void(0);">Landing Page</a></li>
                                                        <li><a href="javascript:void(0);">Detail Page</a></li>
                                                    </ul>
                                               </div>
                                             </li>
                                            <li aria-current="page"><a href="/content-types/page">Alert</a></li>
                                            <li>
                                                <a href="/content-types/page">News</a>
                                                <button type="button" aria-expanded="false">
                                                    <span class="emc-sr-only">
                                                        News
                                                        SubMenu
                                                    </span>
                                                </button>
                                                <ul>
                                                    <li><a href="javascript:void(0);">News List</a></li>
                                                    <li><a href="javascript:void(0);">News List with Archive Years</a></li>
                                                    <li><a href="javascript:void(0);">News Landing Page</a></li>
                                                    <li><a href="javascript:void(0);">Featured News</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="/content-types/page">Person</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="emc-menubar__submenu">
                                    <a href="/blocks/content-slider">Blocks</a>
                                    <button type="button" class="emc-header__submenu-toggle" type="button" aria-expanded="false" aria-label="Navigation Sub Menu Toggle">
                                        <span class="emc-sr-only">
                                            Blocks
                                            SubMenu
                                        </span>
                                    </button>
                                    <div class="emc-header__subnav-container">
                                        <ul>
                                            <li><a href="/content-types/page">Accordion</a></li>
                                            <li><a href="/content-types/page">Content Slider</a></li>
                                            <li><a href="/content-types/page">Feature</a></li>
                                            <li><a href="/content-types/page">iFrame</a></li>
                                            <li><a href="/content-types/page">Map</a></li>
                                            <li><a href="/content-types/page">Related Links</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <a href="/blocks/content-slider">Images &amp; Media</a>
                                    <button type="button" aria-expanded="false">
                                        <span class="emc-sr-only">
                                            Images &amp; Media
                                            SubMenu
                                        </span>
                                    </button>
                                    <ul>
                                        <li><a href="/content-types/page">Featured Images</a></li>
                                        <li><a href="/content-types/page">Billboard Image</a></li>
                                        <li><a href="/content-types/page">Billboard Slider</a></li>
                                        <li><a href="/content-types/page">Billboard Video</a></li>
                                        <li><a href="/content-types/page">Image Gallery</a></li>
                                        <li><a href="/content-types/page">Image Embed</a></li>
                                        <li><a href="/content-types/page">Social Media</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <div class="emc-header__utility-menu">
                                <ul>
                                    <li><a href="javascript void(0);">Documentation</a></li>
                                    <li><a href="javascript:void(0);">Log In</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    </div>
                </nav>
                <div class="emc-header__search-bar">
                    <div class="emc-container">
                    <h2 class="emc-sr-only">Search</h2>
                    <button id="emc-header__search-bar-toggle" class="emc-header__search-bar-toggle" aria-expanded="false" aria-label="Search Menu Toggle"><i id="search-icon" class="emc-icon emc-icon-search" aria-hidden="true"></i><span class="emc-sr-only">Search Menu Toggle</span></button>
                    <div id="emc-header__search-bar-panel" class="emc-header__search-bar-panel">
                        <form action="javascript:void(0)" method="get" accept-charset="UTF-8" role="search">
                            <label class="emc-sr-only" for="search-field">Search</label>
                            <a name="search">
                            <input type="search" id="search-field" placeholder="Search" autocomplete="off" />
                            </a>
                            <button class="emc-button" type="submit">
                              <span class="emc-sr-only">Search</span>
                            </button>
                        </form>
                    </div>
                    </div>
                </div>
            <!-- /div -->
        </header>
        <a name="main-content"></a>
`;

it('We can check if the main menu has the styles to display the content after the button click', () => {
    document.body.innerHTML = template;

    const header = new HeaderBehavior();
    header.enable();

    const menuButton = document.getElementById("emc-header-menu-toggle");
    expect(menuButton.getAttribute('aria-expanded')).toBe("false");

    const container = document.getElementById("emc-header__nav-container");
    expect(container.classList).not.toContain("emc-header__nav-container--expanded");

    const icon = document.getElementById("main-icon");
    expect(icon.classList).not.toContain("emc-icon-close");
    expect(icon.classList).toContain("emc-icon-menu");

    // opens the menu
    menuButton.click();

    // show the menu content
    expect(menuButton.getAttribute('aria-expanded')).toBe("true");
    expect(container.classList).toContain("emc-header__nav-container--expanded");
    expect(icon.classList).toContain("emc-icon-close");
    expect(icon.classList).not.toContain("emc-icon-menu");

    // closes the menu
    menuButton.click();

    // hide the menu content
    expect(menuButton.getAttribute('aria-expanded')).toBe("false");
    expect(container.classList).not.toContain("emc-header__nav-container--expanded");
    expect(icon.classList).not.toContain("emc-icon-close");
    expect(icon.classList).toContain("emc-icon-menu");
});

it('We can check if the sub main menu has the styles to display the content after the button click', () => {
    document.body.innerHTML = template;

    const header = new HeaderBehavior();
    header.enable();

    const submenuButton = document.getElementById("emc-header-sub-menu-toggle");
    expect(submenuButton.getAttribute('aria-expanded')).toBe("false");

    const subcontainer = document.getElementById("emc-header__subnav-container");
    expect(subcontainer.classList).not.toContain("emc-header__subnav-container--expanded");

    // opens the sub menu
    submenuButton.click();

    // show the submenu content
    expect(submenuButton.getAttribute('aria-expanded')).toBe("true");
    expect(subcontainer.classList).toContain("emc-header__subnav-container--expanded");

    // closes the sub menu
    submenuButton.click();

    // hide the submenu content
    expect(submenuButton.getAttribute('aria-expanded')).toBe("false");
    expect(subcontainer.classList).not.toContain("emc-header__subnav-container--expanded");
});

it('We can check if the search popup has the styles to display the content after the search button click', () => {
    document.body.innerHTML = template;

    const header = new HeaderBehavior();
    header.enable();

    const searchButton = document.getElementById("emc-header__search-bar-toggle");
    expect(searchButton.getAttribute('aria-expanded')).toBe("false");

    const searchPanel = document.getElementById("emc-header__search-bar-panel");
    expect(searchPanel.classList).not.toContain("emc-header__search-bar-panel--shown");

    const icon = document.getElementById("search-icon");
    expect(icon.classList).not.toContain("emc-icon-close");
    expect(icon.classList).toContain("emc-icon-search");

    // open the search panel
    searchButton.click();

    // show the search button content
    expect(searchButton.getAttribute('aria-expanded')).toBe("true");
    expect(searchPanel.classList).toContain("emc-header__search-bar-panel--shown");
    expect(icon.classList).toContain("emc-icon-close");
    expect(icon.classList).not.toContain("emc-icon-search");

    // close the search panel
    searchButton.click();

    // hide the search panel content
    expect(searchButton.getAttribute('aria-expanded')).toBe("false");
    expect(searchPanel.classList).not.toContain("emc-header__search-bar-panel--shown");
    expect(icon.classList).not.toContain("emc-icon-close");
    expect(icon.classList).toContain("emc-icon-search");
});


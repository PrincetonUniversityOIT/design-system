import {HeaderBehavior} from "../header/header";

it('We should be able to call new() on MenuToggleBehavior', () => {
    // Ensure constructor created the object:
    const header = new HeaderBehavior();
    expect(header).toBeTruthy();
});

const template = `
    <header role="banner" class="jazz-header">
        <h1 class="jazz-visually-hidden">Princeton University Design System</h1>
        <div class="jazz-skip-links">
            <a href="#main-content" class="jazz-skip-link">Skip to main content</a>
            <a href="#search" class="jazz-skip-link">Skip to search options</a>
        </div>
        <!-- div class="jazz-container" -->
            <div class="jazz-header__pu-branding">
                <div class="jazz-container">
                <a href="https://www.princeton.edu" title="Princeton University"><img src="/logos/pu-logo.svg" alt="Princeton University" /></a>
                </div>
            </div>
            <div class="jazz-header__site-branding">
                <div class="jazz-container jazz-header__site-branding-contents">
                <a href="javascript:void(0)" title="Home" rel="home" tabindex="-1" aria-hidden="true" class="jazz-header__site-branding-home-link"><img src="/logos/shield.svg" /></a>
                <div class="jazz-header__site-branding-info">
                    <div class="jazz-header__site-branding-name">
                        <a href="javascript:void(0);" title="Home" rel="home">Relativity</a>
                    </div>
                    <div class="jazz-header__site-branding-slogan">
                        This is the slogan
                    </div>
                </div>
                </div>
            </div>
            <nav aria-label="Main Menu" class="jazz-menu__main-menu">
                <h2 class="jazz-visually-hidden">Main Menu</h2>
                <div class="jazz-container">
                <div class="jazz-menu__main-menu-navbar">
                    <button class="jazz-menu__menu-toggle jazz-menu__menu-toggle-absolute" aria-expanded="false" aria-label="Navigation Menu Toggle">Menu<i class="jazz-icon jazz-icon-menu" aria-hidden="true"></i></button>
                    <div class="jazz-menu__nav-container">
                        <ul class="jazz-menubar" role="list">
                            <li aria-current="true">
                                <a href="javascript:void(0);" aria-current="page">Content Types</a>
                                <button class="jazz-menu__submenu-toggle" type="button" aria-expanded="false">
                                    <span class="jazz-visually-hidden">
                                        Content Types
                                        SubMenu
                                    </span>
                                </button>
                                <ul>
                                    <li>
                                        <a href="javascript:void(0);">Page</a>
                                        <button type="button" class="jazz-menu__submenu-toggle" aria-expanded="false">
                                            <span class="jazz-visually-hidden">
                                                Page
                                                SubMenu
                                            </span>
                                        </button>
                                        <ul class="jazz-menubar__submenu--shown-by-default">
                                            <li><a href="javascript:void(0);">Page List</a></li>
                                            <li><a href="javascript:void(0);" aria-current="page">Sub Page</a></li>
                                            <li><a href="javascript:void(0);">Sub Page with Right Sidebar</a></li>
                                            <li><a href="javascript:void(0);">Landing Page</a></li>
                                            <li><a href="javascript:void(0);">Detail Page</a></li>
                                        </ul>
                                     </li>
                                    <li aria-current="page"><a href="javascript:void(0);">Alert</a></li>
                                    <li>
                                        <a href="javascript:void(0);">News</a>
                                        <button type="button" aria-expanded="false">
                                            <span class="jazz-visually-hidden">
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
                                    <li><a href="javascript:void(0);">Person</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript:void(0);">Blocks</a>
                                <button type="button" class="jazz-menu__submenu-toggle" aria-expanded="false">
                                    <span class="jazz-visually-hidden">
                                        Blocks
                                        SubMenu
                                    </span>
                                </button>
                                <ul>
                                    <li><a href="javascript:void(0);">Accordion</a></li>
                                    <li><a href="javascript:void(0);">Content Slider</a></li>
                                    <li><a href="javascript:void(0);">Feature</a></li>
                                    <li><a href="javascript:void(0);">iFrame</a></li>
                                    <li><a href="javascript:void(0);">Map</a></li>
                                    <li><a href="javascript:void(0);">Related Links</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript:void(0);">Images &amp; Media</a>
                                <button class="jazz-menu__submenu-toggle" type="button" aria-expanded="false">
                                    <span class="jazz-visually-hidden">
                                        Images &amp; Media
                                        SubMenu
                                    </span>
                                </button>
                                <ul>
                                    <li><a href="javascript:void(0);">Featured Images</a></li>
                                    <li><a href="javascript:void(0);">Billboard Image</a></li>
                                    <li><a href="javascript:void(0);">Billboard Slider</a></li>
                                    <li><a href="javascript:void(0);">Billboard Video</a></li>
                                    <li><a href="javascript:void(0);">Image Gallery</a></li>
                                    <li><a href="javascript:void(0);">Image Embed</a></li>
                                    <li><a href="javascript:void(0);">Social Media</a></li>
                                </ul>
                            </li>
                        </ul>
                        <div class="jazz-header__utility-menu">
                            <ul>
                                <li><a href="javascript void(0);">Documentation</a></li>
                                <li><a href="javascript:void(0);">Log In</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                </div>
            </nav>
            <div class="jazz-header__search-bar">
                <div class="jazz-container">
                <h2 class="jazz-visually-hidden">Search</h2>
                <button id="jazz-header__search-bar-toggle" class="jazz-header__search-bar-toggle" aria-expanded="false" aria-label="Search Menu Toggle"><i id="search-icon" class="jazz-icon jazz-icon-search" aria-hidden="true"></i><span class="jazz-visually-hidden">Search Menu Toggle</span></button>
                <div id="jazz-header__search-bar-panel" class="jazz-header__search-bar-panel">
                    <form action="javascript:void(0)" method="get" accept-charset="UTF-8" role="search">
                        <label class="jazz-visually-hidden" for="search-field">Search</label>
                        <a name="search">
                        <input type="search" id="search-field" placeholder="Search" autocomplete="off" />
                        </a>
                        <button class="jazz-button" type="submit">
                          <span class="jazz-visually-hidden">Search</span>
                        </button>
                    </form>
                </div>
                </div>
            </div>
        <!-- /div -->
    </header>
    <a name="main-content"></a>
`;

it('We can check if the search popup has the styles to display the content after the search button click', () => {
    document.body.innerHTML = template;

    const header = new HeaderBehavior();
    header.enable();

    const searchButton = document.getElementById("jazz-header__search-bar-toggle");
    expect(searchButton.getAttribute('aria-expanded')).toBe("false");

    const searchPanel = document.getElementById("jazz-header__search-bar-panel");
    expect(searchPanel.classList).not.toContain("jazz-header__search-bar-panel--shown");

    const icon = document.getElementById("search-icon");
    expect(icon.classList).not.toContain("jazz-icon-close");
    expect(icon.classList).toContain("jazz-icon-search");

    // open the search panel
    searchButton.click();

    // show the search button content
    expect(searchButton.getAttribute('aria-expanded')).toBe("true");
    expect(searchPanel.classList).toContain("jazz-header__search-bar-panel--shown");
    expect(icon.classList).toContain("jazz-icon-close");
    expect(icon.classList).not.toContain("jazz-icon-search");

    // close the search panel
    searchButton.click();

    // hide the search panel content
    expect(searchButton.getAttribute('aria-expanded')).toBe("false");
    expect(searchPanel.classList).not.toContain("jazz-menu__search-bar-panel--shown");
    expect(icon.classList).not.toContain("jazz-icon-close");
    expect(icon.classList).toContain("jazz-icon-search");
});

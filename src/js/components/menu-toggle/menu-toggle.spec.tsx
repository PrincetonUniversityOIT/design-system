import {MenuToggleBehavior} from "./menu-toggle";

it('We should be able to call new() on MenuToggleBehavior', () => {
    // Ensure constructor created the object:
    const menu = new MenuToggleBehavior();
    expect(menu).toBeTruthy();
});

const template = `
    <nav aria-label="Main Menu" class="pjz-menu pjz-menu__main-menu">
        <h2 class="pjz-sr-only">Main Menu</h2>
        <div class="pjz-container">
        <div class="pjz-menu__main-menu-navbar">
            <button id="pjz-menu__menu-toggle" class="pjz-menu__menu-toggle" aria-expanded="false" aria-label="Navigation Menu Toggle">Menu<i id="main-icon" class="pjz-icon pjz-icon-menu" aria-hidden="true"></i></button>
            <div id="pjz-menu__nav-container" class="pjz-menu__nav-container">
                <ul class="pjz-menubar" role="list">
                    <li aria-current="true">
                        <a href="javascript:void(0);" aria-current="page">Content Types</a>
                        <button class="pjz-menu__submenu-toggle" type="button" aria-expanded="false">
                            <span class="pjz-sr-only">
                                Content Types
                                SubMenu
                            </span>
                        </button>
                        <ul>
                            <li>
                                <a href="javascript:void(0);">Page</a>
                                <button type="button" class="pjz-menu__submenu-toggle" aria-expanded="false">
                                    <span class="pjz-sr-only">
                                        Page
                                        SubMenu
                                    </span>
                                </button>
                                <ul class="pjz-menubar__submenu--shown-by-default">
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
                                    <span class="pjz-sr-only">
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
                        <button type="button" class="pjz-menu__submenu-toggle" aria-expanded="false">
                            <span class="pjz-sr-only">
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
                        <button class="pjz-menu__submenu-toggle" type="button" aria-expanded="false">
                            <span class="pjz-sr-only">
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
            </div>
        </div>
        </div>
    </nav>
    <a name="main-content"></a>
`;

it('We can check if the main menu has the styles to display the content after the button click', () => {
    document.body.innerHTML = template;

    const menu = new MenuToggleBehavior();
    menu.enable();

    const menuButton = document.getElementById("pjz-menu__menu-toggle");
    expect(menuButton.getAttribute('aria-expanded')).toBe("false");

    const container = document.getElementById("pjz-menu__nav-container");
    expect(container.classList).not.toContain("pjz-menu__nav-container--expanded");

    const icon = document.getElementById("main-icon");
    expect(icon.classList).not.toContain("pjz-icon-close");
    expect(icon.classList).toContain("pjz-icon-menu");

    // opens the menu
    menuButton.click();

    // show the menu content
    expect(menuButton.getAttribute('aria-expanded')).toBe("true");
    expect(container.classList).toContain("pjz-menu__nav-container--expanded");
    expect(icon.classList).toContain("pjz-icon-close");
    expect(icon.classList).not.toContain("pjz-icon-menu");

    // closes the menu
    menuButton.click();

    // hide the menu content
    expect(menuButton.getAttribute('aria-expanded')).toBe("false");
    expect(container.classList).not.toContain("pjz-menu__nav-container--expanded");
    expect(icon.classList).not.toContain("pjz-icon-close");
    expect(icon.classList).toContain("pjz-icon-menu");
});

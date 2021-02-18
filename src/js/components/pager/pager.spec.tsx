import {PagerBehavior} from "./pager";

it('We should be able to call new() on PagerBehavior', () => {
    // Ensure constructor created the object:
    const menu = new PagerBehavior();
    expect(menu).toBeTruthy();
});

const template = `
   <ul id="myPager" class="jazz-pager" role="navigation" aria-label="pagination" data-total-pages="10" data-current-page="4"></ul>   
`;

const doubleTruncTemplate = `
   <ul id="myPager" class="jazz-pager" role="navigation" aria-label="pagination" data-total-pages="20" data-current-page="7"></ul>   
`;

const disablePrevTemplate = `
   <ul id="myPager" class="jazz-pager" role="navigation" aria-label="pagination" data-total-pages="10" data-current-page="1"></ul>   
`;

const disableNextTemplate = `
   <ul id="myPager" class="jazz-pager" role="navigation" aria-label="pagination" data-total-pages="10" data-current-page="10"></ul>   
`;

it('We can check if the pager displays the page items correctly for a small pager', () => {
    document.body.innerHTML = template;

    const pager = new PagerBehavior();
    pager.enable();

    const pagerEl = document.getElementById("myPager");
    expect(pagerEl.children.length).toBe(11);

    expect(pagerEl.children[0].children[0].getAttribute('data-page')).toBe('Previous');

    expect(pagerEl.children[1].children[0].getAttribute('data-page')).toBe('1');
    expect(pagerEl.children[2].children[0].getAttribute('data-page')).toBe('2');
    expect(pagerEl.children[3].children[0].getAttribute('data-page')).toBe('3');

    expect(pagerEl.children[4].children[0].getAttribute('data-page')).toBe('4');
    expect(pagerEl.children[4].children[0].getAttribute('aria-current')).toBe('page');

    expect(pagerEl.children[5].children[0].getAttribute('data-page')).toBe('5');
    expect(pagerEl.children[6].children[0].getAttribute('data-page')).toBe('6');
    expect(pagerEl.children[7].children[0].getAttribute('data-page')).toBe('7');

    expect(pagerEl.children[8].children[0].getAttribute('data-page')).toBe('...');
    expect(pagerEl.children[8].children[0].getAttribute('aria-disabled')).toBe('true');

    expect(pagerEl.children[9].children[0].getAttribute('data-page')).toBe('10');
    expect(pagerEl.children[10].children[0].getAttribute('data-page')).toBe('Next');

});

it('We can check if the pager displays proper values after clicking next', () => {
    document.body.innerHTML = template;

    const pager = new PagerBehavior();
    pager.enable();

    const pagerEl = document.getElementById("myPager");
    expect(pagerEl.getAttribute('data-current-page')).toBe('4');
    expect(pagerEl.children.length).toBe(11);
    expect(pagerEl.children[4].children[0].getAttribute('data-page')).toBe('4');
    expect(pagerEl.children[4].children[0].getAttribute('aria-current')).toBe('page');

    const pagerEls = pagerEl.querySelectorAll("li");

    const nextLink = pagerEls[10].querySelectorAll('a');
    nextLink[0].click();

    expect(pagerEl.children.length).toBe(11);
    expect(pagerEl.getAttribute('data-current-page')).toBe('5');

    expect(pagerEl.children[0].children[0].getAttribute('data-page')).toBe('Previous');

    expect(pagerEl.children[1].children[0].getAttribute('data-page')).toBe('1');

    expect(pagerEl.children[2].children[0].getAttribute('data-page')).toBe('...');
    expect(pagerEl.children[2].children[0].getAttribute('aria-disabled')).toBe('true');

    expect(pagerEl.children[3].children[0].getAttribute('data-page')).toBe('4');

    expect(pagerEl.children[4].children[0].getAttribute('data-page')).toBe('5');
    expect(pagerEl.children[4].children[0].getAttribute('aria-current')).toBe('page');

    expect(pagerEl.children[5].children[0].getAttribute('data-page')).toBe('6');
    expect(pagerEl.children[6].children[0].getAttribute('data-page')).toBe('7');
    expect(pagerEl.children[7].children[0].getAttribute('data-page')).toBe('8');
    expect(pagerEl.children[8].children[0].getAttribute('data-page')).toBe('9');
    expect(pagerEl.children[9].children[0].getAttribute('data-page')).toBe('10');
    expect(pagerEl.children[10].children[0].getAttribute('data-page')).toBe('Next');
});

it('We can check if the pager displays proper values after clicking previous', () => {
    document.body.innerHTML = template;

    const pager = new PagerBehavior();
    pager.enable();

    const pagerEl = document.getElementById("myPager");
    expect(pagerEl.getAttribute('data-current-page')).toBe('4');
    expect(pagerEl.children.length).toBe(11);
    expect(pagerEl.children[4].children[0].getAttribute('data-page')).toBe('4');
    expect(pagerEl.children[4].children[0].getAttribute('aria-current')).toBe('page');

    const pagerEls = pagerEl.querySelectorAll("li");

    const nextLink = pagerEls[0].querySelectorAll('a');
    nextLink[0].click();

    expect(pagerEl.children.length).toBe(11);
    expect(pagerEl.getAttribute('data-current-page')).toBe('3');

    expect(pagerEl.children[0].children[0].getAttribute('data-page')).toBe('Previous');

    expect(pagerEl.children[1].children[0].getAttribute('data-page')).toBe('1');
    expect(pagerEl.children[2].children[0].getAttribute('data-page')).toBe('2');

    expect(pagerEl.children[3].children[0].getAttribute('data-page')).toBe('3');
    expect(pagerEl.children[3].children[0].getAttribute('aria-current')).toBe('page');

    expect(pagerEl.children[4].children[0].getAttribute('data-page')).toBe('4');
    expect(pagerEl.children[5].children[0].getAttribute('data-page')).toBe('5');
    expect(pagerEl.children[6].children[0].getAttribute('data-page')).toBe('6');
    expect(pagerEl.children[7].children[0].getAttribute('data-page')).toBe('7');

    expect(pagerEl.children[8].children[0].getAttribute('data-page')).toBe('...');
    expect(pagerEl.children[8].children[0].getAttribute('aria-disabled')).toBe('true');

    expect(pagerEl.children[9].children[0].getAttribute('data-page')).toBe('10');
    expect(pagerEl.children[10].children[0].getAttribute('data-page')).toBe('Next');
});

it('We can check if the pager handles the double truncation properly', () => {
    document.body.innerHTML = doubleTruncTemplate;

    const pager = new PagerBehavior();
    pager.enable();

    const pagerEl = document.getElementById("myPager");
    expect(pagerEl.children.length).toBe(11);
    expect(pagerEl.getAttribute('data-current-page')).toBe('7');

    expect(pagerEl.children[0].children[0].getAttribute('data-page')).toBe('Previous');

    expect(pagerEl.children[1].children[0].getAttribute('data-page')).toBe('1');

    expect(pagerEl.children[2].children[0].getAttribute('data-page')).toBe('...');
    expect(pagerEl.children[2].children[0].getAttribute('aria-disabled')).toBe('true');

    expect(pagerEl.children[3].children[0].getAttribute('data-page')).toBe('6');

    expect(pagerEl.children[4].children[0].getAttribute('data-page')).toBe('7');
    expect(pagerEl.children[4].children[0].getAttribute('aria-current')).toBe('page');

    expect(pagerEl.children[5].children[0].getAttribute('data-page')).toBe('8');
    expect(pagerEl.children[6].children[0].getAttribute('data-page')).toBe('9');
    expect(pagerEl.children[7].children[0].getAttribute('data-page')).toBe('10');

    expect(pagerEl.children[8].children[0].getAttribute('data-page')).toBe('...');
    expect(pagerEl.children[8].children[0].getAttribute('aria-disabled')).toBe('true');

    expect(pagerEl.children[9].children[0].getAttribute('data-page')).toBe('20');
    expect(pagerEl.children[10].children[0].getAttribute('data-page')).toBe('Next');

});

it('We can check if the prev link is disabled when the current page is 1', () => {
    document.body.innerHTML = disablePrevTemplate;

    const pager = new PagerBehavior();
    pager.enable();

    const pagerEl = document.getElementById("myPager");
    expect(pagerEl.children.length).toBe(11);

    expect(pagerEl.children[0].children[0].getAttribute('data-page')).toBe('Previous');
    expect(pagerEl.children[0].children[0].getAttribute('aria-disabled')).toBe('true');

    expect(pagerEl.children[10].children[0].getAttribute('data-page')).toBe('Next');
    expect(pagerEl.children[10].children[0].getAttribute('aria-disabled')).toBe(null);
})

it('We can check if the next link is disabled when the current page is the max page', () => {
    document.body.innerHTML = disableNextTemplate;

    const pager = new PagerBehavior();
    pager.enable();

    const pagerEl = document.getElementById("myPager");
    expect(pagerEl.children.length).toBe(11);

    expect(pagerEl.children[0].children[0].getAttribute('data-page')).toBe('Previous');
    expect(pagerEl.children[0].children[0].getAttribute('aria-disabled')).toBe(null);

    expect(pagerEl.children[10].children[0].getAttribute('data-page')).toBe('Next');
    expect(pagerEl.children[10].children[0].getAttribute('aria-disabled')).toBe('true');
});


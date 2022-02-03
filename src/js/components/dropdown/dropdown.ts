import { prefix as PREFIX } from '../../config';
import {Behavior} from "../../base/delegreater";
import {Listener} from "../../base/decorator-functions";

const DROPDOWN_SELECTOR = `.${PREFIX}-dropdown-custom`;
const SELECT_SELECTOR = `.${PREFIX}-dropdown-custom__select`;
const SELECT_TRIGGER_SELECTOR = `${PREFIX}-dropdown-custom__select__trigger`;
const ARROW_SELECTOR = `${PREFIX}-dropdown__arrow`;
const OPTION_SELECTOR = `${PREFIX}-dropdown-custom__option`;
const OPTION_LIST_SELECTOR = `${PREFIX}-dropdown-custom__options`;

export class DropdownBehavior extends Behavior {

    constructor() {
        super();
    }

    init(root: ParentNode) {
        this.createDivs(root);
        window.addEventListener('click', function(e) {
            document.querySelectorAll(SELECT_SELECTOR).forEach((select) => {
                if (!select.contains(e.target as Node)) {
                    select.classList.remove('open');
                }
            });
        });
    }

    @Listener({
        event: 'click',
        selector: DROPDOWN_SELECTOR
    })
    onClick(event: Event) {
        const wrapper = <HTMLElement> event.target;
        const selectDiv = wrapper.closest(SELECT_SELECTOR);
        selectDiv.classList.toggle('open');

        event.stopImmediatePropagation();
    }

    createTriggerDiv(selectElement) {
        let triggerDiv = document.createElement("DIV");
        triggerDiv.setAttribute("class", SELECT_TRIGGER_SELECTOR);

        // create the span that shows the selected option
        let sp = document.createElement("SPAN");
        sp.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML
        triggerDiv.append(sp);

        //create the arrow div
        let arrow = document.createElement('DIV');
        arrow.setAttribute("class", ARROW_SELECTOR);
        triggerDiv.append(arrow);

        return triggerDiv;
    }

    createOptionDiv(selectElementItem) {
        let optionDiv = document.createElement("DIV");
        optionDiv.setAttribute("class", OPTION_SELECTOR);
        optionDiv.setAttribute("data-value", selectElementItem.value);
        optionDiv.innerHTML = selectElementItem.innerHTML;
        return optionDiv;
    }

    createDivs(root) {
        let selectElement, mainSelectDiv, optionListDiv, optionDiv;

        this.select(DROPDOWN_SELECTOR, root).forEach((wrapper) => {
            selectElement = wrapper.getElementsByTagName("select")[0];
            // let selectElementCount = selectElement.length;

            // Outer select div
            mainSelectDiv = document.createElement("DIV");
            mainSelectDiv.setAttribute("class", SELECT_SELECTOR.substr(1));

            // trigger div that shows the selected element and controls hiding/showing the options
            mainSelectDiv.append(this.createTriggerDiv(selectElement));

            /* For each element, create a new DIV that will contain the option list: */
            optionListDiv = document.createElement("DIV");
            optionListDiv.setAttribute("class", OPTION_LIST_SELECTOR);

            selectElement.forEach((selectElementItem) => {
                /* For each option in the original select element,
                create a new DIV that will act as an option item: */
                optionDiv = this. createOptionDiv(selectElementItem);
                optionDiv.addEventListener("click", function() {

                    // Mark the selected option with the "selected class" and set the selected value in the triggerDiv
                    const selected = this.parentNode.querySelector('.' + OPTION_SELECTOR + '.selected');
                    if (selected) {
                        selected.classList.remove('selected');
                    }
                    this.classList.add('selected');
                    this.closest(SELECT_SELECTOR).querySelector('.' + SELECT_TRIGGER_SELECTOR + ' span').textContent = this.textContent;

                    /* When an item is clicked, update the original select box,
                    and the selected item: */
                    let selectDivs = this.parentNode.parentNode.parentNode.getElementsByTagName("select")[0];
                    selectDivs.forEach((selectDiv, index) => {
                        if (selectDiv.innerHTML == this.innerHTML) {
                            selectDivs.selectedIndex = index;
                            let selectedOptions = this.parentNode.parentNode.getElementsByClassName("selected");
                            selectedOptions.forEach((selectedOption) => {
                                selectedOption.classList.remove("selected");
                            });
                            this.classList.add("selected");
                        }
                    });
                });
                optionListDiv.appendChild(optionDiv);
            });
            mainSelectDiv.appendChild(optionListDiv);
            wrapper.appendChild(mainSelectDiv);
            mainSelectDiv.addEventListener("click", function(e) {
                /* When the select box is clicked, close any other select boxes,
                and open/close the current select box: */
                document.querySelectorAll(SELECT_SELECTOR).forEach((select) => {
                    if (!select.contains(e.target as Node)) {
                        select.classList.remove('open');
                    }
                });
            });
        });
    }
}

import {TabsBehavior} from "./tabs";
import {simulateKeyupEvent} from "../../../../jest-setup";

describe('tab initialization behavior', () => {
  it('should not throw an error when a selected tab button does not define what it controls', () => {
    document.body.innerHTML = `
        <div class="jazz-tablist" role="tablist">
          <a href="javascript:void(0)" role="tab">Tab Label 1</a>
          <a href="javascript:void(0)" role="tab" aria-selected="true">Tab Label 2</a>
          <span role="tab">Tab Disabled</span>
          <a href="javascript:void(0)" role="tab">Tab Label 3</a>
        </div>
      `;

    const tabs = new TabsBehavior();
    tabs.enable();
  });

  it('should assign tablist and tab roles', () => {
    document.body.innerHTML = `
        <div class="jazz-tablist" id="tablist">
          <a id="tab1">Tab Label 1</a>
          <a id="tab2" aria-selected="true">Tab Label 2</a>
          <span id="tab3">Tab Disabled</span>
          <a id="tab4">Tab Label 3</a>
        </div>
      `;

    const tabs = new TabsBehavior();
    tabs.enable();

    const tablist = document.getElementById("tablist");
    expect(tablist).toHaveAttribute("role", "tablist");
    const tab1 = document.getElementById("tab1");
    expect(tab1).toHaveAttribute("role", "tab");
    const tab2 = document.getElementById("tab2");
    expect(tab2).toHaveAttribute("role", "tab");
    const tab3 = document.getElementById("tab3");
    expect(tab3).toHaveAttribute("role", "tab");
    const tab4 = document.getElementById("tab4");
    expect(tab4).toHaveAttribute("role", "tab");
  });

  it('should show the section associated with the active tab if it is not already shown', () => {
    document.body.innerHTML = `
        <div class="jazz-tablist" role="tablist">
          <a role="tab" aria-controls="panel1">Tab Label 1</a>
          <a role="tab" aria-controls="panel2" aria-selected="true">Tab Label 2</a>
          <span role="tab" aria-controls="panel_disabled">Tab Disabled</span>
          <a role="tab" aria-controls="panel3">Tab Label 3</a>
        </div>
        <div id="panel1">Panel 1</div>
        <div id="panel2" hidden>Panel 2</div>
        <div id="panel3">Panel 3</div>
        <div id="panel_disabled">Panel Disabled</div>
    `;

    const panel2 = document.getElementById('panel2');

    expect(panel2).not.toBeVisible();

    const tabs = new TabsBehavior();
    tabs.enable();

    expect(panel2).toBeVisible();
  });

  it('should hide any sections associated with tabs that are not selected', () => {
    document.body.innerHTML = `
      <div class="jazz-tablist" role="tablist">
        <a role="tab" aria-controls="panel1">Tab Label 1</a>
        <a role="tab" aria-controls="panel2" aria-selected="true">Tab Label 2</a>
        <span role="tab" aria-controls="panel_disabled">Tab Disabled</span>
        <a role="tab" aria-controls="panel3">Tab Label 3</a>
      </div>
      <div id="panel1">Panel 1</div>
      <div id="panel2">Panel 2</div>
      <div id="panel3">Panel 3</div>
      <div id="panel_disabled">Panel Disabled</div>
  `;

    const tabs = new TabsBehavior();
    tabs.enable();

    const panel1 = document.getElementById('panel1');
    const panel2 = document.getElementById('panel2');
    const panel3 = document.getElementById('panel3');
    const panelDisabled = document.getElementById('panel_disabled');

    expect(panel1).not.toBeVisible();
    expect(panel2).toBeVisible();
    expect(panel3).not.toBeVisible();
    expect(panelDisabled).not.toBeVisible();

  });

  it('should make the active tab focusable and all other tabs not focusable', () => {
    document.body.innerHTML = `
        <div class="jazz-tablist" role="tablist">
          <a role="tab" id="tab1" tabindex="1">Tab Label 1</a>
          <a role="tab" id="tab2" aria-selected="true" tabindex="1">Tab Label 2</a>
          <a role="tab" id="tab3" disabled tabindex="1">Tab Disabled</a>
          <a role="tab" id="tab4" tabindex="1">Tab Label 3</a>
        </div>
      `;

    const tabs = new TabsBehavior();
    tabs.enable();

    const tab1 = document.getElementById("tab1");
    const tab2 = document.getElementById("tab2");
    const tab3 = document.getElementById("tab3");
    const tab4 = document.getElementById("tab4");

    expect(tab1).toHaveAttribute("tabindex", "-1");
    expect(tab2).toHaveAttribute("tabindex", "0");
    expect(tab3).toHaveAttribute("tabindex", "-1");
    expect(tab4).toHaveAttribute("tabindex", "-1");
  });
});

describe('tab link click behavior', () => {
  it('should select a tab link when that tab link is clicked', () => {
    document.body.innerHTML = `
        <div class="jazz-tablist" role="tablist">
          <a role="tab">Tab Label 1</a>
          <a role="tab" aria-selected="true">Tab Label 2</a>
          <a role="tab" disabled>Tab Disabled</a>
          <a role="tab" id="tab3">Tab Label 3</a>
        </div>
    `;

    const tabs = new TabsBehavior();
    tabs.enable();

    const tab3 = document.getElementById("tab3");
    expect(tab3).not.toHaveAttribute("aria-selected", "true");

    tab3.click();

    expect(tab3).toHaveAttribute("aria-selected", "true");
  });

  it('should not de-select an active tab button when it is clicked', () => {
    document.body.innerHTML = `
        <div class="jazz-tablist" role="tablist">
          <button role="tab">Tab Label 1</button>
          <button role="tab" aria-selected="true" id="button1">Tab Label 2</button>
          <button role="tab" disabled>Tab Disabled</button>
          <button role="tab">Tab Label 3</button>
        </div>
    `;

    const tabs = new TabsBehavior();
    tabs.enable();

    const button1 = document.getElementById("button1");
    expect(button1).toHaveAttribute("aria-selected", "true");

    button1.click();

    expect(button1).toHaveAttribute("aria-selected", "true");
  });

  it('should remove selection of a tab button when another tab button is clicked', () => {
    document.body.innerHTML = `
        <div class="jazz-tablist" role="tablist">
          <button role="tab">Tab Label 1</button>
          <button role="tab" id="button2" aria-selected="true" >Tab Label 2</button>
          <button role="tab" disabled>Tab Disabled</button>
          <button role="tab" id="button3">Tab Label 3</button>
        </div>
    `;

    const tabs = new TabsBehavior();
    tabs.enable();

    const button3 = document.getElementById("button3");
    const button2 = document.getElementById("button2");
    expect(button2).toHaveAttribute("aria-selected", "true");
    expect(button3).not.toHaveAttribute("aria-selected", "true");

    button3.click();

    expect(button3).toHaveAttribute("aria-selected", "true");
    expect(button2).not.toHaveAttribute("aria-selected", "true");
  });

  it('should show the section associated with the button that is clicked', () => {
    document.body.innerHTML = `
        <div class="jazz-tablist" role="tablist">
          <button role="tab" aria-controls="panel1">Tab Label 1</button>
          <button role="tab" aria-controls="panel2" aria-selected="true">Tab Label 2</button>
          <button role="tab" aria-controls="panel_disabled" disabled>Tab Disabled</button>
          <button role="tab" aria-controls="panel3" id="button3">Tab Label 3</button>
        </div>
        <div id="panel1">Panel 1</div>
        <div id="panel2">Panel 2</div>
        <div id="panel3">Panel 3</div>
        <div id="panel_disabled">Panel Disabled</div>
    `;

    const tabs = new TabsBehavior();
    tabs.enable();

    const panel1 = document.getElementById('panel1');
    const panel2 = document.getElementById('panel2');
    const panel3 = document.getElementById('panel3');
    const panelDisabled = document.getElementById('panel_disabled');

    expect(panel1).not.toBeVisible();
    expect(panel2).toBeVisible();
    expect(panel3).not.toBeVisible();
    expect(panelDisabled).not.toBeVisible();

    const button3 = document.getElementById("button3");
    button3.click();

    expect(panel1).not.toBeVisible();
    expect(panel2).not.toBeVisible();
    expect(panel3).toBeVisible();
    expect(panelDisabled).not.toBeVisible();
  });
});

describe('tab button right arrow key behavior', () => {
  describe('auto active is disabled', () => {
    it('should set focus to the next tab button without changing the selected tab button', () => {
      document.body.innerHTML = `
        <div class="jazz-tablist" role="tablist">
          <button role="tab" id="button1" aria-selected="true">Tab Label 1</button>
          <button role="tab" id="button2">Tab Label 2</button>
          <button role="tab" disabled>Tab Disabled</button>
          <button role="tab">Tab Label 3</button>
        </div>
    `;

      const tabs = new TabsBehavior();
      tabs.enable();

      const button1 = document.getElementById("button1");
      button1.focus();
      expect(button1).toHaveFocus();

      simulateKeyupEvent(button1, "ArrowRight");

      const button2 = document.getElementById("button2");
      expect(button2).toHaveFocus();
      expect(button1).toHaveAttribute("aria-selected", "true");
      expect(button2).toHaveAttribute("aria-selected", "false");
    });

    it('should skip over disabled tab buttons and not change the selected tab button', () => {
      document.body.innerHTML = `
        <div class="jazz-tablist" role="tablist">
          <button role="tab">Tab Label 1</button>
          <button role="tab" id="button1" aria-selected="true">Tab Label 2</button>
          <button role="tab" disabled>Tab Disabled</button>
          <button role="tab" id="button2">Tab Label 3</button>
        </div>
    `;

      const tabs = new TabsBehavior();
      tabs.enable();

      const button1 = document.getElementById("button1");
      button1.focus();
      expect(button1).toHaveFocus();

      simulateKeyupEvent(button1, "ArrowRight");

      const button2 = document.getElementById("button2");
      expect(button2).toHaveFocus();
      expect(button1).toHaveAttribute("aria-selected", "true");
      expect(button2).toHaveAttribute("aria-selected", "false");
    });

    it('should loop back to the beginning of the tab list when there are no enabled tabs to the right', () => {
      document.body.innerHTML = `
        <div class="jazz-tablist" role="tablist">
          <button role="tab" id="button2">Tab Label 1</button>
          <button role="tab" id="button1" aria-selected="true">Tab Label 2</button>
          <button role="tab" disabled>Tab Disabled</button>
          <button role="tab" disabled>Tab Label 3</button>
        </div>
    `;

      const tabs = new TabsBehavior();
      tabs.enable();

      const button1 = document.getElementById("button1");
      button1.focus();
      expect(button1).toHaveFocus();

      simulateKeyupEvent(button1, "ArrowRight");

      const button2 = document.getElementById("button2");
      expect(button2).toHaveFocus();
      expect(button1).toHaveAttribute("aria-selected", "true");
      expect(button2).toHaveAttribute("aria-selected", "false");
    });

    it('should not blindly set focus to the first tab when there are no enabled tabs to the right', () => {
      document.body.innerHTML = `
        <div class="jazz-tablist" role="tablist">
          <button role="tab" disabled>Tab Label 1</button>
          <button role="tab" id="button2">Tab Label 2</button>
          <button role="tab" id="button1" aria-selected="true">Tab Disabled</button>
          <button role="tab" disabled>Tab Label 3</button>
        </div>
    `;

      const tabs = new TabsBehavior();
      tabs.enable();

      const button1 = document.getElementById("button1");
      button1.focus();
      expect(button1).toHaveFocus();

      simulateKeyupEvent(button1, "ArrowRight");

      const button2 = document.getElementById("button2");
      expect(button2).toHaveFocus();
      expect(button1).toHaveAttribute("aria-selected", "true");
      expect(button2).toHaveAttribute("aria-selected", "false");
    });
  });

  describe('auto active is enabled', () => {
    it('should set focus to the next tab button without changing the selected tab button', () => {
      document.body.innerHTML = `
        <div class="jazz-tablist jazz-auto-activate" role="tablist">
          <button role="tab" id="button1" aria-selected="true">Tab Label 1</button>
          <button role="tab" id="button2">Tab Label 2</button>
          <button role="tab" disabled>Tab Disabled</button>
          <button role="tab">Tab Label 3</button>
        </div>
    `;

      const tabs = new TabsBehavior();
      tabs.enable();

      const button1 = document.getElementById("button1");
      button1.focus();
      expect(button1).toHaveFocus();

      simulateKeyupEvent(button1, "ArrowRight");

      const button2 = document.getElementById("button2");
      expect(button2).toHaveFocus();
      expect(button1).toHaveAttribute("aria-selected", "false");
      expect(button2).toHaveAttribute("aria-selected", "true");
    });

    it('should skip over disabled tab buttons and not change the selected tab button', () => {
      document.body.innerHTML = `
        <div class="jazz-tablist jazz-auto-activate" role="tablist">
          <button role="tab">Tab Label 1</button>
          <button role="tab" id="button1" aria-selected="true">Tab Label 2</button>
          <button role="tab" disabled>Tab Disabled</button>
          <button role="tab" id="button2">Tab Label 3</button>
        </div>
    `;

      const tabs = new TabsBehavior();
      tabs.enable();

      const button1 = document.getElementById("button1");
      button1.focus();
      expect(button1).toHaveFocus();

      simulateKeyupEvent(button1, "ArrowRight");

      const button2 = document.getElementById("button2");
      expect(button2).toHaveFocus();
      expect(button1).toHaveAttribute("aria-selected", "false");
      expect(button2).toHaveAttribute("aria-selected", "true");
    });

    it('should loop back to the beginning of the tab list when there are no enabled tabs to the right', () => {
      document.body.innerHTML = `
        <div class="jazz-tablist jazz-auto-activate" role="tablist">
          <button role="tab" id="button2">Tab Label 1</button>
          <button role="tab" id="button1" aria-selected="true">Tab Label 2</button>
          <button role="tab" disabled>Tab Disabled</button>
          <button role="tab" disabled>Tab Label 3</button>
        </div>
    `;

      const tabs = new TabsBehavior();
      tabs.enable();

      const button1 = document.getElementById("button1");
      button1.focus();
      expect(button1).toHaveFocus();

      simulateKeyupEvent(button1, "ArrowRight");

      const button2 = document.getElementById("button2");
      expect(button2).toHaveFocus();
      expect(button1).toHaveAttribute("aria-selected", "false");
      expect(button2).toHaveAttribute("aria-selected", "true");
    });

    it('should not blindly set focus to the first tab when there are no enabled tabs to the right', () => {
      document.body.innerHTML = `
        <div class="jazz-tablist jazz-auto-activate" role="tablist">
          <button role="tab" disabled>Tab Label 1</button>
          <button role="tab" id="button2">Tab Label 2</button>
          <button role="tab" id="button1" aria-selected="true">Tab Disabled</button>
          <button role="tab" disabled>Tab Label 3</button>
        </div>
    `;

      const tabs = new TabsBehavior();
      tabs.enable();

      const button1 = document.getElementById("button1");
      button1.focus();
      expect(button1).toHaveFocus();

      simulateKeyupEvent(button1, "ArrowRight");

      const button2 = document.getElementById("button2");
      expect(button2).toHaveFocus();
      expect(button1).toHaveAttribute("aria-selected", "false");
      expect(button2).toHaveAttribute("aria-selected", "true");
    });
  });
});

describe('tab button left arrow key behavior', () => {
  it('should navigate to the previous tab button', () => {
    document.body.innerHTML = `
      <div class="jazz-tablist" role="tablist">
        <button role="tab" id="button1">Tab Label 1</button>
        <button role="tab" id="button2" aria-selected="true">Tab Label 2</button>
        <button role="tab" disabled>Tab Disabled</button>
        <button role="tab">Tab Label 3</button>
      </div>
  `;

    const tabs = new TabsBehavior();
    tabs.enable();

    const button2 = document.getElementById("button2");
    button2.focus();
    expect(button2).toHaveFocus();

    simulateKeyupEvent(button2, "ArrowLeft");

    const button1 = document.getElementById("button1");
    expect(button1).toHaveFocus();
  });

  it('should skip over disabled tab buttons', () => {
    document.body.innerHTML = `
      <div class="jazz-tablist" role="tablist">
        <button role="tab" id="button1">Tab Label 1</button>
        <button role="tab" id="button2" aria-selected="true">Tab Label 2</button>
        <button role="tab" disabled>Tab Disabled</button>
        <button role="tab" id="button3">Tab Label 3</button>
      </div>
  `;

    const tabs = new TabsBehavior();
    tabs.enable();

    const button3 = document.getElementById("button3");
    button3.focus();
    expect(button3).toHaveFocus();

    simulateKeyupEvent(button3, "ArrowLeft");

    const button2 = document.getElementById("button2");
    expect(button2).toHaveFocus();
  });

  it('should loop back to the end of the tab list when there are no enabled tabs to the left', () => {
    document.body.innerHTML = `
      <div class="jazz-tablist" role="tablist">
        <button role="tab" disabled>Tab Label 1</button>
        <button role="tab" id="button1" aria-selected="true">Tab Label 2</button>
        <button role="tab">Tab Disabled</button>
        <button role="tab" id="button2">Tab Label 3</button>
      </div>
  `;

    const tabs = new TabsBehavior();
    tabs.enable();

    const button1 = document.getElementById("button1");
    button1.focus();
    expect(button1).toHaveFocus();

    simulateKeyupEvent(button1, "ArrowLeft");

    const button2 = document.getElementById("button2");
    expect(button2).toHaveFocus();
  });

  it('should not blindly set focus to the last tab when there are no enabled tabs to the left', () => {
    document.body.innerHTML = `
      <div class="jazz-tablist" role="tablist">
        <button role="tab" disabled>Tab Label 1</button>
        <button role="tab" id="button1" aria-selected="true">Tab Label 2</button>
        <button role="tab" id="button2">Tab Disabled</button>
        <button role="tab" disabled>Tab Label 3</button>
      </div>
  `;

    const tabs = new TabsBehavior();
    tabs.enable();

    const button1 = document.getElementById("button1");
    button1.focus();
    expect(button1).toHaveFocus();

    simulateKeyupEvent(button1, "ArrowLeft");

    const button2 = document.getElementById("button2");
    expect(button2).toHaveFocus();
  });
});

describe('tab button Home key behavior', () => {
  it('should navigate to the first tab button', () => {
    document.body.innerHTML = `
      <div class="jazz-tablist" role="tablist">
        <button role="tab" id="button2">Tab Label 1</button>
        <button role="tab" id="button1" aria-selected="true">Tab Label 2</button>
        <button role="tab" disabled>Tab Disabled</button>
        <button role="tab">Tab Label 3</button>
      </div>
  `;

    const tabs = new TabsBehavior();
    tabs.enable();

    const button1 = document.getElementById("button1");
    button1.focus();
    expect(button1).toHaveFocus();

    simulateKeyupEvent(button1, "Home");

    const button2 = document.getElementById("button2");
    expect(button2).toHaveFocus();
  });

  it('should choose the first enabled tab when the first tab is disabled', () => {
    document.body.innerHTML = `
      <div class="jazz-tablist" role="tablist">
        <button role="tab" disabled >Tab Label 1</button>
        <button role="tab" id="button2" aria-selected="true">Tab Label 2</button>
        <button role="tab" id="button1">Tab Disabled</button>
        <button role="tab">Tab Label 3</button>
      </div>
  `;

    const tabs = new TabsBehavior();
    tabs.enable();

    const button1 = document.getElementById("button1");
    button1.focus();
    expect(button1).toHaveFocus();

    simulateKeyupEvent(button1, "Home");

    const button2 = document.getElementById("button2");
    expect(button2).toHaveFocus();
  });
});

describe('tab button End key behavior', () => {
  it('should navigate to the last tab button', () => {
    document.body.innerHTML = `
      <div class="jazz-tablist" role="tablist">
        <button role="tab">Tab Label 1</button>
        <button role="tab" id="button1" aria-selected="true">Tab Label 2</button>
        <button role="tab" disabled>Tab Disabled</button>
        <button role="tab" id="button2">Tab Label 3</button>
      </div>
  `;

    const tabs = new TabsBehavior();
    tabs.enable();

    const button1 = document.getElementById("button1");
    button1.focus();
    expect(button1).toHaveFocus();

    simulateKeyupEvent(button1, "End");

    const button2 = document.getElementById("button2");
    expect(button2).toHaveFocus();
  });

  it('should choose the last enabled tab when the last tab is disabled', () => {
    document.body.innerHTML = `
      <div class="jazz-tablist" role="tablist">
        <button role="tab" disabled >Tab Label 1</button>
        <button role="tab" id="button1" aria-selected="true">Tab Label 2</button>
        <button role="tab" id="button2">Tab Disabled</button>
        <button role="tab" disabled>Tab Label 3</button>
      </div>
  `;

    const tabs = new TabsBehavior();
    tabs.enable();

    const button1 = document.getElementById("button1");
    button1.focus();
    expect(button1).toHaveFocus();

    simulateKeyupEvent(button1, "End");

    const button2 = document.getElementById("button2");
    expect(button2).toHaveFocus();
  });
});

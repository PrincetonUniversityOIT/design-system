import {TabsBehavior} from "./tabs";
import {simulateKeyupEvent} from "../../../../jest-setup";

describe('tab initialization behavior', () => {
  it('should not throw an error when a selected tab button does not define what it controls', () => {
    document.body.innerHTML = `
        <div class="jazz-tablist" role="tablist">
          <a href="javascript:void(0)" role="tab">Tab Label 1</a>
          <a href="javascript:void(0)" role="tab" aria-selected="true">Tab Label 2</a>
          <a href="javascript:void(0)" role="tab" aria-disabled="true">Tab Disabled</a>
          <a href="javascript:void(0)" role="tab">Tab Label 3</a>
        </div>
      `;

    const tabs = new TabsBehavior();
    tabs.enable();
  });

  it('should assign tablist and tab roles', () => {
    document.body.innerHTML = `
        <div class="jazz-tablist" id="tablist">
          <a href="javascript:void(0)" id="tab1">Tab Label 1</a>
          <a href="javascript:void(0)" id="tab2" aria-selected="true">Tab Label 2</a>
          <a href="javascript:void(0)" id="tab3" aria-disabled="true" >Tab Disabled</a>
          <a href="javascript:void(0)" id="tab4">Tab Label 4</a>
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
          <a href="javascript:void(0)" role="tab" aria-controls="panel1">Tab Label 1</a>
          <a href="javascript:void(0)" role="tab" aria-controls="panel2" aria-selected="true">Tab Label 2</a>
          <a href="javascript:void(0)" role="tab" aria-controls="panel_disabled" aria-disabled="true">Tab Disabled</a>
          <a href="javascript:void(0)" role="tab" aria-controls="panel3">Tab Label 3</a>
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
        <a href="javascript:void(0)" role="tab" aria-controls="panel1">Tab Label 1</a>
        <a href="javascript:void(0)" role="tab" aria-controls="panel2" aria-selected="true">Tab Label 2</a>
        <a href="javascript:void(0)" role="tab" aria-controls="panel_disabled" aria-disabled="true">Tab Disabled</a>
        <a href="javascript:void(0)" role="tab" aria-controls="panel3">Tab Label 3</a>
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
          <a href="javascript:void(0)" role="tab" id="tab1" tabindex="1">Tab Label 1</a>
          <a href="javascript:void(0)" role="tab" id="tab2" aria-selected="true" tabindex="1">Tab Label 2</a>
          <a href="javascript:void(0)" role="tab" id="tab3" aria-disabled="true" tabindex="1">Tab Disabled</a>
          <a href="javascript:void(0)" role="tab" id="tab4" tabindex="1">Tab Label 4</a>
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
          <a href="javascript:void(0)" role="tab">Tab Label 1</a>
          <a href="javascript:void(0)" role="tab" aria-selected="true">Tab Label 2</a>
          <a href="javascript:void(0)" role="tab" aria-disabled="true">Tab Disabled</a>
          <a href="javascript:void(0)" role="tab" id="tab3">Tab Label 3</a>
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
          <a href="javascript:void(0)" role="tab">Tab</a>
          <a href="javascript:void(0)" role="tab" aria-selected="true" id="tab1">Tab Label 1</a>
          <a href="javascript:void(0)" role="tab" aria-disabled="true">Tab Disabled</a>
          <a href="javascript:void(0)" role="tab">Tab</a>
        </div>
    `;

    const tabs = new TabsBehavior();
    tabs.enable();

    const tab1 = document.getElementById("tab1");
    expect(tab1).toHaveAttribute("aria-selected", "true");

    tab1.click();

    expect(tab1).toHaveAttribute("aria-selected", "true");
  });

  it('should remove selection of a tab link when another tab link is clicked', () => {
    document.body.innerHTML = `
        <div class="jazz-tablist" role="tablist">
          <a href="javascript:void(0)" role="tab">Tab Label 1</a>
          <a href="javascript:void(0)" role="tab" id="tab2" aria-selected="true" >Tab Label 2</a>
          <a href="javascript:void(0)" role="tab" aria-disabled="true">Tab Disabled</a>
          <a href="javascript:void(0)" role="tab" id="tab3">Tab Label 3</a>
        </div>
    `;

    const tabs = new TabsBehavior();
    tabs.enable();

    const tab3 = document.getElementById("tab3");
    const tab2 = document.getElementById("tab2");
    expect(tab2).toHaveAttribute("aria-selected", "true");
    expect(tab3).not.toHaveAttribute("aria-selected", "true");

    tab3.click();

    expect(tab3).toHaveAttribute("aria-selected", "true");
    expect(tab2).not.toHaveAttribute("aria-selected", "true");
  });

  it('should show the section associated with the tab that is clicked', () => {
    document.body.innerHTML = `
        <div class="jazz-tablist" role="tablist">
          <a href="javascript:void(0)" role="tab" aria-controls="panel1">Tab Label 1</a>
          <a href="javascript:void(0)" role="tab" aria-controls="panel2" aria-selected="true">Tab Label 2</a>
          <a href="javascript:void(0)" role="tab" aria-controls="panel_disabled" aria-disabled="true">Tab Disabled</a>
          <a href="javascript:void(0)" role="tab" aria-controls="panel3" id="tab3">Tab Label 3</a>
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

    const tab3 = document.getElementById("tab3");
    tab3.click();

    expect(panel1).not.toBeVisible();
    expect(panel2).not.toBeVisible();
    expect(panel3).toBeVisible();
    expect(panelDisabled).not.toBeVisible();
  });
});

describe('tab link right arrow key behavior', () => {
  describe('auto active is disabled', () => {
    it('should set focus to the next tab link without changing the selected tab link', () => {
      document.body.innerHTML = `
        <div class="jazz-tablist" role="tablist">
          <a href="javascript:void(0)" role="tab" id="tab1" aria-selected="true">Tab Label 1</a>
          <a href="javascript:void(0)" role="tab" id="tab2">Tab Label 2</a>
          <a href="javascript:void(0)" role="tab" aria-disabled="true">Tab Disabled</a>
          <a href="javascript:void(0)" role="tab">Tab Label</a>
        </div>
    `;

      const tabs = new TabsBehavior();
      tabs.enable();

      const tab1 = document.getElementById("tab1");
      tab1.focus();
      expect(tab1).toHaveFocus();

      simulateKeyupEvent(tab1, "ArrowRight");

      const tab2 = document.getElementById("tab2");
      expect(tab2).toHaveFocus();
      expect(tab1).toHaveAttribute("aria-selected", "true");
      expect(tab2).toHaveAttribute("aria-selected", "false");
    });

    it('should skip over disabled tab links and not change the selected tab link', () => {
      document.body.innerHTML = `
        <div class="jazz-tablist" role="tablist">
          <a href="javascript:void(0)" role="tab">Tab</a>
          <a href="javascript:void(0)" role="tab" id="tab1" aria-selected="true">Tab Label 1</a>
          <a href="javascript:void(0)" role="tab" aria-disabled="true">Tab Disabled</a>
          <a href="javascript:void(0)" role="tab" id="tab2">Tab Label 2</a>
        </div>
    `;

      const tabs = new TabsBehavior();
      tabs.enable();

      const tab1 = document.getElementById("tab1");
      tab1.focus();
      expect(tab1).toHaveFocus();

      simulateKeyupEvent(tab1, "ArrowRight");

      const tab2 = document.getElementById("tab2");
      expect(tab2).toHaveFocus();
      expect(tab1).toHaveAttribute("aria-selected", "true");
      expect(tab2).toHaveAttribute("aria-selected", "false");
    });

    it('should loop back to the beginning of the tab list when there are no enabled tabs to the right', () => {
      document.body.innerHTML = `
        <div class="jazz-tablist" role="tablist">
          <a href="javascript:void(0)" role="tab" id="tab2">Tab Label 2</a>
          <a href="javascript:void(0)" role="tab" id="tab1" aria-selected="true">Tab Label 1</a>
          <a href="javascript:void(0)" role="tab" aria-disabled="true">Tab Disabled</a>
          <a href="javascript:void(0)" role="tab" aria-disabled="true">Tab Disabled</a>
        </div>
    `;

      const tabs = new TabsBehavior();
      tabs.enable();

      const tab1 = document.getElementById("tab1");
      tab1.focus();
      expect(tab1).toHaveFocus();

      simulateKeyupEvent(tab1, "ArrowRight");

      const tab2 = document.getElementById("tab2");
      expect(tab2).toHaveFocus();
      expect(tab1).toHaveAttribute("aria-selected", "true");
      expect(tab2).toHaveAttribute("aria-selected", "false");
    });

    it('should not blindly set focus to the first tab when there are no enabled tabs to the right', () => {
      document.body.innerHTML = `
        <div class="jazz-tablist" role="tablist">
          <a href="javascript:void(0)" role="tab" aria-disabled="true">Tab Disabled</a>
          <a href="javascript:void(0)" role="tab" id="tab2">Tab Label 2</a>
          <a href="javascript:void(0)" role="tab" id="tab1" aria-selected="true">Tab Label 1</a>
          <a href="javascript:void(0)" role="tab" aria-disabled="true">Tab Disabled</a>
        </div>
    `;

      const tabs = new TabsBehavior();
      tabs.enable();

      const tab1 = document.getElementById("tab1");
      tab1.focus();
      expect(tab1).toHaveFocus();

      simulateKeyupEvent(tab1, "ArrowRight");

      const tab2 = document.getElementById("tab2");
      expect(tab2).toHaveFocus();
      expect(tab1).toHaveAttribute("aria-selected", "true");
      expect(tab2).toHaveAttribute("aria-selected", "false");
    });
  });

  describe('auto active is enabled', () => {
    it('should set focus to the next tab link without changing the selected tab link', () => {
      document.body.innerHTML = `
        <div class="jazz-tablist jazz-auto-activate" role="tablist">
          <a href="javascript:void(0)" role="tab" id="tab1" aria-selected="true">Tab Label 1</a>
          <a href="javascript:void(0)" role="tab" id="tab2">Tab Label 2</a>
          <a href="javascript:void(0)" role="tab" aria-disabled="true">Tab Disabled</a>
          <a href="javascript:void(0)" role="tab">Tab Label</a>
        </div>
    `;

      const tabs = new TabsBehavior();
      tabs.enable();

      const tab1 = document.getElementById("tab1");
      tab1.focus();
      expect(tab1).toHaveFocus();

      simulateKeyupEvent(tab1, "ArrowRight");

      const tab2 = document.getElementById("tab2");
      expect(tab2).toHaveFocus();
      expect(tab1).toHaveAttribute("aria-selected", "false");
      expect(tab2).toHaveAttribute("aria-selected", "true");
    });

    it('should skip over disabled tab links and not change the selected tab link', () => {
      document.body.innerHTML = `
        <div class="jazz-tablist jazz-auto-activate" role="tablist">
          <a href="javascript:void(0)" role="tab">Tab Label</a>
          <a href="javascript:void(0)" role="tab" id="tab1" aria-selected="true">Tab Label 1</a>
          <a href="javascript:void(0)" role="tab" aria-disabled="true">Tab Disabled</a>
          <a href="javascript:void(0)" role="tab" id="tab2">Tab Label 2</a>
        </div>
    `;

      const tabs = new TabsBehavior();
      tabs.enable();

      const tab1 = document.getElementById("tab1");
      tab1.focus();
      expect(tab1).toHaveFocus();

      simulateKeyupEvent(tab1, "ArrowRight");

      const tab2 = document.getElementById("tab2");
      expect(tab2).toHaveFocus();
      expect(tab1).toHaveAttribute("aria-selected", "false");
      expect(tab2).toHaveAttribute("aria-selected", "true");
    });

    it('should loop back to the beginning of the tab list when there are no enabled tabs to the right', () => {
      document.body.innerHTML = `
        <div class="jazz-tablist jazz-auto-activate" role="tablist">
          <a href="javascript:void(0)" role="tab" id="tab2">Tab Label 1</a>
          <a href="javascript:void(0)" role="tab" id="tab1" aria-selected="true">Tab Label 2</a>
          <a href="javascript:void(0)" role="tab" aria-disabled="true">Tab Disabled</a>
          <a href="javascript:void(0)" role="tab" aria-disabled="true">Tab Disabled</a>
        </div>
    `;

      const tabs = new TabsBehavior();
      tabs.enable();

      const tab1 = document.getElementById("tab1");
      tab1.focus();
      expect(tab1).toHaveFocus();

      simulateKeyupEvent(tab1, "ArrowRight");

      const tab2 = document.getElementById("tab2");
      expect(tab2).toHaveFocus();
      expect(tab1).toHaveAttribute("aria-selected", "false");
      expect(tab2).toHaveAttribute("aria-selected", "true");
    });

    it('should not blindly set focus to the first tab when there are no enabled tabs to the right', () => {
      document.body.innerHTML = `
        <div class="jazz-tablist jazz-auto-activate" role="tablist">
          <a href="javascript:void(0)" role="tab" aria-disabled="true">Tab Disabled</a>
          <a href="javascript:void(0)" role="tab" id="tab2">Tab Label 2</a>
          <a href="javascript:void(0)" role="tab" id="tab1" aria-selected="true">Tab Label 1</a>
          <a href="javascript:void(0)" role="tab" aria-disabled="true">Tab Label 3</a>
        </div>
    `;

      const tabs = new TabsBehavior();
      tabs.enable();

      const tab1 = document.getElementById("tab1");
      tab1.focus();
      expect(tab1).toHaveFocus();

      simulateKeyupEvent(tab1, "ArrowRight");

      const tab2 = document.getElementById("tab2");
      expect(tab2).toHaveFocus();
      expect(tab1).toHaveAttribute("aria-selected", "false");
      expect(tab2).toHaveAttribute("aria-selected", "true");
    });
  });
});

describe('tab button left arrow key behavior', () => {
  it('should navigate to the previous tab link', () => {
    document.body.innerHTML = `
      <div class="jazz-tablist" role="tablist">
        <a href="javascript:void(0)" role="tab" id="tab1">Tab Label 1</a>
        <a href="javascript:void(0)" role="tab" id="tab2" aria-selected="true">Tab Label 2</a>
        <a href="javascript:void(0)" role="tab" aria-disabled="true">Tab Disabled</a>
        <a href="javascript:void(0)" role="tab">Tab Label 3</a>
      </div>
  `;

    const tabs = new TabsBehavior();
    tabs.enable();

    const tab2 = document.getElementById("tab2");
    tab2.focus();
    expect(tab2).toHaveFocus();

    simulateKeyupEvent(tab2, "ArrowLeft");

    const tab1 = document.getElementById("tab1");
    expect(tab1).toHaveFocus();
  });

  it('should skip over disabled tab links', () => {
    document.body.innerHTML = `
      <div class="jazz-tablist" role="tablist">
        <a href="javascript:void(0)" role="tab" id="tab1">Tab Label 1</a>
        <a href="javascript:void(0)" role="tab" id="tab2" aria-selected="true">Tab Label 2</a>
        <a href="javascript:void(0)" role="tab" aria-disabled="true">Tab Disabled</a>
        <a href="javascript:void(0)" role="tab" id="tab3">Tab Label 3</a>
      </div>
  `;

    const tabs = new TabsBehavior();
    tabs.enable();

    const tab3 = document.getElementById("tab3");
    tab3.focus();
    expect(tab3).toHaveFocus();

    simulateKeyupEvent(tab3, "ArrowLeft");

    const tab2 = document.getElementById("tab2");
    expect(tab2).toHaveFocus();
  });

  it('should loop back to the end of the tab list when there are no enabled tabs to the left', () => {
    document.body.innerHTML = `
      <div class="jazz-tablist" role="tablist">
        <a href="javascript:void(0)" role="tab" aria-disabled="true">Tab Disabled</a>
        <a href="javascript:void(0)" role="tab" id="tab1" aria-selected="true">Tab Label 1</a>
        <a href="javascript:void(0)" role="tab">Tab</a>
        <a href="javascript:void(0)" role="tab" id="tab2">Tab Label 2</a>
      </div>
  `;

    const tabs = new TabsBehavior();
    tabs.enable();

    const tab1 = document.getElementById("tab1");
    tab1.focus();
    expect(tab1).toHaveFocus();

    simulateKeyupEvent(tab1, "ArrowLeft");

    const tab2 = document.getElementById("tab2");
    expect(tab2).toHaveFocus();
  });

  it('should not blindly set focus to the last tab when there are no enabled tabs to the left', () => {
    document.body.innerHTML = `
      <div class="jazz-tablist" role="tablist">
        <a href="javascript:void(0)" role="tab" aria-disabled="true">Tab Disabled</a>
        <a href="javascript:void(0)" role="tab" id="tab1" aria-selected="true">Tab Label 1</a>
        <a href="javascript:void(0)" role="tab" id="tab2">Tab Label 2</a>
        <a href="javascript:void(0)" role="tab" aria-disabled="true">Tab Disabled</a>
      </div>
  `;

    const tabs = new TabsBehavior();
    tabs.enable();

    const tab1 = document.getElementById("tab1");
    tab1.focus();
    expect(tab1).toHaveFocus();

    simulateKeyupEvent(tab1, "ArrowLeft");

    const tab2 = document.getElementById("tab2");
    expect(tab2).toHaveFocus();
  });
});

describe('tab link Home key behavior', () => {
  it('should navigate to the first tab link', () => {
    document.body.innerHTML = `
      <div class="jazz-tablist" role="tablist">
        <a href="javascript:void(0)" role="tab" id="tab2">Tab Label 2</a>
        <a href="javascript:void(0)" role="tab" id="tab1" aria-selected="true">Tab Label 1</a>
        <a href="javascript:void(0)" role="tab" aria-disabled="true">Tab Disabled</a>
        <a href="javascript:void(0)" role="tab">Tab Label</a>
      </div>
  `;

    const tabs = new TabsBehavior();
    tabs.enable();

    const tab1 = document.getElementById("tab1");
    tab1.focus();
    expect(tab1).toHaveFocus();

    simulateKeyupEvent(tab1, "Home");

    const tab2 = document.getElementById("tab2");
    expect(tab2).toHaveFocus();
  });

  it('should choose the first enabled tab when the first tab is disabled', () => {
    document.body.innerHTML = `
      <div class="jazz-tablist" role="tablist">
        <a href="javascript:void(0)" role="tab" aria-disabled="true">Tab Disabled</a>
        <a href="javascript:void(0)" role="tab" id="tab2" aria-selected="true">Tab Label 2</a>
        <a href="javascript:void(0)" role="tab" id="tab1">Tab Label 1</a>
        <a href="javascript:void(0)" role="tab">Tab</a>
      </div>
  `;

    const tabs = new TabsBehavior();
    tabs.enable();

    const tab1 = document.getElementById("tab1");
    tab1.focus();
    expect(tab1).toHaveFocus();

    simulateKeyupEvent(tab1, "Home");

    const tab2 = document.getElementById("tab2");
    expect(tab2).toHaveFocus();
  });
});

describe('tab link End key behavior', () => {
  it('should navigate to the last tab link', () => {
    document.body.innerHTML = `
      <div class="jazz-tablist" role="tablist">
        <a href="javascript:void(0)" role="tab">Tab</a>
        <a href="javascript:void(0)" role="tab" id="tab1" aria-selected="true">Tab Label 1</a>
        <a href="javascript:void(0)" role="tab" aria-disabled="true">Tab Disabled</a>
        <a href="javascript:void(0)" role="tab" id="tab2">Tab Label 2</a>
      </div>
  `;

    const tabs = new TabsBehavior();
    tabs.enable();

    const tab1 = document.getElementById("tab1");
    tab1.focus();
    expect(tab1).toHaveFocus();

    simulateKeyupEvent(tab1, "End");

    const tab2 = document.getElementById("tab2");
    expect(tab2).toHaveFocus();
  });

  it('should choose the last enabled tab when the last tab is disabled', () => {
    document.body.innerHTML = `
      <div class="jazz-tablist" role="tablist">
        <a href="javascript:void(0)" role="tab" aria-disabled="true" >Tab Disabled</a>
        <a href="javascript:void(0)" role="tab" id="tab1" aria-selected="true">Tab Label 1</a>
        <a href="javascript:void(0)" role="tab" id="tab2">Tab Label 2</a>
        <a href="javascript:void(0)" role="tab" aria-disabled="true">Tab Disabled</a>
      </div>
  `;

    const tabs = new TabsBehavior();
    tabs.enable();

    const tab1 = document.getElementById("tab1");
    tab1.focus();
    expect(tab1).toHaveFocus();

    simulateKeyupEvent(tab1, "End");

    const tab2 = document.getElementById("tab2");
    expect(tab2).toHaveFocus();
  });
});

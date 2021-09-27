/**
 * Manage Active Component instances through the Actor Sheet via component control buttons.
 * @param {MouseEvent} event      The left-click event on the component control
 * @param {Actor|Item} owner      The owning entity which manages this component
 */
 export function onManageActiveComponent(event, owner) {
    event.preventDefault();
    const a = event.currentTarget;
    const li = a.closest("li");
    const component = li.dataset.componentId ? owner.component.get(li.dataset.componentId) : null;
    switch ( a.dataset.action ) {
      case "create":
        html.find('.item-create').click(this._onItemCreate.bind(this));
      case "edit":
        return component.sheet.render(true);
      case "delete":
        return component.delete();
      case "toggle":
        return component.update({disabled: !component.data.disabled});
    }
  }
  
  /**
   * Prepare the data structure for Active components which are currently applied to an Actor or Item.
   * @param {ActiveComponent[]} component    The array of Active component instances to prepare sheet data for
   * @return {object}                   Data for rendering
   */
  export function prepareActiveComponentCategories(component) {
  
      // Define component header categories
      const locations = {
        head: {
          location : "head",
          label: "Head",
          mods: []
        },
        torso: {
          location : "torso",
          label: "torso",
          mods: []
        },
        rightArm: {
          location : "rightArm",
          label: "Right Arm",
          mods: []
        },
        leftArm: {
          location : "leftArm",
          label: "Left Arm",
          mods: []
        },
        rightLeg: {
          location : "rightLeg",
          label: "Right Leg",
          mods: []
        },
        leftLeg: {
          location : "leftLeg",
          label: "Left Leg",
          mods: []
        }
      };
  
      // Iterate over active components, classifying them into categories
      for ( let e of components ) {
        e._getSourceName(); // Trigger a lookup for the source name
        if ( e.data.disabled ) categories.inactive.components.push(e);
        else if ( e.isTemporary ) categories.temporary.components.push(e);
        else categories.passive.components.push(e);
      }
      return categories;
  }
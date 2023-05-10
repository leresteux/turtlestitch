// backport from Snap 8.0 - default to nagging dialogs

DialogBoxMorph.prototype.init = function (target, action, environment) {
    // additional properties:
    this.is3D = false; // for "flat" design exceptions
    this.target = target || null;
    this.action = action || null;
    this.environment = environment || null;
    this.key = null; // keep track of my purpose to prevent mulitple instances
    this.nag = true;

    this.labelString = null;
    this.label = null;
    this.head = null;
    this.body = null;
    this.buttons = null;

    // initialize inherited properties:
    DialogBoxMorph.uber.init.call(this);

    // override inherited properites:
    this.isDraggable = true;
    this.noDropShadow = true;
    this.fullShadowSource = false;
    this.color = PushButtonMorph.prototype.color;
    this.createLabel();
    this.createButtons();
    this.setExtent(new Point(300, 150));
    return this;
};
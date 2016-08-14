"use strict";

(function () {

  var selection_API = function (selectSelector, classSelected) {
    this.$select = $(selectSelector);
    this.classSelected = classSelected;
  };

  selection_API.prototype.select = function(el) {
    var $el = $(el);
    if( $el.hasClass(this.classSelected) ) { // option already selected
      return;
    }
    $el.addClass(this.classSelected);
    return el;
  };

  selection_API.prototype.deselect = function(el) {
    $(el).removeClass(this.classSelected);
    return el;
  };

  selection_API.prototype.toggle = function(el) {
    if( $(el).hasClass(this.classSelected) ) {
      this.deselect(el);
    } else {
      this.select(el);
    }
  };

  selection_API.prototype.getAll = function() {
    return this.$select.find("option." + this.classSelected);
  };

  selection_API.prototype.resetSelection = function() {
    for(var i = 0, selection = this.getAll(); this.deselect(selection[i]); i++) {};
  };

  selection_API.prototype.getAllVal = function() {
    var ret = [];
    $.each(this.getAll(), function(index, optionEl) {
      ret.push(optionEl.value);
    });
    return ret;
  }

  // the function contructor is registered as module
  $.fn.MultiSelect.modules['selection_API'] = selection_API;

})();

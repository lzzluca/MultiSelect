/**
 *
 * This module generates a crossbrowser selection by categories, as footer of the target select.
 * You can make it enabled specifing "enableCategoriesSel: true" in the plugin options object.
 * You need to apply it on a select with at least one optgroup to see it working.
 *
 */

"use strict";

(function () {

  var categories_selection = function(targetSelect) {
    this.$trgtSelect = $(targetSelect);

    $('<div class = "multiselect_main_categories"/>').insertBefore( this.$trgtSelect )
                                                     .append( this.$trgtSelect )
                                                     .append( this._getDOMObjWrapper() );
  };

  categories_selection.prototype._getDOMObjWrapper = function(){
    var wrapper = $("<div class = 'multiselect_wrap_categories'></div>"),
        list = [],
         _this = this;

  $.each(this.$trgtSelect.find("optgroup"), function(index, value){
    list[index] = $("<div class = 'category' id = " + value.label + ">" + value.label +  "</div>").click(function(){
      _this.selectAllOptionsFromOptgroup( this.id );
    });
  });

  $.each(list, function(index, value){  wrapper.append( value );  });
    return wrapper;
  };

  categories_selection.prototype.selectAllOptionsFromOptgroup = function(label){
    var list = this.$trgtSelect.find("optgroup");

    for(var i = 0; list[i]; i++)
      if(list[i].label == label)
        break;

    if(i == list.length)
      return;

    var selObj = $.data(this.$trgtSelect.get(0), "MultiSelect_selection") || { toggle: function(){} };

    $.each( $( list[i] ).find("option"), function(index, value){  selObj.toggle(value);  });
  }

  // the function contructor is registered as module
  $.fn.MultiSelect.modules['categories_selection'] = categories_selection;

})();

/*
 * jQuery MultiSelect
 *
 * Author:
 * Luca Lazzarini ( lzzluca@gmail.com  http://nerdstuckathome.wordpress.com/ )
 *
 * Co author:
 * Karol Kowalski ( https://github.com/karolk )
 *
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://nerdstuckathome.wordpress.com/2012/08/10/multi-select-avoiding-ctrl-button/
 * https://github.com/lzzluca/MultiSelect/
 *
 * Version:
 * 1.1
 *
 * Depends:
 * ui.core.js
 *
 * Todo:
 * Will follow
 *
 *
 * I built it in my current company, it is WCN (wcn.co.uk), and i was allowed to release it as open source. Thanks (particularly to Jack Hobson)!
 */

"use strict";

(function( $ ) {

  $.fn.MultiSelect = function(options) {

    if( typeof(options) != "object" ) {
      options = {};
    }

    var settings = $.extend({
      size: 10,
      css_class_selected: "selected",
      enableCategoriesSel: false,
      keepPrevSelection: true,
      // note: it is false by default because it is to be tested but would make
      // sense to have it as true by default
      allowSubmit: false
    }, options);

    // modules available for the Multiselect
    // TODO I just assume the modules are correctly loaded: a check would
    // be nice!
    var modules = $.fn.MultiSelect.modules;

    var methods = {

      _attachSelectionAtOnChange: function() {
        this.change(function() {
          var list = $(this).find(":selected"),
              selMethods = $.data(this, "MultiSelect_selection"),
              $clone = $.data(this, "MultiSelect_clone");
          for (var i = 0, $option, $option_clone; list[i]; i++) {
            $option = $(list[i]);
            selMethods.toggle( $option.get(0) );
            $option.attr("selected", false);

            // if the clone select is defined, the selection is update on it too
            if( $clone ) {
              var $option_clone = $clone.children()[ $option.prop("index") ];
              $option_clone = $( $option_clone );
              // TODO check "selected" should be equals "selected" or true?
              $option_clone.attr("selected") === "selected" ? $option_clone.removeAttr("selected") : $option_clone.attr("selected", "selected");
            }
          }
        });
      },

      _getSelection: function() {
        // returns the stored instance, when there is, otherwise a new
        // one is created
        return $.data(this.get(0), "MultiSelect_selection") ||
               $.data(this.get(0), "MultiSelect_selection", new modules.selection_API(this, settings.css_class_selected));
      },

      _applyCategoriesSelection: function() {
        new modules.categories_selection(this);
      },

      _createClone : function($this) {
        var $clone = $("<select></select>");
        $clone.prop( "id", $this.prop("id") + "_clone" );
        $clone.attr( "name", $this.attr("name") );
        $clone.attr( "multiple", true );
        $clone.html( $this.html() );
        $clone.hide();
        $clone.insertAfter( $this );
        $this.attr( "name", $this.attr("name") + "_not_submitted" );
        $this.data( "MultiSelect_clone", $clone );
      }

    };

    // --- Main --- //

    var ret = []
    this.each(function() {

      var $this = $(this);
      ret.push( methods._getSelection.call($this) );
      methods._attachSelectionAtOnChange.call($this);
      if ( !$this.attr("multiple") ) {
        $this.attr("multiple", true);
      }
      $this.attr("size", settings.size);

      // generates clickable shortcuts to toggle all the options into an optgroup

      settings.enableCategoriesSel && methods._applyCategoriesSelection.call($this);

      // this keeps the previous selection (thanks to a dev I don't know the name of!)

      settings.keepPrevSelection && $this.find('option[selected=selected]').addClass(settings.css_class_selected);

      // builds a clone select (that gets the name of the original) to be submitted

      settings.allowSubmit && $this.attr("name") && methods._createClone($this);

    });

    return ret;
  };

  // modules hashmap: here is where the modules should be registered
  $.fn.MultiSelect.modules = {};

})( jQuery );


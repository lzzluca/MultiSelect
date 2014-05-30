/**
 * This code runs only once, when the script it loaded!
 *
 * The Multiselect uses a custom hook but all the other selects will keep
 * using the standard one.
 * Here is where the custom hook is defined and applied.
 *
 * Probably all a module for this code is too much but it bother me to mix
 * pieces of code not related each other.
 */

"use strict";

(function () {

  if( !$.valHooks['select'].original_get) {      
    
    $.valHooks['select'].original_get = $.valHooks["select"].get;

    $.valHooks['select'].get = function(el) {
      var selMethods = $.data(el, "MultiSelect_selection");

      if(selMethods) {
        var currentSel = selMethods.getAllVal(),
            newSel = jQuery.valHooks["select"].original_get(el);
        if(newSel == null) {
          newSel = [];
        }
        var selection = [].concat(currentSel, newSel);
        return !selection.length ? null : selection;
      }

      return jQuery.valHooks["select"].original_get(el);
    }

  }

})();

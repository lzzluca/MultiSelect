// --- jQuery val method ovveride --- //

if( !$.valHooks['select'].original_get) {      
  
    $.valHooks['select'].original_get = $.valHooks["select"].get;
    $.valHooks['select'].get = function(el) {
        var selMethods = $.data(el, "MultiSelect_selection");
        if(selMethods) {
            var currentSel = selMethods.getAllVal(),
                newSel = jQuery.valHooks["select"].original_get(el);
            if(newSel == null)
                newSel = [];
            var selection = [].concat(currentSel, newSel);
            return !selection.length ? null : selection;
        }
        return jQuery.valHooks["select"].original_get(el);
    }

}

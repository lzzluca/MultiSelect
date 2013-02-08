// --- Main --- //

if( typeof(options) != "object" )
    options = {};

var settings = $.extend({
    size: 10,
    css_class_selected: "selected",
    enableCategoriesSel: false
}, options);

var ret = [];    
this.each(function() {
    
    var $this = $(this);
    ret.push( methods._getSelection.apply($this, [settings.css_class_selected]) );
    methods._attachSelectionAtOnChange.call($this);
    if ( !$this.attr("multiple") ) {
        $this.attr("multiple", true);
    }
    $this.attr("size", settings.size);

    // optional features

    settings.enableCategoriesSel && methods._applyCategoriesSelection.call($this);

});

return ret;

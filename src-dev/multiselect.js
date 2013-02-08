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

(function( $ ) {

    // --- module selection_API --- //

    var selection_API = function (selectSelector, classSelected) {
        this.$select = $(selectSelector);
        this.classSelected = classSelected;
    };
    selection_API.prototype.select = function(el) {
        var $el = $(el);
        if( $el.hasClass(this.classSelected) ) // option already selected
            return;
        $el.addClass(this.classSelected);
        return el;
    };
    selection_API.prototype.deselect = function(el) {
        $(el).removeClass(this.classSelected);
        return el;
    };
    selection_API.prototype.toggle = function(el) {
        if( $(el).hasClass(this.classSelected) )
            this.deselect(el);
        else
            this.select(el);
    };
    selection_API.prototype.getAll = function() {
        return this.$select.find("option." + this.classSelected);
    };
    selection_API.prototype.resetSelection = function() {
        for(var i = 0, selection = this.getAll(); this.deselect(selection[i]); i++);
    };
    selection_API.prototype.getAllVal = function() {
        var ret = [];
        $.each(this.getAll(), function(index, optionEl) {
            ret.push(optionEl.value);
        });
        return ret;
    }

    // --- end module selection_API --- //


    // --- module categoriesSelection --- //
    /**
     *
     * This module generates a crossbrowser selection by categories, as footer of the target select.
     * You can make it enabled specifing "enableCategoriesSel: true" in the plugin options object.
     * You need to apply it on a select with at least one optgroup to see it working.
     *
     */

    var categoriesSelection = function(targetSelect) {
        this.$trgtSelect = $(targetSelect);

        $('<div class = "multiselect_main_categories"/>').insertBefore( this.$trgtSelect )
                                                         .append( this.$trgtSelect )
                                                         .append( this._getDOMObjWrapper() );
    };
    categoriesSelection.prototype._getDOMObjWrapper = function(){
        var wrapper = $("<div class = 'multiselect_wrap_categories'></div>"),
            list = [],
            _this = this;

        $.each(this.$trgtSelect.find("optgroup"), function(index, value){
            list[index] = $("<div class = 'category' id = " + value.label + ">" + 
                                value.label + 
                            "</div>").click(function(){
                                                _this.selectAllOptionsFromOptgroup( this.id );
                                            });
        });

        $.each(list, function(index, value){  wrapper.append( value );  });

        return wrapper;
    };
    categoriesSelection.prototype.selectAllOptionsFromOptgroup = function(label){
        var list = this.$trgtSelect.find("optgroup");

        for(var i = 0; list[i]; i++)
            if(list[i].label == label)
                break;

        if(i == list.length)
            return;
        
        var selObj = $.data(this.$trgtSelect.get(0), "MultiSelect_selection") || { toggle: function(){} };

        $.each( $( list[i] ).find("option"), function(index, value){  selObj.toggle(value);  });
    }

    // --- end module categoriesSelection --- //

    
    $.fn.MultiSelect = function(options) {


        if( typeof(options) != "object" )
            options = {};

        var settings = $.extend({
            size: 10,
            css_class_selected: "selected",
            enableCategoriesSel: false
        }, options);

        var methods = {

            _attachSelectionAtOnChange: function() {
                this.change(function() {
                    var list = $(this).find(":selected"),
                        selMethods = $.data(this, 'MultiSelect_selection');
                    for (var i = 0, $option; list[i]; i++) {
                        $option = $(list[i]);
                        selMethods.toggle( $option.get(0) );
                        $option.attr("selected", false);
                    }
                });
            },

            _getSelection: function() {

                var selMethods = $.data(this.get(0), "MultiSelect_selection");

                if (selMethods) {
                    return selMethods;
                }

                // new selection instance

                selMethods = $.data(this.get(0), "MultiSelect_selection", new selection_API(this, settings.css_class_selected));
                
                return selMethods;
            },

            _applyCategoriesSelection: function() {
                new categoriesSelection(this);
            }

        };


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

        // --- end override --- //

    
        // --- Main --- //

        var ret = [];    
        this.each(function() {
            
            var $this = $(this);
            ret.push( methods._getSelection.call($this) );
            methods._attachSelectionAtOnChange.call($this);
            if ( !$this.attr("multiple") ) {
                $this.attr("multiple", true);
            }
            $this.attr("size", settings.size);

            // optional features

            settings.enableCategoriesSel && methods._applyCategoriesSelection.call($this);

        });

        // --- end Main --- //

        return ret;
    };    
    
})( jQuery );


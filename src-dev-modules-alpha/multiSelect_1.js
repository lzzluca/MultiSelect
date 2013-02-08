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

    _getSelection: function(css_class_selected) {

        var selMethods = $.data(this.get(0), "MultiSelect_selection");

        if (selMethods) {
            return selMethods;
        }

        // new selection instance

        selMethods = $.data(this.get(0), "MultiSelect_selection", new selection_API(this, css_class_selected));
        
        return selMethods;
    },

    _applyCategoriesSelection: function() {
        new categoriesSelection(this);
    }

};

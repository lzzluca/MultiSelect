#
### WORK IN PROGRESS... IGNORE IT AT THE MOMENT ###
#


# When != 0, the code is not minimized
DEBUG = 1 

# Set the source directory
SRC_FOLDER = ../src-dev/

# Create the list of modules (the order is important)
MODULES = (\
	  cat $(SRC_FOLDER)header.js &&\
	  echo "(function( $$ ){" &&\
	  cat $(SRC_FOLDER)selection_API.js &&\
	  cat $(SRC_FOLDER)categoriesSelection.js &&\
	  echo "$$.fn.MultiSelect=function(options) {" &&\
	  cat $(SRC_FOLDER)multiSelect_1.js &&\
	  cat $(SRC_FOLDER)multiSelect_2.js &&\
	  cat $(SRC_FOLDER)multiSelect_3.js &&\
	  echo "};" &&\
	  echo "})(jQuery);"\
	  )

# Output folder, name and path for modules
OUTPUT_FOLDER =
OUTPUT_NAME = multiselect
OUTPUT_FILE = $(OUTPUT_FOLDER)$(OUTPUT_NAME)

# Compiler bin and flags
COMPILER_BIN = ~/bin/Utils/google_compiler/compiler.jar
COMPILER_FLAGS = --js=$(MODULES) --js_output_file=$(OUTPUT_FILE)-min.js --language_in ECMASCRIPT5_STRICT; 

ifeq ($(DEBUG),0)
	BUILD_COMMAND = java -jar $(COMPILER_BIN) $(COMPILER_FLAGS)
else 
	BUILD_COMMAND = $(MODULES) > "$(OUTPUT_FILE)-min.js"
endif

multiselect-min.js:
	$(BUILD_COMMAND)

.PHONY: clean
clean:
	rm $(OUTPUT_NAME)-min.js

#all: clean $(OUTPUT_FILE)-min.js

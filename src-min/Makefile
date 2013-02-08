# This Make has two modes:
# DEBUG = 0 : the code is minimized using google compiler (https://developers.google.com/closure/compiler/).
#             The google compiler's path is specified by the var COMPILER_BIN.
#             the output file name and folder is specified by the vars OUTPUT_NAME and OUTPUT_FOLDER
#
# DEBUG = 1

# When != 0, the code is not minimized
DEBUG = 0

# Set the source directory
SRC_FOLDER = ../src-dev/

# Create the list of modules
MODULES = $(SRC_FOLDER)multiselect.js

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
	BUILD_COMMAND = cat $(MODULES) > "$(OUTPUT_FILE)-min.js"
endif

multiselect-min.js:
	$(BUILD_COMMAND)

.PHONY: clean
clean:
	rm $(OUTPUT_NAME)-min.js

#all: clean $(OUTPUT_FILE)-min.js

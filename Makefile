.PHONY: run
run:
	ags -c ./config.js

# Create symlink for type information used by editor autocomplete
types:
	ln -s /usr/share/com.github.Aylur.ags/types ./types

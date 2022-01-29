name="$(filter-out $@,$(MAKECMDGOALS))"

model:
	@echo "Making model \`$(name)\`..."
	@mkdir src/models/$(name)
	@sed "s/NAME/$(name)/g" seeds/model/index.js > src/models/$(name)/index.js
	@cp -r seeds/model/displays src/models/$(name)/
	@echo "Done."

# [see] https://stackoverflow.com/a/6273809
%:
	@:

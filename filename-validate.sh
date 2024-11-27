#!/bin/bash
REGISTRY_DIR="registry"

for json_file in "${REGISTRY_DIR}"/*.json; do
    filename=$(basename "$json_file")
    fingerprint=$(jq -r '.fingerprint' "$json_file")

    # Filename must matche the fingerprint
    if [[ "$filename" != "${fingerprint}.json" ]]; then
        echo "Error: Expecting valid identity filename '$fingerprint.json' but got '$filename' instead."
        exit 1
    fi
done

exit 0

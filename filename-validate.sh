#!/bin/bash
REGISTRY_BLOB="registry/*.json"

for json_file in "${REGISTRY_BLOB}"; do
    filename=$(basename "$json_file")
    fingerprint=$(jq -r '.fingerprint' "$json_file")

    # Filename must matche the fingerprint
    if [[ "$filename" != "${fingerprint}.json" ]]; then
        echo "Error: Filename '$filename' does not match fingerprint '$fingerprint'."
        exit 1
    fi
done

exit 0

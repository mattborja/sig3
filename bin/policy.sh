#!/bin/bash
BASH_BIN="/bin/bash"
REGISTRY_DIR="${GITHUB_WORKSPACE}/registry"
POLICY_BIN="${GITHUB_WORKSPACE}/bin/policy"

for JSON_FILE in "${REGISTRY_DIR}"/*.json; do
    for CHECK_SCRIPT in "${POLICY_BIN}"/*.sh; do
        "$BASH_BIN" "$CHECK_SCRIPT" "$JSON_FILE"
    done
done

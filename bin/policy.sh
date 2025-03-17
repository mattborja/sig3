#!/bin/bash
BASH_BIN="/bin/bash"
REGISTRY_DIR="${github_workspace}/registry"
POLICY_BIN="${github_workspace}/policy"

for JSON_FILE in "${REGISTRY_DIR}"/*.json; do
    for CHECK_SCRIPT in "${POLICY_BIN}"/*.sh; do
        "$BASH_BIN" "$CHECK_SCRIPT" "$JSON_FILE"
    done
done

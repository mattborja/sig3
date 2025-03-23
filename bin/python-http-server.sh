#!/bin/sh
ROOT="$(dirname $0)/../html"
echo "$ROOT"

python3 -m http.server 8080 -d "$ROOT"
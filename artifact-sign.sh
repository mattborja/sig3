#!/bin/sh
# For demonstrating use of signing key, private key holder must sign the approved artifact shown below to include in their submission.
ARTIFACT="3ED3 3CCE 4BED 165C 9107 3D9F 65B8 8DAC 23AF 5BCD E520 F723 C1E6 2A69 B369 F278"

KEY="$1"
if [ -z "$KEY" ]; then
  echo "Usage: $0 <signing key ID>"
  exit 1
fi

echo "$ARTIFACT" | gpg --clearsign --local-user "$KEY"

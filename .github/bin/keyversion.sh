#!/bin/bash
#
# Usage: keyversion.sh <filename>
#
# Checks the key fingerprint length from a JSON file and determines its corresponding key version.
# If the key length matches a deprecated version (e.g., 128-bit for version 3), a warning is displayed.
#
# Please note:
# - As of July 2024, RFC9580 §5.5.4.1 specifies that "version 3 (128-bit) keys and MD5 are deprecated" (https://datatracker.ietf.org/doc/html/rfc9580#section-5.5.4.1)
# - As of December 2022, NIST has retired SHA-1 with an expected full withdrawal date of December 31, 2030 (https://www.nist.gov/news-events/news/2022/12/nist-retires-sha-1-cryptographic-algorithm)
#
# MIT License
# 
# Copyright (c) 2024 Matt Borja
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

FILENAME="$1"
KEY_VERSIONS=( [128]=3 [160]=4 [256]=6 )

# Conditionally mark deprecated key lengths based on current/future state
NIST_SHA1_WITHDRAWAL_DATE="2030-12-31"
TODAY=$(date +%Y-%m-%d)

if [[ "$TODAY" > "$NIST_SHA1_WITHDRAWAL_DATE" ]]; then
    DEPRECATED_KEYLEN_BITS=(128 160)
else
    DEPRECATED_KEYLEN_BITS=(128)
fi

if [ -z "$FILENAME" ]; then
    echo "Usage: $0 <filename>" >&2
    exit 1
fi

FPR=$(jq -r '.fingerprint' "$FILENAME")

if [ -z "$FPR" ]; then
    echo "Fingerprint not found" >&2
    exit 1
fi

LEN=${#FPR}
BITLEN=$((LEN / 2 * 8))

# Return key version to STDOUT
echo "${KEY_VERSIONS[$BITLEN]}"

# Fail on deprecated key version
for KEYLEN in "${DEPRECATED_KEYLEN_BITS[@]}"; do
    if [ "$BITLEN" -eq "$KEYLEN" ]; then
        echo "Deprecated key length detected: $BITLEN bits" >&2
        exit 1
    fi
done

exit 0
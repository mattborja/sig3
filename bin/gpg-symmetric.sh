#!/bin/sh
# Thanks to fgrieu! (https://crypto.stackexchange.com/a/66319)
DIGEST_ALGO="SHA512"
CIPHER_ALGO="AES256"
S2K_MODE=3
S2K_COUNT=65011712

PASSPHRASE="$1"
TARGET_FILENAME="$2"
OUTPUT_FILENAME="$3"

if [ -z "$PASSPHRASE" ] || [ -z "$TARGET_FILENAME" ] || [ -z "$OUTPUT_FILENAME" ]; then
    echo "Usage: $0 <passphrase> <targetFilename> <outputFilename>"
    exit 1
fi

gpg --batch \
    --symmetric \
    --passphrase "$PASSPHRASE" \
    --s2k-mode "$S2K_MODE" \
    --s2k-count "$S2K_COUNT" \
    --s2k-digest-algo "$DIGEST_ALGO" \
    --s2k-cipher-algo "$CIPHER_ALGO" \
    --armor \
    --output "$OUTPUT_FILENAME" \
    --yes \
    "$TARGET_FILENAME"

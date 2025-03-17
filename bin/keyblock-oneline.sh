#!/bin/sh
# Returns multiline key block as single line using newline escape characters
#
# Usage: curl https://website.tld/user.gpg | ./keyblock-online.sh
KEY_BLOCK=$(cat)

echo "$KEY_BLOCK" | sed ':a;N;$!ba;s/\n/\\n/g'

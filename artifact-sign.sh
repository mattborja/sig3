#!/bin/bash
# MIT License
# 
# Copyright (c) 2025 @mattborja
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

# For demonstrating use of signing key, private key holder must sign the approved artifact constructed below to include in their submission.
#
# The artifact format is: urn:artifact:<scope>:<random_sequence>
# - <scope>: A static identifier (e.g., "mattborja/identity")
# - <random_sequence>: A 32-byte cryptographically strong random sequence
#
# Optional: Specify a signing key with `--local-user <key_id>`.

#
# DO NOT modify this script below this line.
#

SCOPE="mattborja/identity"
LOCAL_USER=""

# Parse optional arguments
while [ $# -gt 0 ]; do
  case "$1" in
    --local-user)
      LOCAL_USER="$2"
      shift 2
      ;;
    *)
      echo "Usage: $0 [--local-user <key_id>]"
      exit 1
      ;;
  esac
done

# Generate a 32-byte cryptographically strong random sequence
RANDOM_SEQUENCE=$(openssl rand -hex 32)

# Construct the artifact
ARTIFACT="urn:artifact:${SCOPE}:${RANDOM_SEQUENCE}"

# Sign and output
if [ -n "$LOCAL_USER" ]; then
  echo "$ARTIFACT" | gpg --clearsign --local-user "$LOCAL_USER"
else
  echo "$ARTIFACT" | gpg --clearsign
fi

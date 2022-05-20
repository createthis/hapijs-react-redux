#!/bin/bash

PREFIX="pre-commit:"

fileList=$(git diff --diff-filter=d --cached --name-only)

jsFileList=$(echo "$fileList" | grep -E '\.(js)$')
if [ ${#jsFileList} -gt 0 ]; then
    if ! npm run lint ${jsFileList[*]} "$@"; then
        echo "$PREFIX Commit aborted."
        echo "$PREFIX You can lint manually via 'npm run lint path/to/file'.\n"
        exit 1
    fi
fi

#!/bin/bash

echo "Installing pre-commit hook ..."

cp bin/pre_commit.sh .git/hooks/pre-commit

echo -e "\033[32mFinished!\033e"

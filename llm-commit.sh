#!/bin/bash

# Get the current changes (both staged and unstaged)
git_changes=$(git diff HEAD)

if [ -z "$git_changes" ]; then
    echo "No changes detected."
    exit 0
fi

# Prepare the prompt for llm
prompt="Based on these git changes, suggest a concise commit message following conventional commits format (feat/fix/docs/style/refactor/test/chore):

$git_changes"

# Send to llm CLI and get the response
commit_message=$(
    llm <<EOF
You are a git commit message assistant. Based on these changes:
1. Provide a conventional commit message (feat/fix/docs/style/refactor/test/chore)
2. Keep it under 72 characters
3. Focus on the "what" and "why", not the "how"

Changes to analyze:
$git_changes
EOF
)

# Display the suggested commit message
echo "Suggested commit message:"
echo "$commit_message"

# Optionally, ask if user wants to use this message
read -p "Would you like to commit with this message? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git commit -m "$commit_message"
fi

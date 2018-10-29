#!/usr/bin/env zsh
chmod +x deleteRepos.sh

source ./credentials.sh
shorten_github_token=$(echo $GITHUB_TOKEN | cut -c1-5)

echo Okay, now I know what is your username, $USERNAME and get your GitHub Token which starts with $shorten_github_token

# if [$message == 'Not found']; then echo 'Repository do not exist. Check if you have a typo or maybe repo has been already deleted?'; else echo `'https://api.github.com/repos/$repos' has been deleted`

while read repos; do curl -d '{"scopes":["public_repo"]}' -X DELETE -H "Authorization: token $GITHUB_TOKEN" 'https://api.github.com/repos/$repos'; echo $message;

done < repos.txt
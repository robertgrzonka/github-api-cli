#!/bin/env zsh
chmod +x deleteRepos.sh

source ./credentials.sh
shorten_github_token=$(echo $GITHUB_TOKEN | cut -c1-5)

echo "Okay, now I know what is your username, $USERNAME and get your GitHub Token which starts with $shorten_github_token"

while read REPOSITORY
do 
	curl -d '{"scopes":["public_repo"]}' -X DELETE -H "Authorization: token ${GITHUB_TOKEN}" 'https://api.github.com/repos/${REPOSITORY}'
	echo ${message}

done < repositories.txt

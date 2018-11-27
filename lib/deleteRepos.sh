#!/bin/sh
chmod +x deleteRepos.sh

# Read users credentials
source ~/credentials.sh 
# needs to be changed into viae part of getting credentials
# shorten_github_token=$(echo $GITHUB_TOKEN | cut -c1-5)

# Download and read all of the repositories in `repositories.txt`
node ./lib/fetchSaveRepo.js

# Say hi :)
echo "Hello, $USERNAME! \nNow, when I know your username ($GITHUB_USERNAME) and get your GitHub Token (which starts with $(echo $GITHUB_TOKEN | cut -c1-5)…) we are ready to remove repositories."

echo "Are you ready? [y/N]"
read -r select
case $select in
	[yY]* ) echo Great, start!;;
	[nN]* ) echo Okay, we will be waiting && exit;;
	*) echo Please answer YES/NO or cancel with ctrl+ᴅ;;
esac

while read repository
do 
	curl -d '{"scopes":["public_repo"]}' -X DELETE -H "Authorization: token $GITHUB_TOKEN" 'https://api.github.com/repos/'$repository
	if [ -f $repository ]
	then
		echo $repository has been deleted
	else [ -f $repository ] 
		echo $message

done < repositories.txt

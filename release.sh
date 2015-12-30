#!/bin/bash

# Release script

VERSION=`git describe --abbrev=0 --tags`
VERSION_BITS=(${VERSION//./ })
VNUM1=${VERSION_BITS[0]}
VNUM2=${VERSION_BITS[1]}
VNUM3=${VERSION_BITS[2]}
VNUM3=$((VNUM3+1))
NEW_TAG="$VNUM1.$VNUM2.$VNUM3"

git add --all 
git commit -m "Prepare $NEW_TAG release."
git push origin master

echo "Updating $VERSION to $NEW_TAG"
GIT_COMMIT=`git rev-parse HEAD`
NEEDS_TAG=`git describe --contains $GIT_COMMIT`
if [ -z "$NEEDS_TAG" ]; then
    echo "Tagged with $NEW_TAG (Ignoring fatal:cannot describe - this means commit is untagged) "
    npm version $NEW_TAG
    git push --tags
    github_changelog_generator
    git add CHANGELOG.md
    git commit -m "Update changelog for $NEW_TAG"
    git push origin master
    ember github-pages:commit --message "Update gh-pages for $NEW_TAG"
    git push origin gh-pages
    git checkout master
    npm publish
else
    echo "Already a tag on this commit"
fi

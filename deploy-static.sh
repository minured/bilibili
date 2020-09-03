#!/user/bin/env sh
set -e
yarn build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:minured/static-server-bilibili.git master:gh-pages
cd -
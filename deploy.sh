#!/user/bin/env sh
set -e
yarn build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@gitee.com:minured/bilibili-view.git master:gh-pages
cd -
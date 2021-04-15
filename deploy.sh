npm run build

cd dist

git init
git add .
git commit -m 'deploy Tool box Application'
git push -f https://github.com/listennn08/loot-box master:gh-pages
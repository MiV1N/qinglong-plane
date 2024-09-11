#! /bin/bash 
rm -rf ./static
pnpm install --frozen-lockfile
pnpm build:front
pnpm build:back

# mkdir -p tmp
# cd ./tmp
cp -rf ./static ./docker/
cp -rf ./package.json ./.npmrc ./pnpm-lock.yaml ./docker/

docker build -t qinglong:v1 docker/







#!/usr/bin/env sh
set -euo pipefail

echo "Removing build files and recreating directory:"
rm -rf "./build" || true
mkdir "build" || true

echo "Building production bundle"
./node_modules/.bin/esbuild src/clientEntry.tsx \
  --bundle \
  '--define:process.env.NODE_ENV="development"' \
  --loader:.js=jsx \
  --sourcemap \
  --target=es6 \
  --format=esm \
  --outdir="./build"

bundle_name="app.js"

mv "./build/clientEntry.js" "./build/$bundle_name"

echo "Done"

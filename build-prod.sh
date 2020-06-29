#!/usr/bin/env sh
set -euo pipefail

echo "Removing build files and recreating directory:"
rm -rf "./build" || true
mkdir "build" || true

echo "Building production bundle"
./node_modules/.bin/esbuild src/clientEntry.tsx \
  --bundle \
  '--define:process.env.NODE_ENV="production"' \
  --loader:.js=jsx \
  --sourcemap=external \
  --target=es6 \
  --format=esm \
  --minify \
  --outdir="./build"

checksum="$(md5 -q ./build/clientEntry.js)"
bundle_name="app-$checksum.js"
source_map_name="app-$checksum.js.map"

mv "./build/clientEntry.js" "./build/$bundle_name"
mv "./build/clientEntry.js.map" "./build/$source_map_name"

echo "$bundle_name" > "./build/latest-bundle"
echo "//# sourceMappingURL=$source_map_name" >> "./build/$bundle_name"

echo "Done"

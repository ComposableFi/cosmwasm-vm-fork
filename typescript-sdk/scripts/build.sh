#! /bin/sh
pnpm lint
pnpm format
pnpm build

# These files don't get copied over by the build script
cp -R ../lib/pkg/typescript_bindings_bg.wasm ./dist/lib/pkg/typescript_bindings_bg.wasm
cp -R ../lib/pkg/typescript_bindings_bg.wasm.d.ts ./dist/lib/pkg/typescript_bindings_bg.wasm.d.ts

echo "done building…"
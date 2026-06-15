#!/bin/bash
scc --no-cocomo -x csv,md --exclude-dir .git,.hg,.svn,dist,testing,dragula,viewerjs,zip.js --exclude-file package-lock.json,Cargo.lock,yarn.lock,pubspec.lock,Podfile.lock,pnpm-lock.yaml,bug.html,caddyfile,LICENSE

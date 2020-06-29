#!/bin/bash

version=$(cat package.json | jq '.version' -r)

rm -rf _zip/hydejack-pro-$version
mkdir -p _zip/hydejack-pro-$version
cd _zip/hydejack-pro-$version

mkdir -p .ssh
cp ~/.ssh/hydejack_8_pro .ssh

mkdir -p install
mkdir -p upgrade

# Make install folder
cp -r \
  $(find ../.. \
    ! -name .git \
    ! -name .sass-cache \
    ! -name .bundle \
    ! -name node_modules \
    ! -name vendor\
    ! -name _zip  \
    ! -name '*.gem'  \
    ! -name '*~' \
    ! -name '_site*' \
    -mindepth 1 \
    -maxdepth 1) \
  install

# Make upgrade folder
cp -r \
  ../../_includes \
  ../../_layouts \
  ../../_sass \
  ../../assets \
  ../../Gemfile* \
  ../../*.gemspec  \
  ../../package* \
  upgrade

rm -r \
  upgrade/assets/icomoon \
  upgrade/assets/icons \
  upgrade/assets/img \
  upgrade/assets/ieconfig.xml \
  upgrade/assets/manifest.json \
  upgrade/assets/resume.json

find upgrade/ -name 'my-*' -delete
find . -name '.DS_Store' -delete

# Generate PDFs.
# This assumes the next version is already online at qwtel.com
# This also assumes macOS with chrome installed...
function pdfprint {
  /Applications/Chromium.app/Contents/MacOS/Chromium \
    --headless \
    --disable-gpu \
    --disable-translate \
    --disable-extensions \
    --disable-background-networking \
    --safebrowsing-disable-auto-update \
    --disable-sync \
    --metrics-recording-only \
    --disable-default-apps \
    --no-first-run \
    --mute-audio \
    --hide-scrollbars \
    --run-all-compositor-stages-before-draw \
    --virtual-time-budget=25000 \
    --print-to-pdf="$1.pdf" $2
}

pdfprint "PRO License" "https://hydejack.com/licenses/PRO/" &
pdfprint "PRO–hy-drawer License" "https://hydecorp.github.io/drawer/licenses/hydejack/" &
pdfprint "PRO–hy-push-state License" "https://hydecorp.github.io/push-state/licenses/hydejack/" &
pdfprint "PRO–hy-img License" "https://hydecorp.github.io/img/licenses/hydejack/" &
pdfprint "Documentation" "https://hydejack.com/docs/print/" &
pdfprint "NOTICE" "https://hydejack.com/NOTICE/" &
pdfprint "CHANGELOG" "https://hydejack.com/CHANGELOG/" &
wait

# Genrate git diffs
prev1=$(git tag --list 'pro/*' --sort version:refname | tail -2 | head -1 | sed -E 's:pro/v(.*):\1:')
git diff pro/v$prev1..pro/v$version > $prev1--$version.diff

prev2=$(git tag --list 'pro/*' --sort version:refname | tail -3 | head -1 | sed -E 's:pro/v(.*):\1:')
git diff pro/v$prev2..pro/v$version > $prev2--$version.diff

# Generate the zip
cd ..; zip -q -r hydejack-pro-$version.zip hydejack-pro-$version/

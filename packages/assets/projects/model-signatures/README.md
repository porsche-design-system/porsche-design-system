# Porsche Design System - Model Signatures

The assets in the `./src` directory contain the unmodified originals, while SVGO optimizes those during the build
process. The original **Model Signatures** are created without safe zone, a varying width (integer, not decimal numbers)
and a height of `24px`-`25px` (without descenders) or `35px`-`36px` (with descenders). The height range can be used to
create a visual balance between the signatures while the max-height has to be `36px`.

## Build

Copy model signature assets and create a manifest.

```
yarn build
```

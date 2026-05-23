/** SVGO config for web delivery: apply transforms, integer coordinates. */
export default {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          convertTransform: true,
          mergePaths: false,
          cleanupNumericValues: { floatPrecision: 0 },
          convertPathData: { floatPrecision: 0 },
        },
      },
    },
    'removeMetadata',
    'removeEditorsNSData',
    'removeComments',
    'removeUnusedNS',
  ],
}

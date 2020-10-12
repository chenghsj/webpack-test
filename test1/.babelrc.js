{
  presets: [
    [
      // only @babel/preset-env can't transfer Promise, Map, etc.
      "@babel/preset-env",
      {
        // load according to usage
        useBuiltIns: "usage",
        corejs: 3.6,
        targets: {
          chrome: "60",
          firefox: "60",
          ie: "9",
          safari: "10",
          edge: "17",
        },
      },
    ],
  ];
}

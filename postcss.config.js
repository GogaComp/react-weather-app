module.exports = {
  // postcss config
  plugins: [
    require("autoprefixer"), // autoprefixer
    require("css-mqpacker"), // pack media queries
    require("cssnano")({
      // compress css
      preset: ["default"], // preset
    }),
    require("postcss-flexbugs-fixes"), // fixes bugs with flexboxs
    require("postcss-animation"), // add animate.css animations without this library
  ],
};

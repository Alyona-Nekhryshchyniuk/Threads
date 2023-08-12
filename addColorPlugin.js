const plugin = require("tailwindcss/plugin");

module.exports = plugin.withOptions(() => {
  return function ({ addUtilities }) {
    addUtilities({
      ".bg-dark-2": { background: "#121417" },
    });
  };
});

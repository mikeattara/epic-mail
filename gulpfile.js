const { watch } = require("gulp");
const browserSync = require("browser-sync").create();

function serve() {
  browserSync.init({
    server: {
      baseDir: "./ui/"
    }
  });

  watch(["ui/*.html", "ui/**/*.css", "ui/**/*.js"]).on(
    "change",
    browserSync.reload
  );
}

module.exports.default = serve;

// +==============================================================+
// |  ██████╗ ██╗    ██╗██╗         ███████╗███╗   ██╗██╗   ██╗   |
// | ██╔═══██╗██║    ██║██║         ██╔════╝████╗  ██║██║   ██║   |
// | ██║   ██║██║ █╗ ██║██║         █████╗  ██╔██╗ ██║██║   ██║   |
// | ██║   ██║██║███╗██║██║         ██╔══╝  ██║╚██╗██║╚██╗ ██╔╝   |
// | ╚██████╔╝╚███╔███╔╝███████╗    ███████╗██║ ╚████║ ╚████╔╝██╗ |
// |  ╚═════╝  ╚══╝╚══╝ ╚══════╝    ╚══════╝╚═╝  ╚═══╝  ╚═══╝ ╚═╝ |
// +==============================================================+

require("colors");

/**
 * @param {number} count Breaks counter. Skippable.
 */
function br(count) {
  console.log("\n".repeat(count || 0));
}

/**
 * @param {string} label Header label.
 */
function header(label) {
  console.log(
    "=".repeat(Math.floor(label.length) / 2),
    label,
    "=".repeat(Math.floor(label.length) / 2)
  );
}

module.exports = {
  __init() {
    if (process.stdout) console.clear();

    header("========================");
    header("EchoOS - Owl Environment");
    header("========================");

    br();

    let int = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    function prompt() {
      int.question("CMD > ", (res) => {
        var args = res.split(" ");
        if (args[0] == "curl") {
          if (args[1] == "" || args[1] == null || args[1] == undefined) {
            return new Error("Please specify a valid URL.") & prompt();
          } else {
            if (args[1].startsWith("https://")) {
              require("https")
                .request({ hostname: args[1].slice(8) }, (res) => {
                  res.on("data", (chunk) => {
                    br();
                    require("fs").writeFileSync(
                      __dirname + "/cache/curl-data.html",
                      chunk.toString(),
                      { encoding: "utf-8" }
                    );
                    return console.log(chunk.toString());
                  });
                  res.on("close", () => {
                    console.log("Closed.");
                    br();
                    prompt();
                  });
                  res.on("error", (err) => {
                    if (err) throw new Error(err);
                  });
                })
                .end();
            } else if (args[1].startsWith("http://")) {
              require("http")
                .request({ hostname: args[1].slice(7) }, (res) => {
                  res.on("data", (chunk) => {
                    br();
                    require("fs").writeFileSync(
                      __dirname + "/cache/curl-data.html",
                      chunk.toString(),
                      { encoding: "utf-8" }
                    );
                    return console.log(chunk.toString());
                  });
                  res.on("close", () => {
                    console.log("Closed.");
                    br();
                    prompt();
                  });
                  res.on("error", (err) => {
                    if (err) throw new Error(err);
                  });
                })
                .end();
            } else {
              return (
                new Error("Please specify a valid protocol. (HTTP or HTTPS)") &
                prompt()
              );
            }
          }
        } else if (args[0] == "exit") {
          br();
          console.log("Bye!");
          process.exit(0);
        } else if (args[0] == "github") {
          br();
          console.log("> https://github.com/EchoOSProject");
          br();
          prompt();
        } else if (args[0] == "cls" || args[0] == "clear") {
          console.clear();
          prompt();
        } else {
          prompt();
        }
      });
    }

    prompt();
  },
  __exit() {
    process.exit();
  },
  __reboot() {
    console.log("No restart script.");
  },
};

// To learn more about Fig's autocomplete standard visit: https://fig.io/docs/concepts/cli-skeleton

const completionSpec: Fig.Spec = {
  name: "php",
  description: "Run the PHP interpreter",
  generateSpec: async (tokens, executeShellCommand) => {
    const subcommands = [];

    if ((await executeShellCommand("ls -1 artisan")) === "artisan") {
      subcommands.push({ name: "artisan", loadSpec: "php/artisan" });
    }

    if ((await executeShellCommand("ls -1 please")) === "please") {
      subcommands.push({ name: "please", loadSpec: "php/please" });
    }

    if ((await executeShellCommand("ls -1 bin/console")) === "bin/console") {
      subcommands.push({ name: "bin/console", loadSpec: "php/bin-console" });
    }

    return {
      name: "php",
      subcommands,
      args: {
        generators: {
          template: "filepaths",
          filterTemplateSuggestions: function (suggestions) {
            return suggestions.filter((suggestion) => {
              return (
                // suggestion.name.endsWith(".php") ||
                suggestion.name.indexOf(".") === -1
              );
            });
          },
        },
      },
    };
  },
};

export default completionSpec;

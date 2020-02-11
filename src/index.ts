#!/usr/bin/env node
require("dotenv").config();

import register from "./register"

require("yargs")
  .scriptName("superface")
  .usage("Usage: $0 <command> [options]")
  .command(
    "register <serviceUrl>",
    "registers service in superface service registry",
    yargs => {
      yargs
        .positional("serviceUrl", {
          describe: "full url of the service",
          requiresArg: true,
          string: true
        })
        .options("profile", {
          describe: "id of the profile",
          alias: "p",
          demandOption: true,
          requiresArg: true,
          string: true
        })
        .options("mapping", {
          describe: "path to a local mapping file",
          alias: "m",
          demandOption: true,
          requiresArg: true,
          string: true
        });
    },
    (argv: any) => {
      register(argv);
    }
  )
  .help().argv;

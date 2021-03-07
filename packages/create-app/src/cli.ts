#!/usr/bin/env node

import { create } from "create-initializer";
import { resolve, join } from "path";
import { renameSync } from "fs";

const templateRoot = resolve(__dirname, "..", "templates");

const caveat = `Welcome to Enx Empire`;

// See https://github.com/ClassicOldSong/create-initializer/blob/master/README.md for the all options.

create("create-app", {
    templateRoot,
    caveat,
    after: ({ packageDir }) => {
        renameSync(join(packageDir, "_gitignore"), join(packageDir, ".gitignore"));
    },
});

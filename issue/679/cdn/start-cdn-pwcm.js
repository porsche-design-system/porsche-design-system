#!/usr/bin/env node
"use strict";
/**
 * todo: this server is quite a little bit redundant with cdn-local
 * package. let's see after everything is merged if we can combine it.
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_server_1 = require("http-server");
const path = __importStar(require("path"));
const PORT = 8576;
const server = http_server_1.createServer({
    root: path.resolve(__dirname),
    cors: true
});
server.server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.log(`cdn-pwcm port ${PORT} is already in use. maybe it's already started. doing nothing...`);
        // interval keeps the process alive in order to not kill other scripts with concurrently
        setInterval(() => { }, 1 << 30); // https://stackoverflow.com/a/47456805
    }
});
// @ts-ignore
server.listen(PORT, () => console.log(`started cdn-pwcm on http://localhost:${PORT}`));

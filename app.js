const serverless = require("serverless-http");
const app = require("./src/app.js");


const ExitStatus = {
    Failure: 1,
    Success: 0,
};

process.on('unhandledRejection', (reason, promise) => {
    console.error(`App exiting due to an unhandled promise: ${promise} and reason: ${reason}`);
    throw reason;
})

process.on('uncaughtException', (error) => {
    console.error(`App exiting due to an uncaught exception: ${error}`);
    process.exit(ExitStatus.Failure);
});


module.exports.handler = serverless(app);
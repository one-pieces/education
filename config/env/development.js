module.exports = {
    appName: 'cftvc',
    db: 'mongodb://localhost/' + this.appName,
    server: {
        // mode: 'development', //can be 'development', 'production', or 'localProductionTest'
        port: 5000,
        basePath: '/cftvc'
    },
    sessionSecret: 'developmentSessionSecret'
}
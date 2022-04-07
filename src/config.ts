const config = {
    api: {
        port: process.env.API_PORT || 3000,
        jwtSecret: process.env.JWT_SECRET || ''
    },
    db: {
        uri: process.env.MONGO_URL || ''
    },
    mc: {
        uri: process.env.MC_URL || ''
    }
}

export { config }
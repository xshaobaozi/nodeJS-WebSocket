module.exports = {
    success(data) {
        return {
            status: 0,
            ...data
        }
    },
    error(data) {
        return {
            status: 9000,
            ...data
        }
    }
}
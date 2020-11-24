async function awaitDelay(timeMS) {
    return new Promise((ok, ng) => {
        setTimeout(()=> {
            ok();
        }, timeMS)
    })
}
exports.awaitDelay = awaitDelay;
async function set(items) {
    try {
        await browser.storage.sync.set({ wlsetting: items });
        return true;
    } catch (error) {
        return error;
    }
}

async function get() {
    try {
        const result = await browser.storage.sync.get(["wlsetting"]);
        if (Object.prototype.hasOwnProperty.call(result, "wlsetting")) {
            return result.wlsetting;
        } else {
            return {};
        }
    } catch (error) {
        return {};
    }
}

async function update(item) {
    const wls = await get();
    Object.assign(wls, item);
    await set(wls);
}

export {set, get, update };
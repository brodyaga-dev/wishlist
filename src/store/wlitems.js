async function set(items) {
    try {
        await browser.storage.sync.set({ wlitems: items })
        return true
    } catch (error) {
        return error
    }
}

async function update(item) {
    const wls = await get()
    const idx = wls.findIndex((el) => el.id === item.id)
    if (idx === -1) {
        wls.push(item) // not finded
    } else {
        wls[idx] = item // finded
    }
    await set(wls)
}

async function get() {
    try {
        const result = await browser.storage.sync.get(['wlitems'])
        if (Object.prototype.hasOwnProperty.call(result, 'wlitems')) {
            return result.wlitems
        } else {
            return []
        }
    } catch (error) {
        return []
    }
}

async function remove(id) {
    const items = await get()
    const newItems = items.filter((el) => el.id !== id)
    await set(newItems)
}

export {set, update, get, remove }
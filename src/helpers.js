import {get } from './store/wlitems.js'
import { v4 as id } from 'uuid'

const default_images = ['/images/present1.gif', '/images/present2.gif', '/images/present3.png']

const DEFAULT_IMAGE_URL = default_images[Math.floor(Math.random() * default_images.length)]

async function printItems(id) {
    const wl = await get()
    console.log(`id: ${id}`, JSON.stringify(wl, null, 2))
}

function newItem(imgsrc = '', name = '', price = '') {
    return {
        id: id(),
        done: false,
        imgSrc: imgsrc,
        name: name,
        price: price
    }
}

function newSetting() {
    return {
        language: 'en'
    }
}

function validateImgUrl(dirtyUrl) {
    try {
        const url = new URL(dirtyUrl)
        if (['https:', 'http:'].includes(url.protocol)) {
            return true
        }
        return false
    } catch (e) {
        return false
    }
}

function validatePrice(price) {
    const newPrice = parseInt(price, 10)
    if (isNaN(newPrice)) {
        return 0
    }
    return newPrice
}

function validateName(name) {
    if (name.length > 56) {
        name = name.substring(0, 53) + '...'
    }
    return name
}

function prepare(items) {
    const { price, imgSrc, name } = items
    const newprice = validatePrice(price)
    const newImgSrc = validateImgUrl(imgSrc) ? imgSrc : DEFAULT_IMAGE_URL
    const newName = validateName(name)
    return {...items, name: newName, price: newprice, imgSrc: newImgSrc }
}

export { printItems, newItem, newSetting, prepare, validateImgUrl, DEFAULT_IMAGE_URL }
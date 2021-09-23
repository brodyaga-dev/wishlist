import { writable } from 'svelte/store'

const location = {
    show: 'show',
    setting: 'setting',
    archive: 'archive',
    edit: 'edit',
    language: 'language',
    'export-import': 'export-import'
}

function createLocation(href, data = undefined) {
    return {
        href: href,
        data: data
    }
}

const routes = writable([createLocation(location.show)])

function routeTo(href, data = undefined) {
    routes.update((route) => {
        return [...route, createLocation(href, data)]
    })
}

function routeMain() {
    routes.update(() => {
        return [createLocation(location.show)]
    })
}

function routeBack() {
    routes.update((route) => {
        route.pop()
        return [...route]
    })
}

function routeRefresh() {
    routes.update((route) => {
        return [...route]
    })
}

export { routes, location, routeTo, routeMain, routeBack, routeRefresh }
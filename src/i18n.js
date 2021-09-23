import { writable, derived } from 'svelte/store'
import translations from './translations.js'

export const dict = writable(translations)
export const locale = writable('ru')
export const languages = Object.keys(translations).map((lang) => ({
    name: translations[lang].name,
    lang: lang
}))

const localizedDict = derived([dict, locale], ([$dict, $locale]) => {
    if (!$dict || !$locale) return
    return $dict[$locale]
})

const getMessageFromLocalizedDict = (id, localizedDict) => {
    const splitId = id.split('.')
    let message = {...localizedDict }
    splitId.forEach((partialId) => {
        message = message[partialId]
    })
    return message
}

const createMessageFormatter = (localizedDict) => (id) =>
    getMessageFromLocalizedDict(id, localizedDict)

export const t = derived(localizedDict, ($localizedDict) => {
    return createMessageFormatter($localizedDict)
})
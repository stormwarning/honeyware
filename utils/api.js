import localforage from 'localforage'
require('localforage-startswith')

const NAMESPACE = 'CHARACTER-'

localforage.config({
    name: 'Honeyware',
    storeName: 'honeyware_characters',
    description: 'Honeyware characters are stored here.',
})

// var extendPrototypeResult = extendPrototype(localforage)

export const fetchCharacters = () => {
    return localforage.startsWith(NAMESPACE).then((res) => {
        return res
    })
}

export const saveCharacter = (character) => {
    return localforage
        .setItem(NAMESPACE + character.id, character)
        .then((value) => {
            return value
        })
        .catch((err) => {
            console.log('There was an error saving the character', err)
        })
}

export const removeCharacter = (character) => {
    return localforage
        .removeItem(NAMESPACE + character.id)
        .then((value) => {
            return value
        })
        .catch((err) => {
            console.log(err)
            return false
        })
}

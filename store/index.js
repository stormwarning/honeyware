import Vue from 'vue'

import cloneDeep from 'lodash.clonedeep'

import { guid } from '../utils'
import { saveCharacter, removeCharacter, fetchCharacters } from '../utils/api'

const find = require('lodash.find')

export const state = () => ({
    characters: {},
})

export const actions = {
    createCharacter({ commit }, data) {
        let id = guid()
        let character = Object.assign({ id: id }, data)

        console.log('action data:', data)

        commit('CREATE_CHARACTER', { character: character })
        saveCharacter(character).then((value) => {
            // Do something.
            console.log('Character saved!')
        })
    },

    updateCharacter({ commit }, data) {
        commit('UPDATE_CHARACTER', { character: data })
        saveCharacter(data)
    },

    addNote({ commit }, { character, note }) {
        let modifiedCharacter = cloneDeep(character)

        modifiedCharacter.notes.push(note)
        commit('UPDATE_CHARACTER', { character: modifiedCharacter })
        saveCharacter(modifiedCharacter).then(() => {
            console.log('Note saved!')
        })
    },

    deleteNote({ commit }, { character, note }) {
        let modifiedCharacter = cloneDeep(character)

        modifiedCharacter.notes.splice(note, 1)
        commit('UPDATE_CHARACTER', { character: modifiedCharacter })
        saveCharacter(modifiedCharacter).then(() => {
            console.log('Note removed!')
        })
    },

    deleteCharacter({ commit }, data) {
        commit('DELETE_CHARACTER', { character: data })
        removeCharacter(data)
    },

    loadCharacters(state) {
        // Load characters if not already loaded.
        if (!state.characters || Object.keys(state.characters).length === 0) {
            return fetchCharacters().then((res) => {
                let characters = {}

                Object.keys(res).forEach((key) => {
                    characters[res[key].id] = res[key]
                })
                state.commit('LOAD_CHARACTERS', characters)
            })
        }
    },
}

export const mutations = {
    CREATE_CHARACTER(state, payload) {
        console.log('payload:', payload)
        state.characters[payload.character.id] = payload.character
    },

    UPDATE_CHARACTER(state, payload) {
        console.log('mut: update')
        state.characters[payload.character.id] = payload.character
    },

    DELETE_CHARACTER(state, payload) {
        Vue.delete(state.characters, payload.character.id)
    },

    LOAD_CHARACTERS(state, payload) {
        state.characters = payload
    },
}

export const getters = {
    getCharacterById: (state, getters) => (characterId) => {
        return state.characters && characterId in state.characters
            ? state.characters[characterId]
            : false
    },

    getCharacterByHandle: (state, getters) => (handle) => {
        // const id = Object.keys(state.characters).find(handle => state.characters[handle] === handle)
        // const id = state.characters.find(character => character.handle === handle)
        const character = find(state.characters, function(o) {
            return o.handle === handle
        })
        const charID = character.id

        console.log('handle:', handle)
        console.log('id:', charID)

        return state.characters && charID in state.characters
            ? state.characters[charID]
            : false
    },
}

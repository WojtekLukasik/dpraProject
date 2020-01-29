import { mount } from '@vue/test-utils'
import players from '@/pages/players/index.vue'

describe('pagePlayer', () => {
    test('getAllPlayers should return all players', () => {
        const wrapper = mount(players)
        players.getAllPlayers()
    })
})

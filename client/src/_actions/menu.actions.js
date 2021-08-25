import {menuConstants} from '../_constants/menu.constants'

export const menuActions = {
    selectedMovies,
    selectedSubscriptions,
    selectedUsers,
    selectedNon
}

function selectedMovies() {
    return {type: menuConstants.MOVIES}
}

function selectedSubscriptions() {
    return {type: menuConstants.SUBSCRIPTIONS}
}

function selectedUsers() {
    return {type: menuConstants.USERS}
}

function selectedNon() {
    return {type: menuConstants.NON}
}

export const ORDERS = 'Commandes'
export const USERS = 'Utilisateurs'
export const RELATED_OBJECTS = 'Objects liés'
export const ACTIONS = 'Actions'
export const HISTORY = 'Historique'



export const ROLE_DIRECTION = 'DIRECTION'
export const ROLE_ASSISTANT = 'ASSISTANT'
export const ROLE_ADMIN = 'ADMIN'

export const USER_ROLES = [ROLE_DIRECTION,ROLE_ASSISTANT] as const

type UserRoleType = typeof USER_ROLES[number]

export const CURRENCY = {
    name: "FCFA",
    symbol: "XOF"
}

export const getUserRolesExcept = (exception:UserRoleType):Array<string> => {
    let result = [] as Array<string>

    USER_ROLES.forEach(role => {
        if(role!=exception) result.push(role)
    })

    return result;
}

export const toSelectInputChoices = (choices:Array<string>):Array<{id:string,name:string}> => choices.map(choice=>({id:choice,name:choice}))
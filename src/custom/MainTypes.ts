export type ModeType = 'edit'|'create'


export const AppObjects = {
    ORDERS:'Orders',
    USERS:'Users',
}
export type AppObjectType = 'Orders'|'Users'
export type AppResourceType = 'orders'|'profiles'
export type StringOrNullType = string|null

export type AddressType = {value:StringOrNullType}
export type ContactType = {name?:StringOrNullType,tel?:StringOrNullType,email?:StringOrNullType,fax?:StringOrNullType}


export type CurrencyType = {
    name:string,
    symbol:string,
}
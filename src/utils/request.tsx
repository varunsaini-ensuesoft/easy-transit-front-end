

export const requestStatusOptions = [
    { id: 'En attente', name: 'En attente' },
    { id: 'Publiée', name: 'Publiée' },
    { id: 'Acceptée', name: 'Acceptée' },
    { id: 'Supprimée', name: 'Supprimée' },
    { id: 'Invalidée', name: 'Invalidée' },
    { id: 'Expirée', name: 'Expirée' },
]

export const RequestStatus = ({status}:{status:string}) => {
    const statusObj = requestStatusOptions.find( ({id})=>id===status )
    return (
        <span>
            {statusObj?statusObj.name:undefined}
        </span>
    )
    
}
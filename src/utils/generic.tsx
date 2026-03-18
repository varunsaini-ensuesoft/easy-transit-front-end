

export const DateDisplay = ({dateString}:{dateString:string}) => {
    const date = new Date(dateString);

    const options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false,
    } as Intl.DateTimeFormatOptions;

    const formatter = new Intl.DateTimeFormat('fr',options);
    let display;
    try {
        display = formatter.format(date);
    }
    catch (error){
        display = "Error"
    }
    return (
        <span>
            {display}
        </span>
    )
    
}
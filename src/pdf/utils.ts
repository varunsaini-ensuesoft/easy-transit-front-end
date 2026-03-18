import { supabase } from "../supabase/mySupabaseClient";


export const evalSimpleDateFromISOString= (dateISOStr:string) => {
    if(!dateISOStr) return '';
    
    const dateStr = dateISOStr.split("T")[0];
    const dateElts = dateStr.split("-");
    const year = dateElts[0];
    const month = dateElts[1];
    const day = dateElts[2];
  
    return day+"-"+month+"-"+year;
}



export const evalSimpleDateTimeFromISOString= (dateISOStr:string,separator="-") => {
    if(!dateISOStr) return '';
    
    const parts = dateISOStr.split("T");

    let dateR = "";
    let timeR = "";

    const dateStr = parts[0];
    if(dateStr) {
    const dateElts = dateStr.split("-");
    const year = dateElts[0];
    const month = dateElts[1];
    const day = dateElts[2];
    
    dateR = day+separator+month+separator+year;

    }
    

    const timeStr = parts[1];
    if(timeStr){
        const timeElts = timeStr.split(":");
        const hour = timeElts[0];
        const mins = timeElts[1];

        timeR = hour+":"+mins;
    }
    

  
    return dateR+" "+timeR;
}

export function base64ToArrayBuffer(base64:any) {
    var binaryString = atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}





// export const API_BASE_URL = "@@API_BASE_URI@@"
// export const HOST = "@@HOST@@" 



const BASE = "https://easy-transit-backe-end.onrender.com"   //"http://ec2-35-180-103-212.eu-west-3.compute.amazonaws.com"
export const API_BASE_URL = `${BASE}/api/admin`
export const HOST = `${BASE}:8085` 
export const TEST_HOST = `http://ns3104690.ip-147-135-139.eu:8085`

export const downloadUrl = (email:any,val:any) => `${TEST_HOST}/uploads/${email}/${val}`


export const downloadUserFiles = (email:any,fileName:any)=>{

    const params = new URLSearchParams({fileName,email});
    
    return `${TEST_HOST}/api/download-user-files?${params}`
}

export const downloadRequestFiles = (email:any,fileName:any,requestId:any)=>{

    const params = new URLSearchParams({fileName,email,requestId});
    
    return `${TEST_HOST}/api/download-request-files?${params}`
}
export const downloadDisputeFiles = (email:any,fileName:any,requestId:any)=>{

    const params = new URLSearchParams({fileName,email,requestId});
    
    return `${TEST_HOST}/api/download-dispute-files?${params}`
}




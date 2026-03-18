import { fetchUtils, DataProvider } from 'ra-core';
import {supabase} from './mySupabaseClient'


// filters op = eq, ilike, gt, lt, gte, lte
// column 
// filter = column:op
export const applyFilters = (queryBuilder:any,filters:any):any => {
    if(!filters) return queryBuilder;
    Object.keys(filters).forEach(k => {
        
        const value = filters[k];
        const parts =  k.split(":");

        if(parts.length == 2) {
            const column = parts[0];
            const op = parts[1];

            switch (op) {
                case "eq":
                    queryBuilder = queryBuilder.eq(`${column}`,value)
                break;
                case "is":
                    queryBuilder = queryBuilder.is(`${column}`,value)
                break;
                case "ilike":
                    queryBuilder = queryBuilder.ilike(`${column}`,`%${value}%`)   
                break;
                case "gt":
                    queryBuilder = queryBuilder.gt(`${column}`,value)  
                break;
                case "lt":
                    queryBuilder = queryBuilder.lt(`${column}`,value)
                break;
                case "gte":
                    queryBuilder = queryBuilder.gte(`${column}`,value)  
                break;
                case "lte":
                    queryBuilder = queryBuilder.lte(`${column}`,value)  
                break;
            
                default:
                    console.error(op + " should be : eq, ilike, gt, lt, gte, lte")
                break;
            }
           
        }
        else console.error(k + " is a bad formatted filter. Should be column:op where op is : eq, ilike, gt, lt, gte, lte")
        
    
    })
    
    return queryBuilder;
}

export const selectStringFromMeta = (meta:any) => {
    const join = meta?.join as string;
    if(!join) return undefined;
    else return "*,"+join
}


export default ( httpClient = fetchUtils.fetchJson): DataProvider => ({
    getList: async (resource, params) => {

        const {page,perPage} = params.pagination;
        const { field, order } = params.sort;
        const filters = fetchUtils.flattenObject(params.filter);

        console.log("getList - ressource",resource)
        console.log("getList - params",params) 
      //  console.log("nom_complet",nom_complet) 
        const start = (page - 1) * perPage;
        const end = page * perPage - 1;
        //const total = (await supabase.from(resource).select("*",{count:"exact",head:true})).count
        //console.log("getList - total",total)
        
        const selectString = selectStringFromMeta(params.meta)
        console.log("dataProvider selectString :",selectString)

        let queryBuilder = supabase.from(resource)
        .select(selectString)
       
        // Applying filters 
        queryBuilder = applyFilters(queryBuilder,filters);

        queryBuilder = queryBuilder
                        .order(field, { ascending: (order==="ASC") })
                        .range(start,end)

        return queryBuilder.then(response =>{

                if(response.status<200 && response.status>299) throw new Error(response.error?.message)
                
                const data = response?.data;
                const hasNextPage = data?.length?(data?.length>=perPage):false;
                const hasPreviousPage = start>0;
                //console.log("RESPONSE ///// ",data)
                return {
                    data,
                    pageInfo: {
                        hasNextPage,
                        hasPreviousPage
                    }
                };

            }
        )
        
    },

    getOne: (resource, params) => {
        return supabase.from(resource)
                        .select()
                        .eq('id', `${params.id}`)
                        .maybeSingle()
                        .then(response =>{

            if(response.status<200 && response.status>299) throw new Error(response.error?.message)
                console.log("getOne-data",response.data)
                return {
                    data: response.data,
                };

            }
        )
    },

        

    getMany: (resource, params) => {
       const  {ids} = params;
       
        return supabase.from(resource)
        .select()
        .in('id', ids)
        .then(response =>{

            if(response.status<200 && response.status>299) throw new Error(response.error?.message)
            console.log("getMany-data",response.data)
            return {
                data: response.data,
            };

            }
        )
    },

    getManyReference: (resource, params) => {

        throw new Error(
            "getManyReference : Action impossible car méthode nom implémentée"
        );
    },

    update: (resource, params) =>{
        console.log("update - ressource",resource)
        console.log("update - data",params.data)
        return supabase.from(resource)
        .upsert(params.data,{ignoreDuplicates:false})
        .select()
        .then(response =>{

                if(response.status<200 && response.status>299) throw new Error(response.error?.message)
                console.log("update-create-upsert:",response.data)
                return {
                    data: response?.data?.[0],
                };

            }
        )
    } ,




    // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
    updateMany: (resource, params) => {
        throw new Error(
            "updateMany: Action impossible car méthode nom implémentée"
        );
    },
        

    create: (resource, params) =>{
            console.log("create - ressource",resource)
            console.log("create - data",params.data)
            return supabase.from(resource)
            .upsert(params.data)
            .select()
            .then(response =>{

                    if(response.status<200 && response.status>299) throw new Error(response.error?.message)
                    console.log("data-create-upsert:",response.data)
                    return {
                        data: response?.data?.[0]
                    };

                }
            )
        },

    delete: (resource, params) => {
       
       const {id,previousData} = params;
       return supabase
            .from(resource)
            .delete()
            .in('id',[id])
            .then(response =>{

                    if(response.status<200 && response.status>299) throw new Error(response.error?.message)
                    console.log("delete-:",response.data)
                    return {
                        data: previousData,
                    };

                }
            )
    },
       
    // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
    deleteMany: (resource, params) => {

       
        const {ids} = params;
        return supabase
             .from(resource)
             .delete()
             .in('id',ids)
             .then(response =>{
 
                    console.log("deleteMany response :",response)
                     if(response.status<200 && response.status>299) throw new Error(response.error?.message)
                     
                     return {
                         data: ids,
                     };
 
                 }
             )
    }
});

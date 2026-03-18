import { DataProvider, fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import {API_BASE_URL}  from '../config';

const apiUrl = API_BASE_URL;
const httpClient = fetchUtils.fetchJson;


const transform =  (json:any) => { 
// console.log("before transform : ", json)
 
 const {_id,...rest} = json
 const tr = {id:_id,...rest}

 //console.log("after transform : ", tr)

 return tr
}


const transformList = (list) =>{
    console.log("list : ",list)
    return list.map(transform)
} 


export default {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        const start = (page - 1) * perPage;
        const end = page * perPage ;

        const query = {
            sort: (field && order)?JSON.stringify({[field] : order.toLowerCase() }):{},
            range: JSON.stringify({skip: start, limit:end}),
            filter: JSON.stringify(params.filter),
        };

        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        console.log("getList - url :"+url);

        return httpClient(url).then(({ headers, json }) => {
            
             console.log("getList - json Response : ",json)
             const data = transformList(json.list)

             //console.log("RESPONSE ///// ",data)
             return ({
                 data,
                 total:json.total
             })
       
        });
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: transform(json),
        })),

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: transformList(json.list) }));
    },

    getManyReference: (resource, params) => {
        const {id,target} = params
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
    
        const query = {
            sort: (field && order)?JSON.stringify({[field] : order.toLowerCase() }):{},
            range: JSON.stringify({skip: (page - 1) * perPage, limit: page * perPage}),
            filter: JSON.stringify({
               [target]: id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: transformList(json.list),
            total: json.total,
        }));
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/updateOne`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: transform(json) })),

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}/updateMany?${stringify(query)}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: transformList(json) }));
    },

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: transform(json),
        })),

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: null })),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: null }));
    }
} as DataProvider;

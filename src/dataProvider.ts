import jsonServerProvider from 'ra-data-json-server';
import supabaseProvider  from './supabase/supabaseProvider';
import { UpdateResult, withLifecycleCallbacks } from 'react-admin';
import { supabase } from './supabase/mySupabaseClient';
//export const dataProvider = supabaseProvider();

const updateHistory = async (result:UpdateResult<any>,resource:string) => {
    // Update History
    const action = 'Modification'
    const objectid = result?.data?.id

    console.log("calling updatehistory with params : ",{action, objectid,resource})
    let {error} = await supabase.rpc('updatehistory', {action, objectid,resource})
    if(error) console.error("message:",error.message, "- details:",error.details)
}


export const dataProvider = withLifecycleCallbacks(supabaseProvider(), [
    {
        resource: 'orders',
        afterUpdate: async (result, dataProvider, resource) => {
            updateHistory(result,resource)
            return result;
        },
    },
    {
        resource: 'clients',
        afterUpdate: async (result, dataProvider, resource) => {
            updateHistory(result,resource)
            return result;
        },
    },
    {
        resource: 'invoices',
        afterUpdate: async (result, dataProvider, resource) => {
            updateHistory(result,resource)
            return result;
        },
    },
    {
        resource: 'drivers',
        afterUpdate: async (result, dataProvider, resource) => {
            updateHistory(result,resource)
            return result;
        },
    },
    {
        resource: 'profiles',
        afterUpdate: async (result, dataProvider, resource) => {
            updateHistory(result,resource)
            return result;
        },
    },
    {
        resource: 'operations',
        afterUpdate: async (result, dataProvider, resource) => {
            updateHistory(result,resource)
            return result;
        },
    },

]);
import { AxiosGET, AxiosPOST } from "../../Axios"

export const createPricingPlan = async (data, callback) => {
    AxiosPOST('create-plan/', data).then((response) => {
        callback(response)
    }).catch((err) => {
        console.log(err)
    })
}

export const fetchPlans = async (callback) => {
    AxiosGET('super-admin/pricing-plans/all', null).then((response) => {
        callback(response.data)
    }).catch((err) => {
        console.log(err)
    })
}
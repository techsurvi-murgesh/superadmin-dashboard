import {AxiosGET, AxiosPOST} from "../../Axios"

export const fetchDiscounts = async (callback) => {
    AxiosGET('super-admin/discount/all', null).then((response) => {
        // eslint-disable-next-line array-callback-return
        response.data.data.rows.map((row) => {
            row.isExpanded = false
        })

        callback(response.data)
    }).catch((err) => {
        console.log(err)
    })
}

export const createDiscount = async (data, callback) => {
    AxiosPOST('super-admin/discount/create', data).then((response) => {
        // eslint-disable-next-line array-callback-return
        callback(response)
    }).catch((err) => {
        console.log(err)
    })
}

export const addPlansToDiscount = async (data, callback) => {
    AxiosPOST('super-admin/discount/add-plan', data).then((response) => {
        // eslint-disable-next-line array-callback-return
        callback(response)
    }).catch((err) => {
        console.log(err)
    })
}

export const deleteDiscountFromPlan = async (data, callback) => {
    AxiosPOST('super-admin/discount/add-plan', data).then((response) => {
        // eslint-disable-next-line array-callback-return
        callback(response)
    }).catch((err) => {
        console.log(err)
    })
}


export const updateDiscount = async (data, callback) => {
    AxiosPOST('super-admin/discount/add-to-plan', data).then((response) => {
        // eslint-disable-next-line array-callback-return
        callback(response)
    }).catch((err) => {
        console.log(err)
    })
}


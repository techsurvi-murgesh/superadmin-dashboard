import { AxiosGET, AxiosPOST } from "../../Axios"

export const loginPost = async (data, callback) => {
    AxiosPOST('sAdmin/superAdminLogin', data).then((response) => {
        // eslint-disable-next-line array-callback-return
        callback(response)
    }).catch((err) => {
        console.log(err)
    })
}


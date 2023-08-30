import {AxiosGET, AxiosPOST} from "../../Axios"

export const fetchStores = async (callback) => {
    AxiosGET('super-admin/get-store/all', null).then((response) => {
        callback(response.data)
    }).catch((err) => {
        console.log(err)
    })
}

export const fetchHistory = async (storeID, callback) => {
    try {
      const response = await AxiosGET(`super-admin/get-store/store?store_id=${storeID}`, null);
      callback(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  export const createStoreDiscount = async (data, callback) => {
    AxiosPOST('super-admin/discount/add-to-store', data).then((response) => {
        callback(response)
    }).catch((err) => {
        console.log(err)
    })
}
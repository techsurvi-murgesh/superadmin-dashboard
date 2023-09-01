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
    try {
      const response = await AxiosPOST('super-admin/discount/apply-to-store', data);
      callback(response);
    } catch (err) {
      console.error(err);
    }
  };
  
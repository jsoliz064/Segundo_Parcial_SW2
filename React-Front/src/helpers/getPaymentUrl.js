import { authApi } from '../api';

export const getPaymentUrl = async (subscription_id) => {
    try {
        const { data } = await authApi.post(`paypal/create-payment?subscription_id=${subscription_id}`);

        console.log(data.data.links[1].href);
        return data ? data.data.links[1].href : null;
    } catch (error) {
        console.log(error);
    }

    return null;
}

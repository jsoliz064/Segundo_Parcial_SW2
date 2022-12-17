const request = require('request');
const User = require("../models").user;
const Subscription = require("../models").subscription;
const Payment = require("../models").payments;


const CLIENT = process.env.PAYPAL_CLIENT_ID
const SECRET = process.env.PAYPAL_SECRET
const URL_SERVER = process.env.URL_SERVER
const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; // Live https://api-m.paypal.com
const auth = { username: CLIENT, password: SECRET }

exports.createPayment = async (req, res) => {
    const { subscription_id } = req.query
    const { usuario } = req

    Subscription.findByPk(subscription_id)
        .then(data => {
            if (data) {
                const body = {
                    intent: "CAPTURE",
                    purchase_units: [{
                        amount: {
                            currency_code: "USD", //https://developer.paypal.com/docs/api/reference/currency-codes/
                            value: data.price
                        }
                    }],
                    application_context: {
                        brand_name: "Subscription.com",
                        landing_page: "LOGIN", // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
                        user_action: "PAY_NOW", // Accion para que en paypal muestre el monto del pago
                        return_url: `${URL_SERVER}/api/paypal/execute-payment?subscription_id=${subscription_id}&user_id=${usuario.id}`, // Url despues de realizar el pago
                        cancel_url: `${URL_SERVER}/api/paypal/cancel-payment` // Url despues de realizar el pago
                    }
                }

                //https://api-m.sandbox.paypal.com/v2/checkout/orders [POST]
                request.post(`${PAYPAL_API}/v2/checkout/orders`, {
                    auth,
                    body,
                    json: true
                }, (err, response) => {
                    res.json({ data: response.body })
                })
            } else {
                res.status(404).send({
                    message: `Cannot find Subscription with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Subscription with id=" + id
            });
        });
}

/*INGRESAR A VER COBROS https://www.sandbox.paypal.com/us/home*/
exports.executePayment = async (req, res) => {
    const { token, subscription_id, user_id } = req.query;
    try {
        const subscription = await Subscription.findByPk(subscription_id)
        const usuario = await User.findByPk(user_id)

        
        request.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
            auth,
            body: {},
            json: true
        }, (err, response) => {
            console.log('function executePayment status ok')
            let endate=new Date()
            if (subscription.id==1){
                endate.setDate(endate.getDate()+1)
            }
            if (subscription.id==2){
                endate.setMonth(endate.getMonth()+1)
            }
            if (subscription.id==3){
                endate.setFullYear(endate.getFullYear()+1)
            }
            const payment = {
                begin: new Date(),
                end: endate,
                total: subscription.price,
                subscription_id: subscription.id,
                user_id: usuario.id,
                state: true
            };
            Payment.create(payment)
                .then(data => {
                    console.log('function executePayment payment created ok')
                    return res.send(data);
                })
                .catch(err => {
                    console.log('function executePayment payment created error')
                    return res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Payment."
                    });
                });
        })
    } catch (error) {
        console.log('catch function executePayment')
        return res.json({ data: error })
    }
}

exports.createProduct = (req, res) => {
    const product = {
        name: 'Subscripcion Youtube',
        description: "Subscripcion a un canal de Youtube se cobra mensualmente",
        type: 'SERVICE',
        category: 'SOFTWARE',
        image_url: 'https://avatars.githubusercontent.com/u/15802366?s=460&u=ac6cc646599f2ed6c4699a74b15192a29177f85a&v=4'

    }

    //https://developer.paypal.com/docs/api/catalog-products/v1/#products_create
    request.post(`${PAYPAL_API}/v1/catalogs/products`, {
        auth,
        body: product,
        json: true
    }, (err, response) => {
        res.json({ data: response.body })
    })
}

exports.createPlan = (req, res) => {
    const { body } = req
    //product_id

    const plan = {
        name: 'PLAN mensual',
        product_id: body.product_id,
        status: "ACTIVE",
        billing_cycles: [
            {
                frequency: {
                    interval_unit: "MONTH",
                    interval_count: 1
                },
                tenure_type: "REGULAR",
                sequence: 1,
                total_cycles: 12,
                pricing_scheme: {
                    fixed_price: {
                        value: "3", // PRECIO MENSUAL QUE COBRAS 3.30USD
                        currency_code: "USD"
                    }
                }
            }],
        payment_preferences: {
            auto_bill_outstanding: true,
            setup_fee: {
                value: "10",
                currency_code: "USD"
            },
            setup_fee_failure_action: "CONTINUE",
            payment_failure_threshold: 3
        },
        taxes: {
            percentage: "10", // 10USD + 10% = 11 USD
            inclusive: false
        }
    }

    request.post(`${PAYPAL_API}/v1/billing/plans`, {
        auth,
        body: plan,
        json: true
    }, (err, response) => {
        res.json({ data: response.body })
    })
}

/**
 * ⚡⚡⚡⚡⚡⚡  3️⃣
 * @param {*} req 
 * @param {*} res 
 */
exports.generateSubscription = (req, res) => {
    const { body } = req

    const subscription = {
        plan_id: body.plan_id, //P-3HK92642FR4448515MBQHCYQ
        start_time: "2021-11-01T00:00:00Z",
        quantity: 1,
        subscriber: {
            name: {
                given_name: "Leifer",
                surname: "Mendez"
            },
            email_address: "customer@example.com",
        },
        return_url: 'http://localhost/gracias',
        cancel_url: 'http://localhost/fallo'

    }
    request.post(`${PAYPAL_API}/v1/billing/subscriptions`, {
        auth,
        body: subscription,
        json: true
    }, (err, response) => {
        res.json({ data: response.body })
    })
}
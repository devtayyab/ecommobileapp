import stripe from "stripe";

const stripeClient = new stripe(STRIPE_API_KEY, { apiVersion: "2020-08-27" });

export const stripeCreateAccount = functions
    .region("europe-west3")
    .https.onCall(async (data, context) => {
        const { restaurantId } = data;
        const firestore = admin.firestore();

        const account = await stripeClient.accounts.create({
            type: "standard",
            metadata: { restaurantId },
        });

        firestore
            .collection("restaurants")
            .doc(restaurantId)
            .update({
                stripe: { id: account.id },
            });

        return account.id;
    });

export const stripeGetAccountLink = functions
    .region("europe-west3")
    .https.onCall(async (data, context) => {
        const { accountId, refreshUrl, redirectUrl } = data;

        const accountLink = await stripeClient.accountLinks.create({
            account: accountId,
            refresh_url: refreshUrl,
            return_url: redirectUrl,
            type: "account_onboarding",
        });
        return accountLink.url;
    });

export const stripeWebhook = functions
    .region("europe-west3")
    .https.onRequest((request, response) => {
        cors(request, response, async () => {
            switch (request.body.type) {
                case "account.updated":
                    onStripeAccountUpdated(request.body.data.object as stripe.Account);
            }
            response.status(200).send();
        });
    });

function onStripeAccountUpdated(customer: stripe.Account): void {
    if (!customer.metadata?.restaurantId) return;

    const firestore = admin.firestore();
    firestore
        .collection("restaurants")
        .doc(customer.metadata.restaurantId as string)
        .update({ stripe: customer });
}

export const stripeGetAccount = functions
    .region("europe-west3")
    .https.onCall(async (body: { accountId: string }, context) => {
        const account = await stripeClient.accounts.retrieve(
            {},
            { stripeAccount: body.accountId }
        );
        return account;
    });

export const stripeCreatePaymentIntent = functions
    .region("europe-west3")
    .https.onCall(async (body, context) => {
        const { amount, accountId } = body;
        const paymentIntent = await stripeClient.paymentIntents.create({
            amount: parseFloat(amount) * 100,
            currency: "eur",
            automatic_payment_methods: {
                enabled: true,
            },
            transfer_data: {
                destination: accountId,
            },
        });
        return { id: paymentIntent.id, clientSecret: paymentIntent.client_secret };
    });
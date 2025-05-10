import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { OpenAI } from 'openai';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import Replicate from "replicate";
dotenv.config();

const app = express();
const port = process.env.PORT || 5002;

// Middleware
app.use(cors({
    origin: [
        'http://localhost:3000', // Local development
        'https://youtubecreator.onrender.com',
        'https://www.tryingtocreate.com',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
}));
app.use(bodyParser.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

// Initialize OpenAI with your API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const replicate = new Replicate({
    auth: process.env.REPLICATE_TOKEN,
  })
// Route to handle OpenAI API requests
app.post('/generate-ideas', async (req, res) => {
    const { popularTitles } = req.body;

    if (!popularTitles || !Array.isArray(popularTitles)) {
        return res.status(400).json({ error: 'Invalid request. "popularTitles" must be an array.' });
    }

    try {
        // Improved prompt to mix themes and generate combined ideas
        const prompt = `You are a creative assistant for YouTubers. Based on the following popular video titles from three different channels, generate 3 new YouTube video ideas that appeal to a wide audience by creatively combining the themes, styles, and topics of these channels. Focus on generating ideas that are engaging, relatable, and unique, while avoiding niche-specific jargon or overly complex concepts. Do not include locations, specific ages, or financial statuses. Only provide the titles as plain text, separated by new lines:\n\n${popularTitles.join(
            '\n'
        )}\n\nNew titles:`;

        // Call OpenAI API
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a creative assistant for YouTubers.' },
                { role: 'user', content: prompt },
            ],
            max_tokens: 80,
            temperature: 0.7,
        });

        // Extract and limit ideas to 3
        const ideas = response.choices[0].message.content.trim().split('\n').slice(0, 3);
        res.json({ ideas });
    } catch (error) {
        console.error('Error generating video ideas:', error);
        res.status(500).json({ error: 'Failed to generate video ideas.' });
    }
});

// Route to handle Stripe payment intent creation
app.post('/create-payment-intent', async (req, res) => {
    const { amount, userId } = req.body

    if (!amount || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount' })
    }

    // Validate the userId
    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ error: 'Invalid request. "userId" must be a string.' });
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method_types: ['card'],
            metadata: { userId },
        })

        res.json({ clientSecret: paymentIntent.client_secret })
    } catch (error) {
        console.error('Error creating payment intent:', error)
        res.status(500).json({ error: 'Failed to create payment intent' })
    }
});

app.post('/create-subscription', async (req, res) => {
    const { priceId, customerId } = req.body;

    try {
        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
            payment_behavior: 'default_incomplete',
            expand: ['latest_invoice.payment_intent'],
        });

        res.json({
            subscriptionId: subscription.id,
            clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        });
    } catch (error) {
        console.error('Error creating subscription:', error);
        res.status(500).json({ error: 'Failed to create subscription' });
    }
});

app.post('/generate-thumbnail', async (req, res) => {
    const { idea } = req.body;

    if (!idea) {
        return res.status(400).json({ error: 'Idea is required' });
    }

    try {
        const input = {
            prompt: `Create an interesting and attractive image about ${idea}`,
            negative_prompt: 'bad quality, blurry, low resolution',
            aspect_ratio: '16:9',
            num_outputs: 1,
            output_quality: 80,
            go_fast: true,
        };

        const prediction = await replicate.run('black-forest-labs/flux-schnell', { input });

        if (Array.isArray(prediction) && prediction.length > 0) {
            const stream = prediction[0]; // This is a ReadableStream

            // Convert the ReadableStream into a Buffer
            const reader = stream.getReader();
            const chunks = [];

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                chunks.push(value);
            }

            const buffer = Buffer.concat(chunks);

            // Now, either:
            // 1. Send the buffer directly
            res.setHeader('Content-Type', 'image/webp');
            return res.end(buffer);

            // OR
            // 2. Save to a temporary file and return a URL (more work)
        } else {
            throw new Error('Invalid output format or no image found');
        }
    } catch (error) {
        console.error('Error generating thumbnail:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to generate thumbnail' });
    }
});


// app.post('/check-customer-plan', async (req, res) => {
//     const { email } = req.body

//     if (!email) {
//         return res.status(400).json({ error: 'Email is required' })
//     }

//     try {
//         // Search for the customer by email
//         const customers = await stripe.customers.list({
//             email,
//             limit: 1,
//         })

//         if (customers.data.length === 0) {
//             return res.status(404).json({ error: 'Customer not found' })
//         }

//         const customer = customers.data[0]
//         console.log('Customer:', customer)

//         // Fetch subscriptions for the customer
//         const subscriptions = await stripe.subscriptions.list({
//             customer: customer.id,
//             limit: 1,
//         })
//         console.log('Subscriptions:', subscriptions)

//         if (subscriptions.data.length === 0) {
//             return res.json({ plan: 'none' }) // No active subscription
//         }

//         const plan = subscriptions.data[0].items.data[0].plan.nickname // Plan name
//         res.json({ plan })
//     } catch (error) {
//         console.error('Error fetching customer plan:', error)
//         res.status(500).json({ error: 'Failed to fetch customer plan' })
//     }
// })

app.post('/cancel-subscription', async (req, res) => {
    try {
        const { subscriptionId, reason } = req.body;

        // Log the reason for cancellation (optional)
        console.log(`Cancellation reason: ${reason}`);

        // Cancel the subscription
        const deletedSubscription = await stripe.subscriptions.cancel(subscriptionId);

        res.status(200).json({ success: true, subscription: deletedSubscription });
    } catch (error) {
        console.error('Error canceling subscription:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/get-subscription-id', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Fetch the customer by email
        const customers = await stripe.customers.list({
            email,
            limit: 1,
        });

        if (customers.data.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        const customer = customers.data[0];

        // Fetch subscriptions for the customer
        const subscriptions = await stripe.subscriptions.list({
            customer: customer.id,
            limit: 1,
        });

        if (subscriptions.data.length === 0) {
            return res.status(404).json({ error: 'No active subscriptions found' });
        }

        const subscriptionId = subscriptions.data[0].id;
        res.json({ subscriptionId });
    } catch (error) {
        console.error('Error fetching subscription ID:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/check-customer-plan', async (req, res) => {
    const { email } = req.body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
    try {
        const normalizedEmail = email.toLowerCase();

        // Capitalize the first letter of the email
        const capitalizedEmail = normalizedEmail.charAt(0).toUpperCase() + normalizedEmail.slice(1);

        // Try searching with the normalized email
        let customers = await stripe.customers.list({
            email: normalizedEmail,
            limit: 1,
        });

        if (customers.data.length === 0) {
            customers = await stripe.customers.list({
                email: capitalizedEmail,
                limit: 1,
            });
        }

        if (customers.data.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Customer exists
        const customer = customers.data[0];

        // Fetch subscriptions for the customer
        const subscriptions = await stripe.subscriptions.list({
            customer: customer.id,
            limit: 1,
        });

        // If no subscriptions are found, return 'none'
        if (subscriptions.data.length === 0) {
            return res.json({ plan: 'none' });
        }

        // Extract subscription details
        const subscription = subscriptions.data[0];
        const plan = subscription.items.data[0].plan;

        let planType = 'sigma';
        if (plan.amount === 900) {
            planType = 'basic';
        } else if (plan.amount === 2500) {
            planType = 'premium';
        }

        // Return the plan type
        return res.json({ plan: planType });
    } catch (error) {
        console.error('Error fetching customer plan:', error);
        return res.status(500).json({ error: 'Failed to fetch customer plan' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
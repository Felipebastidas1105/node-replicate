import Replicate from 'replicate';
import express from 'express';

const app = express();

app.use(express.json());


app.post('/generate', async (req, res) => {

    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Falta el parámetro prompt' });
    }

    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_KEY
    });

    const input = {
        prompt,
        go_fast: true,
        guidance: 3.5,
        num_outputs: 1,
        aspect_ratio: "1:1",
        output_format: "webp",
        output_quality: 80,
        prompt_strength: 0.8,
        num_inference_steps: 28
    };

    const output = await replicate.run("black-forest-labs/flux-dev", { input });
    console.log(output);
    res.json(output);
});

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
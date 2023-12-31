import { options } from "@/lib/config";

async function handler(req, res) {

    const textSearch = req.query.text

    if (req.method === "GET") {

        if (!textSearch || textSearch.length === 0) {
            res.status(422).json({ message: "Invalid id." })
            return;
        }

        const url = `https://online-movie-database.p.rapidapi.com/auto-complete?q=${textSearch}`;

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            res.status(201).json(result)
            return;
        } catch (error) {
            res.status(201).json({ message: "server error. please try again!" })
            return undefined;
        }

    }
}

export default handler
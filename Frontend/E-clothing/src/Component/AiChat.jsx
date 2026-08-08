import { useState } from "react";

function AiChat() {

    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const askAI = async () => {

        if (!prompt.trim()) return;

        setLoading(true);

        try {

            const res = await fetch("http://localhost:8084/shopping", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    prompt: prompt
                })

            });

            const data = await res.text();

            setResponse(data);

        } catch (err) {

            console.log(err);

            setResponse("Something went wrong.");

        }

        setLoading(false);

    };

    return (

        <div style={{ padding: "20px" }}>

            <h2>AI Shopping Assistant</h2>

            <textarea

                rows="4"
                cols="60"

                value={prompt}

                onChange={(e) => setPrompt(e.target.value)}

                placeholder="Ask AI..."

            />

            <br /><br />

            <button onClick={askAI}>

                {loading ? "Loading..." : "Ask AI"}

            </button>

            <hr />

            <h3>Response</h3>

            <pre>{response}</pre>

        </div>

    );

}

export default AiChat;
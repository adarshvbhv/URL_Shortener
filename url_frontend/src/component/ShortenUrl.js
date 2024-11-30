import { useState } from "react";

function ShortenUrl() {
    const [longUrl, setLongUrl] = useState(""); // State for storing the long URL
    const [shortUrl, setShortUrl] = useState(""); // State for storing the shortened URL
    const [ttl, setTtl] = useState(""); // TTL in hours (empty for infinite)

    // Handle changes to the input fields
    const handleChange = (event) => setLongUrl(event.target.value);
    const handleTtlChange = (event) => setTtl(event.target.value);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Send POST request to the backend
            const response = await fetch("http://127.0.0.1:5000/shorten", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    longUrl,
                    ttl: ttl ? parseInt(ttl) : null, // Send null for infinite TTL
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`${errorData.error || "An unknown error occurred"}`);
            }

            const data = await response.json(); // Parse the JSON response
            setShortUrl(data.shortUrl); // Set the shortened URL in state
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
                <h4 className="card-title text-center mb-4 text-primary">URL Shortener</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputUrl" className="form-label fw-bold">Enter Long URL</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputUrl"
                            value={longUrl}
                            onChange={handleChange}
                            placeholder="Enter the long URL here"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ttlInput" className="form-label fw-bold">TTL/Modify TTL (in hours, leave empty for infinite)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="ttlInput"
                            value={ttl}
                            onChange={handleTtlChange}
                            placeholder="Enter TTL in hours"
                            min="1"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Shorten URL</button>
                </form>
                {shortUrl && (
                    <div className="mt-4">
                        <div className="alert alert-success d-flex align-items-center" role="alert">
                            <i className="bi bi-link-45deg me-2 fs-4 text-success"></i>
                            <div className="d-flex justify-content-between w-100">
                                <div>
                                    <strong>Shortened URL:</strong>{" "}
                                    <a
                                        href={shortUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-underline"
                                    >
                                        {shortUrl}
                                    </a>
                                </div>
                                <button
                                    className="btn btn-outline-success ms-3"
                                    onClick={() => {
                                        navigator.clipboard.writeText(shortUrl);
                                        alert("URL copied to clipboard!");
                                    }}
                                >
                                    Copy
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShortenUrl;

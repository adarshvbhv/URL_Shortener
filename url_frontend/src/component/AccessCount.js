import { useState } from "react";

function AccessCount() {
    const [shortUrl, setShortUrl] = useState(""); 
    const [AccessCount, setAccessCount] = useState(); // State for storing the Access Count

    // Handle changes to the input field
    const handleChange = (event) => {
        setShortUrl(event.target.value);
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Send POST request to the backend
            const response = await fetch("http://127.0.0.1:5000/access_count", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ shortUrl }), // Send longUrl in JSON format
            });

            if (!response.ok) {
                // Await the JSON response to get the error message
                const errorData = await response.json();
                throw new Error(`${errorData.error || 'An unknown error occurred'}`);
            }
    
            const data = await response.json(); 
            setAccessCount(data.access_count); 
        } catch (error) {
            console.error("Error:", error);
            alert(error);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
                <h4 className="card-title text-center mb-4 text-primary">Check Your Link's Traffic!</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputUrl" className="form-label fw-bold">
                            Enter Short URL
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputUrl"
                            value={shortUrl}
                            onChange={handleChange}
                            placeholder="Enter the short URL here"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Get Access Count
                    </button>
                </form>

                {/* Display the shortened URL if available */}
                {AccessCount && (
                    <div className="mt-4">
                        <div className="alert alert-success d-flex align-items-center" role="alert">
                            <i className="bi bi-link-45deg me-2 fs-4 text-success"></i>
                            <div className="d-flex justify-content-between w-100">
                                <div>
                                    <strong>Access Count:</strong>{" "}
                                    <a
                                        
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-underline"
                                    >
                                        {AccessCount}
                                    </a>
                                </div>
                                {/* <button
                                    className="btn btn-outline-success ms-3"
                                    onClick={() => {
                                        navigator.clipboard.writeText(AccessCount);
                                        alert("URL copied to clipboard!");
                                    }}
                                >
                                    Copy
                                </button> */}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );

}

export default AccessCount;

import { useState } from "react";
import ShortenUrl from "./ShortenUrl";
import AccessCount from "./AccessCount";

function PageSwitcher() {
  // State to track the active page
  const [activePage, setActivePage] = useState("shorten");

  return (
    <>
      {/* Buttons placed above the container */}
      <div className="d-flex justify-content-center mt-5 mb-n5">
        {/* Button to show the URL Shortener page */}
        <button
          className={`btn mx-2 ${activePage === "shorten" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActivePage("shorten")}
        >
          URL Shortener
        </button>

        {/* Button to show the Access Count page */}
        <button
          className={`btn mx-2 ${activePage === "accessCount" ? "btn-secondary" : "btn-outline-secondary"}`}
          onClick={() => setActivePage("accessCount")}
        >
          Access Count
        </button>
      </div>

      {/* Container for the active page content */}
      <div className="container pt-0 pb-0 mt-n5">
        {/* Conditionally render the active page */}
        {activePage === "shorten" && <ShortenUrl />}
        {activePage === "accessCount" && <AccessCount />}
      </div>
    </>
  );
}

export default PageSwitcher;

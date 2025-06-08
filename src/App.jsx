import { useState } from 'react'
import './App.css'
import QRCode from "react-qr-code";

// const api = "";

function App() {
  const [longUrl, setLongUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")

  const handleShorten = async (e) => {
    e.preventDefault()
    console.log("submitted");
    if (!longUrl) {
      alert("Please enter a URL");
      return;
    }

    const res = await fetch("https://api.tinyurl.com/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer HPiqqT5ddOjVh2etrua8mWsUw5F7D5H2WLQIiwpu1OHG4eX1SohvukapiYgJ"
      },
      body: JSON.stringify({
        url: longUrl,
        domain: "tinyurl.com"
      })
    })
    const data = await res.json();
    console.log(data);

    if (data.data && data.data.tiny_url) {
      setShortUrl(data.data.tiny_url);
    } else {
      console.error("Error Response:", data);
      alert(data.errors?.[0]?.message || "Failed to shorten the URL");
    }

  }

  return (
    <>
      <div className="container">
        <form action="">
          <h1>🔗 Link Shortener</h1>
          <input type="url" placeholder='Enter long URL...' required pattern="https?://.+" value={longUrl || ''} onChange={(e) => setLongUrl(e.target.value)} /><br />
          <button onClick={handleShorten}>Click Me</button>
        </form>

        {shortUrl && (
          <div className='result'>
            <p>✅ Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
            <QRCode value={shortUrl} />
          </div>
        )}

      </div>
    </>
  )
}

export default App

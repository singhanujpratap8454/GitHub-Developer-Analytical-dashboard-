import { useNavigate ,NavLink } from "react-router-dom";
import { useState } from "react";
import { ArrowRight , ArrowLeftRight,Search , Sparkles } from "lucide-react";
import './home.css'

 const Home =() =>{
  const [username, setusername] = useState('')
  const[dark , setDark]= useState(true)
  const navigate= useNavigate();

  function handleAnalyze(e){
    e.preventDefault()
    const name=username.trim()
    if(!name)
      return;
    navigate(`/profile/${username}`)
  }
  function  chooseUser(name){
    setusername(name)
  }
  return(
    <div>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="glow glow-one"></div>
        <div className="glow glow-two"></div>
        <div className="glow glow-three"></div>

        <div className="orb orb-one"></div>
        <div className="orb orb-two"></div>

        <div className="github-mark">
          {/* GitHub SVG Icon */}
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </div>

        <div className="eyebrow">
          <div className="eyebrow-dot"></div>
          OPEN SOURCE • DEVELOPER INSIGHTS • GITHUB ANALYTICS
        </div>

        <h1>
          See the GitHub of <span>{username || "aria-codes"}</span>
        </h1>

        <div className="title-line">
          <span></span>
          <div></div>
          <span></span>
        </div>
        <p className="hero-description">
          Explore real data. Discover patterns. Celebrate builders.
        </p>

        {/* SEARCH FORM */}
        <form onSubmit={handleAnalyze} className="search-box">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Enter a GitHub username..."
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          <button type="submit" className="analyze-button">
            <span>Analyze</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* SUGGESTIONS */}
        <div className="suggestions">
          <span>Try:</span>
          <button type="button" onClick={() => chooseUser("torvalds")}>torvalds</button>
          <button type="button" onClick={() => chooseUser("knadh")}>kailash Nadh</button>
          <button type="button" onClick={() => chooseUser("hiteshchoudhary")}>Hitesh Choudhary</button>
        </div>
        {/* COMPARE ROUTE BUTTON */}
        <button className="compare-button" onClick={() => navigate("/compare")}>
          <ArrowLeftRight size={16} />
          <span>Compare two developers</span>
        </button>
      </section>

      {/* PREVIEW CARDS */}
      <section className="preview-section">
        <div className="section-label">
          <span></span> FEATURES
        </div>
        <h2>Deep Insights. <span>Simplified.</span></h2>
        <p style={{textAlign:'center'}}>Comprehensive overview of developer contributions, repository metrics, and activity history.</p>

        <div className="preview-cards">
          <div className="preview-card rose">
            <span className="card-number">01</span>
            <div className="card-icon"><Sparkles size={22} /></div>
            <h3>Overview</h3>
            <p>Get instant total star, fork, and follower counts across all public repositories.</p>
          </div>

          <div className="preview-card emerald">
            <span className="card-number">02</span>
            <div className="card-icon"><ArrowLeftRight size={22} /></div>
            <h3>Head-to-Head</h3>
            <p>Compare two developers side-by-side to benchmark stars, forks, and repository activity.</p>
          </div>

          <div className="preview-card rose">
            <span className="card-number">03</span>
            <div className="card-icon"><Search size={22} /></div>
            <h3>Deep Search</h3>
            <p>Inspect detailed profile metrics and repository breakdown instantly.</p>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-brand">
          <div className="brand-icon small">
            <span></span>
            <span></span>
          </div>
          <p>Mainline &copy; {new Date().getFullYear()}</p>
        </div>
        <div className="copyright">Powered by GitHub Public API</div>
      </footer>
    </div>
  )
}

export default Home
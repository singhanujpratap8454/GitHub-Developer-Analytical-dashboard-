import { useParams ,Link } from "react-router-dom";
import axios from 'axios'
import { useEffect ,useState } from 'react'
import "./Profile.css"

const Profile = () => {
    const {username}= useParams()

    const [profile, setprofile] = useState(null);
    const [repos, setRepos] = useState([])
    const [Loading, setLoading] = useState(false)
    const [Error, setError] = useState(null)

    useEffect(()=>{
      if (!username) return;

      const userdata= async()=>{
        setLoading(true);
        setError(false)
        try{
          const [ProfileResponse , repoResponse]= await Promise.all([axios.get(`https://api.github.com/users/${username}`) , 
            axios.get(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)])
          setprofile(ProfileResponse.data)
          setRepos(repoResponse.data)
        }catch(err){
          setError("Github User not found:", err);
        }finally{
          setLoading(false)
        }
      }
      if(username){
        userdata();
      }   
    },[username])

    {/*states*/}
    if(!username){
      return(
        <div className="profile-message">
          <h2>Search for A GitHub User First</h2>
          <Link to='/'>Go back Home</Link>
        </div>
      );
    }
    if(Loading){
      return (<div className="profile-message">
        <div className="loader"></div>
        <p>Loading GitHub Profile...</p>
      </div>)
    }
    if(Error){
      return (<div className="profile-message">
        <h2>{Error}</h2>
        <Link to='/'>Try Another UserName</Link>
      </div>)
    }
    if(!profile) return null;

    {/*Calculate repository data */}
    const totalStars=repos.reduce((total,repo)=>total + repo.stargazers_count ,0)
    const totalForks=repos.reduce((total,repo)=>total + repo.forks_count ,0)

    {/*Language data */}

    if(!profile || !repos){
      return(<div className="loading-container" style={{textAlign:"center" , padding:"100px" , color:""}}>
        <h2> Loading profile data...</h2>
      </div>)
    }

  return(
    <main className="profile-page">
      <section className="profile-container">

        <div className="profile-card">
          <div className="profile-card-glow"></div>
          <div className="profile-main">

            <img src={profile.avatar_url} alt={profile.login} className="profile-avatar"/>

            <div className="profile-info">
              <div className="profile-name-row">
                <h1>{profile.name || profile.login}</h1>
                <span className="profile-badge">DEVELOPER</span>
              </div>
              <p className="profile-username">@{profile.login}</p>
            </div>
          </div>

          {profile.bio && (<p className="profile-bio">{profile.bio}</p>)}

          <div className="profile-follow-data">
            <div><strong>{profile.followers.toLocaleString()}</strong>
              <span>followers</span>
            </div>

            <div>
              <strong>{profile.following.toLocaleString()}</strong>
              <span>following</span>
            </div>

            <div><strong>{profile.public_repos.toLocaleString()}</strong>
              <span>repositories</span>
            </div>

          </div>
          <div className="profile-actions">
            <a href={profile.html_url} target="_blank" rel="noreferrer"
              className="primary-profile-button"
            >
              <span>↗️</span>
              View on GitHub
            </a>

            <button className="secondary-profile-button" onClick={() => { navigator.clipboard.writeText(profile.html_url)}}>
              <span>⌯</span>
              Share profile</button>
          </div>
        </div>
      </section>

      {/*====STAT CARDS ====== */}

      <section className="stats-grid">
        <div className="stat-card rose-card">
          <div className="stat-icon">☆</div>
          <div className="stat-number">{totalStars.toLocaleString()}</div>

            <div className="stat-title">Stars earned</div>
            <div className="stat-description">across public repositories</div>
            <div className="stat-line rose-line"></div>

          </div>
          <div className="stat-card emerald-card">
            <div className="stat-icon">▣</div>
            <div className="stat-number">{profile.public_repos.toLocaleString()}</div>
            <div className="stat-title">Public repos</div>
            <div className="stat-description">all public repositories</div>
            <div className="stat-line emerald-line"></div>
          </div>

          <div className="stat-card blue-card">
            <div className="stat-icon">⑂</div>
            <div className="stat-number">{totalForks.toLocaleString()}</div>
            <div className="stat-title">Forks</div>
            <div className="stat-description">across their repositories</div>
            <div className="stat-line blue-line"></div>
          </div>

          <div className="stat-card gold-card">
            <div className="stat-icon">♙</div>
            <div className="stat-number">{profile.followers.toLocaleString()}</div>
            <div className="stat-title">Followers</div>
            <div className="stat-description">people following this developer</div>
            <div className="stat-line gold-line"></div>
          </div>
        </section>

       {/* ===ACTIVITY=====*/}
        <section className="activity-card">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow"> DEVELOPER ACTIVITY</span>
              <h2>Repository <em>overview</em></h2>
            </div>
          </div>

          <div className="activity-content">
            <div className="activity-number">{profile.public_repos}</div>
            <div className="activity-label">public repositories</div>
            <div className="fake-chart">
              <div className="chart-grid"></div>
              <svg viewBox="0 0 800 250"
                preserveAspectRatio="none"><defs>
                  <linearGradient
                    id="chartFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopOpacity="0.35"/>
                    <stop
                      offset="100%"
                      stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0 210 L60 180  L120 195 L180 135 L240 155 L300 100 L360 125 L420 75 L480 105 L540 65 L600 92 L660 40 L720 70 L800 25
                  "className="chart-area" />
                <path d="M0 210 L60 180 L120 195 L180 135 L240 155 L300 100 L360 125 L420 75 L480 105 L540 65 L600 92 L660 40 L720 70 L800 25"
                  className="chart-line"/>
              </svg>
            </div>
            <div className="chart-legend">
              <span><i className="legend-rose"></i> Repository activity</span>
              <span><i className="legend-green"></i>Public projects</span>
            </div>
          </div>
        </section>
        {/* ==FOOTER===== */}
        <footer className="profile-footer">
          <span>Mainline · GitHub Analytics</span>
          <a href={profile.html_url} target="_blank" rel="noreferrer">@{profile.login}</a>
        </footer>
    </main>
  );
};

export default Profile

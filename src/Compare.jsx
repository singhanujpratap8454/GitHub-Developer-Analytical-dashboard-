import { useEffect, useState } from 'react'
import axios from 'axios'
import './Compare.css'

const Compare = () => {

  //input
  const [User1, setUser1] = useState('')
  const [User2, setUser2] = useState('')

  //comparison
  const [compareUser, setcompareUser] = useState({first:"", second:""})


  //github data
  const [profile1, setprofile1] = useState(null);
  const [profile2, setprofile2] = useState(null)

  const [repos1, setrepos1] = useState([])
  const [repos2, setrepos2] = useState([])

  const [Loading, setLoading] = useState(false)
  const [Error, setError] = useState("")


  useEffect(()=>{
    if(!compareUser.first || !compareUser.second){
      return;
    }
    const Comparedata= async()=>{
      setLoading(true)
      setError("");

      try{const [user1response , user2response]= await Promise.all([axios.get(`https://api.github.com/users/${compareUser.first}`),
        axios.get(`https://api.github.com/users/${compareUser.second}`)])

        const[repos1Response , repos2Response]= await Promise.all([axios.get(`https://api.github.com/users/${compareUser.first}/repos?per_page=100&sort=updated`),
          axios.get(`https://api.github.com/users/${compareUser.second}/repos?per_page=100&sort=updated`)])

          setprofile1(user1response.data)
          setprofile2(user2response.data)

          setrepos1(repos1Response.data)
          setrepos2(repos2Response.data)
      }catch(err){
        if(err.response && err.response.status===403){
          setError("GitHub API rate limit exceeded (60 request/hr) , Please wait for an hour or try again later")
        }
        setError("one or both users could not be found");

        setprofile1(null)
        setprofile2(null)
        setrepos1([])
        setrepos2([])
      }finally{
        setLoading(false)
      }
    }
    Comparedata()
  },[compareUser])

  const handlecompare=(e)=>{
    e.preventDefault()

    if(!User1.trim() || !User2.trim()){
      setError("please enter both github username")
      return;
    }
    setcompareUser({first:User1.trim() , second:User2.trim()})
  }

  const repoStats = (repos)=>{
    let stars=0;
    let forks=0;

    repos.forEach((repo)=>{
      stars += repo.stargazers_count;
      forks += repo.forks_count;
    })

    return{
      stars , forks , repositories: repos.length
    }
  }

  const stats1=repoStats(repos1)
  const stats2=repoStats(repos2)

  return(
    <div className='compare-page'>

      {/*Hero */}
      <section className='compare-hero'>
        <p className='compare-eyebrow'>GITHUB DEVELOPER COMPARISON</p>
        <h1>Compare two <span> developers</span></h1>

        <p className='compare-subtitle'>Compare GitHub Activity , repositories , followers  , stars , forks , and more </p>

        {/*input */}
        <form className='compare-input-area' onSubmit={handlecompare}>
          <div className='username-box'>
            <span>@</span>
            <input type='text' placeholder='First GitHub username' value={User1} onChange={(e)=>{
            setUser1(e.target.value)}}></input></div>

            <div className='vs'>VS</div>
          <div className='username-box'>
            <span>@</span>
            <input type='text' placeholder='Second GitHub username' value={User2} onChange={(e)=>{
            setUser2(e.target.value)}}></input></div>  
          
          <button type="submit" className='compare-btn'>Compare →</button>
        </form>
      </section>

      {Loading && (
        <div className='compare-message'>Comparing GitHub Profiles..</div>
      )}

      {Error && !Loading && (
        <div className='compare-error'>{Error}</div>
      )}

      {!Loading && profile1 && profile2 &&(
        <main className='comparison-container'>
          <section className='profile-comparison'>
            {/*User1 */}
            <div className='profile-compare-card'>
              <div className='profile-image-wrapper'>
                <img src={profile1.avatar_url} alt={profile1.login}></img>
              </div>
              <div className='profile-information'>
                <h2>{profile1.name || profile1.login}</h2>
                <p>@{profile1.login}</p>
                <a href={profile1.html_url} target='_blank' rel='noreferrer'>View on GitHub ↗️</a>
              </div>
              <div className='profile-side-stats'>
                <div className='side-stat-item'>
                  <span className='stat-label'>Repositories</span>
                  <span className='stat-val'>{profile1.public_repos}</span>
                </div>
                <div className='side-stat-item'>
                  <span className='stat-label'>Followers</span>
                  <span className='stat-val'>{profile1.followers}</span>
                </div>
                <div className='side-stat-item'>
                  <span className='stat-label'>Following</span>
                  <span className='stat-val'>{profile1.following}</span>
                </div>
              </div>
            </div>

            <div className='vs middle-vs'>VS</div>

            {/*User2 */}
            <div className='profile-compare-card'>
              <div className='profile-image-wrapper'>
                <img src={profile2.avatar_url} alt={profile2.login}></img>
              </div>
              <div className='profile-information'>
                <h2>{profile2.name || profile2.login}</h2>
                <p>@{profile2.login}</p>
                <a href={profile2.html_url} target='_blank' rel='noreferrer'>View on GitHub ↗️</a>
              </div>
              <div className='profile-side-stats'>
                <div className='side-stat-item'>
                  <span className='stat-label'>Repositories</span>
                  <span className='stat-val'>{profile2.public_repos}</span>
                </div>
                <div className='side-stat-item'>
                  <span className='stat-label'>Followers</span>
                  <span className='stat-val'>{profile2.followers}</span>
                </div>
                <div className='side-stat-item'>
                  <span className='stat-label'>Following</span>
                  <span className='stat-val'>{profile2.following}</span>
                </div>
              </div>
            </div>
          </section>

          {/*Comparison table */}
          <section className='comparison-card'>
            <div className='comparison-title'>
              <span>Developer Comparison</span>
              <small>GitHub statistics</small>
            </div>
            {/*Followers */}
            <div className='comparison-row'>
              <div className='stat-value'>{profile1.followers}</div>
              <div className='stat-name'>Followers</div>
              <div className='stat-value right'>{profile2.followers}</div>
            </div>
            {/* FOLLOWING */}
            <div className="comparison-row">
              <div className="stat-value">{profile1.following} </div>
              <div className="stat-name">Following</div>
              <div className="stat-value right">{profile2.following}</div>
            </div>
             {/* REPOSITORIES */}
            <div className="comparison-row">
              <div className="stat-value">{profile1.public_repos}</div>
              <div className="stat-name">Public repositories</div>
              <div className="stat-value right">{profile2.public_repos}</div>
            </div>
            {/* STARS */}
            <div className="comparison-row">
              <div className="stat-value">{stats1.stars}</div>
              <div className="stat-name">Total stars</div>
              <div className="stat-value right">{stats2.stars}
              </div>
            </div>
             {/* FORKS */}
            <div className="comparison-row">
              <div className="stat-value">{stats1.forks}</div>
              <div className="stat-name">Total forks</div>
              <div className="stat-value right">{stats2.forks}</div>
            </div>
            {/* ACCOUNT AGE */}
            <div className="comparison-row">
              <div className="stat-value">{new Date(profile1.created_at).getFullYear()}</div>
              <div className="stat-name">Joined GitHub</div>
              <div className="stat-value right">{new Date(profile2.created_at).getFullYear()}</div>
            </div>
          </section>

          {/* REPOSITORY SUMMARY */}
          <section className="repo-comparison">
            <h2>Repository activity</h2>
            <div className="repo-grid">
              <div className="repo-box">
                <h3>{profile1.login}</h3>
                <p>{stats1.repositories} repositories</p>
                 <p>⭐ {stats1.stars} stars</p>
                <p>🍴 {stats1.forks} forks</p>
              </div>

              <div className="repo-box">
                <h3>{profile2.login}</h3>
                <p> {stats2.repositories} repositories</p>
                <p>⭐ {stats2.stars} stars </p>
                <p>🍴 {stats2.forks} forks</p>
              </div>
            </div>
          </section>
        </main>
      )}
    </div>
  )
   }
export default Compare
function Sidebar() {
  return (
    <div className="m-3 position-fixed">
        <div className="d-flex flex-column gap-3">
            <img className="logo-text" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" alt="Instatext"/>
            <div>Home</div>
            <div>Search</div>
            <div>Explore</div>
            <div>Reels</div>
            <div>Messages</div>
            <div>Notifications</div>
            <div>Create</div>
            <div>Profile</div>
        </div>
        <div className="position-fixed bottom-0 d-flex flex-column gap-3 mb-3">
            <div>Threads</div>
            <div>More</div>
        </div>
    </div>
    
  )
}
export default Sidebar
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
}

document.getElementById("profile-name").innerText = user.name;

document.getElementById("profile-email").innerText = user.email;

document.getElementById("profile-bio").innerText =
    user.bio || "No bio added yet.";

document.getElementById("followers").innerText =
    user.followers ? user.followers.length : 0;

document.getElementById("following").innerText =
    user.following ? user.following.length : 0;

    function timeAgo(date){

    const seconds=Math.floor((new Date()-new Date(date))/1000);

    if(seconds<60) return "Just now";

    const minutes=Math.floor(seconds/60);

    if(minutes<60) return `${minutes} min ago`;

    const hours=Math.floor(minutes/60);

    if(hours<24) return `${hours} hr ago`;

    const days=Math.floor(hours/24);

    return `${days} day${days>1?"s":""} ago`;

}

   async function loadUserPosts() {

    try {

        const response = await fetch("http://localhost:3000/api/posts");

        const posts = await response.json();

        const userPosts = posts.filter(
            post => post.user._id === user._id
        );

        const container = document.getElementById("user-posts");

        document.getElementById("posts-count").innerText = userPosts.length;

        if (userPosts.length === 0) {

            container.innerHTML = `
                <div class="empty-posts">

                    <h2>📝</h2>

                    <h3>No Posts Yet</h3>

                    <p>You haven't shared anything yet.</p>

                </div>
            `;

            return;
        }

        container.innerHTML = "";

        userPosts.forEach(post => {

            container.innerHTML += `
                <div class="user-post">

                    <h4>📝 Post</h4>

                    <p>${post.content}</p>

                    <small>${timeAgo(post.createdAt)}</small>

                </div>
            `;

        });

    } catch (error) {

        console.log(error);

    }

}

loadUserPosts();
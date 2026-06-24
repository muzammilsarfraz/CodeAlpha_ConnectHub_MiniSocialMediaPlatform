const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

// Redirect if not logged in
if (!user || !token) {
    window.location.href = "login.html";
}

// Show logged-in user's name
document.getElementById("username").innerText = `👋 ${user.name}`;

// Logout
function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    window.location.href = "login.html";
}

function showToast(message, type = "success") {

    const toast = document.getElementById("toast");

    toast.innerText = message;

    toast.className = "";

    toast.classList.add(type);

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

// Load Posts
async function loadPosts() {

    try {

        const response = await fetch("http://localhost:3000/api/posts");

        const posts = await response.json();

        const postContainer = document.getElementById("posts");

        postContainer.innerHTML = "";

        if (posts.length === 0) {

    postContainer.innerHTML = `
        <div class="empty-feed">

            <h2>📭</h2>

            <h3>No posts yet</h3>

            <p>Be the first person to share something!</p>

            <button onclick="document.getElementById('content').focus()">
    Create Your First Post
</button>

        </div>
    `;

    return;
}

        posts.forEach(post => {

            const isFollowing = post.user.followers.includes(user._id);

            postContainer.innerHTML += `
<div class="post-card">

<div class="post-header">

    <div class="user-info">

        <img src="images/default-profile.png" class="post-avatar">

        <div>

            <h4>${post.user.name}</h4>

            <small>${timeAgo(post.createdAt)}</small>

        </div>

    </div>

    ${
    post.user._id !== user._id
    ? `
     <button
    class="follow-btn ${isFollowing ? 'following' : ''}"
    onclick="${
        isFollowing
            ? `unfollowUser('${post.user._id}')`
            : `followUser('${post.user._id}')`
    }"
>
    ${isFollowing ? "Following ✓" : "Follow"}
</button>
      `
    : ""
}

</div>


    <p>${post.content}</p>

    <div class="post-actions">

        <button onclick="likePost('${post._id}')">
            ❤️ Like
        </button>

        <span>❤️ ${post.likes.length} Likes</span>

    </div>

    <div id="comments-${post._id}" class="comments"></div>

    <input
        type="text"
        id="comment-${post._id}"
        placeholder="Write a comment..."
    >

    <button onclick="addComment('${post._id}')">
        💬 Comment
    </button>

</div>
`;

loadComments(post._id);

        });

    } catch (error) {

        console.log(error);

    }

}

// Create Post
async function createPost() {

    const content = document.getElementById("content").value;

    if (content.trim() === "") {
        showToast("Please write something.", "error");
        return;
    }

    try {

        const response = await fetch("http://localhost:3000/api/posts", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                user: user._id,

                content: content,

                image: ""

            })

        });

        const data = await response.json();

        showToast(data.message);

        document.getElementById("content").value = "";

        loadPosts();

    } catch (error) {

        console.log(error);

    }

}

async function likePost(postId) {

    try {

        const response = await fetch(
            `http://localhost:3000/api/posts/${postId}/like`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    userId: user._id
                })
            }
        );

        const data = await response.json();

        showToast(data.message);

        loadPosts();

    } catch (error) {

        console.log(error);

    }

}

async function loadComments(postId) {

    try {

        const response = await fetch(
            `http://localhost:3000/api/comments/${postId}`
        );

        const comments = await response.json();

        const container = document.getElementById(`comments-${postId}`);

        if (!container) return;

        container.innerHTML = "";

        comments.forEach(comment => {

            container.innerHTML += `
                <p>
                    <strong>${comment.user.name}:</strong>
                    ${comment.text}
                </p>
            `;

        });

    } catch (error) {

        console.log(error);

    }

}

async function addComment(postId) {

    const text = document.getElementById(`comment-${postId}`).value;

    if (text.trim() === "") return;

    try {

        const response = await fetch(
            "http://localhost:3000/api/comments",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    post: postId,

                    user: user._id,

                    text

                })

            }
        );

        const data = await response.json();

        showToast(data.message);

        document.getElementById(`comment-${postId}`).value = "";

        loadComments(postId);

    } catch (error) {

        console.log(error);

    }

}

function timeAgo(date) {

    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);

    if (hours < 24) return `${hours} hr ago`;

    const days = Math.floor(hours / 24);

    return `${days} day${days > 1 ? "s" : ""} ago`;
}

function focusCreatePost() {

    document.getElementById("content").focus();

}

async function followUser(targetUserId) {

    try {

        const response = await fetch(

            `http://localhost:3000/api/users/${targetUserId}/follow`,

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    userId: user._id

                })

            }

        );

        const data = await response.json();

        showToast(data.message);;

        loadPosts();

    }

    catch(error){

        console.log(error);

    }

}

async function unfollowUser(targetUserId) {

    try {

        const response = await fetch(

            `http://localhost:3000/api/users/${targetUserId}/unfollow`,

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    userId: user._id

                })

            }

        );

        const data = await response.json();

        showToast(data.message);

        loadPosts();

    }

    catch(error){

        console.log(error);

    }

}

function loginUser() {
    alert("Button clicked");
}

loadPosts();
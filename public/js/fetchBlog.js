async function fetchLastedBlog() {
    const parentView = document.getElementById("lasted-blog");
    parentView.style.display = 'none';
    try {
        const key = process.env.GHOST_CMS_KEY;
        const response = await fetch(
            `https://www.mikkipastel.com/ghost/api/v3/content/posts/?key=${key}&fields=title,url,feature_image&limit=5`
        );
    
        if (!response.ok) {
            throw new Error("cannot get some data.");
        }
        const responseJSON = await response.json();
        const blogList = responseJSON.posts;
        console.log(blogList);
    
        const blogListElement = document.getElementById("blog-list");
        blogList.forEach((blog) => {
            const item = document.createElement("div");
            item.className = "blog-item";
            item.innerHTML = `<a href="${blog.url}" target="_blank">
                <img src="${blog.feature_image}" alt="${blog.title}">
                <p>${blog.title}</p>
                </a>`;
            blogListElement.appendChild(item);
        });
    
        const more = document.createElement("div");
        more.className = "blog-more";
        more.innerHTML = `<a href="https://www.mikkipastel.com/" target="_blank">
                <p>more >></p>
                </a>`;
        blogListElement.appendChild(more);
        parentView.style.display = 'block';
        } catch (error) {
            console.error("Error fetching lasted blog list:", error);
        }
    }
fetchLastedBlog();
  
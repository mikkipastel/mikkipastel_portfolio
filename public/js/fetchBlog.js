async function fetchLastedBlog() {
    const parentView = document.getElementById("lasted-blog");
    parentView.style.display = "none";
  
    try {
      const file = "../json/blog.json";
      fetch(file)
        .then((response) => response.json())
        .then((blogs) => {
          // set data
          const blogListElement = document.getElementById("blog-list");
          console.log(blogs);
        
          blogs.posts.forEach((blog) => {
              const item = document.createElement("div");
              item.className = "blog-item";
              item.innerHTML = `<a href="${blog.url}" target="_blank">
                  <img src="${blog.feature_image}" alt="">
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
          parentView.style.display = "block";
        })
        .catch((error) => console.error("Error fetching lasted blog list:", error));
    } catch (error) {
      console.error("Error fetching lasted blog list:", error);
    }
}
fetchLastedBlog();
    
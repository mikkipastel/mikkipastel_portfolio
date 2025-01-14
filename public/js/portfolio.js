async function getWebApps() {
  const parentView = document.getElementById("web-app");
  parentView.style.display = 'none';
  try {
    const response = await fetch(
      "https://portfolio-gdo333yniq-df.a.run.app/web-apps"
    );

    if (!response.ok) {
      throw new Error("cannot get some data.");
    }
    const responseJSON = await response.json();
    const webApps = responseJSON.items;

    const WebAppListElement = document.getElementById("web-list");
    webApps.forEach((app) => {
      createItem(
        app.appIcon,
        app.appName,
        app.description,
        app.url,
        app.year,
        WebAppListElement
      );
    });
    parentView.style.display = 'block';
  } catch (error) {
    console.error("Error fetching web app list:", error);
  }
}
getWebApps();

async function getAndroidApps() {
  const parentView = document.getElementById("publish-application");
  parentView.style.display = 'none';
  try {
    const response = await fetch(
      "https://portfolio-gdo333yniq-df.a.run.app/android-apps"
    );

    if (!response.ok) {
      throw new Error("cannot get some data.");
    }
    const responseJSON = await response.json();
    const androidApps = responseJSON.items;

    const AndroidAppListElement = document.getElementById("publish-app-list");
    androidApps.forEach((app) => {
      createItem(
        app.appIcon,
        app.appName,
        app.description,
        app.url,
        app.year,
        AndroidAppListElement
      );
    });
    parentView.style.display = 'block';
  } catch (error) {
    console.error("Error fetching android app list:", error);
  }
}
getAndroidApps();

async function getAndroidProjects() {
  const parentView = document.getElementById("android-project");
  parentView.style.display = 'none';
  try {
    const response = await fetch(
      "https://portfolio-gdo333yniq-df.a.run.app/android-projects"
    );

    if (!response.ok) {
      throw new Error("cannot get some data.");
    }
    const responseJSON = await response.json();
    const androidApps = responseJSON.items;

    const AndroidAppListElement = document.getElementById("project-list");
    androidApps.forEach((app) => {
      createItemWithOpenPopup(
        app.appIcon,
        app.appName,
        app.description,
        app.year,
        app.html,
        AndroidAppListElement
      );
    });
    parentView.style.display = 'block';
  } catch (error) {
    console.error("Error fetching android project list:", error);
  }
}
getAndroidProjects();

async function getActivities() {
  const parentView = document.getElementById("activity-timeline");
  parentView.style.display = "none";
  try {
    const response = await fetch(
      "https://portfolio-gdo333yniq-df.a.run.app/activites"
    );

    if (!response.ok) {
      throw new Error("cannot get some data.");
    }
    const responseJSON = await response.json();
    const activityList = responseJSON.items;

    const activityListElement = document.getElementById("activity-list");
    var index = 0;
    activityList.forEach((event) => {
      // id for each element
      const indexId = `item-demo-${index}`;
      
      // set blog url
      var blogUrl = "#";
      if (event.blogUrl) {
        blogUrl = event.blogUrl
      }
 
      // create new div
      const eventElement = document.createElement("div");
      eventElement.className = "nes-container is-rounded is-dark with-title is-centered";
      eventElement.innerHTML = `
      <p class="title">${event.tag}</p>
      <div class="timeline-detail">
        <h3>${event.date}:</h3>
        <a href=${blogUrl} style="color: #4bde98;"><h2>${event.title}</h2></a>
        <div>
          <img class="timeline-event-img" src="${event.coverUrl}" alt="${event.title}"/>
        </div>
        <p>${event.description}</p>
        <div id="${indexId}" class="demo"></div>
      </div>`;
      activityListElement.appendChild(eventElement);
      
      // button
      if (typeof event.button !== 'undefined' && event.button.length > 0) {
        const demoElement = document.getElementById(indexId);
        event.button.forEach((btn) => {
          const item = document.createElement("div");
          item.className = "item-demo";
          var icon;
          if (btn.type === "github") {
            icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path fill="currentColor" d="M6 2h12v2H6V2Zm4 12H8v-2h2v2Zm4 0v2h-4v-2h4Zm0 0v-2h2v2h-2Z"/> <path fill="currentColor" d="M6 6V4H4v2H2v12h2v2h2v2h12v-2h2v-2h2V6h-2V4h-2v2h-2v2H8V6H6Zm2 6v-2h8v2h2V6h2v12h-2v2h-2v-4h-2v4h-4v-4H6v2h2v2H6v-2H4v-2h2v-2H4V6h2v6h2Z"/> </svg>`
          } else if (btn.type === "slide") {
            icon = `<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M9 2H5v4h4V2zm7 7V7H2v9h2v6h2v-6h2v6h2V9h6zm-5-7h11v14H11v-2h9V4h-9V2z" fill="currentColor"/> </svg>`
          } else if (btn.type === "demo") {
            icon = `<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M4 4h18v14h-6v2H8v-2H2V4h2zm16 12V6H4v10h16z" fill="currentColor"/> </svg>`
          } else if (btn.type === "video") {
            icon = `<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M2 5h14v4h2V7h2V5h2v14h-2v-2h-2v-2h-2v4H2V5zm2 12h10V7H4v10z" fill="currentColor"/> </svg>`
          } else if (btn.type === "information") {
            icon = `<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M3 3h2v18H3V3zm16 0H5v2h14v14H5v2h16V3h-2zm-8 6h2V7h-2v2zm2 8h-2v-6h2v6z" fill="currentColor"/> </svg>`
          } else {
            icon = `<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M6 4h14v2h2v6h-8v2h6v2h-4v2h-2v2H2V8h2V6h2V4zm2 6h2V8H8v2z" fill="currentColor"/> </svg>`
          }
          item.innerHTML = `
          <a href=${btn.url} aria-label="${btn.type} ${event.title}">
            ${icon}
          </a>`;
          demoElement.appendChild(item);
        });
      }
      index++
    });
    parentView.style.display = 'block';
  } catch (error) {
    console.error("Error fetching activity list:", error);
  }
}
getActivities();

/*
* Example
<div class="app-item">
    <img src="https://miro.medium.com/fit/c/262/262/0*cndEhB4IErmAl-Nn.?size=20"/>
    <h3>2021: <a href="">Emoji Soundboard</a></h3>
    <p>soundboard android application with emoji to remember about sound effect in soundboard.</p>
</div>
*
*/
function createItem(appIcon, appName, description, url, year, parantView) {
  const item = document.createElement("div");
  item.className = "app-item";
  item.innerHTML = `<img src="${appIcon}" alt="${appName}"/>
      <h3>${year}: <a href="${url}" aria-label="${appName}">${appName}</a></h3>
      <p>${description}</p>`;
  parantView.appendChild(item);
}

function createItemWithOpenPopup(
  appIcon,
  appName,
  description,
  year,
  html,
  parantView
) {
  const item = document.createElement("div");
  item.className = "app-item";
  item.innerHTML = `<img src="${appIcon}" alt="${appName}"/>
      <h3>${year}: ${appName}</h3>
      <p>${description}</p>`;
  parantView.appendChild(item);
    
  const button = document.createElement("button");
  button.className = "nes-btn is-primary"
  button.style = "color: #000000;"
  button.textContent = "Information";
  button.addEventListener('click', () => {
    showDialog(html);
  });
  item.appendChild(button);
}

function showDialog(html) {
  const dialog = document.createElement("dialog");
  dialog.className = "nes-dialog is-dark is-rounded";
  dialog.id = "dialog-default";
  dialog.innerHTML = `
     <form method="dialog" style="display: flex;flex-direction: column;align-items: center;">
       ${html}
       <menu class="dialog-menu">
         <button class="nes-btn">Close</button>
      </menu>
    </form>
  `;

  document.body.appendChild(dialog);
  dialog.showModal();

  // delete dialog after closing
  dialog.addEventListener("close", () => {
    dialog.remove();
  });
}

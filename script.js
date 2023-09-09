// Load the JSON data
fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    // Sort the data based on the latest ID number (assuming "id" is a numerical value)
    data.sort((a, b) => b.id - a.id);

    let html = "";

    // Loop through the sorted data and create list items
    data.forEach((episode) => {
      // Create the episode details
      const title = `<a class="hover underline h3" href="mix.html?id=${encodeURIComponent(
        episode.id
      )}">${episode.Title}</a><br/>`;
      // Add a click event listener to play the episode
      const audio = `<audio src="${episode.audio}"></audio>`;
      const album = `<p>Album: ${episode.Album}</p>`;
      const episodeNum = `<p>Episode: ${episode.Episode}</p>`;
      const genre = `<small>Genre: ${episode.Genre}</small><br/><br/>`;
      const artists = `<small>Artists: ${episode.Artists}</small>`;
      const thumbnail = `<img loading="lazy" height="100" width="100" style="object-fit: cover;" alt="${episode.Title}" src="${episode.thumbnail}">`;

      // Create the list item
      const listItem = `
        <tr>
          <th scope="row"><img height="170" width="170" src="${
            episode.thumbnail
          }"/></th>
          <td>
            <a class="hover h3 underline" href="mix.html?id=${encodeURIComponent(
              episode.id
            )}">
          ${episode.Title}
          <br/>${episode.Genre}</a></td>
        </tr>
      `;

      // Append the list item to the HTML variable
      html += listItem;
    });

    // Access the list element and render the HTML
    const episodeList = document.querySelector("#episode-list");
    episodeList.innerHTML = html;
  })
  .catch((error) => {
    console.error(`Error loading JSON data: ${error}`);
  });

// Comment code
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    li.classList.add("my-3");
    li.classList.add("p-3");
    li.classList.add("border");
    li.classList.add("shadow");
    li.classList.add("rounded");
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
// End of Comment code

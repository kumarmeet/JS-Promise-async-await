// parse json to javascript object
// xhr.responseType = "json";
// const listOfPosts = JSON.parse(xhr.response);

const listElement = document.querySelector(".posts");
const template = document.getElementById("single-post");

function sendHttpRequest(method, url) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.onload = function () {
      resolve(xhr.response);
    };

    xhr.send();
  });

  return promise;
}

//using promise
function _fetchPosts_() {
  sendHttpRequest("GET", "https://jsonplaceholder.typicode.com/posts").then(
    (responseData) => {
      const listOfPosts = JSON.parse(responseData);
      for (const post of listOfPosts) {
        const postEl = document.importNode(template.content, true);
        postEl.querySelector("h2").textContent = post.title.toUpperCase();
        postEl.querySelector("p").textContent = post.body;
        listElement.append(postEl);
      }
    }
  );
}

//using async await
async function fetchPosts() {
  const responseData = await sendHttpRequest(
    "GET",
    "https://jsonplaceholder.typicode.com/posts"
  );

  const listOfPosts = JSON.parse(responseData);
  for (const post of listOfPosts) {
    const postEl = document.importNode(template.content, true);
    postEl.querySelector("h2").textContent = post.title.toUpperCase();
    postEl.querySelector("p").textContent = post.body;
    listElement.append(postEl);
  }
}

fetchPosts();

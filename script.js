const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
// in-india
const country = "in"
const options = ["General",
    "Entertainment",
    "Health",
    "Science",
    "Sports",
    "Technology"];
// variable which will used to store url
let requestURL;
// create cards from data for aech articles
const generateUI = (articles) => {
    for (let item of articles) {
        if (item.urlToImage){
        let card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = `    <div class="news-image-container">
        <img src="${item.urlToImage || "./newpaper.jpg"}" alt="/">
    </div>
    <div class="news-content">
        <div class="news-title">
            ${item.title}
        </div>
        <div class="news-description">
            ${item.description || item.content || ""}
        </div>
        <a href="${item.url}" target="_blank" class="view-button">Read more</a>
    </div>`;
        container.appendChild(card);
        }
    }
};
// new api call
const getNews = async () => {
    container.innerHTML = "";
    let response = await fetch(requestURL);
    if (!response.ok) {
        alert("Data unavailable at the moment. Please try again later");
        return false;
    }
    let data = await response.json();
    // call gernerateUI to display articles
    generateUI(data.articles);
};
// category selection when button clicked
const selectCategory = (e, category) => {
    let options = document.querySelectorAll(".option");
    options.forEach((element) => {
        
        element.classList.remove("active");

    });
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
    e.target.classList.add(".active");
    // to fetch and display news from selected category
    getNews();
};
// option Buttons
const createOptions = () => {
    for (let i of options) {
        optionsContainer.innerHTML += `    <button class="options ${i == "general" ? "active" : ""}"
        onclick="selectCategory(event,'${i}')">${i}</button>`;
    }
};
const init = () => {
    optionsContainer.innerHTML = "";
    getNews();
    createOptions();
}
// when load the window
window.onload = () => {
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
    init();
}
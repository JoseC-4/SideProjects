//api key: 5d9acaad8aa64f5bb774970b6ab38e15

const apiKey =`5d9acaad8aa64f5bb774970b6ab38e15`

const blogContainer = document.getElementById("blog-container")
const inputContent= document.getElementById("search-input")
const searchButton = document.getElementById("search-button")



searchButton.addEventListener('click', async ()=>{
    const value = inputContent.value.trim();
    if(value!==""){
        try {
            const articles = await fetchNewsQuery(value)
            displayArticle(articles)
        } catch (error) {
            console.error("Error found obtaining query", error)
        }
    }else{
        try {
                const articles = await fetchNews()
                displayArticle(articles)
        } catch (error) {
                console.error("Error found obtaining query", error)
            }
    }
    
})


async function fetchNewsQuery(query){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`
        const response = await fetch(apiUrl)
        const data = await response.json()

        return data.articles
    } catch (error) {
        console.error("Error found obtaining query", error)
    }
}


async function fetchNews(){

    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        return data.articles;
    } catch (error) {
        console.error("Error found while fetching url",error)
    }
}


function displayArticle(articles){
    blogContainer.innerHTML = ""
    articles.forEach((article) =>{
        const newDiv = document.createElement('div')
        newDiv.classList.add("blog-card")
        
        const img = document.createElement("img")
        if(article.urlToImage === null){
            img.src= 'https://dummyimage.com/600x400/000/fff'
        }else{
            img.src = article.urlToImage;
        }
        const newH2 = document.createElement("h2")
        if(article.title <=30){
            newH2.textContent=article.title
        }else{
            newH2.textContent=article.title.slice(0,30)+"...."
        }

        const content = document.createElement("p")
        if(article.description.length <=120){
            content.textContent = article.description
        }else{
            content.textContent=article.description.slice(0,100)+"....";
        }   
        newDiv.appendChild(img)
        newDiv.appendChild(newH2)
        newDiv.appendChild(content)

        blogContainer.appendChild(newDiv)
    })
}

(async ()=>{
    try {
        const articles= await fetchNews();
        displayArticle(articles)
    } catch (error) {
        console.error("Error fetching random news",error)
        return []
    }
})();



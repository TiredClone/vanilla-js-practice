const button = document.querySelector(".btn")
const image = document.querySelector(".image")
const urls = "https://api.thecatapi.com/v1/images/search"

async function fetchHandler(){
    try{
        const response = await fetch(urls);
        const data = await response.json();

        image.src = data[0].url;
        console.log(data.url)
    } catch (error){
        console.log(error)
    }
}

button.addEventListener('click', () => {
    let isLoaded = image.complete;

    if(isLoaded){
        fetchHandler();
    }
});
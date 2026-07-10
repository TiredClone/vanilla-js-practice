async function getData() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Произошла ошибка", error)}
}

async function main() {
    const postsData = await getData()
    let currentPage = 1;
    let rows = 10;

    function displayList(arrData, rows, currentPage) {
        const postsEl = document.querySelector(".posts");
        postsEl.innerHTML = ""
        currentPage--;

        const start = rows * currentPage;
        const end = start + rows;
        const paginatedData = arrData.slice(start, end);

        paginatedData.forEach((el) => {
            const postEl = document.createElement("div");
            postEl.classList.add("post")
            postEl.innerText = `${el.title}`;
            postsEl.appendChild(postEl)
        })
    }

    function displayPagination(arrData, rows) {
        const paginationEl = document.querySelector(".pagination");
        const pagesCount = Math.ceil(arrData.length / rows)
        const ulEl = document.createElement("ul")
        ulEl.classList.add("pagination__list");

        for(let i = 0; i < pagesCount; i++){
            const liEl = displayPaginationButton (i + 1)
            ulEl.appendChild(liEl)
        }
        paginationEl.appendChild(ulEl)
    }

    function displayPaginationButton (page) {
        const liEl = document.createElement("li");
        liEl.classList.add("pagination__item")
        liEl.innerText = page;

        if(currentPage == page) liEl.classList.add("pagination__item-active");
    
        liEl.addEventListener("click", () => {
            currentPage = page;
            displayList(postsData, rows, currentPage);
            let currentItemLi = document.querySelector("li.pagination__item-active")
            currentItemLi.classList.remove("pagination__item-active")

            liEl.classList.add("pagination__item-active")
        })
        return liEl;
    }

    displayList(postsData, rows, currentPage)
    displayPagination(postsData, rows)
}

main();
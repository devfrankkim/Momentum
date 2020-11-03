let URLs = "picsum.photos/v2/list?page=2&limit=50"

async function fetchData(limitImgs){
    url = `https://picsum.photos/v2/list?page=2&limit=${limitImgs}`
    try{
        const response = await fetch(url);
        const commits = await response.json(); // read response body and parse as JSON
        renderPage(commits)
        return commits
    }catch(error){
        console.log(error);
    }
}

// ======= Get URLs limit datas =======
function getLimitNumber(){
    const urlArray = URLs.split("/");
    const limit = urlArray[urlArray.length - 1];
    const limitNumber = limit.slice(limit.lastIndexOf('=') + 1);
    return limitNumber
}

function template(){
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpeg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function renderPage(datas){
    let random = Math.floor(Math.random() * datas.length)
    let {download_url : URLimg} = datas[random]
    let image = new Image();
    image.src = URLimg;
    image.classList.add("bgImage");
    document.body.prepend(image);
}

function init(){
    const limitImgs = getLimitNumber()
    fetchData(limitImgs);
}

init();
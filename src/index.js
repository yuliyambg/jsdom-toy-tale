let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
    const getToys = () => {
        document.querySelector("#toy-collection").innerHTML = ""
        fetch("http://localhost:3000/toys", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then(function (resp) {
            return resp.json()
        })
            .then(function (data) {
                // console.log(data);
                data.forEach(function (element) {
                    document.querySelector("#toy-collection").innerHTML +=
                        `<div class="card"><h2> ${element.name}</h2><img src=${element.image} class="toy-avatar"/>
              <p> ${element.likes} Likes </p><button class="like-btn" data-likes=${element.likes} data-id=${element.id}>Like <3</button> </div>`
                })
            })
    }

    getToys();


  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", (e) => {

    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

const newBtn = document.querySelector('input[name="submit"]');
const toyName = document.querySelector('input[name="name"]');
const toyImage = document.querySelector('input[name="image"]');

newBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // hide & seek with the form
    fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "name": toyName.value,
            "image": toyImage.value,
            "likes": 0
        })

    }).then(r => r.json())
    getToys();
});

    const container = document.querySelector("#toy-collection");

    container.addEventListener("click", (e) => {
        e.preventDefault();

        if (e.target.className === "like-btn") {
            const id = e.target.getAttribute("data-id")
            const likes = parseInt(e.target.getAttribute("data-likes"))
            // hide & seek with the form
            fetch(`http://localhost:3000/toys/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    "likes": likes + 1
                })

            })
            getToys()
        }
    });
});


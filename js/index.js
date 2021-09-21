const token = "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";
const headers = {
  Authorization: `Token ${token}`,
  Accept:"application/vnd.github.mercy-preview+json"
};
let container = document.getElementById("container-tarjetas");

let limites = "https://api.github.com/rate_limit";
let repos = "https://api.github.com/user/repos";
let org = `https://api.github.com/orgs/{org}/repos`;
let proyectos = `https://api.github.com/repos/JaviCss/{repo}/projects`;
let pages = `https://api.github.com/repos/{owner}/{repo}/pages`;
//let repositorio = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/contents/README.md`
//let deploy = `https://api.github.com/repos/jarihel/${repo.name}/deployments`

getRepos();

async function getRepos() {
  await fetch(repos, {
    method: "GET",
    headers: headers,
  })
    .then((e) => e.json())
    .then((data) => {
      console.log(data)
      data.forEach((repo) => {
        const div1 = document.createElement("div");
        const div2 = document.createElement("div");
        const boton = document.createElement("a");
        const boton2 = document.createElement("a");
        const img = document.createElement("img");
        const titulo = document.createElement("h3");
        const desc = document.createElement("p");
        /*PAGINAS */
        if (repo.has_pages) {
          getPagina(repo.owner.login, repo.name,boton2,div2);          
        }
        /*Imagen miniatura */        
        fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/topics`, {
            method: "GET",
            headers: headers,            
          })
        .then((res2) => res2.json())
        .then((data3) => {
           if (data3.names.length >= 0){
            fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/contents/portada.jpg`, {
                method: "GET",
                headers: headers,
              })
            .then((res) => res.json())
            .then((data2) => {              
              img.src = data2.download_url;
              img.alt = repo.nombre;
              img.className = "miniatura";   
            });
        }else{
                
            img.src = './img/default.png';
            img.alt = repo.nombre;
            img.className = "miniatura"; }
        });
        if (true) {
          /*BASE DE LOS DIVS */
          div1.className = "col-sm-6 "
          div2.className = "tarjeta"
          /*INYECCION DE INFO */
          titulo.className = "my-sm-4 titulo nu-20"
          titulo.textContent = repo.name
          desc.textContent = repo.description
          boton.textContent = "Ver repositorio"
          boton.className = "btn btn-success tarjeta-btn"
          boton.href = repo.html_url
          /*AGREGA LOS ELEMENTOS AL DOM*/
          container.appendChild(div1);
          //$(".tarjeta").addClass("op-1");
          div1.appendChild(div2);
          div2.appendChild(img);
          div2.appendChild(titulo);
          div2.appendChild(desc);
          div2.appendChild(boton);         
        }
      });
    });
}
/*GET PAGINA */
async function getPagina(user,repo,boton2,div2) {
   await fetch(
        `https://api.github.com/repos/${user}/${repo}/pages`,
        {
          method: "GET",
          headers: headers,
        }
      )
        .then((e2) => e2.json())
        .then((data2) => {
          boton2.textContent = "Ver sitio";
          boton2.className = "btn btn-warning tarjeta-btn";
          boton2.href = data2.html_url;
          div2.appendChild(boton2);
        });
}



$("#owl1").owlCarousel({
  autoplay: false,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  autoplaySpeed: 1000,
  loop: true,
  dots: true,
  autoHeight: false,
  responsiveClass: true,
  responsive: {
    0: {
      margin: 10,
      items: 1,
      nav: false,
    },
    600: {
      margin: 60,
      items: 1,
      nav: true,
    },
    1024: {
      margin: 60,
      items: 1,
      nav: true,
      loop: false,
    },
  },
});
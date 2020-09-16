//SELECTORS
let mainDiv = document.querySelector('.main');
let liveSearchBox = document.getElementById('searchBox');
let clearButton = document.getElementById('clearBtn');
let allShows = document.getElementById('showAllBtn');
let selectTag = document.getElementById('episodes');
let selectTag2 = document.getElementById('shows');
let showTitle = document.getElementById('showTitle');
let tvShows = getAllShows();
let startShowNum = 82;

function setup() {
  getEpisodesFromApi(); 
  
}
window.onload = setup;

function getEpisodesFromApi(){
  fetch(`https://api.tvmaze.com/shows/${startShowNum}/episodes`)
  .then(response => {
    return response.json();
  }).then(data => {
    console.log(data);
    let totalEpisodes = data.length;
    let totalShows = tvShows.length;

     for(let i=0; i< data.length; i++){
      //CREATE ELEMENTS
      let displayCardDiv = document.createElement('div');
      displayCardDiv.id = "card";
      displayCardDiv.style.overflow= "auto";
      let title = document.createElement('h2');
      title.id = "cardTitle";
      let cardImage = document.createElement('img');
      let cardSummary = document.createElement('p');
      cardSummary.id= "cardSummary";
      let displayResult = document.getElementById('display');

      let runTimeEl = document.createElement('h4');
      runTimeEl.id = "runTimeId";
      let ratingEl = document.createElement('h4');
      ratingEl.id = "ratingId";
      let statusEL = document.createElement('h4');
      statusEL.id = "statusId";


      //ADD CONTENTS TO ELEMENTS
      title.textContent= `${tvShows[i].name}`;
      cardImage.src = `${tvShows[i].image}`; //when i remove image (image.medium) the drop down menus work fine???
      cardImage.style.borderRadius = "5px";
      let modifiedSummary = `${tvShows[i].summary}`.substring(3, tvShows[i].summary.length-4);
      cardSummary.textContent = modifiedSummary;
      displayResult.textContent = `Displaying ${tvShows.length}/${totalShows} shows`;

      runTimeEl.textContent = `Runtime: ${tvShows[i].runtime} mins`;
      ratingEl.textContent = `Rating: ${tvShows[i].rating.average}`;
      statusEL.textContent = `Status: ${tvShows[i].status}`


      //APPEND ELEMENTS TO PARENT
      mainDiv.appendChild(displayCardDiv);

      displayCardDiv.appendChild(title);
      displayCardDiv.appendChild(ratingEl);
      displayCardDiv.appendChild(runTimeEl);
      displayCardDiv.appendChild(statusEL);
      
      displayCardDiv.appendChild(cardImage);
      displayCardDiv.appendChild(cardSummary);

      
     

    }
    
    //EVENT LISTENERS
    selectTag2.addEventListener('change', (x) =>{

      mainDiv.textContent = "";
      selectTag.textContent = "";
      showNum = x.target.value;

      fetch(`https://api.tvmaze.com/shows/${showNum}/episodes`).
      then(response => {
        return response.json();
      })
      .then(dataApi => {
        console.log(dataApi);
        let totalEpisodes2 = dataApi.length;

        
        liveSearchBox.addEventListener('input', searchHandler2);

      //DISPLAYS ALL EPISODES AFTER SELECTION IN DROPDOWN
      for(let i=0; i< dataApi.length; i++){
        //CREATE ELEMENTS
        let displayCardDiv = document.createElement('div');
        displayCardDiv.id = "card";
        displayCardDiv.style.overflow= "auto";
        let title = document.createElement('h2');
        title.id = "cardTitle";
        let cardImage = document.createElement('img');
        let cardSummary = document.createElement('p');
        cardSummary.id= "cardSummary";
        let displayResult = document.getElementById('display');

        //ADD CONTENTS TO ELEMENTS
       
        title.textContent= `${dataApi[i].name} - S0${dataApi[i].season}E0${dataApi[i].number}`;
        cardImage.src = `${dataApi[i].image.medium}`;
        cardImage.style.borderRadius = "5px"
        cardSummary.textContent = `${dataApi[i].summary}`;
        displayResult.textContent = `Displaying ${dataApi.length}/${totalEpisodes2} Episodes`;

        //APPEND ELEMENTS TO PARENT
        mainDiv.appendChild(displayCardDiv);
        displayCardDiv.appendChild(title);
        displayCardDiv.appendChild(cardImage);
        displayCardDiv.appendChild(cardSummary);

    }

    function searchHandler2(){
      let searchResult = liveSearchBox.value.toLowerCase();
      let filteredEpisodes = dataApi.filter(({name, summary}) => {
        return (name.toLowerCase().includes(searchResult) || summary.toLowerCase().includes(searchResult));
      });
    
      //REMOVES PREVIOUS RESULTS
      mainDiv.textContent= "";
    
      for(let i=0; i< filteredEpisodes.length; i++){
        //CREATE ELEMENTS
        let displayCardDiv = document.createElement('div');
        displayCardDiv.id = "card";
        displayCardDiv.style.overflow= "auto";
        let title = document.createElement('h2');
        title.id = "cardTitle";
        let cardImage = document.createElement('img');
        let cardSummary = document.createElement('p');
        cardSummary.id= "cardSummary";
        let displayResult = document.getElementById('display');
    
        //ADD CONTENT TO ELEMENTS
        title.textContent= `${filteredEpisodes[i].name} - S0${filteredEpisodes[i].season}E0${filteredEpisodes[i].number}`;
        cardImage.src = `${filteredEpisodes[i].image.medium}`;
        cardImage.style.borderRadius = "5px"
        cardSummary.textContent = `${filteredEpisodes[i].summary}`;
        displayResult.textContent = `Displaying ${filteredEpisodes.length}/${totalEpisodes2} episodes`;
    
        //APPEND TO PARENT NODES
        mainDiv.appendChild(displayCardDiv);
        displayCardDiv.appendChild(title);
        displayCardDiv.appendChild(cardImage);
        displayCardDiv.appendChild(cardSummary);
      }
    }

    //LISTS ALL EPISODES IN EPISODES DROPDOWN
    function selectMenu2(){
      for(let i=0; i<dataApi.length; i++){
         let optionTag = document.createElement('option');
         optionTag.value= i;
         optionTag.textContent = `S0${dataApi[i].season}E0${dataApi[i].number} - ${dataApi[i].name}`;
         selectTag.appendChild(optionTag);
      } 
    }
        selectMenu2();
        selectTag.addEventListener('change', selectEpisode2);

        //DISPLAYS SELECTED EPISODE FROM DROPDOWN
        function selectEpisode2(x){
        //CLEAR SCREEN
        mainDiv.textContent= "";

        //CREATE ELEMENTS
        let displayCardDiv = document.createElement('div');
        displayCardDiv.id = "card";
        let title = document.createElement('h2');
        title.id = "cardTitle";
        let cardImage = document.createElement('img');
        let cardSummary = document.createElement('p');
        cardSummary.id= "cardSummary";
        let displayResult = document.getElementById('display');

        //ADD CONTENT TO ELEMENTS
        title.textContent= `${dataApi[x.target.value].name} - S0${dataApi[x.target.value].season}E0${dataApi[x.target.value].number}`;
        cardImage.src = `${dataApi[x.target.value].image.medium}`;
        cardImage.style.borderRadius = "5px"
        cardSummary.textContent = `${dataApi[x.target.value].summary}`;
        displayResult.textContent = `Displaying 1/${totalEpisodes} episodes`;

        //APPEND ELEMENTS TO PARENT NODES
        mainDiv.appendChild(displayCardDiv);
        displayCardDiv.appendChild(title);
        displayCardDiv.appendChild(cardImage);
        displayCardDiv.appendChild(cardSummary);
        }




        }).catch(err => {
            console.error(err);
            console.log('error!!!');
        })
    });


    allShows.onclick = () => {
      location.reload();
    //   let totalShows = tvShows.length;

    //  for(let i=0; i< data.length; i++){
    //   //CREATE ELEMENTS
    //   let displayCardDiv = document.createElement('div');
    //   displayCardDiv.id = "card";
    //   displayCardDiv.style.overflow= "auto";
    //   let title = document.createElement('h2');
    //   title.id = "cardTitle";
    //   let cardImage = document.createElement('img');
    //   let cardSummary = document.createElement('p');
    //   cardSummary.id= "cardSummary";
    //   let displayResult = document.getElementById('display');

    //   // let runTimeEl = document.createElement('h4');
    //   // runTimeEl.id = "runTimeId";
    //   // let ratingEl = document.createElement('h4');
    //   // ratingEl.id = "ratingId";
    //   // let statusEL = document.createElement('h4');
    //   // statusEL.id = "statusId";


    //   //ADD CONTENTS TO ELEMENTS
    //   title.textContent= `${tvShows[i].name}`;
    //   cardImage.src = `${tvShows[i].image.medium}`;
    //   cardImage.style.borderRadius = "5px"
    //   cardSummary.textContent = `${tvShows[i].summary}`;
    //   displayResult.textContent = `Displaying ${tvShows.length}/${totalEpisodes} Episodes`;

    //   // runTimeEl.textContent = `Runtime: ${tvShows[i].runtime} mins`;
    //   // ratingEl.textContent = `Rating: ${tvShows[i].rating.average}`;
    //   // statusEL.textContent = `Status: ${tvShows[i].status}`


    //   //APPEND ELEMENTS TO PARENT
    //   mainDiv.appendChild(displayCardDiv);

    //   displayCardDiv.appendChild(title);
    //   // displayCardDiv.appendChild(ratingEl);
    //   // displayCardDiv.appendChild(runTimeEl);
    //   // displayCardDiv.appendChild(statusEL);
      
    //   displayCardDiv.appendChild(cardImage);
    //   displayCardDiv.appendChild(cardSummary);

      
     

    // }

    }
    clearButton.onclick = () =>{
    document.getElementById('searchBox').value = '';
    mainDiv.textContent="";
    location.reload();
    }
    liveSearchBox.addEventListener('input', searchHandler);

    //DISPLAYS ALL EPISODES
    // for(let i=0; i< data.length; i++){
    //   //CREATE ELEMENTS
    //   let displayCardDiv = document.createElement('div');
    //   displayCardDiv.id = "card";
    //   displayCardDiv.style.overflow= "auto";
    //   let title = document.createElement('h2');
    //   title.id = "cardTitle";
    //   let cardImage = document.createElement('img');
    //   let cardSummary = document.createElement('p');
    //   cardSummary.id= "cardSummary";
    //   let displayResult = document.getElementById('display');

    //   //ADD CONTENTS TO ELEMENTS
    //   title.textContent= `${data[i].name} - S0${data[i].season}E0${data[i].number}`;
    //   cardImage.src = `${data[i].image.medium}`;
    //   cardImage.style.borderRadius = "5px"
    //   cardSummary.textContent = `${data[i].summary}`;
    //   displayResult.textContent = `Displaying ${data.length}/${totalEpisodes} Episodes`;

    //   //APPEND ELEMENTS TO PARENT
    //   mainDiv.appendChild(displayCardDiv);
    //   displayCardDiv.appendChild(title);
    //   displayCardDiv.appendChild(cardImage);
    //   displayCardDiv.appendChild(cardSummary);

    // }

    function searchHandler(){
      let searchResult = liveSearchBox.value.toLowerCase();
      let filteredEpisodes = data.filter(({name, summary}) => {
        return (name.toLowerCase().includes(searchResult) || summary.toLowerCase().includes(searchResult));
      });
    
      //REMOVES PREVIOUS RESULTS
      mainDiv.textContent= "";
    
      for(let i=0; i< filteredEpisodes.length; i++){
        //CREATE ELEMENTS
        let displayCardDiv = document.createElement('div');
        displayCardDiv.id = "card";
        displayCardDiv.style.overflow= "auto";
        let title = document.createElement('h2');
        title.id = "cardTitle";
        let cardImage = document.createElement('img');
        let cardSummary = document.createElement('p');
        cardSummary.id= "cardSummary";
        let displayResult = document.getElementById('display');
    
        //ADD CONTENT TO ELEMENTS
        title.textContent= `${filteredEpisodes[i].name} - S0${filteredEpisodes[i].season}E0${filteredEpisodes[i].number}`;
        cardImage.src = `${filteredEpisodes[i].image.medium}`;
        cardImage.style.borderRadius = "5px"
        cardSummary.textContent = `${filteredEpisodes[i].summary}`;
        displayResult.textContent = `Displaying ${filteredEpisodes.length}/${totalEpisodes} episodes`;
    
        //APPEND TO PARENT NODES
        mainDiv.appendChild(displayCardDiv);
        displayCardDiv.appendChild(title);
        displayCardDiv.appendChild(cardImage);
        displayCardDiv.appendChild(cardSummary);
      }

    }
    selectShows();

    //LISTS ALL SHOWS IN SHOWS DROPDOWN
    function selectShows(){
      for(let i=0; i< tvShows.length; i++ ){
        let optionTags = document.createElement('option');
        optionTags.value = tvShows[i].id;
        optionTags.textContent = `${tvShows[i].name}`;
        selectTag2.appendChild(optionTags);


      }
    }
    
    function selectMenu(){
      for(let i=0; i<data.length; i++){
         let optionTag = document.createElement('option');
         optionTag.value= i;
         optionTag.textContent = `S0${data[i].season}E0${data[i].number} - ${data[i].name}`;
         selectTag.appendChild(optionTag);
      } 
    }
    selectMenu();
    selectTag.addEventListener('change', selectEpisode);


    //DISPLAYS SELECTED EPISODE FROM DROPDOWN
    function selectEpisode(x){
      //CLEAR SCREEN
      mainDiv.textContent= "";

      //CREATE ELEMENTS
      let displayCardDiv = document.createElement('div');
      displayCardDiv.id = "card";
      let title = document.createElement('h2');
      title.id = "cardTitle";
      let cardImage = document.createElement('img');
      let cardSummary = document.createElement('p');
      cardSummary.id= "cardSummary";
      let displayResult = document.getElementById('display');

      //ADD CONTENT TO ELEMENTS
      title.textContent= `${data[x.target.value].name} - S0${data[x.target.value].season}E0${data[x.target.value].number}`;
      cardImage.src = `${data[x.target.value].image.medium}`;
      cardImage.style.borderRadius = "5px"
      cardSummary.textContent = `${data[x.target.value].summary}`;
      displayResult.textContent = `Displaying 1/${totalEpisodes} episodes`;

      //APPEND ELEMENTS TO PARENT NODES
      mainDiv.appendChild(displayCardDiv);
      displayCardDiv.appendChild(title);
      displayCardDiv.appendChild(cardImage);
      displayCardDiv.appendChild(cardSummary);
    }

  }).catch(err => {
    console.log('Error!!!!');
    console.error(err);
  });
}





  





  



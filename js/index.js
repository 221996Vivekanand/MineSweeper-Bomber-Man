function startGame(){
    let score =0;
    console.log("working!");
    let root = document.getElementById("root");
    let points = document.getElementById("point"); 
    let startNewGame = document.getElementById("start");
    let cong = document.getElementById("congrat");
    let bomIndexs = generateRandomNumArray([]);
    let visited = [];
    console.log("her",bomIndexs);
    let gameOver = false;
  
    for(let i=0;i< 9;i++){
      let row = document.createElement("div");// create 9 divs 
      row.style.height="50px";
      row.style.marginLeft="370px";
     // row.style.position = "absolute";
      for(let x = 0; x<9; x++){
        let currentIndex = (i *9+x);
        let coll = document.createElement("button"); 
        // inside every one of those 9 divs we are creating 9 more divs // 81 divs
        coll.style.height = "50px";
        coll.style.width  = "50px";
        coll.innerHTML="";
        coll.style.display="inline-block";
        coll.style.border = "1px solid black";
        coll.setAttribute("id",currentIndex);
  
        coll.addEventListener("contextmenu", () => {
          if (bomIndexs.has(currentIndex)) {
            gameOver = true;
            for(let j=0;j<10;j++){
              const array = [...bomIndexs];
              let bomb = array[j];
              let bombNode = document.getElementById(bomb);
              bombNode.style.background = "red";
              //bombNode.innerHTML="red";
              console.log(currentIndex);
            }
            startNewGame.style.display="block";
  
          } else {
  
          
          coll.style.background = "yellow";
          return false;
          }
        coll.innerHTML = "!";
        }, false);
  
        coll.addEventListener("click", ()=>{
  
          if(!bomIndexs.has(currentIndex) && !gameOver)
          {
            if(!visited.includes(currentIndex))
            {
              visited.push(currentIndex);
              score++;
              points.innerHTML=score;
              coll.style.background="green";
              coll.style.position="relative";
              coll.style.top="-18px";
              points.style.marginLeft="640px";
              // whenever a 'i' is clicked we have to search for 
              // i-1, i+1 // similarly conditions for j
  
              // 80 -- 71, 70, 79 - i (i+1, i-1, i-9, i-10) // given that 
              // i+1 > 80 & i-1 < 0
              // 49 -- 48, 57, 58, 59, 50, 39, 40, 41 //
              // i-1: j , i+1: j, i-1: j-1, i+1: j+1, i: j+1 i-8, i-9, i-10, i+8, i+9, i+10 
              // for every cell clicked we do this 8 checks with the 
              // boundry condition chck also (i + anything !> 80 &&
              // i - anything !< 0)
              // 74 -- 73, 75, 64, 65, 66
  
              let countObt = checkEightNeighbours(currentIndex, bomIndexs);
              coll.innerText=countObt;//("value",countObt.toString());
              coll.style.fontStyle = "bold";
              //coll.style.position = "";
              let arr1 = [-1, 0, 1];
              let arr2 = [];
              //for (let k = )
              console.log(currentIndex);
            }
            if(score === 71){
              cong.style.display="block";
              gameOver=true;
            }
          }
          else{
            for(let j=0;j<10;j++){
              gameOver = true;
              const array = [...bomIndexs];
              let bomb = array[j];
              let bombNode = document.getElementById(bomb);
              bombNode.style.background = "red";
              //bombNode.innerHTML="red";
              console.log(currentIndex);
            }
            startNewGame.style.display="block";
  
          }
        })
        row.appendChild(coll);
      }
  
      root.appendChild(row); 
  }
  
  
  startNewGame.addEventListener("click",()=> {
    window.location.reload();
   })
  }
  
  function generateRandomNumArray(){
    let set = new Set();
    for(let i = 0; set.size!=10;i++){
      set.add(Math.ceil(81*Math.random()));
    }
    return set;
  }
  
  
  function checkEightNeighbours(idx, bomIndexs) {
    let count = 0;
    // i-1, i+1, i-8, i-9, i-10, i+8, i+9, i+10 
    // 79, 72, 71, 70
    if (idx-1 >= 0 && bomIndexs.has(idx-1) && (idx % 9 !== 0)) {
      count++;
    }
    if (idx+1 <= 80 && bomIndexs.has(idx+1) && (idx+1) % 9 !== 0) {
      count++;
    }
    if (idx-8 >= 0 && bomIndexs.has(idx-8) && ((idx+1) % 9) !== 0) {
      count++;
    }
    if (idx+8 <= 80 && bomIndexs.has(idx+8) && (idx % 9) !== 0) {
      count++;
    }
    if (idx-9 >= 0 && bomIndexs.has(idx-9)) {
      count++;
    }
    if (idx+9 <= 80 && bomIndexs.has(idx+9)) {
      count++;
    }
    if (idx-10 >= 0 && bomIndexs.has(idx-10)) {
      count++;
    }
    if (idx+10 <= 80 && bomIndexs.has(idx+10)) {
      count++;
    }
    // 36 -- 37, 35X
    return count;
  
  }
  startGame();
/*function startGame(){
    let score =0;
console.log("working!");
let root = document.getElementById("root");
let points = document.getElementById("point"); 
let startNewGame = document.getElementById("start");
let cong = document.getElementById("congrat");
//console.log("Root",root);
let bomIndexs = generateRandomNumArray([]);

let visited = [];
console.log("her",bomIndexs);
let gameOver = false;


for(let i=0;i<9;i++){

   let row = document.createElement("div");
   row.style.height="50px";
   row.style.marginLeft="370px";

   for(let x = 0; x<9; x++){
       let currentIndex = (i *9+x);
       let coll = document.createElement("div");
       coll.style.height = "50px";
       coll.style.width  = "50px";
       coll.innerHTML="";
       coll.style.display="inline-block";
       coll.style.display="relative";
       coll.style.border = "1px solid black";
       coll.setAttribute("id",currentIndex);
       coll.addEventListener("click",()=>{
           if(!bomIndexs.has(currentIndex) && !gameOver)
           {
            
            coll.innerHTML=currentIndex;
               if(!visited.includes(currentIndex))
               {
                   visited.push(currentIndex);
               score++;
               points.innerHTML=score;
               points.style.marginLeft="640px";
              coll.style.background="green"
              console.log(currentIndex);
              
               }
              if(score === 71){
                  cong.style.display="block";
                  gameOver=true;
              }
           }
           else{
               for(let j=0;j<10;j++){
                   gameOver = true;
                const array = [...bomIndexs];
                   let bomb = array[j];
                   let bombNode = document.getElementById(bomb);
                   bombNode.style.background = "red";
                  // bombNode.innerHTML="💣";
                   console.log(currentIndex);
               }
               startNewGame.style.display="block";
            
           }
       })
       row.appendChild(coll);
   }

   root.appendChild(row); 

 }
    startNewGame.addEventListener("click",()=>{
        location.reload();
    })
}

function generateRandomNumArray(){
    let set = new Set();
    for(let i = 0; set.size!=10;i++){
        set.add(Math.ceil(81*Math.random()));
    }
    return set;
}

startGame();*/
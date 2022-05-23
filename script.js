
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span></span>${data.languages[0].nativeName}</p>
      <p class="country__row"><span>🗼</span>${data.capital}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};



const getCountryData = (country)=>{
    fetch(`https://restcountries.com/v2/name/${country}`)
    .then((response)=>{
      if(!response.ok){
        throw new Error(`Country not found (${response.status})`);
      }
        return response.json();
    }).then((data)=>{

        console.log(data[0].languages[0].nativeName);
        renderCountry(data[0]);

        const neighbour = data[0].borders[0];
        if(!neighbour){
            throw new Error('No neighbour found!');
        }
        console.log(neighbour)

        return fetch(`https://restcountries.com/v2/name/${neighbour}`);

    }).then((response) => {
       return response.json();
    })
    .then((data)=>{
        renderCountry(data[0],'neighbour');
    }
    ).catch((err)=>{
        console.error(`Some thing went wrong ${err.message} try again`)
    })};

//calling the function

    btn.addEventListener('click',()=>{
        const name = prompt('Enter a Country Name');
       if(name){
        getCountryData(name);
       }else{
           alert("Please Enter A Country Name")
       }
        
    })

    // console.log("Test start");
    // setTimeout(()=> console.log('0 sec timer'),0);
    // Promise.resolve('Resolve promise 1').then( res => console.log(res));

    // Promise.resolve('Resolve promise 2').then(res =>{
    //   for(let i=0;i<10000000000;i++){  }
    //   console.log(res);
    // });
    // console.log('Test end');

    // const lotteryPromise = new Promise((resolve,reject)=>{

    //   console.log('Lotter drawis happening ..');

    //   setTimeout(()=>{
    //     if(Math.random() >= 0.5){
    //       resolve('You Win 🌝');
    //     } else {
    //       reject(new Error('You lost your money👎'));
    //     }
    //   },5000)
    // });

    // lotteryPromise.then(res => console.log(res)).catch(err=>console.error(err));


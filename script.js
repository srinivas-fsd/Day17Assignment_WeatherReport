//Creating container and appending it to body
let container = document.createElement("div");
container.classList.add("container");
let header = document.createElement("h1");
header.setAttribute("id","title");
header.classList.add("text-center");
header.innerText=" Click weather button to see graphical weather report in background";
container.appendChild(header);
let row = document.createElement("div");
row.classList.add("row");
row.setAttribute("id","containerRow")
container.appendChild(row);
document.body.appendChild(container);

document.body.style.backgroundColor="#606060";


//Fetching data from API and assiging it to card
fetch('https://restcountries.com/v3.1/all')
        .then( (res) =>{
           return res.json()
        })
        .then((data) => {
            data.forEach( country =>
              {

                //card column
                let countryColumn = document.createElement('div');
                countryColumn.classList.add('col-sm-6', 'col-md-4', 'col-lg-4', 'col-xl-4', 'mb-4');
        
                let countryCard = document.createElement('div');
                countryCard.classList.add('card','h-100','text-white');
                countryCard.style.backgroundColor ="#CABC81";
        
                //card header
                let name = document.createElement('div');
                name.classList.add('card-header');
                name.style.backgroundColor = "black";
                name.style.color = "white";
                name.style.textAlign = "center";
                let header4 = document.createElement("h4");
                header4.textContent = country.name.common;
                name.appendChild(header4);

                //card body
                let countryCardBody = document.createElement('div');
                countryCardBody.classList.add('card-body');
                countryCardBody.style.backgroundColor = "#CABC81"; 
                countryCardBody.style.color = "white";
                countryCardBody.style.fontFamily = "Times New Roman,sans-serif";
                countryCardBody.style.fontWeight = "400";
                countryCardBody.style.textAlign = "center";
        
                //card image (flag)
                let flag = document.createElement('div');;
                flag.classList.add('card-img','d-block','mx-auto','mt-4');
                flag.style.height = "220px";
                flag.style.width = "290px";
                flag.style.textAlign = "center";
                flag.style.objectFit = "cover";
                flag.style.color ="#CABC81";

                const img = document.createElement("img");
                img.setAttribute("src",country.flags.png);
                img.setAttribute("class","h-100 card img card-img-top  border-black");
                img.alt = "Flag of : " + country.name.common;
                
                flag.appendChild(img);
        
        
        
                let capital = document.createElement('p');
                capital.classList.add('card-text');
                capital.innerHTML = "Capital : " ;
                 if(country.capital)
                  {
                    capital.innerHTML+=country.capital[0];
                  }
                  else
                  {
                    capital.innerHTML+="Information not available"
                  }
                
                let cardText = document.createElement("div");
                cardText.classList.add('card-text');
                let region = document.createElement('p');
                //region.classList.add('card-text');
                region.innerHTML = " Region : " + country.region;
        
                
        
                let countryCode = document.createElement('p');
                countryCode.innerHTML = "Country Code : " + country.cca3;

                let latLong = document.createElement('p');
                latLong.innerHTML = "LatLng : " + country.latlng.join(',');

                let wButton = document.createElement('button');
                wButton.classList.add('btn', 'btn-primary-outline');
                wButton.textContent = 'Click for Weather';

                //Changing background based on weather report
                wButton.addEventListener('click', () =>
                   {
                 getWeatherData(country.latlng[0], country.latlng[1])
                .then( (data) => {
                  
                    if(data.weather[0].description.includes("scattered clouds"))
                      {
                        document.body.style.backgroundImage = "url(https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDgzdXJydWZsMG12bzczNjNpc2w1M3oxazlucnEyM3kyanhjN3U4OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SnI9JZGHU9vb2/giphy.webp)";
                      }
                    else if(data.weather[0].description.includes("overcast clouds"))
                      {
                        document.body.style.backgroundImage = "url(https://media1.tenor.com/m/BvfLmdwdmKUAAAAd/moving-clouds-world-meteorological-day.gif)";
                      }
                  else if(data.weather[0].description.includes("clouds"))
                      {
                        document.body.style.backgroundImage = "url(https://media1.tenor.com/m/oDzureGdeKYAAAAC/momo%27s-sound-diary-clouds.gif)";
                      }
                  else if(data.weather[0].description.includes("clear sky"))
                      {
                        document.body.style.backgroundImage = "url(https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTAwM2R3bTdqbTZseXh3MzB1aHR2cTdtc3diNTZubmZhN2F3dTRzOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0Styincf6K2tvfjb5Q/giphy.webp)";
                      }
                  
                  else if(data.weather[0].description.includes("heavy intensity rain"))
                      {
                        document.body.style.backgroundImage = "url(https://cdn.pixabay.com/animation/2023/02/15/02/20/02-20-04-915_512.gif)";
                      }  
                  else if(data.weather[0].description.includes("rain"))
                      {
                        document.body.style.backgroundImage = "url(https://media1.giphy.com/media/26DMWExfbZSiV0Btm/giphy.webp?cid=ecf05e47w18z8kg79dhrm8jxlqiavxj6q0y3k03w65cn9rx9&ep=v1_gifs_related&rid=giphy.webp&ct=g)";
                      } 
                  else
                      {
                        document.body.style.backgroundImage = "url(https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTAwM2R3bTdqbTZseXh3MzB1aHR2cTdtc3diNTZubmZhN2F3dTRzOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0Styincf6K2tvfjb5Q/giphy.webp)";
                      } 

                      let displayMessage = "Current weather in " + country.name.common + " is :  " + data.weather[0].description.toUpperCase()
                      let celcius = +(data.main.temp) - 273.5;
                      displayMessage = displayMessage +  "\n Temperature in Celcius : " + celcius.toFixed(2);
                      alert(displayMessage);
                
                 })
                .catch(error => console.log('Error fetching weather data:', error));
        });

       cardText.appendChild(capital);
       cardText.appendChild(region);
       cardText.appendChild(countryCode);
       cardText.appendChild(latLong);
       cardText.appendChild(wButton);

       countryCardBody.appendChild(cardText);

       countryCard.appendChild(name);
       countryCard.appendChild(flag);
       countryCard.appendChild(countryCardBody);
        
       countryColumn.appendChild(countryCard);

       countryColumn.style.height = "70%";
       countryColumn.style.width =  "50%";

      

        document.getElementById("containerRow").appendChild(countryColumn);
        
            });
        })
        .catch( (err) => 
          {
            console.log('Error occurred while fetching countries data:', err);
          }
          );

        
          function getWeatherData(latitude, longitude) {
            let key = 'b3f700ca7df149cd3db8cd9f06b2334d';
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
            return fetch(url)
                .then(response => response.json())
                .catch(error => console.log('Error fetching weather data:', error));
        }

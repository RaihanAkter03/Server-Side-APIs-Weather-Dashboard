
$(document).ready(function () {
    
    var queryURL = "";
    var searchTerm = "";
    var arr = JSON.parse(localStorage.getItem("locations")) || [];
    var tempF = "";
    var humidity = "";
    var WindSpeed = "";
    var UV = "";

    clear();
    
    if (arr.length > 0) {
        buildQueryURL(arr[arr.length - 1]);
        arr.forEach(name => {
            createLi(name);
        })
        
    }

    $("#search-Icon").on("click", function (event) {
        event.preventDefault();

        searchTerm = $("#search-field").val().trim();
        console.log(searchTerm);
        buildQueryURL(searchTerm);
        // Forecast(searchTerm);
      
        if (arr.indexOf(searchTerm) === -1) {
            arr.push(searchTerm);
            localStorage.setItem('locations', JSON.stringify(arr));
            createLi(searchTerm);
        } 
    });


    function createLi(name) { 
        var li = $("<li>");
        li.addClass("list-group-item");
        li.text(name);
        $(".list-group").append(li);

        li.on("click", function (event) {
            event.preventDefault();
            name = $(this).text();
            console.log(name);
            buildQueryURL(name);// query build function             
        });
    }

    function buildQueryURL(cityName) {
        console.log(cityName);
        // queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial" + "&appid=6812942cb210c8101a17ceb4d5f76524";
         queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial" + "&appid=6812942cb210c8101a17ceb4d5f76524";

        $.ajax({
            type: "GET",
            url: queryURL,
            dataType: "json",
            success: function (response) {
                console.log(response);
                tempF = response.list[0].main.temp;
                humidity = response.list[0].main.humidity;
                WindSpeed = response.list[0].wind.speed;
                            
                localStorage.setItem("lon", JSON.stringify(response.city.coord.lon));
                localStorage.setItem("lat", JSON.stringify(response.city.coord.lat));
                         
                var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png");
                
                var img1 = $(".image1").attr("src", "https://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png");
                
                var img2 = $(".image2").attr("src", "https://openweathermap.org/img/w/" + response.list[2].weather[0].icon + ".png");
                
                var img3 = $(".image3").attr("src", "https://openweathermap.org/img/w/" + response.list[3].weather[0].icon + ".png");
                
                var img4 = $(".image4").attr("src", "https://openweathermap.org/img/w/" + response.list[4].weather[0].icon + ".png");
                
                var img5 = $(".image5").attr("src", "https://openweathermap.org/img/w/" + response.list[4].weather[0].icon + ".png");

                var T1 = response.list[0].main.temp;
                var H1 = response.list[0].main.humidity;

                var T2 = response.list[1].main.temp;
                var H2 = response.list[1].main.humidity;

                var T3 = response.list[2].main.temp;
                var H3 = response.list[2].main.humidity;

                var T4 = response.list[3].main.temp;
                var H4 = response.list[3].main.humidity;
                
                var T5 = response.list[4].main.temp;
                var H5 = response.list[4].main.humidity;
                // current day weather
                LocationDisplay(response.city.name, tempF, humidity, WindSpeed, img);
            
                Forecast(img1, img2, img3, img4, img5, T1, T2, T3, T4, T5, H1, H2, H3, H4, H5);// 5 day forecast function
            }

        });

    };
    
    function UVIndex(lon, lat) { 
        var UVqueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=6812942cb210c8101a17ceb4d5f76524";
        $.ajax({
            type: "GET",
            url: UVqueryURL,
            dataType: "json",
            success: function (response) {
                UV = response.value;
                var pE4 = $(".news4");
                                
                if (UV < 2 && UV === 0) {
                    pE4.addClass("low");  
                }
                if (UV > 2 && UV === 5) { 
                    pE4.addClass("moderate");
                }
                if (UV > 5 && UV < 7) { 
                    pE4.addClass("high");
                }
                if (UV > 8 && UV < 10) {
                    pE4.addClass("veryHigh");
                }
                if (UV > 10 ) {
                    pE4.addClass("extreme");
                }
                pE4.text("UV Index: " + UV);
                $("#Weather").append(pE4);
            }
        });
    }

    function LocationDisplay(name, tempF, humidity, WindSpeed, img)
    { 
        var h1 = $(".header");
        var pE1 = $(".news1");
        var pE2 = $(".news2");
        var pE3 = $(".news3");
        // var pE4 = $(".news4");

        h1.text(name + " (" + moment().format('L') + ")").append(img);
        pE1.text("Temperature: " + tempF + " F")
        pE2.text("Humidity: " + humidity + "%")
        pE3.text("Wind Speed: " + WindSpeed + " MPH")

        var lon = JSON.parse(localStorage.getItem("lon"));
        var lat = JSON.parse(localStorage.getItem("lat"));

        UVIndex(lon, lat);// calling UV index function..
        
        $("#Weather").append(h1);
        $("#Weather").append(pE1);
        $("#Weather").append(pE2);
        $("#Weather").append(pE3);  
    }

    function Forecast(img1, img2, img3, img4, img5, T1, T2, T3, T4, T5, H1, H2, H3, H4, H5) { 

                //date
                var day1 = $(".day1");
                day1.text(moment().format('L'));
                $("#forecast1").append(day1);

                // $("#forecast2").append(imgE);

                var day2 = $(".day2");
                day2.text(moment().add(1, 'days').format('L'));
                $("#forecast2").append(day2);

                var day3 = $(".day3");
                day3.text(moment().add(2, 'days').format('L'));
                $("#forecast3").append(day3);

                var day4 = $(".day4");
                day4.text(moment().add(3, 'days').format('L'));
                $("#forecast4").append(day4);

                var day5 = $(".day5");
                day5.text(moment().add(4, 'days').format('L'));
                $("#forecast5").append(day5);

                //image
 
                $("#forecast1").append(img1);

                $("#forecast2").append(img2);

                $("#forecast3").append(img3);

                $("#forecast4").append(img4);

                $("#forecast5").append(img5);

                //temperature and humidity..

                var temp1 = $(".forecast1-temp");
                var humi1 = $(".forecast1-humi");
                temp1.text("Temp: " + T1 + " F");
                humi1.text("Humidity: " + H1 + "%");
                $("#forecast1").append(temp1);
                $("#forecast1").append(humi1);


                var temp2 = $(".forecast2-temp");
                var humi2 = $(".forecast2-humi");
                temp2.text("Temp: " + T2 + " F");
                humi2.text("Humidity: " + H2 + "%");
                $("#forecast2").append(temp2);
                $("#forecast2").append(humi2);


                var temp3 = $(".forecast3-temp");
                var humi3 = $(".forecast3-humi");
                temp3.text("Temp: " + T3 + " F");
                humi3.text("Humidity: " + H3 + "%");
                $("#forecast3").append(temp3);
                $("#forecast3").append(humi3);


                var temp4 = $(".forecast4-temp");
                var humi4 = $(".forecast4-humi");
                temp4.text("Temp: " + T4 + " F");
                humi4.text("Humidity: " + H4 + "%");
                $("#forecast4").append(temp4);
                $("#forecast4").append(humi4);


                var temp5 = $(".forecast5-temp");
                var humi5 = $(".forecast5-humi");
                temp5.text("Temp: " + T5 + " F");
                humi5.text("Humidity: " + H5 + "%");
                $("#forecast5").append(temp5);
                $("#forecast5").append(humi5);


            // }
        // });
    }
    // Function to empty out the articles
    function clear() {
        $(".list-group").empty();
        $(".list-group-item").empty();
    }

    
});// script ends here.........
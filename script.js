
$(document).ready(function () {
    
    var queryURL = "";
    var searchTerm = "";
    var arr = JSON.parse(localStorage.getItem("locations")) || [];
    var tempF = "";
    var humidity = "";
    var WindSpeed = "";
    var UV = "";

    
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
        queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial" + "&appid=6812942cb210c8101a17ceb4d5f76524";

        $.ajax({
            type: "GET",
            url: queryURL,
            dataType: "json",
            success: function (response) {
                console.log(response);
                tempF = response.main.temp;
                humidity = response.main.humidity;
                WindSpeed = response.wind.speed;
                            
                localStorage.setItem("lon", JSON.stringify(response.coord.lon));
                localStorage.setItem("lat", JSON.stringify(response.coord.lat));
                         
                var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
                
                LocationDisplay(response.name, tempF, humidity, WindSpeed, img);
            
                Forecast(img);// 5 day forecast function
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

    function Forecast(image) { 

        var day1 = $(".day1");
        day1.text(moment().format('L')).append(image);
        $("#forecast1").append(day1);
        
        // $("#forecast2").append(imgE);

        var day2 = $(".day2");
        day2.text(moment().add(1, 'days').format('L')).append(image);
        $("#forecast2").append(day2);

        var day3 = $(".day3");
        day3.text(moment().add(2, 'days').format('L')).append(image);
        $("#forecast3").append(day3);

        var day4 = $(".day4");
        day4.text(moment().add(3, 'days').format('L')).append(image);
        $("#forecast4").append(day4);

        var day5 = $(".day5");
        day5.text(moment().add(4, 'days').format('L')).append(image);
        $("#forecast5").append(day5);
       
        // $("#forecast1").append(image1);      
        // $("#forecast2").append(image2); 
        // $("#forecast3").append(image3); 
        // $("#forecast4").append(image4); 
        // $("#forecast5").append(image5); 

        var temp1 = $(".forecast1-temp");
        var humi1 = $(".forecast1-humi");
        temp1.text("Temp: " + tempF + " F");
        humi1.text("Humidity: "+humidity+"%");
        $("#forecast1").append(temp1);
        $("#forecast1").append(humi1);

        var temp2 = $(".forecast2-temp");
        var humi2 = $(".forecast2-humi");
        temp2.text("Temp: " + tempF + " F");
        humi2.text("Humidity: " + humidity + "%");
        $("#forecast2").append(temp2);
        $("#forecast2").append(humi2);

        var temp3 = $(".forecast3-temp");
        var humi3 = $(".forecast3-humi");
        temp3.text("Temp: " + tempF + " F");
        humi3.text("Humidity: " + humidity + "%");
        $("#forecast3").append(temp3);
        $("#forecast3").append(humi3);

        var temp4 = $(".forecast4-temp");
        var humi4 = $(".forecast4-humi");
        temp4.text("Temp: " + tempF + " F");
        humi4.text("Humidity: " + humidity + "%");
        $("#forecast4").append(temp4);
        $("#forecast4").append(humi4);

        var temp5 = $(".forecast5-temp");
        var humi5 = $(".forecast5-humi");
        temp5.text("Temp: " + tempF + " F");
        humi5.text("Humidity: " + humidity + "%");
        $("#forecast5").append(temp5);
        $("#forecast5").append(humi5);



    }

    
});// script ends here.........
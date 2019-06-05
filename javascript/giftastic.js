$(document).ready(function() {


$("#loading-page").show(); 
$("#expressflix-page").hide();

// $("#popup-container").hide(); 

//Create array of initial topics to display
var initialFeels = ["chill", "mad", "weird"];

//Create initial variables
var counter = 0; 
var apiKey = "KkaHsdv8FJliwVprKPfmVBbYGteOAFef"

//FUNCTION DECLARATIONS
//function: to display initial emotion arrray as buttons
function renderButtons(){

    $("#feelings-bucket").empty();

    for (var i = 0; i < initialFeels.length; i++){
        var newButton = $("<button>");
        newButton.addClass("emotion");
        newButton.attr("data-name",initialFeels[i])
        newButton.text(initialFeels[i]);
        $("#feelings-bucket").append(newButton);
    }
};

//function: display feeling gifs
function displayGif(){
    counter++ //incremental increase of counter
    console.log(counter)
    var feels = $(this).attr("data-name"); //store emotion clicked on by user to the variable "feels"
    console.log(feels)
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + feels + "&api_key=" + apiKey + "&limit=10"
    console.log(apiKey) 

    if (counter === 1){
        //Create new divs to place the gif header
        var gifHeaderRow = $("<div>");
            gifHeaderRow.addClass("row, gif-header-row")

        var pFeels = $("<p>");
            pFeels.html("I'm feelin: " + feels)

        var titleRow =  gifHeaderRow.append(pFeels); 

        $("#FEELS").prepend(titleRow)

        //Create new divs and perform AJAX call to place 10 gifs
        var gifRow = $("<div>");
            gifRow.addClass("row, gif-row");

        $.ajax({ //AJAX to retrieve data from giphy API
            url: queryURL,
            method: "GET"
        }).then (function(response){

        for (var i = 0; i < 10; i++){ //for loop to place 10 gifs from giphy to html DOM 
            var imageLink = response.data[i].images.fixed_height_still.url
            var gifLink = response.data[i].images.fixed_height.url
            console.log(imageLink)
            console.log(gifLink)

            var gif = $("<div>").attr("class","gif-" + i);
            gif.append("<img src = ' " + imageLink + "' data-still= '" + imageLink + "' data-animate='" + gifLink + "' data-state= 'still' class = 'gifs'>")

            // $("#FEELS").append(gif)
            gifRow.append(gif)
        }

        $("#FEELS").append(gifRow)

        })
    } else if (counter > 1 && counter < 7){
        //Create new divs to place the gif header
        var gifHeaderRow = $("<div>");
            gifHeaderRow.addClass("row, gif-header-row")

        var pFeels = $("<p>");
            pFeels.html("I'm feelin: " + feels)

        var titleRow =  gifHeaderRow.append(pFeels); 

        $("#FEELS").append(titleRow)

        //Create new divs and perform AJAX call to place 10 gifs
        var gifRow = $("<div>");
        gifRow.addClass("row, gif-row");
   
        $.ajax({ //AJAX to retrieve data from giphy API
            url: queryURL,
            method: "GET"
        }).then (function(response){

        for (var i = 0; i < 10; i++){ //for loop to place 10 gifs from giphy to html DOM 
            var imageLink = response.data[i].images.fixed_height_still.url
            var gifLink = response.data[i].images.fixed_height.url
            console.log(imageLink)

            var gif = $("<div>").attr("class","gif-" + i);
            gif.append("<img src = ' " + imageLink + "' data-still= '" + imageLink + "' data-animate='" + gifLink + "' data-state= 'still' class = 'gifs'>")

            // $("#FEELS").append(gif)
            gifRow.append(gif)
    
        }//END for loop

        $("#FEELS").append(gifRow)

        })

    } //else if (counter >= 7) {
    //     $("#popup-container").show(); 
    //     $("#popup-container").toggleClass("show")
    //     console.log("popup!") 
    // }

    //Event handler: when user clicks on image --> gif 
    $(".gifs").on("click", function(){
        console.log("click!")
        var state = $(".gifs").attr("data-state")

        if (state === "still"){
            $(this).attr("data-state","animate")
            var animateUrl = $(this).attr("data-animate")
            $(this).attr("src", animateUrl)
        } else if (state === "animate"){
            $(this).attr("data-state","still")
            var stillUrl = $(this).attr("data-still")
            $(this).attr("src", stillUrl)
        }

    });

renderButtons();
}; //END displaygif function

//Event handler: when user clicks on "inititate feels" button 
$("#add-feels").on("click", function(event){
    event.preventDefault();
    var feels = $("#feels-input").val().trim(); 
    console.log(feels)
    initialFeels.push(feels);
    renderButtons();
});

//Event handler: when user clicks on a button with the class "emotions"
$(document).on("click",".emotion",displayGif);

renderButtons();

}) //END: document ready
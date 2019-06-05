// edge cases:
    // can't click on the same emotion twice
//functionality missing: 
    // flush button click
    // pop up functionality not working
    // animations
//bugs:***********
    //can't click to change state back to still
    //event handler on gif click doens't work for latest appearing row
    // pop up functionality not working
    //flush only works when there are 5 rows or less

$(document).ready(function() {

$("#loading-page").show();
$("#expressflix-page").hide();
setTimeout(function(){$("#loading-page").hide();},3000);
setTimeout(function(){$("#expressflix-page").show();},3000);


$("#popup").hide(); 

//Create array of initial topics to display
var initialFeels = ["chill", "mad", "weird"];
var displayedFeels = []; 

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
    // displayedFeels.push(feels);
    console.log(feels)
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + feels + "&api_key=" + apiKey + "&limit=10"
    console.log(apiKey) 


    if (counter >= 1 && counter < 7){
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

    } else if (counter >= 7) {
        $("#popup").show(); 
        $("#popup").toggleClass("show")
        console.log("popup!") 
    }

renderButtons();
}; //END displaygif function

//Event handler: when user clicks on "inititate feels" button 
$("#add-feels").on("click", function(event){
    event.preventDefault();
    var feels = $("#feels-input").val().trim(); 
    if(feels != ""){
        console.log(feels)
        initialFeels.push(feels);
        console.log(initialFeels)
        renderButtons();
    }
});

//Event handler: when user clicks on image --> gif 
$("#FEELS").on("click",".gifs",function(){
    console.log("click!")
    var state = $(this).attr("data-state")
    console.log(state)

    if (state === "still"){
        $(this).attr("data-state","animate")
        var animateUrl = $(this).attr("data-animate")
        $(this).attr("src", animateUrl)
    } else if (state === "animate"){
        $(this).attr("data-state","still")
        var stillUrl = $(this).attr("data-still")
        $(this).attr("src", stillUrl)
    }
})

//Event handler: when user clicks on a button with the class "emotions"
$(document).on("click",".emotion",displayGif);

//Event handler: when user clicks flush
$("#flush").on("click", function(){
    console.log("flush")
    $("#FEELS").empty();
});

renderButtons();

}) //END: document ready
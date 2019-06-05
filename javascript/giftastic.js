$(document).ready(function() {

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
    var feels = $(this).attr("data-name"); //store emotion clicked on by user to the variable "feels"
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + feels + "&api_key=" + apiKey + "&limit=10"

    if (counter === 1){
        // Create new divs to place the gif header
        var r1 = $("<div>"); //create an empty div
        r1.addClass("gif-header-row")
        r1.text("I'm feeling: " + feels)

        $("#FEELS").prepend(r1);
    }






};

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
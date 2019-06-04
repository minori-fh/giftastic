$(document).ready(function() {

//Create array of initial topics to display
var initialFeels = ["chill", "mad", "weird"];

//Create initial variables
var counter = 0; 

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

//function: display feeling gif

//Event handler: when user clicks on "inititate feels" button 
$("#add-feels").on("click", function(event){
    event.preventDefault();
    var feels = $("#feels-input").val().trim(); 
    console.log(feels)
    initialFeels.push(feels);
    renderButtons();
});

renderButtons();

}) //END: document ready
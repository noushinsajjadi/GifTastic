//To Hold some Names Of animals
var animals=["dog","cat","rabbit","hamstre","skunk","goldfish","bird","ferret","turtle"];

$(document).ready(function(){
  makeButton();
 
    //Creat button for each name
    $("form").submit(function(e){
      //prevent Default functionality
      var animal = $("#Animals-Input").val().trim();
      animals.push(animal);
      makeButton()
      console.log(animal);
      e.preventDefault();
     });

    // Constructing a queryURL using the animal name
    $("button").on("click", function() {
    // Grabbing and storing the data-animal property value from the button
    
    var animal = $(this).attr("data-animal");
    console.log(animal);
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

// Performing an AJAX request with the queryURL
 $.ajax({
   url: queryURL,
   method: "GET"
         })
 // After data comes back from the request
 .done(function(response) {

 var results = response.data;
 console.log(results)	;
 for (var i = 0; i < results.length; i++) {
  
   // Creating and storing a div tag and
   var animalDiv = $("<div class='animalDiv'>");
   var imageView = results[i].images.fixed_height.url;
   var still = results[i].images.fixed_height_still.url;

   // Setting the src attribute of the image   

  var expressImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
    expressImage.attr('data-state', 'still');
    expressImage.on('click', playGif);

   // Creating a paragraph tag with the result item's rating
   var p = $("<p>").text("Rating: " + results[i].rating);

   // Appending the paragraph and image tag to the animalDiv
       animalDiv.append(p);
       animalDiv.append(expressImage);

   // Prependng the animalDiv to the HTML page in the "#Animals-Gif" div
       $("#Animals-Gif").prepend(animalDiv);

  //

   }

   //Make animated gif
        function playGif() { 
            var state = $(this).attr('data-state');
            console.log(state);
              if ( state == 'still'){
                  $(this).attr('src', $(this).data('animate'));
                  $(this).attr('data-state', 'animate');
                  }

              else{
                       $(this).attr('src', $(this).data('still'));
                       $(this).attr('data-state', 'still');
                       }
  
                 }

 });});});

//Make NEW Button
	function makeButton()
  {

    $("#aniamls-Buttons").empty();
   for(var i=0; i<animals.length; i++)
   {
    //console.log(animals[i]);
    var btn = $("<button>");
    btn.attr("data-animal",animals[i]);
    btn.attr("type","button");
    btn.append(animals[i]);
    $("#aniamls-Buttons").append(btn);
    } 

  }

 

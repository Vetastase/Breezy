const paragraph = document.getElementById("username");
/*var elems = document.querySelectorAll("#id1, #id1, #id3");*/
const button_profile = document.getElementById("button-profile");
const end_button = document.getElementById("end-editing");

button_profile.addEventListener("click", function() {
  paragraph.contentEditable = true;
  /*paragraph.style.borderWidth = "50px";*/
});

end_button.addEventListener("click", function() {
  paragraph.contentEditable = false;
})
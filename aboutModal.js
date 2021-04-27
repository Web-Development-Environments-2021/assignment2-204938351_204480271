
function openModalDialog() {
    // document.getElementById("aboutModal").style.display= "block";
    $('#aboutModal').show();
}

function closeModalDialog() {
    window.onclick = function () {
        window.onclick = function () {
            // document.getElementById("aboutModal").style.display= "none";
            $('#aboutModal').hide();
        }
    }
}

$(document).keydown(function(event) { 
    if (event.keyCode == 27) { 
      $('#aboutModal').hide();
    }
  });
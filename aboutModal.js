
function openModalDialog() {
    $('#aboutModal').show();
}

function closeModalDialog() {
    window.onclick = function () {
        window.onclick = function () {
            $('#aboutModal').hide();
        }
    }
}

$(document).keydown(function(event) { 
    if (event.keyCode == 27) { 
      $('#aboutModal').hide();
    }
  });
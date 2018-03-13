/* 
    loading div
*/

function createLoader(parentDiv) {
    parentDiv.html("<div class=\"loader\"></div>");
}

function deleteLoader() {
    $(".loader").remove();
}

/* 
    is the user logged in the system
*/

function isLoggedIn(){
    if(typeof Cookies.get("name") == 'undefined' || typeof Cookies.get("nick") == 'undefined'){
        window.location.replace("loginCP.html");
    }
}

/* 
    MODAL
*/
function displayModal(text){
    $(".modal-content p").html(text);
    document.getElementById('myModal').style.display = "block";
}

function setUpModal() {
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function loadTextEditor() {
    $("#text-area").trumbowyg({

        btnsDef: {
            // Customizables dropdowns
            image: {
                dropdown: ['insertImage', 'upload', 'base64', 'noEmbed'],
                ico: 'insertImage'
            }
        },
        btns: [
            ['viewHTML'],
            ['undo', 'redo'],
            ['formatting'],
            'btnGrp-design', ['link'],
            ['image'],
            'btnGrp-justify',
            'btnGrp-lists', ['foreColor', 'backColor'],
            ['preformatted'],
            ['horizontalRule'],
            ['fullscreen']
        ],
        plugins: {
            upload: {
                //serverPath: 'https://api.imgur.com/3/image',
                //serverPath: 'http://localhost/Blog-Template/app/controller/uploadController.php',
                serverPath: '../controller/uploadController.php',
                fileFieldName: 'image',
                /* headers: {
                    'Authorization': 'Client-ID 9e57cb1c4791cea'
                }, */
                urlPropertyName: 'data.link'
            }
        }
    });
}

/* Controlador das imagens */
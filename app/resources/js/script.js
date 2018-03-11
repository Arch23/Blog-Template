function createLoader(parentDiv){
    parentDiv.html("<div class=\"loader\"></div>");
}

function deleteLoader(){
    $(".loader").remove();
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
                serverPath: '',
                fileFieldName: 'image',
                headers: {
                    'Authorization': 'Client-ID 9e57cb1c4791cea'
                },
                urlPropertyName: 'data.link'
            }
        }
    });
}

/* Controlador das imagens */
$(document).ready(function () {

    setUpAjax();

    function setUpAjax() {
        var links = document.querySelectorAll(".config-menu");
        console.log(links);
        links.forEach(function (link) {
            link.addEventListener("click", function () {
                switch (this.id) {
                    case "create-user":
                        $(".content").load("./controlPanelPages/create_user");
                        break;
                    case "create-post":
                        $(".content").load("./controlPanelPages/create_post",function(){
                            $("#text-area").trumbowyg();
                        setFileUpdateEvent();
                        });
                        break;
                    case "list-posts":

                        break;
                    case "logoff":

                        break;
                }
            });
        });
    }

    function setFileUpdateEvent() {
        var input = document.getElementById("image"),
            fileName = document.getElementById("file-name");

        input.addEventListener("change", function () {
            var fullPath = this.value;
            var nameOnly;
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            nameOnly = fullPath.substring(startIndex);
            if (nameOnly.indexOf('\\') === 0 || nameOnly.indexOf('/') === 0) {
                nameOnly = nameOnly.substring(1);
            }

            fileName.textContent = nameOnly;
        });
    }

});
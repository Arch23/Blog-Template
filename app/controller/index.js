$(document).ready(function () {
  $.post("app/controller/indexController.php",
    function (data) {
      loadPosts(JSON.parse(data));
      addEvent();
    });
});

function loadPosts(data) {
  var num = 0;
  data.forEach(e => {
    if (e.img_url === "Nothing") { // Not have a main image

      $("#post-list").append([{
        entry: "entry-" + num,
        title: e.title,
        date: e.date,
        author: e.User_name,
        text: e.text.substring(0, 300) + "..."
      }].map(entryWithoutImage).join(''));

    } else { // Have a main image

      $("#post-list").append([{
        entry: "entry-" + num,
        title: e.title,
        date: e.date,
        author: e.User_name,
        text: e.text.substring(0, 300) + "...",
        imgUrl: e.img_url,
        imgAlt: e.img_alt
      }].map(entryWithImage).join(''));

    }
    num++;
  });
}

function addEvent() {
  var entries = document.querySelectorAll(".entry");
  entries.forEach(element => {
    element.addEventListener("click", function () {
      const title = document.querySelector("#" + element.id + " h3").textContent;
      const date = document.querySelector("#" + element.id + " p.entry-date").textContent;
      const author = document.querySelector("#" + element.id + " p.entry-author").textContent;

      loadPost(title, date, author);
    });
  });
}

function loadPost(title, date, author) {

  var post = {
    title: title,
    date: date,
    author: author
  };
  
  post = JSON.stringify(post);

  window.location.href = "app/view/news.html?" + encodeURI(post);
/* 
  $.post("app/controller/indexController.php", {
    tag: 'loadPost',
    title: title,
    author: author,
    date: date
  }, function (data) {
    data = JSON.parse(data);
    if (data.text !== null) {
      var post;
    }
  }); */
}

/*  HTML post templates */
const entryWithImage = ({
  entry,
  title,
  date,
  author,
  text,
  imgUrl,
  imgAlt
}) => `<div class="entry" id="${entry}">
<div class="entry-header">
    <div class="clearfix">
        <h3>${title}</h3>
        <p class="entry-date">${date}</p>
    </div>
    <p class="entry-author">${author}</p>
</div>

<div class="entry-body with-image clearfix">
    <p>
    ${text}
    </p>
    <img src="${imgUrl}" alt="${imgAlt}">
</div>
</div>`;

const entryWithoutImage = ({
  entry,
  title,
  date,
  author,
  text
}) => `<div class="entry" id="${entry}">
<div class="entry-header">
    <div class="clearfix">
        <h3>${title}</h3>
        <p class="entry-date">${date}</p>
    </div>
    <p class="entry-author">${author}</p>
</div>

<div class="entry-body clearfix">
    <p>
    ${text}
    </p>
</div>
</div>`;
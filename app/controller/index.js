$(document).ready(function () {
  $.post("app/controller/indexController.php", {
      tag: 'loadIndex'
    },
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
      }].map(EntryWithoutImage).join(''));

    } else { // Have a main image

      $("#post-list").append([{
        entry: "entry-" + num,
        title: e.title,
        date: e.date,
        author: e.User_name,
        text: e.text.substring(0, 300) + "...",
        imgUrl: e.img_url,
        imgAlt: e.img_alt
      }].map(EntryWithImage).join(''));

    }
    num++;
  });
}

function addEvent() {
  var entries = document.querySelectorAll(".entry");

  entries.forEach(element => {
    element.addEventListener("click", function () {
      var title = document.querySelector("#" + element.id + " h3").textContent;
      var date = document.querySelector("#" + element.id + " p.entry-date").textContent;
      var author = document.querySelector("#" + element.id + " p.entry-author").textContent;

      loadPost(title, date, author);
    });
  });
}

function loadPost(title, date, author) {
  $.post("app/controller/indexController.php", {
    tag: 'loadPost',
    title: title,
    author: author,
    date: date
  }, function (data) {
    openPost(JSON.parse(data));
  });
}

function openPost(data) {

}

/*  HTML post templates */
const EntryWithImage = ({
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

const EntryWithoutImage = ({
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
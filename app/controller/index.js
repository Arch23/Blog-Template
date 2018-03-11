$(document).ready(function () {
  $.post("app/controller/indexController.php",
    function (data, status) {
      loadPosts(JSON.parse(data));
    });
});

function loadPosts(data) {
  const Entry = ({
    title,
    date,
    author,
    text,
    imgUrl
  }) => `<div class="entry" id="entry">
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
      <img src="${imgUrl}" alt="to te vendo">
  </div>
</div>`;

  data.forEach(el => {
    $("#post-list").append([{
      title: el.title,
      date: el.date,
      author: el.User_nickname,
      text: el.text,
      imgUrl: "main_img"
    }].map(Entry).join(''));
  });
}
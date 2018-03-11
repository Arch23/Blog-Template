$(document).ready(function () {
  var data = (data) ? data : window.location.search;
  data = decodeURI(data);
  data = data.split("?")[1];
  data = JSON.parse(data);
  $.post("../controller/newsController.php", {
      author: data.author,
      title: data.title,
      date: data.date
    },
    function (data) {
      loadPost(JSON.parse(data));
    });
});

function loadPost(data) {
  if (data.imgUrl === "Nothing") { // Not have an Main Image
    $("body").append([{
      title: data.title,
      date: data.date,
      author: data.User_name,
      text: data.text
    }].map(postLoadWithoutImg).join(''));
  } else { // Have a main Image
    $("body").append([{
      title: data.title,
      date: data.date,
      author: data.User_name,
      text: data.text,
      imgUrl: data.img_url,
      imgAlt: data.img_alt
    }].map(postLoadWithImg).join(''));
  }
}

const postLoadWithImg = ({
  title,
  author,
  date,
  imgUrl,
  imgAlt,
  text
}) => ` <section class="hero">
<h1>${title}</h1>
</section>
<section class="infos clearfix">
<div class="box">
    <p class="infos-author">${author}</p>
    <p class="infos-date">${date}</p>
</div>
</section>
<section class="box content">
<img src="${imgUrl}" alt="${imgAlt}">
${text}
</section>`;

const postLoadWithoutImg = ({
  title,
  author,
  date,
  text
}) => ` <section class="hero">
<h1>${title}</h1>
</section>
<section class="infos clearfix">
<div class="box">
    <p class="infos-author">${author}</p>
    <p class="infos-date">${date}</p>
</div>
</section>
s<section class="box content">
${text}
</section>`;
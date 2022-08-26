function is_youtubelink(url) {
  var p =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return url.match(p) ? RegExp.$1 : false;
}
function is_imagelink(url) {
  var p = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif|webp))/i;
  return url.match(p) ? true : false;
}
function setGallery(el) {
  var elements = document.body.querySelectorAll(".gallery");
  elements.forEach((element) => {
    element.classList.remove("gallery");
  });
  if (el.closest("ul, p")) {
    var link_elements = el
      .closest("ul, p")
      .querySelectorAll("a[class*='lightbox-']");
    link_elements.forEach((link_element) => {
      link_element.classList.remove("current");
    });
    link_elements.forEach((link_element) => {
      if (el.getAttribute("href") == link_element.getAttribute("href")) {
        link_element.classList.add("current");
      }
    });
    if (link_elements.length > 1) {
      document.getElementById("lightbox").classList.add("gallery");
      link_elements.forEach((link_element) => {
        link_element.classList.add("gallery");
      });
    }
    var currentkey;
    var gallery_elements = document.querySelectorAll("a.gallery");
    Object.keys(gallery_elements).forEach(function (k) {
      if (gallery_elements[k].classList.contains("current")) currentkey = k;
    });
    if (currentkey == gallery_elements.length - 1) var nextkey = 0;
    else var nextkey = parseInt(currentkey) + 1;
    if (currentkey == 0) var prevkey = parseInt(gallery_elements.length - 1);
    else var prevkey = parseInt(currentkey) - 1;
    document.getElementById("next").addEventListener("click", function () {
      gallery_elements[nextkey].click();
    });
    document.getElementById("prev").addEventListener("click", function () {
      gallery_elements[prevkey].click();
    });
  }
}

function apply_lightbox_to_img_tag() {
  Array.from(document.querySelectorAll("img")).forEach((img_element) => {
    if (img_element.classList.contains("no-lightbox")) {
      return;
    }
    var wrapper = document.createElement("a");
    var url = img_element.getAttribute("src");
    wrapper.href = url;
    if (is_youtubelink(url)) {
      wrapper.classList.add("lightbox-youtube");
      wrapper.setAttribute("data-id", is_youtubelink(url));
    } else if (is_imagelink(url)) {
      wrapper.classList.add("lightbox-image");
      var href = wrapper.getAttribute("href");
      var filename = href.split("/").pop();
      var name = filename.split(".")[0];
      wrapper.setAttribute("title", name);
    } else {
      return;
    }
    img_element.parentNode.insertBefore(wrapper, img_element);
    wrapper.appendChild(img_element);
  });
}

function apply_lightbox() {
  var newdiv = document.createElement("div");
  newdiv.setAttribute("id", "lightbox");
  document.body.appendChild(newdiv);

  apply_lightbox_to_img_tag();

  //remove the clicked lightbox
  document
    .getElementById("lightbox")
    .addEventListener("click", function (event) {
      if (event.target.id != "next" && event.target.id != "prev") {
        this.innerHTML = "";
        document.getElementById("lightbox").style.display = "none";
      }
    });

  //add the youtube lightbox on click
  document.querySelectorAll("a.lightbox-youtube").forEach((element) => {
    element.addEventListener("click", function (event) {
      event.preventDefault();
      document.getElementById("lightbox").innerHTML =
        '<a id="close"></a><a id="next">&rsaquo;</a><a id="prev">&lsaquo;</a><div class="videoWrapperContainer"><div class="videoWrapper"><iframe src="https://www.youtube.com/embed/' +
        this.getAttribute("data-id") +
        '?autoplay=1&showinfo=0&rel=0"></iframe></div>';
      document.getElementById("lightbox").style.display = "block";

      setGallery(this);
    });
  });

  //add the image lightbox on click
  document.querySelectorAll("a.lightbox-image").forEach((element) => {
    element.addEventListener("click", function (event) {
      event.preventDefault();
      document.getElementById("lightbox").innerHTML =
        '<a id="close"></a><a id="next">&rsaquo;</a><a id="prev">&lsaquo;</a><div class="img" style="background: url(\'' +
        this.getAttribute("href") +
        '\') center center / contain no-repeat;" title="' +
        this.getAttribute("title") +
        '" ><img src="' +
        this.getAttribute("href") +
        '" alt="' +
        this.getAttribute("title") +
        '" /></div><span>' +
        this.getAttribute("title") +
        "</span>";
      document.getElementById("lightbox").style.display = "block";

      setGallery(this);
    });
  });
}

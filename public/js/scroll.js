$(document).on("scroll", function() {
    let pageTop = $(document).scrollTop();
    let pageBottom = pageTop + $(window).height();
    let tags = $(".tag");
  
    for (let i = 0; i < tags.length; i++) {
      let tag = tags[i];
  
      if ($(tag).position().top < pageBottom) {
        $(tag).addClass("visible");
      } else {
        $(tag).removeClass("visible");
      }
    }
  });
  
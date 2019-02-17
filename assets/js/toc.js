function generateCatalog (selector) {
    // init
    var P = $('.markdown-body'),a,n,t,l,i,c;
    a = P.find('h1,h2,h3,h4,h5,h6');

    // clean
    $(selector).html('')

    // appending
    a.each(function () {
        n = $(this).prop('tagName').toLowerCase();
        i = "#"+$(this).prop('id');
        t = $(this).text();
        c = $('<a href="'+i+'" rel="nofollow">'+t+'</a>');
        l = $('<li class="'+n+'_nav"></li>').append(c);
        $(selector).append(l);
    });
    return true;
}

generateCatalog(".toc-body");

// toggle side catalog
$(".toc-toggle").click((function(e){
    e.preventDefault();
    $('.side-toc').toggleClass("fold")
}))

// support padding
$('.toc-body').onePageNav({
    currentClass: "active",
    changeHash: !1,
    easing: "swing",
    filter: "",
    scrollSpeed: 700,
    scrollOffset: 0.5,
    scrollThreshold: .2,
    begin: null,
    end: null,
    scrollChange: null,
    padding: 20
});
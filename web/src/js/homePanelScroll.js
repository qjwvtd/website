$(function () {
    //start scroll
    $.scrollify({
        section: ".panel",
        scrollbars: false,
        before: function (i, panels) {
            var ref = panels[i].attr("data-section-name");
            //set border animate
            $('.'+ref).addClass('active');
            $(".pagination a.active").removeClass("active");
            $(".pagination a[href=#" + ref + "]").addClass("active");
            //set logo
            setLogoType(ref);
        },
        after: function (i, panels) {
            var ref = panels[i].attr("data-section-name");
            //remove border animate
            $('.'+ref).removeClass('active');
        },
        afterResize: initialPosition,
        afterRender: initialPosition
    });
    //clear href
    $(".pagination a,#contact a,.ui-nav-content a,.guide").on("click", function () {
        $.scrollify.move($(this).attr("href"));
    });

    function initialPosition() {
        var current = $.scrollify.current();
    }
});
//setting white or black logoType
function setLogoType(ref) {
    var logo = document.getElementById('logo');
    var contactBtn = document.getElementById('contact');
    var openNavBtn = document.getElementById('openNav');
    //white
    var white = {
        className:'ui-logo',
        panels:['home1','home2','home3','joinUs']
    };
    //black
    var black = {
        className:'ui-logo-black',
        panels:['pre','clawin1','clawin2','clawin3','business','payment','contactUs']
    };
    if(white.panels.indexOf(ref) != -1){
        logo.className = white.className;
        openNavBtn.className = 'navWhiteIcon';
        contactBtn.className = 'contactWhite';
    }
    if(black.panels.indexOf(ref) != -1){
        logo.className = black.className;
        openNavBtn.className = 'navBlackIcon';
        contactBtn.className = 'contactBlack';
    }
}

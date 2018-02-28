$.fn.canteenMessage = function(data) {
    var status = data.status == 'success' ? 'success' : 'danger';
    var icon = data.status == 'success' ? 'glyphicon-ok-circle' : 'glyphicon-ban-circle';
    if ( $(this).find('.alert-global').length > 0 ) {
        $('.alert-global-close').trigger('click');
        var that = this;
        setTimeout(function() {
            $(that).canteenMessage(data);
        }, 601);
    } else {
        $(this).append('<div class="alert-global"><div class="alert-global-inner"><div class="alert alert-'+status+' mb0"><div class="container"><div class="row"><div class="col-md-12"><span class="mr15 glyphicon icon-transform '+icon+'"></span>'+data.message+'</div></div></div></div><div class="alert alert-'+status+' alert-global-close"><span class="glyphicon glyphicon-remove mr5"></span>Close</div></div></div>');
        $(this).find('.alert-global').animate({'bottom': '0'}, 600);
    }
};
$(document).on('click', '.alert-global-close', function() {
    $(this).parent().parent().animate({'bottom': '-100%'}, 600, function() {
        $(this).remove();
    });
});
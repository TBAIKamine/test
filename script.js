$(window).resize(function(){
if($(window).width()<1219||$(window).height()<646){
    $("#too_small").show();
}else{
    $("#too_small").hide();
    location.reload();
}
})
$(window).on('load',function() {
    $("#too_small").hide();
    $("#wait_for_content").fadeOut("slow");
if($(window).width()<1219||$(window).height()<646){
    $("#too_small").show();
}
});
$(document).ready(function () {
$('input[value=digest]').click(function(){
    reg = /---TROUBLE SHOOTING STEPS---(.|\n)+?\<br \/\>/
    bc = $('textarea').val().match(reg);
    if(Array.isArray(bc)){
    bc = bc??''
    bc = bc[0]
    bc = bc.replace(/---TROUBLE SHOOTING STEPS---\n|\<br \/\>/g,'')
    bc = bc.split('\n')
    bc = bc.map(function(value,index){
        execution = value.match(/Executed On: .+?,.+?(?:,|$)/g)
        execution = Array.isArray(execution)?execution[0].split(': '):[]
        value = value.replace(/Executed On: .+?,.+?(?:,|$)/,'')
        value = value
        .split(', ').
        filter(function(filtered){return filtered.length}).
        reduce(function(accumulator, current){
        current = current.split(': ')
        accumulator[current[0]] = current[1]
        return accumulator
        },{})
        if(execution[1]!=undefined) value[execution[0]] = execution[1]
        return value
    })
    $('tbody').html('')
    bc.forEach(el => {
        if(el.Screen=='Please Wait'||el.Response=='success') return;
        $('tbody').append('<tr><td>'+el.Screen+'</td><td>'+el.Response+'</td></tr>')
    });
    if(bc.length){$('body>div:not(#wait_for_content,#too_small)').show()}
    else{$('body>div').hide()}
    }else{
    $('<div class="info">no breadcrumbs found here</div>').insertAfter('textarea')
    .show().delay('1500').fadeOut('slow',function(){$(this).remove()})
    }
})
$('input[value=reset').click(function(){
    $('tbody,#display').html('')
    $('textarea').val('')
    $('body>div').hide()
})
$('tbody').on('click','tr',function(){
    $('.active').removeClass('active')
    $(this).addClass('active')
    image = new Image()
    image.src = 'src/'+$(this).find('td')[0].innerHTML+'.png'
    image.onload = function(){
    $('#display').removeClass('noimage').html(image)
    }
    image.onerror = function(){
    $('#display').addClass('noimage').html('<div class="info noimg_info">image doesnt exist</div>')
    }
})
});

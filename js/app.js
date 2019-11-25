$(function(){

    $('.c-list_caption').on('click',function(){
        var isOpen = $(this).not(':animated').children('.c-list_content').hasClass('is-active_open');
        var $contet = $(this).not(':animated').children('.c-list_content');
        
        if(isOpen){
            $contet.slideUp();
            $(this).children('.c-pulldown-btn').removeClass('fa-chevron-circle-up');
            $(this).children('.c-pulldown-btn').addClass('fa-chevron-circle-down');
            $contet.removeClass('is-active_open');
            

        }else{
            $contet.slideDown();
            $(this).children('.c-pulldown-btn').removeClass('fa-chevron-circle-down');
            $(this).children('.c-pulldown-btn').addClass('fa-chevron-circle-up');
            $contet.addClass('is-active_open');
            
        }
        
    })

    $('.c-header_list_sp').on('click',function(){
        var $list_conteiner = $('.p-header_content');
        var isOpen = $(this).not(':animated').hasClass('is-active_open');

        if(isOpen){
            $list_conteiner.slideUp('fast');
            $(this).removeClass('is-active_open');
        }else{
            $list_conteiner.slideDown('fast');
            $list_conteiner.css('display','flex')
            $(this).addClass('is-active_open');
        }
    })

    $('.c-box_cover').on('click',function(){
        $work = $(this).parent().attr('data-work');
        $mordal = $('.l-modal_window');
        $showMordal = $('.md-'+$work);
        nowWindow = $('#l-header').offset(); 
        $mordal.attr('style','top:'+nowWindow.top+'px;')
        $mordal.addClass('is_mordal_open');
        $showMordal.addClass('is_mordal_open');
        $('body').addClass('is_mordal');
        $('#l-header').addClass('is_mordal');
        $mordal.fadeIn('normal');
    })

    function close_modal(){
        $mordal = $('.l-modal_window');
        $mordal.removeClass('is_mordal_open');
        $mordal.fadeOut(100);
        $('.p-modal_work').removeClass('is_mordal_open');
        $('body').removeClass('is_mordal');
        $('#l-header').removeClass('is_mordal');
    }

    $('.c-close_modal').on('click',function(){
        close_modal();
    })

    $('.c-skill_icon').on('click',function(){
        $('.c-skill_icon').removeClass('is_selected');
        $(this).addClass('is_selected');

        $('.c-skill_explanation').hide();
        $skillType = $(this).attr('data-skill');
        $skillType = $('.for_'+$skillType);
        $skillType.fadeIn('normal')
    })

    $('.has_link').on('click',function(){
        $url = $(this).attr('data-url');
        location.href=$url;
    })


    //CONTACTバリデーション
    $('.valid-text').on('keyup',function textValid(){
        if($(this).val().length ===0){
            $(this).removeClass('has-success');
            $(this).addClass('has-error');
            $(this).siblings('.c-err_mes').text('入力必須です');
        }else if($(this).val().length >500){
            $(this).removeClass('has-success');
            $(this).addClass('has-error');
            $(this).siblings('.c-err_mes').text('これ以上入力できません');
        }else{
            $(this).removeClass('has-error');
            $(this).addClass('has-success');
            $(this).siblings('.c-err_mes').text('');
        }
        errorBtnColor();
    })

    $('.valid-email').on('keyup',function emailValid(){
        if($(this).val().length>0 && !$(this).val().match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            $(this).removeClass('has-success');
            $(this).addClass('has-error');
            $(this).siblings('.c-err_mes').text('Emailの形式ではありません');
        }else if($(this).val().length ===0){
            $(this).removeClass('has-success');
            $(this).addClass('has-error');
            $(this).siblings('.c-err_mes').text('入力必須です');
        }else{
            $(this).removeClass('has-error');
            $(this).addClass('has-success');
            $(this).siblings('.c-err_mes').text('');
        }

        errorBtnColor();
    })

    function isErrorExit(){
        return ($('.c-email').hasClass('has-success') && $('.c-title').hasClass('has-success') && $('.c-content').hasClass('has-success'));
    }

    function errorBtnColor(){
        if(isErrorExit()){
            $('.c-sendform_send').removeClass('is_notAllowed');
        }else{
            $('.c-sendform_send').addClass('is_notAllowed');
        }
    }


    $('.c-sendform_send').on('click',function(){
        if(isErrorExit()){
            console.log('送信可能');
            
            $.ajax({
                type:'post',
                url:'./js/mailsend.php',
                dataType:'json',
                data:{
                    email:$('.c-email').val(),
                    title:$('.c-title').val(),
                    content:$('.c-content').val()
                }
            }).done(function(data=""){
                console.log('送信しました');
                $('.c-sendform_send').off('click');
                $('.c-sendform_send').addClass('c-sendform_send_mailSent').removeClass('c-sendform_send').val('メールを送信しました');
            }).fail(function(jqXHR,textStatus,errorThrown){
                console.log('失敗しました。');
            })
        }else{
            console.log('送信できません');
        }
    })
})

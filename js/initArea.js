//-------------------------------------- 地区 -------------------------------------------------------------
  /**
 * 全局地区选择弹框
 *调用方法  initArea(A,B,C,D);
 * @param {type} A   (必填)指生成的元素   如<p>广东</p>；则写成 A => 'p'
 * @param {type} B   (可选)默认选中的省id
 * @param {type} C   (可选)默认选中的市id
 * @param {type} D   (可选)默认选中的县/区id
 */
function initArea(label){//初始化省
    var pro = arguments[1] ? arguments[1] :false;
    var city = arguments[2] ? arguments[2] :false;
    var xian = arguments[3] ? arguments[3] :false;
    //console.log('执行');
    $.each(HBAreaData,function(province){
        var _provinceid=province.split("|")[0];
        var _province=province.split("|")[1];
        $('#province').find('.sel_more').append('<'+label+'   onclick="initCity('+"'"+label+"','"+province +"')" +'" value="'+_provinceid+'">'+_province+'</'+label+'>');
        //$('#province').find('.sel_more').append('<'+label+' value="'+_provinceid+'">'+_province+'</'+label+'>');
        if(pro != false){
            if(pro == _provinceid){
                $('#province').find('.sel_show').text(_province);
                $('#province').children('input').attr('value',_provinceid);
                initCity(label,province,city,xian);
            }
        }else{
            $('#province').find('.sel_show').text('请选择');
            $('#city').find('.sel_show').text('请选择');
            $('#County').find('.sel_show').text('请选择');
            $('#province').find('input').attr('value',0);
            $('#city').find('input').attr('value',0);
            $('#County').find('input').attr('value',0);
            $('#city').find('.sel_more').html('<'+label+' value="0">请选择</'+label+'>');
            $('#County').find('.sel_more').html('<'+label+' value="0">请选择</'+label+'>');
        };
    });
}

function initCity(label,Pindex){//初始化市
    var indexCity = arguments[2] ? arguments[2] :false;
    var indexXian = arguments[3] ? arguments[3] :false;
    $('#city').find('.sel_more').html('<'+label+'  onclick="initCity('+"'"+label+"','"+Pindex +"')"+'" value="0">请选择</'+label+'>');
    $('#County').find('.sel_more').html('<'+label+' value="0">请选择</'+label+'>');
    $.each(HBAreaData[Pindex],function(citys){
        var _cityid=citys.split('|')[0];
        var _city=citys.split('|')[1];
        $('#city').find('.sel_more').append('<'+label+' onclick="initCounty('+"'"+label+"','"+Pindex+"','"+ citys+"')" +'" value="'+_cityid+'">'+_city+'</'+label+'>');
        if(indexCity != false){
            if(indexCity == _cityid){
                $('#city').find('.sel_show').text(_city);
                $('#city').children('input').attr('value',_cityid);
                initCounty(label,Pindex,citys,indexXian)
            }
        }else{
            //console.log('看看');
            $('#city').find('.sel_show').text('请选择');
            $('#County').find('.sel_show').text('请选择');
            $('#city').find('input').attr('value',0);
            $('#County').find('input').attr('value',0);
            $('#County').find('.sel_more').html('<'+label+' value="0">请选择</'+label+'>');

        };
    })
}

function initCounty(label,Pindex,Cindex){//初始化县
    var indexXian = arguments[3] ? arguments[3] :false;
    $('#County').find('.sel_more').html('<'+label+' value="0">请选择</'+label+'>');
    for(var i=0;i<HBAreaData[Pindex][Cindex].length;i++){
        var _Countyid=HBAreaData[Pindex][Cindex][i].split('|')[0];
        var _County=HBAreaData[Pindex][Cindex][i].split('|')[1];
        $('#County').find('.sel_more').append('<'+label+' value="'+_Countyid+'">'+_County+'</'+label+'>');
        if(indexXian != false){
            if(indexXian == _Countyid){$('#County').find('.sel_show').text(_County);$('#County').children('input').attr('value',_Countyid);}
        }else{ $('#County').find('.sel_show').text('请选择');$('#County').find('input').attr('value',0);  };
    }
}

$(document).ready(function(){
    //下拉列表
    //$('.sel_show').click(function(event) {
    $('body').on('click','.sel_show',function(){
        $(this).toggleClass('cur');
        $(this).siblings('.sel_more').slideToggle("fast");
        $(this).parent().siblings('.sel_box').children('.sel_more').slideUp("fast");
        $(this).parent().siblings('.sel_box').children('.sel_show').removeClass('cur');

        var text = $(this).text();
        var ele = $(this).siblings('.sel_more').children('p');
        for(var i=0;i<ele.length;i++){
            if(ele.eq(i).text() == text){
                ele.eq(i).addClass("on");
                ele.eq(i).siblings().removeClass("on");
            }
        }

        if($(this).is('.cur')){
            $(this).parent().css('z-index',parseInt($(this).parent().css('z-index'))+100);
            $(this).siblings('.sel_more').css('z-index', parseInt($(this).siblings('.sel_more').css('z-index'))+100);
            var zindex = parseInt($(this).parent().css('z-index'));
            $(this).parent().before('<div class="sel_meng" style="width:100%;height:100%;position: fixed;left:0;top:0;z-index:'+zindex+';/*background:#000; */"></div>')

        }else{
            $(this).parent().css('z-index',parseInt($(this).parent().css('z-index'))-100);
            $(this).siblings('.sel_more').css('z-index', parseInt($(this).siblings('.sel_more').css('z-index'))-100);
            $('div.sel_meng').remove();
        }


    });
    $('body').on('click','.sel_meng',function(){
        $(this).next('.sel_box').css('z-index',parseInt($(this).next('.sel_box').css('z-index'))-100);
        $(this).next('.sel_box').children('.sel_more').css('z-index', parseInt($(this).next('.sel_box').children('.sel_more').css('z-index'))-100);

        $('.sel_show').removeClass('cur');
        $('.sel_more').slideUp("fast");
        $(this).remove();

    });
    $('body').on('click','.sel_more p',function(){
        //console.log('x');
        var text = $(this).text();
        var value = $(this).attr('value');
        $(this).parent().siblings('.sel_show').text(text);
        $(this).parent().siblings('input').attr('value',value);
        $(this).parent().slideUp("fast");
        $(this).parent().siblings('.sel_show').removeClass('cur');

        $(this).parent().css('z-index',parseInt($(this).parent().css('z-index'))-100);
        $(this).parent().parent().css('z-index', parseInt($(this).parent().parent().css('z-index'))-100);

        $(this).addClass("on").siblings().removeClass("on");
        $('div.sel_meng').remove();
    });

});

$('.grid_address').each(function(){
            var p = parseInt($(this).attr('p')),c = parseInt($(this).attr('c')),t=parseInt($(this).attr('t'));
            p = !isNaN(p)?p:0;c = !isNaN(c)?c:0; t = !isNaN(t)?t:0;
            if (p===0||c===0||t===0) {
                $(this).html('-&gt;-');
                return;
            }
            // loc = area_array[p]+'&gt;'+(p===c?sub_array[p][t]:sub_array[p][c]);
            loc = area_array[p]+'&gt;'+(p===c?sub_arr[p][t]:sub_array[p][c]);
            $(this).html(loc);
        });
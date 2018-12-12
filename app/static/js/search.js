
$('.text').on("click",function(){
    $('.search_onclick').css("display","block");
})
$('.text').on("blur",function(){
    $('.search_onclick').css("display","none");
})
var searchInp = (function(){
    return {
        init(){

        },
        event(){

        }
    }
}())
searchInp.init('.search');
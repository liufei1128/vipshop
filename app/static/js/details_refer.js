/**
 * 
 * 商品详情页 
 * */
var $button_box = $('.button_box');
var $btnall = $('.button_box button');
var $count = $('.button_box i');
var $join_shop = $('.join_shop');
var $price = $('.price_left i');
var $title =$('.commodity_content h3');
var $imgSrc = $('.imglist_bigbox li img');
var t=1;
var data ={
    "id":"1",
    "title": "",
    "price": 0,
    "imgsrc": "",
    "count": 0,
    "size": "M"
};
    $($button_box).click(function(e){
        console.log(11);
        e = e || window.event;
        var target = e.target || e.srcElement;
        if(target.className == 'right_btn'){
            t++;
            if(t>=10){
                t=10;
            }
        }
        if(target.className == 'left_btn'){
            t--;
            if(t<=1){
                t=1;
            }
        }    
        $($count).text(t);      
    });
    $($join_shop).click(function(){
        var count = $($count).text(),
        price = $($price).text().substring(1);
        console.log(count,price);
        data.count =  Number(count);
        data.price = Number(price);
        data.title = $($title).text();
        data.imgsrc = $($imgSrc).attr('src');
        setItem(data);
    });
    var setItem =function(data) {
        // 现获取原有数据
        var shopList = localStorage.getItem('shopList') || '[]';
        shopList = JSON.parse(shopList);
        // 在把新数据push到原有数据
        for(var i =0;i<shopList.length;i++){
            if(data.title == shopList[i].title){
                shopList[i].count += data.count;
                break;
            }
        }
        if(i == shopList.length){
             shopList.push(data);
        }     
        // 在把全部数据存到本地
        localStorage.shopList = JSON.stringify(shopList);
    }
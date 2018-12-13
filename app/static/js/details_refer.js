/**
 * 
 * 商品详情页 
 * */
var $button_box = $('.button_box');
var $btnall = $('.button_box button');
var $count = $('.button_box i');
var $join_shop = $('.join_shop');
var $price = $('.price_left i');
var t=1;
var data ={
    "id":"1",
    "title": "VOA雪白貂皮毛帽领钻石扣蕃茄红绗缝牡丹绣花两件套真丝棉衣羽绒服",
    "price": 0,
    "imgsrc": "http://a.vpimg3.com/upload/merchandise/pdcvis/113684/2018/1116/79/b5c7b872-7576-45a0-a8a5-f7809f5e40a1.jpg",
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
        price = $($price).text();
        console.log(count,price);
        data.count =  Number(count);
        console.log(data.count,Number(data.count),Number(count));
        data.price = price;
        setItem(data);
    });
    var setItem =function(data) {
        // 现获取原有数据
        var shopList = localStorage.getItem('shopList') || '[]';
        shopList = JSON.parse(shopList);
        // 在把新数据push到原有数据
        for(var i =0;i<shopList.length;i++){
            if(data.id == shopList[i].id){
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
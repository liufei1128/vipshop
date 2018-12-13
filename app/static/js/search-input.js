
$('.text').on("click", function () {
    $('.search_onclick').css("display", "block");
})
$('.text').on("blur", function () {
    $('.search_onclick').css("display", "none");
})
const searchInp = (function () {
    return {
        init(ele) {
            this.$search = document.querySelector(ele);
            this.$searchInp = this.$search.querySelector('.text');
            this.$searchRes = this.$search.querySelector('.search_result');
            this.$searchOnclick = this.$search.querySelector('.search_onclick')
            this.event();
        },
        event() {
            const _this = this;
            const $inp = this.$searchInp;
            $inp.oninput = function () {
                if(this.value != ''){
                    _this.$searchRes.style.display = 'block';
                    _this.$searchOnclick.style.display = 'none';
                    _this.getData(this.value);
                } else {
                    _this.$searchRes.style.display = 'none';
                    _this.$searchOnclick.style.display = 'block';
                }
            }
            $inp.onfocus = function () {
                if (this.value != '') {
                    _this.$searchRes.style.display = 'block';
                    _this.$searchOnclick.style.display = 'none';
                }
            }
            $inp.onblur = function () {
                _this.$searchRes.style.display = 'none';
            }
        },
        getData(val) {
            const _this = this;
            sendJsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',{
                wd: val,
                cb: "insertData"
            }
        )
        },
        insertData(data) {
            data = data.s;
            this.$searchRes.innerHTML = '';
            for(let i = 0; i < data.length; i++){
                let $li = document.createElement('li');
                this.$searchRes.appendChild($li);
                $li.innerHTML = data[i];
            }
            this.$searchRes.style.display = 'block';
            $li.onclick = function(){
                window.location = "details.html";
            }
        }
    }
}())
searchInp.init('.search');
var insertData = searchInp.insertData.bind(searchInp);
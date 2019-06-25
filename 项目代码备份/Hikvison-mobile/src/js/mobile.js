class Mobile {
    constructor(opt) {
        this.vueApp = opt.vueApp;
        this.closeView = opt.closeView;
        this.id_token = null;
        this.language = "zh";
        this.reportId = "";
        this.treeData = [];
        this.languageTypeList = [];
        this.myRootFloderId = "";
        this.myRootFloderName = "";
        this.myReportFloderId = ""; //定义当前打开的文件夹id
        this.html = "";
        this.childrenHtml = "";
        this.basicUrl = "/portalbasicapi";
        this.ticketApi = "/portalbiapi/BIService/GetBIReportUrlAppendTicket";
    }

    init() {
        this.id_token = this.GetQueryString('id_token');    
        if (this.id_token !== null) {
            this.getDefault();
        } else if (this.id_token == null) {
            window.location = window.location.protocol + '//' + window.location.hostname + '/mobile/login.html';
            return false;
        }

    }

    setLanguage() {
        var _this = this;
        $("[lang-code]").each(function (index, el) {
            var code = $(el).attr('lang-code');
            var text = _this.getWord(code);
            $(el).html(text)
        })
    }

    getDefault() {
        let _this = this;
        $.ajax({
            type: "GET",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            url: this.basicUrl + "/Language/GetLanguageType",
            headers: this.getHeader(),
            success: function (res) {
                _this.languageTypeList = res.data;
                if (localStorage.lang && localStorage.lang !== "" && localStorage.lang !== 'undefined') {
                    _this.language = localStorage.lang;
                } else {
                    _this.languageTypeList.forEach(element => {
                        if (element.default) {
                            _this.language = element.code;
                        }
                    });
                }
                // $('.' + _this.language).show();  //ycq
                // _this.setLanguage()  //ycq
                // _this.getBackground();   //ycq
                _this.getAllReportList();
                _this.setEvent();
            }
        })
    }

    getAllReportList() {             
        var url = this.basicUrl + "/BIServices/BIService/GetCurrentUserHavePermissionReportGroupTree";
        var _this = this;
        $.ajax({
            type: "get",
            url: url + "/all?domainName=" + window.location.hostname,
            dataType: "json",
            headers: _this.getHeader(),
            success: function (data) {
                _this.vueApp.$store.dispatch('updateData', {
                    dataName: 'reportListData',
                    data: data.data.children
                });
            },
            error: function (err) {
                // var errorFloaderMsg = _this.getWord('errorFloaderMsg');  //ycq
                // console.log(JSON.stringify(err));    //ycq
                // alert(errorFloaderMsg);  //ycq
            }
        });
    }

    getWord(word) {
        let text = ''
        if (this.language == 'zh') {
            text = this.lanData.zh[word]
        } else if (this.language == 'en') {
            text = this.lanData.en[word]
        }
        return text
    }

    getBackground() {
        let _this = this;
        $.ajax({
            type: "get",
            url: this.basicUrl + "/SystemConfig/GetConfig",
            dataType: "json",
            headers: this.getHeader(),
            success: function (data) {
                _this.tabTitle.html(data.data.systemName);

                var iconUrl = data.data.pageLogo != null && data.data.pageLogo != "" ? data.data.pageLogo : "../staticFiles/favicon/ico.png";
                // linkTag = $('<link href="' + iconUrl + '"  rel="icon" type="image/x-icon"" />');

                // $($('head')[0]).append(linkTag);

            },
            error: function (err) {
                alert(_this.getWord('imgError') + JSON.stringify(err));
            }
        });
    }

    setEvent() {
        let _this = this;
        $('.van-icon-arrow-left').on('click', function () {
            alert('执行退出时间');
            _this.closeView();
        })
    }

    getHeader() {
        var headers = {
            Authorization: this.id_token
        }
        if (this.language) {
            headers.lang = this.language;
        }
        return headers
    }

    GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    
}

export default Mobile;
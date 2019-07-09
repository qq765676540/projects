class Mobile {
    constructor(opt) {
        this.vueApp = opt.vueApp;
        this.id_token = null;
        this.reportGroupData = [];
        this.language = "zh";
        this.languageTypeList = [];
        this.basicUrl = "/portalbasicapi";
        this.ticketApi = "/portalbiapi/BIService/GetBIReportUrlAppendTicket";

        this.reportListData = {};

        this.reqCount = 0;
    }

    init(callback) {
        this.id_token = this.GetQueryString('id_token');
        if (this.id_token !== null) {
            // this.getDefault();
            (callback && typeof (callback) === "function") && callback(true);
        } else if (this.id_token == null) {
            window.location = window.location.protocol + '//' + window.location.hostname + '/mobile/login.html';
            return false;
        }

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
                    if (_this.language == 'zh') {
                        $('#MyHtmlTitle').text('报表');
                    } else {
                        $('#MyHtmlTitle').text('Report');
                    }
                } else {
                    _this.languageTypeList.forEach(element => {
                        if (element.default) {
                            _this.language = element.code;
                            if (_this.language == 'zh') {
                                $('#MyHtmlTitle').text('报表');
                            } else {
                                $('#MyHtmlTitle').text('Report');
                            }
                        }
                    });
                }
                // _this.getAllReportList();
            }
        })
    }

    getAllReportList() {
        var _this = this;
        var url = this.basicUrl + "/BIServices/BIService/GetCurrentUserHavePermissionReportGroupTree";
        $.ajax({
            type: "get",
            url: url + "/all?domainName=" + window.location.hostname,
            dataType: "json",
            headers: _this.getHeader(),
            async: false,
            success: function (data) {
                let myData = data.data.children;
                _this.reportGroupData = data.data.children;
                let tmp = myData[0].children;
                for (var j in tmp) {
                    _this.vueApp.favoriteReportList.push(tmp[j]);
                }
                for (var q in myData) {
                    if (q > 0)
                        _this.vueApp.reportList.push(myData[q]);
                }
                for (let index = 1; index < myData.length; index++) {
                    _this.getReportId(myData[index].id);
                }
            },
            error: function (err) {
                // alert(JSON.stringify(err));
            }
        });
    }

    getReportId(reportGroupId) {

        var _this = this;
        var parentId = this.getMaxParentId(this.reportGroupData, reportGroupId)
        parentId = parentId ? parentId[0] : reportGroupId;
        var dataParams = {
            DomainName: window.location.hostname,
            IsAsc: true,
            ReportGroupId: reportGroupId,
            ReportSortColumn: 2,
            maxParentId: parentId
        }
        $.ajax({
            type: "POST",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            url: this.basicUrl + "/BIServices/ReportGroup/GetReport",
            data: JSON.stringify(dataParams),
            headers: this.getHeader(),
            success: function (data) {
                let myData = data.data;
                myData.filter(v => {
                    _this.vueApp.$set(_this.vueApp.reportIdList, v.reportName, v.reportId);
                    _this.getReportUrl(v.reportId);
                });
            },
            error: function (err) {
                // alert(JSON.stringify(err));
            }
        });

    }

    getReportUrl(id) {
        var _this = this;
        $.ajax({
            type: "GET",
            url: _this.basicUrl + "/BIServices/BIService/GetBIReportMessage/" + id,
            dataType: "json",
            headers: _this.getHeader(),
            success: function (data) {
                if (data.isSuccess) {
                    let myData = data.data;
                    let temp = { reportUrl: myData.reportUrl, isFavorite: myData.isFavorite };
                    _this.vueApp.$set(_this.vueApp.reportUrlList, id, temp);

                }
            },
            error: function (err) {
                // alert(JSON.stringify(err));
            }
        });
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

    getMaxParentId(arr, targetId) {
        let c = []
        arr.forEach(item => {
            let b = null;
            if (item.id == targetId) {
                b = item.id;
            } else {
                if (item.children && item.children.length !== 0) {
                    if (this.getMaxParentId(item.children, targetId).length != 0) {
                        b = item.id;
                    } else {
                        this.getMaxParentId(item.children, targetId)
                    }
                }
            }
            if (b && b !== undefined) {
                if (b instanceof Array) {
                    if (b.length !== 0) {
                        c = c.concat(b);
                    }
                } else {
                    c.push(b);
                }
            }
        })
        return c;
    }


    addFavorite(id) {
        var _this = this;
        $.ajax({
            url: this.basicUrl + "/Product/ProductReportFavorite/ProductReportFavorite/AddFavorite/" + id,
            type: "POST",
            dataType: "json",
            headers: this.getHeader(),
            success: function (res) {
                // location.reload();
            },
            error: function (err) {
                alert(JSON.stringify(err));
            }
        });
    }

    removeFavorite(id) {
        var _this = this;
        $.ajax({
            url: this.basicUrl + "/Product/ProductReportFavorite/ProductReportFavorite/CancelFavorite/" + id,
            type: "DELETE",
            dataType: "json",
            headers: this.getHeader(),
            success: function (res) {
                // location.reload();
            },
            error: function (err) {
                alert(JSON.stringify(err));
            }
        });
    }

    GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }


}

export default Mobile;
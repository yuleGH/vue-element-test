
/**
 * 图标常量
 */
var iconConstants = {
    INFO: 'INFO',
    SUCCESS: 'SUCCESS',//有确定按钮，不会自动关闭
    WARNING: 'WARN',
    ERROR: 'ERROR',
    QUESTION: 'QUESTION',
    SUCCESSAUTO: 'SUCCESSAUTO',//自动关闭
    INFOAUTO: 'INFOAUTO',
    WARNINGAUTO: 'WARNAUTO',
    ERRORAUTO: 'ERRORAUTO'
};

var showAlert = function(msg, icon, dangerouslyUseHTMLString){
    return showAlertCommon.call(this, {
        msg : msg,
        icon : icon,
        dangerouslyUseHTMLString : dangerouslyUseHTMLString,
        showClose : true
    });
};

var showAlertCommon = function(params){
    var _self = this;
    var type, msg = params.msg, icon = params.icon;
    var dangerouslyUseHTMLString = params.dangerouslyUseHTMLString || false;
    var showClose = params.showClose;

    if(iconConstants.SUCCESSAUTO === icon){
        type = "success";
    }else if(iconConstants.INFOAUTO === icon){
        type = "info";
    }else if(iconConstants.WARNINGAUTO === icon){
        type = "warning";
    }else if(iconConstants.ERRORAUTO === icon){
        type = "error";
    }else if(iconConstants.ERROR === icon){
        type = "error";
    }else if(iconConstants.WARNING === icon){
        type = "warning";
    }else if(iconConstants.SUCCESS === icon){
        type = "success";
    }else if(iconConstants.INFO === icon){
        type = "info";
    }

    if(icon.indexOf("AUTO") > 0){
        //2秒后自动关闭
        return _self.$message({
            type: type,
            message: msg,
            duration: 1500//显示时间, 毫秒。设为 0 则不会自动关闭
        });
    }else{
        //不会自动关闭
        return _self.$message({
            showClose : showClose,
            dangerouslyUseHTMLString : dangerouslyUseHTMLString,
            message: msg,
            type: type,
            duration : 0
        })
    }
};

var showAlertCanNotClose = function(msg, icon, dangerouslyUseHTMLString){
    return showAlertCommon.call(this, {
        msg : msg,
        icon : icon,
        dangerouslyUseHTMLString : dangerouslyUseHTMLString,
        showClose : false
    });
};

var showConfirm = function(msg, icon, confirmCallBack, cancelCallBack){
    var _self = this;
   return  _self.$confirm(msg, "提示", {
       confirmButtonText: "确定",
       cancelButtonText: "取消",
       type: 'warning',
        center: true
    }).then(function(){
        if(confirmCallBack){
            confirmCallBack();
        }else{
            showAlert.call(_self, "操作成功！", iconConstants.SUCCESSAUTO);
        }
    }).catch(function(){
       cancelCallBack && cancelCallBack();
    });
};

/**
 * 没有取消回调 返回 Promise
 * @param msg
 * @param icon
 * @param confirmCallBack
 */
var showConfirmNoCancelCallBack = function(msg, icon, confirmCallBack){
    var _self = this;
    return  _self.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: 'warning',
        center: true
    }).then(function(){
        if(confirmCallBack){
            confirmCallBack();
        }else{
            showAlert.call(_self, "操作成功！", iconConstants.SUCCESSAUTO);
        }
    });
};
//ÊµÀý»¯±à¼­Æ÷
//½¨ÒéÊ¹ÓÃ¹¤³§·½·¨getEditor´´½¨ºÍÒýÓÃ±à¼­Æ÷ÊµÀý£¬Èç¹ûÔÚÄ³¸ö±Õ°üÏÂÒýÓÃ¸Ã±à¼­Æ÷£¬Ö±½Óµ÷ÓÃUE.getEditor('editor')¾ÍÄÜÄÃµ½Ïà¹ØµÄÊµÀý
$(function () {
    var ue = UE.getEditor('editor');

    function isFocus(e) {
        alert(UE.getEditor('editor').isFocus());
        UE.dom.domUtils.preventDefault(e)
    }

    function setblur(e) {
        UE.getEditor('editor').blur();
        UE.dom.domUtils.preventDefault(e)
    }

    function insertHtml() {
        var value = prompt('²åÈëhtml´úÂë', '');
        UE.getEditor('editor').execCommand('insertHtml', value)
    }

    function createEditor() {
        enableBtn();
        UE.getEditor('editor');
    }

    function getAllHtml() {
        alert(UE.getEditor('editor').getAllHtml())
    }

    function getContent() {
        var arr = [];
        arr.push("Ê¹ÓÃeditor.getContent()·½·¨¿ÉÒÔ»ñµÃ±à¼­Æ÷µÄÄÚÈÝ");
        arr.push("ÄÚÈÝÎª£º");
        arr.push(UE.getEditor('editor').getContent());
        alert(arr.join("\n"));
    }

    function getPlainTxt() {
        var arr = [];
        arr.push("Ê¹ÓÃeditor.getPlainTxt()·½·¨¿ÉÒÔ»ñµÃ±à¼­Æ÷µÄ´ø¸ñÊ½µÄ´¿ÎÄ±¾ÄÚÈÝ");
        arr.push("ÄÚÈÝÎª£º");
        arr.push(UE.getEditor('editor').getPlainTxt());
        alert(arr.join('\n'))
    }

    function setContent(isAppendTo) {
        var arr = [];
        arr.push("Ê¹ÓÃeditor.setContent('»¶Ó­Ê¹ÓÃueditor')·½·¨¿ÉÒÔÉèÖÃ±à¼­Æ÷µÄÄÚÈÝ");
        UE.getEditor('editor').setContent('»¶Ó­Ê¹ÓÃueditor', isAppendTo);
        alert(arr.join("\n"));
    }

    function setDisabled() {
        UE.getEditor('editor').setDisabled('fullscreen');
        disableBtn("enable");
    }

    function setEnabled() {
        UE.getEditor('editor').setEnabled();
        enableBtn();
    }

    function getText() {
        //µ±Äãµã»÷°´Å¥Ê±±à¼­ÇøÓòÒÑ¾­Ê§È¥ÁË½¹µã£¬Èç¹ûÖ±½ÓÓÃgetText½«²»»áµÃµ½ÄÚÈÝ£¬ËùÒÔÒªÔÚÑ¡»ØÀ´£¬È»ºóÈ¡µÃÄÚÈÝ
        var range = UE.getEditor('editor').selection.getRange();
        range.select();
        var txt = UE.getEditor('editor').selection.getText();
        alert(txt)
    }

    function getContentTxt() {
        var arr = [];
        arr.push("Ê¹ÓÃeditor.getContentTxt()·½·¨¿ÉÒÔ»ñµÃ±à¼­Æ÷µÄ´¿ÎÄ±¾ÄÚÈÝ");
        arr.push("±à¼­Æ÷µÄ´¿ÎÄ±¾ÄÚÈÝÎª£º");
        arr.push(UE.getEditor('editor').getContentTxt());
        alert(arr.join("\n"));
    }

    function hasContent() {
        var arr = [];
        arr.push("Ê¹ÓÃeditor.hasContents()·½·¨ÅÐ¶Ï±à¼­Æ÷ÀïÊÇ·ñÓÐÄÚÈÝ");
        arr.push("ÅÐ¶Ï½á¹ûÎª£º");
        arr.push(UE.getEditor('editor').hasContents());
        alert(arr.join("\n"));
    }

    function setFocus() {
        UE.getEditor('editor').focus();
    }

    function deleteEditor() {
        disableBtn();
        UE.getEditor('editor').destroy();
    }

    function disableBtn(str) {
        var div = document.getElementById('btns');
        var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
        for (var i = 0, btn; btn = btns[i++];) {
            if (btn.id == str) {
                UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
            } else {
                btn.setAttribute("disabled", "true");
            }
        }
    }

    function enableBtn() {
        var div = document.getElementById('btns');
        var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
        for (var i = 0, btn; btn = btns[i++];) {
            UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
        }
    }

    function getLocalData() {
        alert(UE.getEditor('editor').execCommand("getlocaldata"));
    }

    function clearLocalData() {
        UE.getEditor('editor').execCommand("clearlocaldata");
        alert("ÒÑÇå¿Õ²Ý¸åÏä")
    }
});

$(function() {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()
    $('#btnSend').on('click', function() {
        var text = $('#ipt').val().trim();
        if (text.length <= 0) {
            return $('#ipt').val('');
        }
        // $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>')
        $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li> ')
        resetui();
        $('#ipt').val('');
        getMsg(text);
    })

    function getMsg(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function(res) {
                if (res.message === 'success') {
                    var msg = res.data.info.text;
                    // console.log(msg);
                    $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span></li>')
                    resetui();
                    // 调用 getVoice 函数，把文本转化为语音
                    getVoice(msg);
                }
            }
        })
    }

    function getVoice(text) {
        $.ajax({
            method: 'GET',
            url: ' http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function(res) {
                // console.log(res)
                if (res.status === 200) {
                    // 播放语音
                    $('#voice').attr('src', res.voiceUrl)
                }
            }
        })
    }
    $('#ipt').on('keyup', function(e) {
        if (e.keyCode === 13) {
            $('#btnSend').click();
        }
    })

})
var dragdrop = {
    init: function (elem) {
        elem.attr('ondrop', 'dragdrop.drop(event)');
        elem.attr('ondragover', 'dragdrop.drag(event)');
    },
    drop: function (e) {
        e.preventDefault();
        var file = e.dataTransfer.files[0];
        runUpload(file);
    },
    drag: function (e) {
        e.preventDefault();
    }
};

function redraw(frame_src, image_src) {
    var canvas = document.getElementById('userActions'),
        ctx = canvas.getContext('2d');
    var sz = 1440;
    canvas.width = sz;
    canvas.height = sz;

    var img = new Image();
    img.crossOrigin = '*';
    img.src = image_src == '' ? 'img/placeholder.jpg' : image_src;
    img.onload = function () {
        ctx.fillStyle = 'green';
        ctx.drawImage(img, 145, 96, 1150, 1150);

        var frame = new Image();
        frame.crossOrigin = '*';
        frame.src = frame_src;
        frame.onload = function () {
            ctx.drawImage(frame, 0, 0, sz, sz);
        }
    }
}

function runUpload(file) {
    if (file.type === 'image/png' ||
        file.type === 'image/jpg' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/gif' ||
        file.type === 'image/bmp') {
        var reader = new FileReader(),
            image = new Image();

        reader.readAsDataURL(file);
        reader.onload = function (_file) {

            currentImg = _file.target.result;
            redraw('img/frame1.png', currentImg);

        }
    }
}


$(document).ready(function () {

    var currentImg = '';
    var defaultFrame = 'img/frame1.png';

    redraw(defaultFrame, currentImg);

    var canvas = document.getElementById('userActions');
    var link = $('#save-btn');
    link.attr('href', canvas.toDataURL());
    link.attr('download', 'download.png');

    if (window.FileReader) {

        dragdrop.init($('#userActions'));

        $('#fileUpload').change(function () { runUpload(this.files[0]); });
    }

    $('#save-btn').on('click', function () {

    })

});
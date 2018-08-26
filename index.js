(function () {
    var canvas = document.getElementById('canvas')
    var audio = document.getElementById('audio')
    var context = canvas.getContext('2d')
    var img = new Image();
    img.src = "banana.png";
    var scale = 1 / 10
    var bananas = []
    var isInvers = false;
    var isPlay = false;
    var isFall = false;

    function Banana(x, y, v){
        this.x = x
        this.y = y
        this.v = v || Math.random()*2 + 0.2
    }

    function resize() {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }

    function init() {
        bananas = []
        bananas.push(new Banana(canvas.width / 2 - 300, canvas.height / 2))
        bananas.push(new Banana(canvas.width / 2, canvas.height / 2))
        bananas.push(new Banana(canvas.width / 2 + 300, canvas.height / 2))
    }
    window.onresize = resize
    resize()
    canvas.addEventListener('click', function (e) {
        bananas.push(new Banana(e.clientX, e.clientY))
    })

    function draw(x, y) {
        var lx = x - img.width * scale / 2
        var ly = y - img.height * scale / 2
        context.drawImage(img, lx, ly, img.width * scale, img.height * scale);
    }

    function drawInverse(x, y) {
        var lx = x - img.width * scale / 2
        var ly = y - img.height * scale / 2
        context.save();
        context.scale(-1, 1);
        context.drawImage(img, -lx, ly, -1 * img.width * scale, img.height * scale);
        context.restore();
    }
    function generateBananas() {
        context.clearRect(0, 0, canvas.width, canvas.height)
        $.each(bananas, function (idx, item) {
            if (isInvers) {
                drawInverse(item.x, item.y)
                canvas.style.backgroundColor = "beige"
            } else {
                draw(item.x, item.y)
                canvas.style.backgroundColor = "azure"
            }
        })
        
    }
    window.addEventListener('keyup', function (e) {
        if (e.code == 'Space' && !isPlay) {
            $('#instructions').remove()
            init()
            audio.play()
            setTimeout(function(){
                generateBananas()
            }, 200)
            setTimeout(function(){
                setInterval(function(){
                    isInvers = !isInvers
                }, 420)
                setInterval(function(){
                    updateBanana()
                    generateBananas()
                }, 1000/60)
            }, 3500)
        } else if(e.code == "Enter"){
            isFall = !isFall
        }
    })
    function updateBanana(){
        if(!isFall) return
        $.each(bananas, function(idx, banana){
            banana.y += banana.v
            if(banana.y - img.height * scale/2 > canvas.height){
                banana.y = - img.height * scale/2
            }
        })
    }


})()
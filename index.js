const shades = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. "
const shadesArray = shades.split("");
// shadesArray.reverse()

const img = new Image();
img.crossOrigin = 'anonymous';

const imageArray = ['./assets/reachingForHope.jpg']

const canvas = document.getElementById('canvas');
const canvas2 = document.getElementById('canvas2');
const imageInput = document.getElementById('image-input')

canvas.width = window.innerWidth / 2
canvas.height = window.innerHeight / 2 - window.innerHeight / 15
canvas2.width = window.innerWidth / 2
canvas2.height = window.innerHeight / 2 - window.innerHeight / 15

// canvas2.width = window.innerWidth
// canvas2.height = window.innerHeight - 60

const ctx = canvas.getContext('2d');
const ctx2 = canvas2.getContext('2d');

const drawImage = (src = imageArray[0]) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height)
    img.src = src
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        hello()
      };
}

const hello = () => {
    ctx2.font = "1px Arial" 
    ctx2.fillStyle = "black"
    // let check = true;
    // let check2 = true
    // let i2 = 0;
    for(let i = 0; i < canvas.width; i = i + 1) {
        // let j2 = 0;
        for(let j = 0; j < canvas.height; j = j + 1) {
            const imgData = ctx.getImageData(i, j, 1, 1);
            const pix = imgData.data

            let avg = (pix[0] + pix[1] + pix[2]) / 3
            
            avg = Math.floor(avg)
            if(avg == 255) avg = 254;
            // if(check && check2) 
            ctx2.fillText( shadesArray[Math.floor(avg * shadesArray.length / 255)], i, j)
            // console.log(shadesArray[Math.floor(avg * shadesArray.length / 255)])
            // check = !check;
        }
        // check2 = !check2;
    }
}

drawImage()

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth / 2
    canvas.height = window.innerHeight / 2 - 30
    canvas2.width = window.innerWidth / 2
    canvas2.height = window.innerHeight / 2 - 30

    drawImage()
})

imageInput.addEventListener("change", function() {
    if(this.files && this.files[0]) {
        const src = URL.createObjectURL(this.files[0])
        drawImage(src);
    }
})
var font;
var vehicles=[]

function preload()
{
    font=loadFont('RAVIE.ttf');     //font is stored in same file as script and html
}

function createPoints(ptsi)
{
    for(var i=0; i<(ptsi.length) ; i++)
    {
        var pnt=ptsi[i]
        var Vehicle = new vehicle(pnt.x,pnt.y)
        vehicles.push(Vehicle)
        // stroke(getRandomColor(),getRandomColor(),getRandomColor());         //getting random colors everytime 😎
        // strokeWeight(8)
        // point(pnt.x,pnt.y)
    }


}

function setup() {
    createCanvas(2000, 1000)              //Cnvas is created
    background(51)                      //BGColor
    textFont(font)                      //Preloded font is loaded here
    // textSize(100)
    // fill(255)
    // noStroke()
    // text('TheDeepEffect',100,200)       //text is displayed to the html
    var pts=font.textToPoints('T H E    D E E P     E F F E C T',75,300,100);     //Array of points is created with p5 font library
    console.log(pts);
    var pts1=font.textToPoints('D E E P  M A N E K',500,500,100);

    createPoints(pts)
    
    
   
}

function draw() {
    background(51)
    for(var i=0;i<vehicles.length;i++)
    {
         var v=vehicles[i]
        v.update();
        v.show();
        v.behavior();
        
         
    }
  
}
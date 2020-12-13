const {
  cv,
  drawBlueRect
} = require('./utils');

exports.runImageFaceDetection = function(src) {

    const base64data = src.replace('data:image/jpeg;base64','')
    .replace('data:image/png;base64','');//Strip image type prefix
    const buffer = Buffer.from(base64data,'base64');
    const image = cv.imdecode(buffer);
    // console.log(image)

    
    // const image = cv.imread(matImage);
    const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
    
    // detect faces
    const { objects, numDetections } = classifier.detectMultiScale(image.bgrToGray());
    console.log('faceRects:', objects);
    console.log('confidences:', numDetections);
    
    if (!objects.length) {
      // throw new Error('No faces detected!');
      return false;
    }
    
    // draw detection
    const numDetectionsTh = 10;
    objects.forEach((rect, i) => {
      const thickness = numDetections[i] < numDetectionsTh ? 1 : 2;
      drawBlueRect(image, rect, { thickness });
    });

   
    const outBase64 =  cv.imencode('.jpg', image).toString('base64'); // Perform base64 encoding
    const htmlImg='data:image/jpeg;base64,'+outBase64;
 
    return htmlImg;

}



const {
  cv,
  getDataFilePath,
  drawBlueRect
} = require('../utils');

exports.runImageFaceDetection = function(src) {

    const image = cv.imread(getDataFilePath(src));
    const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
    
    // detect faces
    const { objects, numDetections } = classifier.detectMultiScale(image.bgrToGray());
    console.log('faceRects:', objects);
    console.log('confidences:', numDetections);
    
    if (!objects.length) {
      throw new Error('No faces detected!');
    }
    
    // draw detection
    const numDetectionsTh = 10;
    objects.forEach((rect, i) => {
      const thickness = numDetections[i] < numDetectionsTh ? 1 : 2;
      drawBlueRect(image, rect, { thickness });
    });
    
    return image;

}



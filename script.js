const message = document.querySelector("#message")
const fileButton = document.querySelector("#file")
const img = document.querySelector("#img")
const synth = window.speechSynthesis

fileButton.addEventListener("change", event => {
  console.log("File input changed");
  loadFile(event);
});

img.addEventListener("load", () => {
  console.log("Image loaded");
  userImageUploaded();
});

const classifier = ml5.imageClassifier('MobileNet', modelLoaded);

function loadFile(event) {
  console.log("Loading file");
  img.src = URL.createObjectURL(event.target.files[0]);
}

function userImageUploaded() {
  console.log("User image uploaded");
  message.innerHTML = "Image was loaded!";
  
  console.log("Classifying image...");
  
  classifier.classify(img, (results, err) => {
    console.log("Classifying image...2");
    if (err) {
      console.error("Classification error:", err);
      return;
    }
    console.log("Classification results:", results);
    message.innerHTML = `I think it's a ${results[0].label}!`;
    speak(`I think it's a ${results[0].label}!`);
  });
}

function modelLoaded() {
  console.log('Model Loaded!');
  console.log('Classifier:', classifier);
  message.innerHTML = "Please upload an image of a hamster!";
}

function speak(text) {
  if (synth.speaking) {
    return;
  }
  if (text !== "") {
    let utterThis = new SpeechSynthesisUtterance(text);
    synth.speak(utterThis);
  }
}
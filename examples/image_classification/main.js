const getSearchParamsPrefer = () => {
  let searchParams = new URLSearchParams(location.search);
  return searchParams.has('prefer') ? searchParams.get('prefer') : '';
}

const getSearchParamsBackend = () => {
  let searchParams = new URLSearchParams(location.search);
  return searchParams.has('b') ? searchParams.get('b') : '';
}
const getSearchParamsModel = () => {
  let searchParams = new URLSearchParams(location.search);
  if (searchParams.has('m') && searchParams.has('t')) {
    return searchParams.get('m') + '_' + searchParams.get('t');
  } else {
    return '';
  }
}

const videoElement = document.getElementById('video');
const imageElement = document.getElementById('image');
const inputElement = document.getElementById('input');
const canvasElement = document.getElementById('canvas');
const progressBar = document.getElementById('progressBar');

let currentBackend = getSearchParamsBackend();
let currentModel = getSearchParamsModel();
let currentPrefer = getSearchParamsPrefer();
let streaming = false;
let stats = new Stats();
let track;

const showAlert = (error) => {
  console.error(error);
  let div = document.createElement('div');
  // div.setAttribute('id', 'backendAlert');
  div.setAttribute('class', 'backendAlert alert alert-warning alert-dismissible fade show');
  div.setAttribute('role', 'alert');
  div.innerHTML = `<strong>${error}</strong>`;
  div.innerHTML += `<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>`;
  let container = document.getElementById('container');
  container.insertBefore(div, container.firstElementChild);
}

const updateProgress = (ev) => {
  if (ev.lengthComputable) {
    let percentComplete = ev.loaded / ev.total * 100;
    percentComplete = percentComplete.toFixed(0);
    progressBar.style = `width: ${percentComplete}%`;
    updateLoading(percentComplete);
  }
}

let utils = new Utils(canvasElement);
utils.updateProgress = updateProgress;    //register updateProgress function if progressBar element exist

const updateResult = (result) => {
  try {
    console.log(`Inference time: ${result.time} ms`);
    let inferenceTimeElement = document.getElementById('inferenceTime');
    inferenceTimeElement.innerHTML = `inference time: <span class='ir'>${result.time} ms</span>`;
  } catch(e) {
    console.log(e);
  }
  try {
    console.log(`Classes: `);
    result.classes.forEach((c, i) => {
      console.log(`\tlabel: ${c.label}, probability: ${c.prob}%`);
      let labelElement = document.getElementById(`label${i}`);
      let probElement = document.getElementById(`prob${i}`);
      labelElement.innerHTML = `${c.label}`;
      probElement.innerHTML = `${c.prob}%`;
    });
  }
  catch(e) {
    console.log(e);
  }
}

if (currentBackend === '') {
  if (nnNative) {
    currentBackend = 'WebML';
  } else {
    currentBackend = 'WASM';
  }
}

// register prefers
if (getOS() === 'Mac OS' && currentBackend === 'WebML') {
  if (!currentPrefer) {
    currentPrefer = "sustained";
  }
}

const logConfig = () => {
  console.log(`Model: ${currentModel}, Backend: ${currentBackend}, Prefer: ${currentPrefer}`);
}

const errorHandler = (e) => {
  showAlert(e);
  showError(null, null);
}

const startPredictCamera = async () => {
  if (streaming) {
    try {
      stats.begin();
      let ret = await utils.predict(videoElement);
      updateResult(ret);
      stats.end();
      setTimeout(startPredictCamera, 0);
    } catch (e) {
      errorHandler(e);
    }
  }
}

const utilsPredict = async (imageElement, backend, prefer) => {
  streaming = false;
  // Stop webcam opened by navigator.getUserMedia if user visits 'LIVE CAMERA' tab before
  if(track) {
    track.stop();
  }
  await showProgress('Image predicting ...');
  try {
    // return immediately if model, backend, prefer are all unchanged
    let init = await utils.init(backend, prefer);    
    if (init == 'NOT_LOADED') {
      return;
    }
    let ret = await utils.predict(imageElement);
    showResults();
    updateResult(ret);
  }
  catch (e) {
    errorHandler(e);
  }
}

const utilsPredictCamera = async (backend, prefer) => {
  streaming = true;
  await showProgress('Camera predicting ...');
  try {
    let init = await utils.init(backend, prefer);    
    if (init == 'NOT_LOADED') {
      return;
    }
    let stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: "environment" } });
    video.srcObject = stream;
    track = stream.getTracks()[0];
    startPredictCamera();
    showResults();
  } 
  catch (e) {
    errorHandler(e);
  }
}

const predictPath = (camera) => {
  (!camera) ? utilsPredict(imageElement, currentBackend, currentPrefer) : utilsPredictCamera(currentBackend, currentPrefer);
}

const updateScenario = async (camera) => {
  streaming = false;
  logConfig();
  predictPath(camera);
}

inputElement.addEventListener('change', (e) => {
  let files = e.target.files;
  if (files.length > 0) {
    imageElement.src = URL.createObjectURL(files[0]);
  }
}, false);

imageElement.addEventListener('load', () => {
  utilsPredict(imageElement, currentBackend, currentPrefer);
}, false);

const main = async (camera) => {
  streaming = false;
  try {
    utils.deleteAll();
  } catch (e) {
    // console.log('utils.deleteAll(): ' + e);
  }
  logConfig();
  await showProgress('Loading model ...');
  for (let model of imageClassificationModels) {
    if (currentModel == model.modelName) {
      try {
        await utils.loadModel(model);
      }
      catch (e) {
        errorHandler(e);
      }
    }
  }
  predictPath(camera);
}


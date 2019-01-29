WebNN API Image Classification Examples
==
This sample loads Image classification models trained by ImageNet, constructs and inferences it by WebNN API.

Download Model
-----------
Before launch this sample, you need to download the model. Please check out [README.md](model/README.md) in model folder for details.

URL Parameters for Image Classification Example
====

Example
-----------
https://127.0.0.1/examples/image_classification/index.html?prefer=none&b=WASM&m=mobilenet_v1&t=tflite&s=image&d=0

Screenshots
-----------
![screenshot](screenshot.png)


Description
-----------
| Parameter | Value | Description | Note |
|----|------|------|-----------|
| prefer | sustained, fast, low | Preferred backend for WebNN API backend<br>sustained == GPU<br>fast == CPU<br>low == Low Power |Only work for WebNN API backend, useless when backend is WASM or WebGL |
| b | WASM, WebGL, WebML | Backend | Case sensitive |
| m | // for tflite format <br>mobilenet_v1, mobilenet_v2, squeezenet, inception_v3, inception_v4, inception_resnet_v2 <br><br>// for onnx format <br>mobilenet_v2, squeezenet, resnet_v1, resnet_v2, inception_v2, densenet| Model and it's version ||
| t | tfile<br>onnx| Model format  | |
| s | image <br>camera | Show image or camera tab directly | |
| d | 0, 1  | Display model<br>// full view <br>0<br>// compact view<br>1  | |


Netron URLs
====
It supports to use Netron Visualizer for deep learning and machine learning models in [model.html](../model.html), please upload [these models](model/README.md) to your website (or CDN/OSS services) and update the modelCDNUrl links in [webml-polyfill/examples/util/base.js](../util/base.js). E.g. https://cdn_host_and_path/mobilenet_v1_1.0_224.tflite
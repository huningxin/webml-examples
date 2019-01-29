let nnPolyfill, nnNative;
if (navigator.ml.isPolyfill) {
  nnNative = null;
  nnPolyfill = navigator.ml.getNeuralNetworkContext();
} else {
  nnNative = navigator.ml.getNeuralNetworkContext();
  nnPolyfill = navigator.ml_polyfill.getNeuralNetworkContext();
}

const preferMap = {
  'MPS': 'sustained',
  'BNNS': 'fast',
  'sustained': 'SUSTAINED_SPEED',
  'fast': 'FAST_SINGLE_ANSWER',
  'low': 'LOW_POWER',
};

const mobilenet_v1_tflite = {
  modelName: 'mobilenet_v1_tflite',
  inputSize: [224, 224, 3],
  outputSize: 1001,
  modelFile: '../image_classification/model/mobilenet_v1_1.0_224.tflite',
  labelsFile: '../image_classification/model/labels1001.txt',
  preOptions: {
    mean: [127.5, 127.5, 127.5],
    std: [127.5, 127.5, 127.5],
  },
  intro: 'An efficient Convolutional Neural Networks for Mobile Vision Applications.',
  paperUrl: 'https://arxiv.org/pdf/1704.04861.pdf',
  modelCDNUrl: 'https://cdn_host_and_path/mobilenet_v1_1.0_224.tflite'
};
const mobilenet_v2_tflite = {
  modelName: 'mobilenet_v2_tflite',
  inputSize: [224, 224, 3],
  outputSize: 1001,
  modelFile: '../image_classification/model/mobilenet_v2_1.0_224.tflite',
  labelsFile: '../image_classification/model/labels1001.txt',
  preOptions: {
    mean: [127.5, 127.5, 127.5],
    std: [127.5, 127.5, 127.5],
  },
  intro: 'MobileNetV2 improves the state of the art performance of mobile models.',
  paperUrl: 'https://arxiv.org/abs/1801.04381',
  modelCDNUrl: 'https://cdn_host_and_path/mobilenet_v2_1.0_224.tflite'
};
const inception_v3_tflite = {
  modelName: 'inception_v3_tflite',
  inputSize: [299, 299, 3],
  outputSize: 1001,
  modelFile: '../image_classification/model/inception_v3.tflite',
  labelsFile: '../image_classification/model/labels1001.txt',
  preOptions: {
    mean: [127.5, 127.5, 127.5],
    std: [127.5, 127.5, 127.5],
  },
  intro: 'Inception-v3 is trained for the ImageNet Large Visual Recognition Challenge.',
  paperUrl: 'http://arxiv.org/abs/1512.00567',
  modelCDNUrl: 'https://cdn_host_and_path/inception_v3.tflite'
};
const inception_v4_tflite = {
  modelName: 'inception_v4_tflite',
  inputSize: [299, 299, 3],
  outputSize: 1001,
  modelFile: '../image_classification/model/inception_v4.tflite',
  labelsFile: '../image_classification/model/labels1001.txt',
  preOptions: {
    mean: [127.5, 127.5, 127.5],
    std: [127.5, 127.5, 127.5],
  },
  intro: 'Inception architecture that has been shown to achieve very good performance at relatively low computational cost.',
  paperUrl: 'https://arxiv.org/abs/1602.07261',
  modelCDNUrl: 'https://cdn_host_and_path/inception_v4.tflite'
};
const squeezenet_tflite = {
  modelName: 'squeezenet_tflite',
  inputSize: [224, 224, 3],
  outputSize: 1001,
  modelFile: '../image_classification/model/squeezenet.tflite',
  labelsFile: '../image_classification/model/labels1001.txt',
  preOptions: {
    mean: [127.5, 127.5, 127.5],
    std: [127.5, 127.5, 127.5],
  },
  intro: 'A light-weight CNN providing Alexnet level accuracy with 50X fewer parameters.',
  paperUrl: 'https://arxiv.org/abs/1602.07360',
  modelCDNUrl: 'https://cdn_host_and_path/squeezenet.tflite'
};
const inception_resnet_v2_tflite = {
  modelName: 'inception_resnet_v2_tflite',
  inputSize: [299, 299, 3],
  outputSize: 1001,
  modelFile: '../image_classification/model/inception_resnet_v2.tflite',
  labelsFile: '../image_classification/model/labels1001.txt',
  preOptions: {
    mean: [127.5, 127.5, 127.5],
    std: [127.5, 127.5, 127.5],
  },
  postOptions: {
    softmax: true,
  },
  intro: 'Inception architecture that has been shown to achieve very good performance at relatively low computational cost, and training with residual connections accelerates the training of Inception networks significantly. There is also some evidence of residual Inception networks outperforming similarly expensive Inception networks without residual connections.',
  paperUrl: 'https://arxiv.org/abs/1602.07261',
  modelCDNUrl: 'https://cdn_host_and_path/inception_resnet_v2.tflite'
};
const squeezenet_onnx = {
  modelName: 'squeezenet_onnx',
  modelFile: '../image_classification/model/squeezenet1.1.onnx',
  labelsFile: '../image_classification/model/labels1000.txt',
  inputSize: [224, 224, 3],
  outputSize: 1000,
  preOptions: {
    // https://github.com/onnx/models/tree/master/models/image_classification/squeezenet#preprocessing
    mean: [0.485, 0.456, 0.406],
    std: [0.229, 0.224, 0.225],
    norm: true
  },
  postOptions: {
    softmax: true,
  },
  intro: 'A light-weight CNN providing Alexnet level accuracy with 50X fewer parameters.',
  paperUrl: 'https://arxiv.org/abs/1602.07360',
  modelCDNUrl: 'https://cdn_host_and_path/squeezenet1.1.onnx'
};
const mobilenet_v2_onnx = {
  modelName: 'mobilenet_v2_onnx',
  modelFile: '../image_classification/model/mobilenetv2-1.0.onnx',
  labelsFile: '../image_classification/model/labels1000.txt',
  inputSize: [224, 224, 3],
  outputSize: 1000,
  preOptions: {
    // https://github.com/onnx/models/tree/master/models/image_classification/mobilenet#preprocessing
    mean: [0.485, 0.456, 0.406],
    std: [0.229, 0.224, 0.225],
    norm: true
  },
  postOptions: {
    softmax: true,
  },
  intro: 'MobileNetV2 improves the state of the art performance of mobile models.',
  paperUrl: 'https://arxiv.org/abs/1801.04381',
  modelCDNUrl: 'https://cdn_host_and_path/mobilenetv2-1.0.onnx'
};
const resnet_v1_onnx = {
  modelName: 'resnet_v1_onnx',
  modelFile: '../image_classification/model/resnet50v1.onnx',
  labelsFile: '../image_classification/model/labels1000.txt',
  inputSize: [224, 224, 3],
  outputSize: 1000,
  preOptions: {
    // https://github.com/onnx/models/tree/master/models/image_classification/resnet#preprocessing
    mean: [0.485, 0.456, 0.406],
    std: [0.229, 0.224, 0.225],
    norm: true
  },
  postOptions: {
    softmax: true,
  },
  intro: 'A residual learning framework to ease the training of networks that are substantially deeper than those used previously. This result won the 1st place on the ILSVRC 2015 classification task.',
  paperUrl: 'https://arxiv.org/abs/1512.03385',
  modelCDNUrl: 'https://cdn_host_and_path/resnet50v1.onnx'
};
const resnet_v2_onnx = {
  modelName: 'resnet_v2_onnx',
  modelFile: '../image_classification/model/resnet50v2.onnx',
  labelsFile: '../image_classification/model/labels1000.txt',
  inputSize: [224, 224, 3],
  outputSize: 1000,
  preOptions: {
    // https://github.com/onnx/models/tree/master/models/image_classification/resnet#preprocessing
    mean: [0.485, 0.456, 0.406],
    std: [0.229, 0.224, 0.225],
    norm: true
  },
  postOptions: {
    softmax: true,
  },
  intro: 'Deep residual networks have emerged as a family of extremely deep architectures showing compelling accuracy and nice convergence behaviors. It reports improved results using a 1001-layer ResNet on CIFAR-10 (4.62% error) and CIFAR-100, and a 200-layer ResNet on ImageNet.',
  paperUrl: 'https://arxiv.org/abs/1603.05027',
  modelCDNUrl: 'https://cdn_host_and_path/resnet50v2.onnx'
};
const inception_v2_onnx = {
  modelName: 'inception_v2_onnx',
  modelFile: '../image_classification/model/inceptionv2.onnx',
  labelsFile: '../image_classification/model/ilsvrc2012labels.txt',
  inputSize: [224, 224, 3],
  outputSize: 1000,
  intro: 'Inception-v2 is trained for the ImageNet Large Visual Recognition Challenge.',
  paperUrl: 'https://arxiv.org/abs/1512.00567',
  modelCDNUrl: 'https://cdn_host_and_path/inceptionv2.onnx'
};
const densenet_onnx = {
  modelName: 'densenet_onnx',
  modelFile: '../image_classification/model/densenet121.onnx',
  labelsFile: '../image_classification/model/labels1000.txt',
  inputSize: [224, 224, 3],
  outputSize: 1000,
  preOptions: {
    // mean and std should also be in BGR order
    mean: [0.406, 0.456, 0.485],
    std: [0.225, 0.224, 0.229],
    norm: true,
    channelScheme: 'BGR',
  },
  postOptions: {
    softmax: true,
  },
  intro: 'Dense Convolutional Network (DenseNet) connects each layer to every other layer in a feed-forward fashion. DenseNets have several compelling advantages: they alleviate the vanishing-gradient problem, strengthen feature propagation, encourage feature reuse, and substantially reduce the number of parameters. ',
  paperUrl: 'https://arxiv.org/abs/1608.06993',
  modelCDNUrl: 'https://cdn_host_and_path/densenet121.onnx'
};

const ssd_mobilenetv1_tflite = {
  modelName: 'SSD MobileNetV1(TFlite)',
  modelFile: '../object_detection/model/ssd_mobilenet_v1.tflite',
  labelsFile: '../object_detection/model/coco_labels_list.txt',
  box_size: 4,
  num_classes: 91,
  num_boxes: 1083 + 600 + 150 + 54 + 24 + 6,
  inputSize: [300, 300, 3],
  preOptions: {
    mean: [127.5, 127.5, 127.5],
    std: [127.5, 127.5, 127.5],
  }
};

const ssd_mobilenetv2_tflite = {
  modelName: 'SSD MobileNetV2(TFlite)',
  modelFile: '../object_detection/model/ssd_mobilenet_v2.tflite',
  labelsFile: '../object_detection/model/coco_labels_list.txt',
  box_size: 4,
  num_classes: 91,
  num_boxes: 1083 + 600 + 150 + 54 + 24 + 6,
  inputSize: [300, 300, 3],
  preOptions: {
    mean: [127.5, 127.5, 127.5],
    std: [127.5, 127.5, 127.5],
  }
};

const ssdlite_mobilenetv2_tflite = {
  modelName: 'SSDLite MobileNetV2(TFlite)',
  modelFile: '../object_detection/model/ssdlite_mobilenet_v2.tflite',
  labelsFile: '../object_detection/model/coco_labels_list.txt',
  box_size: 4,
  num_classes: 91,
  num_boxes: 1083 + 600 + 150 + 54 + 24 + 6,
  inputSize: [300, 300, 3],
  preOptions: {
    mean: [127.5, 127.5, 127.5],
    std: [127.5, 127.5, 127.5],
  }
};

const posenet = {
  modelName: 'PoseNet',
  inputSize: [513, 513, 3],
  preOptions: {
    mean: [127.5, 127.5, 127.5],
    std: [127.5, 127.5, 127.5],
  },
  intro: 'PoseNet is a machine learning model that allows for Real-time Human Pose Estimation which can be used to estimate either a single pose or multiple poses.',
  paperUrl: 'https://arxiv.org/abs/1803.08225',
  modelCDNUrl: 'https://cdn_host_and_path/'
};

const imageClassificationModels = [
  mobilenet_v1_tflite,
  mobilenet_v2_tflite,
  inception_v3_tflite,
  inception_v4_tflite,
  squeezenet_tflite,
  inception_resnet_v2_tflite,
  squeezenet_onnx,
  mobilenet_v2_onnx,
  resnet_v1_onnx,
  resnet_v2_onnx,
  inception_v2_onnx,
  densenet_onnx,
];

const objectDetectionModels = [
  ssd_mobilenetv1_tflite,
  ssd_mobilenetv2_tflite,
  ssdlite_mobilenetv2_tflite,
];

const humanPoseEstimationModels = [
  posenet,
];

const getOS = () => {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}

const currentOS = getOS();

const getNativeAPI = (preferString) => {
  const apiMapping = {
    'Android': {
      'sustained': 'NN',
      'fast': 'NN',
      'low': 'NN',
    },
    'Windows': {
      'sustained': 'clDNN',
      // 'fast': 'MKL-DNN', // implementing
    },
    'Linux': {
      'sustained': 'clDNN',
      // 'fast': 'MKL-DNN', // implementing
    },
    'Mac OS': {
      'fast': 'BNNS',
      'sustained': 'MPS',
    }
  };
  return apiMapping[currentOS][preferString];
}

const getUrlParams = (prop) => {
  var params = {};
  var search = decodeURIComponent( window.location.href.slice( window.location.href.indexOf( '?' ) + 1 ) );
  var definitions = search.split( '&' );

  definitions.forEach((val, key) => {
    var parts = val.split( '=', 2 );
      params[ parts[ 0 ] ] = parts[ 1 ];
  } );

  return ( prop && prop in params ) ? params[ prop ] : params;
}

const getPreferParam = () => {
  // workaround for using MPS backend on Mac OS by visiting URL with 'prefer=sustained'
  // workaround for using BNNS backend on Mac OS by visiting URL with 'prefer=fast'
  // use 'sustained' as default for Mac OS
  var prefer = 'sustained';
  var parameterStr = window.location.search.substr(1);
  var reg = new RegExp("(^|&)prefer=([^&]*)(&|$)", "i");
  var r = parameterStr.match(reg);
  if (r != null) {
    prefer = unescape(r[2]);
    if (prefer !== 'fast' && prefer !== 'sustained') {
      prefer = 'invalid';
    }
  }

  return prefer;
}

const getPrefer = (backend) => {
  let nn = navigator.ml.getNeuralNetworkContext();
  let prefer = nn.PREFER_FAST_SINGLE_ANSWER;
  if (currentOS === 'Mac OS' && backend === 'WebML') {
      let urlPrefer = getPreferParam();
      if (urlPrefer === 'sustained') {
        prefer = nn.PREFER_SUSTAINED_SPEED;
      } else if (urlPrefer === 'fast') {
        prefer = nn.PREFER_FAST_SINGLE_ANSWER;
      }
  }
  return prefer;
}

const getPreferCode = (backend, prefer) => {
  let preferCode;
  let nn = navigator.ml.getNeuralNetworkContext();
  if (backend === 'WASM') {
    preferCode = nn.PREFER_FAST_SINGLE_ANSWER;
  } else if (backend === 'WebGL') {
    preferCode = nn.PREFER_SUSTAINED_SPEED;
  } else if (backend === 'WebML') {
    if (prefer === 'sustained') {
      preferCode = nn.PREFER_SUSTAINED_SPEED;
    } else if (prefer === 'fast') {
      preferCode = nn.PREFER_FAST_SINGLE_ANSWER;
    } else if (prefer === 'low') {
      preferCode = nn.PREFER_LOW_POWER;
    }
  }
  return preferCode;
}

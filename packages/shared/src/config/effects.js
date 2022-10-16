export const effects = [
  {
    "name": "Atomic swirl",
    "mainColor": [255,0,0]
  },
  {
    "name": "Blue mood blobs",
    "mainColor": [12,0,255],
    "config": [
      {
        "name": "color",
        "type": "color",
        "defaultValue": [0,0,255]
      },
      {
        "name": "blobs",
        "type": "int",
        "limits": [1,10],
        "defaultValue": 5
      },
      {
        "name": "hueChange",
        "type": "int",
        "limits": [0, 360],
        "defaultValue": 60
      },
      {
        "name": "reverse",
        "type": "bool",
        "defaultValue": false
      },
      {
        "name": "rotationTime",
        "type": "int",
        "limits": [1,500],
        "defaultValue": 60
      }
    ]
  },
  {
    "name": "Breath",
    "mainColor": [255,255,255],
    "config": [
      {
        "name": "color-start",
        "type": "color",
        "defaultValue": [50,50,50]
      },
      {
        "name": "color-end",
        "type": "color",
        "defaultValue": [255,255,255]
      },
      {
        "name": "repeat-count",
        "type": "int",
        "limits": [0, 10],
        "defaultValue": 0
      },
      {
        "name": "color-start-time",
        "type": "int",
        "limits": [10, 3000],
        "defaultValue": 50
      },
      {
        "name": "color-end-time",
        "type": "int",
        "limits": [10, 3000],
        "defaultValue": 250
      },
      {
        "name": "fade-in-time",
        "type": "int",
        "limits": [10, 10000],
        "defaultValue": 3000
      },
      {
        "name": "fade-out-time",
        "type": "int",
        "limits": [10, 10000],
        "defaultValue": 1000
      },
      {
        "name": "mantain-end-color",
        "type": "bool",
        "defaultValue": true
      }
    ]
  },
  {
    "name": "Candle",
    "mainColor": [255,138,0],
    "config": [
      {
        "name": "color",
        "type": "color",
        "defaultValue": [255,138,0]
      },
      {
        "name": "fake",
        "type": "int",
        "limits": [0, 0],
        "defaultValue": 0
      },
      {
        "name": "brightness",
        "type": "int",
        "limits": [0, 99],
        "defaultValue": 99
      },
      {
        "name": "candles",
        "type": "fixed",
        "defaultValue": "all"
      },
      {
        "name": "sleepTime",
        "type": "fraction",
        "defaultValue": 0.2
      },
      {
        "name": "smoothing-custom-settings",
        "type": "bool",
        "defaultValue": true
      },
      {
        "name": "smoothing-time_ms",
        "type": "int",
        "limits": [100, 1000],
        "defaultValue": 500
      },
      {
        "name": "smoothing-updateFrequency",
        "type": "int",
        "limits": [0, 100],
        "defaultValue": 20
      }
    ]
  },
  {
    "name": "Collision",
    "mainColor": [255,255,255],
    "config": [
      {
        "name": "exploteRadius",
        "type": "int",
        "limits": [1, 20],
        "defaultValue": 8
      },
      {
        "name": "speed",
        "type": "int",
        "limits": [1, 300],
        "defaultValue": 100
      },
      {
        "name": "trailLength",
        "type": "int",
        "limits": [2, 20],
        "defaultValue": 5
      }
    ]
  },
  {
    "name": "Color traces",
    "mainColor": [255,255,255],
    "config": [
      {
        "name": "speed",
        "type": "float",
        "limits": [0, 2],
        "defaultValue": 1
      }
    ]
  },
  {
    "name": "Knight rider",
    "mainColor": [255,0,0],
    "config": [
      {
        "name": "color",
        "type": "color",
        "defaultValue": [255,0,0]
      },
      {
        "name": "fadeFactor",
        "type": "float",
        "limits": [0, 2],
        "defaultValue": 0.7
      },
      {
        "name": "speed",
        "type": "float",
        "limits": [0.5, 5],
        "defaultValue": 1
      }
    ]
  },
  {
    "name": "Pac-Man",
    "mainColor": [
      255,
      255,
      0
    ],
    "config": [
      {
        "name": "margin-pos",
        "type": "int",
        "limits": [
          2,
          20
        ],
        "defaultValue": 2
      },
      {
        "name": "rotationTime",
        "type": "int",
        "limits": [
          1,
          20
        ],
        "defaultValue": 4
      }
    ]
  },
  {
    "name": "Plasma",
    "mainColor": [
      255,
      0,
      255
    ],
    "config": [
      {
        "name": "sleepTime",
        "type": "float",
        "limits": [
          0,
          1
        ],
        "defaultValue": 0.2
      }
    ]
  },
  {
    "name": "Police Lights Solid",
    "mainColor": [
      255,
      0,
      0
    ],
    "config": [
      {
        "name": "color_one",
        "type": "color",
        "defaultValue": [255,0,0]
      },
      {
        "name": "color_two",
        "type": "color",
        "defaultValue": [0,0,255]
      },
      {
        "name": "rotation-time",
        "type": "float",
        "limits": [
          0,
          5
        ],
        "defaultValue": 0.2
      },
      {
        "name": "reverse",
        "type": "bool",
        "defaultValue": false
      }
    ]
  },
  {
    "name": "Rainbow mood",
    "mainColor": [
      0,
      255,
      86
    ],
    "config": [
      {
        "name": "brightness",
        "type": "int",
        "limits": [
          40,
          100
        ],
        "defaultValue": 100
      },
      {
        "name": "reverse",
        "type": "bool",
        "defaultValue": false
      },
      {
        "name": "rotation-time",
        "type": "int",
        "limits": [
          0,
          100
        ],
        "defaultValue": 60
      }
    ]
  },
  {
    "name": "Snake",
    "mainColor": [
      255,
      0,
      0
    ],
    "config": [
      {
        "name": "color",
        "type": "color",
        "defaultValue": [255,0,0]
      },
      {
        "name": "background-color",
        "type": "color",
        "defaultValue": [0,0,0]
      },
      {
        "name": "percentaje",
        "type": "int",
        "limits": [
          0,
          100
        ],
        "defaultValue": 10
      },
      {
        "name": "rotation-time",
        "type": "int",
        "limits": [
          1,
          30
        ],
        "defaultValue": 12
      }
    ]
  },
  {
    "name": "Sparks",
    "mainColor": [
      255,
      255,
      255
    ],
    "config": [
      {
        "name": "color",
        "type": "color",
        "defaultValue": [255,0,0]
      },
      {
        "name": "brightness",
        "type": "int",
        "limits": [
          40,
          100
        ],
        "defaultValue": 100
      },
      {
        "name": "random-color",
        "type": "bool",
        "defaultValue": false
      },
      {
        "name": "rotation-time",
        "type": "int",
        "limits": [
          1,
          20
        ],
        "defaultValue": 3
      },
      {
        "name": "saturation",
        "type": "int",
        "limits": [
          1,
          100
        ],
        "defaultValue": 100
      },
      {
        "name": "sleep-time",
        "type": "float",
        "limits": [
          0,
          1
        ],
        "defaultValue": 0.05
      }
    ]
  },
  {
    "name": "Strobe red",
    "mainColor": [
      255,
      0,
      0
    ],
    "config": [
      {
        "name": "color-start",
        "type": "color",
        "defaultValue": [255,0,50]
      },
      {
        "name": "color-end",
        "type": "fixed",
        "defaultValue": [0,0,0]
      },
      {
        "name": "repeat-count",
        "type": "fixed",
        "defaultValue": 0
      },
      {
        "name": "color-start-time",
        "type": "fixed",
        "defaultValue": 100
      },
      {
        "name": "color-end-time",
        "type": "fixed",
        "defaultValue": 100
      },
      {
        "name": "fade-in-time",
        "type": "fixed",
        "defaultValue": 100
      },
      {
        "name": "fade-out-time",
        "type": "fixed",
        "defaultValue": 100
      },
      {
        "name": "mantain-end-color",
        "type": "fixed",
        "defaultValue": true
      }
    ]
  },
  {
    "name": "Strobe white",
    "mainColor": [
      255,
      255,
      255
    ],
    "config": [
      {
        "name": "color-start",
        "type": "color",
        "defaultValue": [255,255,255]
      },
      {
        "name": "color-end",
        "type": "fixed",
        "defaultValue": [0,0,0]
      },
      {
        "name": "repeat-count",
        "type": "fixed",
        "defaultValue": 0
      },
      {
        "name": "color-start-time",
        "type": "fixed",
        "defaultValue": 50
      },
      {
        "name": "color-end-time",
        "type": "fixed",
        "defaultValue": 10
      },
      {
        "name": "fade-in-time",
        "type": "fixed",
        "defaultValue": 100
      },
      {
        "name": "fade-out-time",
        "type": "fixed",
        "defaultValue": 100
      },
      {
        "name": "mantain-end-color",
        "type": "fixed",
        "defaultValue": true
      }
    ]
  },
  {
    "name": "Trails",
    "mainColor": [
      255,
      255,
      255
    ],
    "config": [
      {
        "name": "color",
        "type": "color",
        "defaultValue": [255,255,255]
      },
      {
        "name": "height",
        "type": "int",
        "limits": [
          1,
          20
        ],
        "defaultValue": 8
      },
      {
        "name": "min_len",
        "type": "int",
        "limits": [
          1,
          20
        ],
        "defaultValue": 2
      },
      {
        "name": "max_len",
        "type": "int",
        "limits": [
          1,
          20
        ],
        "defaultValue": 7
      },
      {
        "name": "random",
        "type": "bool",
        "defaultValue": false
      },
      {
        "name": "speed",
        "type": "int",
        "limits": [
          1,
          100
        ],
        "defaultValue": 30
      },
      {
        "name": "trails",
        "type": "int",
        "limits": [
          1,
          20
        ],
        "defaultValue": 3
      }
    ]
  }
]

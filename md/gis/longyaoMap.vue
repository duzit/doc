<template>
  <div class="ly-map">
    <div class="overview">
      <div class="info-main">
        <div>
          <img src="../../../icons/imgly/line-top.png" alt="">
        </div>
        <div class="company margin-l">
          <div class="gif">
            <img src="../../../icons/imgly/company.gif" alt="企业">
          </div>
          <div style="width: 70%">
            <div class="common-des">企业总数(个)</div>
            <div class="num text-overflow">
              {{ oCompanyNum.totalNum || '-' }}
            </div>
          </div>
        </div>
        <div>
          <img src="../../../icons/imgly/line-top.png" alt="">
        </div>
        <div class="uploaded margin-l">
          <div class="gif">
            <img src="../../../icons/imgly/uploaded.gif" alt="已上传">
          </div>
          <div style="width: 70%">
            <div class="common-des">已上传数(个)</div>
            <div class="num text-overflow">{{ oCompanyNum.uploadNum || '-' }}</div>
          </div>
        </div>
        <div>
          <img src="../../../icons/imgly/line-top.png" alt="">
        </div>
        <div class="uploading margin-l">
          <div class="gif">
            <img src="../../../icons/imgly/uploading.gif" alt="未上传">
          </div>
          <div style="width: 70%">
            <div class="common-des">未上传数(个)</div>
            <div class="num text-overflow">{{ oCompanyNum.noUploadNum || '-' }}</div>
          </div>
        </div>
        <div>
          <img src="../../../icons/imgly/line-top.png" alt="">
        </div>
      </div>
    </div>
    <div class="type-transform">
      <div class="type-content">
        <div class="air-station" @click="handleClick('air')">
          <img src="../../../icons/imgly/air-station.png" alt="" v-if="!bAirFlag">
          <img src="../../../icons/imgly/air.gif" alt="" v-else>
          <div class="air-type common" :class="bAirFlag ? 'select-des' : ''">空气站</div>
        </div>
      </div>
      <div class="type-content">
        <div class="pollution-company" @click="handleClick('poll')">
          <img src="../../../icons/imgly/pw-compamy.png" alt="" v-if="bAirFlag">
          <img src="../../../icons/imgly/poll.gif" alt="" v-else>
          <div class="pollution-type common" :class="!bAirFlag ? 'select-des' : ''">排污企业</div>
        </div>
      </div>
    </div>
    <div id='mapContainer2' style="width:100%; height: 100%; margin: 0; padding: 0; overflow: hidden;float:left; position: relative">
    </div>
  </div>
</template>

<script>
import {
  layerStyleXZQ,
  boundStyle
} from '../../../utils/lymap'
import {
  requestCompanyNum,
  requestMonitoringPoint
} from '@/api/longyao/api'

export default {
  name: 'equipOverview',
  data() {
    return {
      layerNameCommon: 'air',
      layerNameAir: 'air',
      layerNamePoll: 'poll',
      popOverlay: null,
      pointData: [],
      myMap2: null,
      bAirFlag: true,
      oCompanyNum: {
        totalNum: '',
        uploadNum: '',
        noUploadNum: ''
      },
      requestType: '气类'
    }
  },
  created() {
    this.getCompanyNum()
    window.setInterval(() => {
      this.getCompanyNum()
    }, window.visualization.companyTotal)

    this.getMapPointData()
  },
  methods: {
    /**
     * 查询企业上传和未上传数
     */
    getCompanyNum() {
      requestCompanyNum()
        .then(res => {
          this.oCompanyNum = res.data
        })
        .catch(() => {
          this.oCompanyNum = {
            totalNum: '',
            uploadNum: '',
            noUploadNum: ''
          }
        })
    },
    /**
     * 地图上数据
     */
    getMapPointData(type) {
      requestMonitoringPoint({ monitoringType: this.requestType})
        .then(res => {
          this.pointData = res.data
          this.mapInit()
          window.setInterval(() => {
            this.updateMapData()
          }, window.visualization.mapData)
        })
        .catch(() => {

        })
    },
    /**
     * map初始化
     */
    mapInit() {
      this.myMap2 = new ZGMap('mapContainer2')

      this.myMap2.initMap()
        .then(() => {
          // 设置地图显示范围
          this.myMap2.centerAndZoom(114.783970, 37.377877, 11);
          // this.myMap2.switchBaseLayer('SL');//设置哪个底图可见，"SL"矢量图层，'YX'影响图层，'WYL'午夜蓝
          this.myMap2.setBaseLayerVisible(false);
          this.myMap2.setLayerSwitcherVisible(false);
          this.myMap2.setMousePositionVisible(false);
          this.myMap2.setOverViewMapControlVisible(false);
          this.myMap2.setScaleLineVisible(false);
          this.myMap2.setZoomSliderVisible(false);
          this.myMap2.setMapSwitchVisible(false);
          this.myMap2.addTileLayer('滤镜切片图层矢量', 'http://t{0-6}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=2faa8660bab591c4ac7e845b494e9e30');
          this.myMap2.addTileLayer('滤镜切片图层文字', 'http://t{0-6}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=2faa8660bab591c4ac7e845b494e9e30');
          this.myMap2.getVectorLayer('滤镜切片图层矢量').getSource().on("tileloadend", this.imgFilter);
          this.myMap2.getVectorLayer('滤镜切片图层文字').getSource().on("tileloadend", this.imgFilter);
          // 放大到11级以后才显示文字
          // this.myMap2.getVectorLayer('滤镜切片图层文字').setMaxResolution(this.myMap2.map.getView().getResolutionForZoom(11));

          // 悬浮时 排污放大图片
          let hoverPwError = require('../../../icons/imgly/hover-pw-error.png')
          let hoverPwOk = require('../../../icons/imgly/hover-pw-ok.png')
          let hoverPwOutline = require('../../../icons/imgly/hover-pw-info.png')

          // 悬浮时 空气站放大图片
          let hoverAirError = require('../../../icons/imgly/hover-air-error.png')
          let hoverAirOk = require('../../../icons/imgly/hover-air-ok.png')
          let hoverAirOutline = require('../../../icons/imgly/hover-air-info.png')

          // 设备正常 空气站和排污图片
          let airOk = require('../../../icons/imgly/air-ok.png')
          let airOutline = require('../../../icons/imgly/air-info.png')
          let pwOk = require('../../../icons/imgly/pw-ok.png')
          let pwOutline = require('../../../icons/imgly/pw-info.png')

          // 6帧图片 动图效果 报警设备默认显示动图
          let airFlash = require('../../../icons/imgly/air.png')
          let pollFlash = require('../../../icons/imgly/paiwu.png')

          let airFlashStyles = [
            new ol.style.Style({image: new ol.style.Icon({scale:1,src: airFlash,size:[66,66],offset:[0,0]})}),
            new ol.style.Style({image: new ol.style.Icon({scale:1,src: airFlash,size:[66,66],offset:[66,0]})}),
            new ol.style.Style({image: new ol.style.Icon({scale:1,src: airFlash,size:[66,66],offset:[132,0]})}),
            new ol.style.Style({image: new ol.style.Icon({scale:1,src: airFlash,size:[66,66],offset:[198,0]})}),
            new ol.style.Style({image: new ol.style.Icon({scale:1,src: airFlash,size:[66,66],offset:[264,0]})}),
            new ol.style.Style({image: new ol.style.Icon({scale:1,src: airFlash,size:[66,66],offset:[330,0]})}),
          ];

          let pollFlashStyles = [
            new ol.style.Style({image: new ol.style.Icon({scale:1,src: pollFlash,size:[66,66],offset:[0,0]})}),
            new ol.style.Style({image: new ol.style.Icon({scale:1,src: pollFlash,size:[66,66],offset:[66,0]})}),
            new ol.style.Style({image: new ol.style.Icon({scale:1,src: pollFlash,size:[66,66],offset:[132,0]})}),
            new ol.style.Style({image: new ol.style.Icon({scale:1,src: pollFlash,size:[66,66],offset:[198,0]})}),
            new ol.style.Style({image: new ol.style.Icon({scale:1,src: pollFlash,size:[66,66],offset:[264,0]})}),
            new ol.style.Style({image: new ol.style.Icon({scale:1,src: pollFlash,size:[66,66],offset:[330,0]})}),
          ];

          // xzq 显示行政区
          this.myMap2.addVectorLayer('XZQblund', 'https://gis.unicloud.com/xiaoqu/lyx/bound.geojson', boundStyle);
          this.myMap2.addVectorLayer('XZQ', 'https://gis.unicloud.com/xiaoqu/lyx/lyx.geojson', layerStyleXZQ);
          // 放大到12级后行政区就消失了
          this.myMap2.getVectorLayer('XZQ').setMinResolution(this.myMap2.map.getView().getResolutionForZoom(12));
          this.myMap2.getVectorLayer('XZQblund').setMinResolution(this.myMap2.map.getView().getResolutionForZoom(12));

          // 默认png air
          let pointStylesAir = {
            "ok": new ol.style.Style({
                image: new ol.style.Icon({
                  src: airOk,
                }),
            }),
            "outline": new ol.style.Style({
                image: new ol.style.Icon({
                  src: airOutline,
                }),
            }),
            "error": airFlashStyles[0],
          }

          // 默认png poll
          let pointStylesPoll = {
            "ok": new ol.style.Style({
                image: new ol.style.Icon({
                  src: pwOk,
                }),
            }),
            "outline": new ol.style.Style({
                image: new ol.style.Icon({
                  src: pwOutline,
                }),
            }),
            "error": pollFlashStyles[0],
          }

          // 悬浮png air
          let pointBigStyles = {
            "ok": new ol.style.Style({
                image: new ol.style.Icon({
                  src: hoverAirOk,
                }),
            }),
            "error": new ol.style.Style({
                image: new ol.style.Icon({
                  src: hoverAirError,
                }),
            }),
            "outline": new ol.style.Style({
                image: new ol.style.Icon({
                  src: hoverAirOutline,
                }),
            }),
          };

          // 悬浮png poll
          let pointBigStylesPoll = {
            "ok": new ol.style.Style({
                image: new ol.style.Icon({
                  src: hoverPwOk,
                }),
            }),
            "error": new ol.style.Style({
                image: new ol.style.Icon({
                  src: hoverPwError,
                }),
            }),
            "outline": new ol.style.Style({
                image: new ol.style.Icon({
                  src: hoverPwOutline,
                }),
            }),
          };

          /**
           * start2 根据数据的不同状态显示不同图片
           */
          // air
          let pointStyleFunction = function(feature, resolution) {
            if (feature.get('status') == 0 ) {
              return pointStylesAir['ok'];
            } else if (feature.get('status') == 1) {
              return pointStylesAir['error'];
            } else {
              return pointStylesAir['outline'];
            }
          }

          // poll 
          let pointStyleFunctionPoll = function(feature, resolution) {
            if (feature.get('status') == 0 ) {
              return pointStylesPoll['ok'];
            } else if (feature.get('status') == 1) {
              return pointStylesPoll['error'];
            } else {
              return pointStylesPoll['outline'];
            }
          }

          // 点hover后的渲染函数 air
          let pointBigStyleFunction = function(feature, resolution) {
            if (feature.get('status') == 0 ) {
              return pointBigStyles['ok'];
            } else if (feature.get('status') == 1) {
              return pointBigStyles['error'];
            } else {
              return pointBigStyles['outline'];
            }
          }

          // 点hover后的渲染函数 poll
          let pointBigStyleFunctionPoll = function(feature, resolution) {
            if (feature.get('status') == 0 ) {
              return pointBigStylesPoll['ok'];
            } else if (feature.get('status') == 1) {
              return pointBigStylesPoll['error'];
            } else {
              return pointBigStylesPoll['outline'];
            }
          }
          /**
           * end2
           */

          /**
           * start1 注册两个图层 需求涉及到切换显示地图上的图片
           */
          // air 图层
          let pointGeojson = this.myMap2.points2Geojson(this.pointData);
          this.myMap2.addVectorLayerFromGeojson(this.layerNameAir, pointGeojson, pointStyleFunction);
          // hover 事件注册
          this.myMap2.addMapHoverEvent({
            layerTitle: this.layerNameAir,
            style: pointBigStyleFunction,
            callbackFunction: this.popWindow,
            callbackFunctionOut: this.clearInfo
          });

          // poll 图层
          let pointGeojsonPoll = this.myMap2.points2Geojson(this.pointData);
          this.myMap2.addVectorLayerFromGeojson(this.layerNamePoll, pointGeojsonPoll, pointStyleFunctionPoll);
          // hover 事件注册
          this.myMap2.addMapHoverEvent({
            layerTitle: this.layerNamePoll,
            style: pointBigStyleFunctionPoll,
            callbackFunction: this.popWindowPoll,
            callbackFunctionOut: this.clearInfo
          });
          /**
           * end1
           */

          // 排污企业 默认不可见
          this.myMap2.getVectorLayer(this.layerNamePoll).setVisible(false);

          // 显示gif效果
          let flashIndex = 0;
          let flashLayerAir = this.myMap2.getVectorLayer(this.layerNameAir);
          let flashLayerPoll = this.myMap2.getVectorLayer(this.layerNamePoll);
          setInterval(function() {
              pointStylesAir['error'] = airFlashStyles[flashIndex%6];
              pointStylesPoll['error'] = pollFlashStyles[flashIndex%6];
              flashLayerAir.getSource().refresh();
              flashLayerPoll.getSource().refresh();
              if(0 == flashIndex%6){
                flashIndex = 0;
              }
              flashIndex++
          }, 166);

        })
    },
    /**
     * 地图底图样式
     */
    imgFilter(evt) {
      var image = evt.tile.getImage();
      var canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      var context = canvas.getContext( '2d' );
      context.drawImage( image,0,0,256,256);
      // 获取图片像素信息
      var imageData = context.getImageData(0,0,256,256);
      var pixels = imageData.data;
      // 遍历像素点
      let filterA = 0.5;
      for (var i=0; i<pixels.length; i+=4){
        var r = pixels[i];
        var g = pixels[i+1];
        var b = pixels[i+2];
        var gray2 = (255 - r + 255 - g + 255 - b) / 3;
        pixels[i]=(1-filterA)*8 + filterA*gray2;
        pixels[i+1]=(1-filterA)*39 + filterA*gray2;
        pixels[i+2]=(1-filterA)*127 + filterA*gray2;
      }
      context.putImageData(imageData, 0,0);
      image.src = canvas.toDataURL("image/png");
    },
    /**
     * 悬浮弹窗 air
     */
    popWindow(dic_values, point) {
        this.myMap2.removeOverlay(this.popOverlay);

        let title = dic_values['companyName']
        let monitoring = dic_values['monitoringName']
        let statusDom = ''
        if (dic_values['status'] == 0) {
          statusDom = '<span class="normal">在线</span>'
        } else if (dic_values['status'] == 1) {
          statusDom = '<span class="ng">报警</span>'
        } else {
          statusDom = '<span class="outline">离线</span>'
        }
        let o2 = dic_values['valueO2'] || '-'
        let nO = dic_values['valueNO'] || '-'
        let so2 = dic_values['valueSO2'] || '-'
        let yanC = dic_values['valueSmokeDust'] || '-'
        let pressure = dic_values['valueSmokePressure'] || '-'
        let tmp = dic_values['valueSmokeTemperature'] || '-'
        let speed = dic_values['valueSmokeFlow'] || '-'
        let flueGas = dic_values['flueGas'] || '-'
        let smokeReduced = dic_values['smokeReduced'] || '-'
        let time = dic_values['reportTime'] || '-'

        // html代码 自定义样式
        let htmls = '<div class="dialog-main">'
                    + '<div class="title text-overflow"><span>' +  title + '</span> </div>'
                    + '<div class="text-overflow"><span>监控点：</span><span>' + monitoring + '</span></div>'
                    + '<div><span>运行状态：</span>' + statusDom + '</div>'
                    + '<div><span>O2含量：</span><span>' + o2 + '</span></div>'
                    + '<div><span>氮氧化物：</span><span>' + nO + '</span></div>'
                    + '<div><span>二氧化硫：</span><span>' + so2 + '</span></div>'
                    + '<div><span>烟尘：</span><span>' + yanC + '</span></div>'
                    + '<div><span>烟气压力：</span><span>' + pressure + '</span></div>'
                    + '<div><span>烟气温度：</span><span>' + tmp + '</span></div>'
                    + '<div><span>烟气流速：</span><span>' + speed + '</span></div>'
                    + '<div><span>废气：</span><span>' + flueGas + '</span></div>'
                    + '<div><span>烟尘折算：</span><span>' + smokeReduced + '</span></div>'
                    + '<div><span>最新通信时间：</span><span>' + time + '</span></div>'
                    + '</div>'
        var coor = ol.proj.transform(point,'EPSG:3857','EPSG:4326');
        // 这里的-80和-27是弹框相对于点的x,y偏移值，可以根据具体需要调整，比如弹框可以在点的正上方或者右上方
		    this.popOverlay=this.myMap2.addOverlay(htmls, coor, [0, 0]);
    },
    
    /**
     * 悬浮弹窗 poll
     */
    popWindowPoll(dic_values, point) {
        this.myMap2.removeOverlay(this.popOverlay);

        let title = dic_values['companyName']
        let monitoring = dic_values['monitoringName']
        let statusDom = ''
        if (dic_values['status'] == 0) {
          statusDom = '<span class="normal">在线</span>'
        } else if (dic_values['status'] == 1) {
          statusDom = '<span class="ng">报警</span>'
        } else {
          statusDom = '<span class="outline">离线</span>'
        }
        let cod = dic_values['cod'] || '-'
        let ph = dic_values['ph'] || '-'
        let ammoniaNitrogen = dic_values['ammoniaNitrogen'] || '-'
        let sewageFlow = dic_values['sewageFlow'] || '-'
        let copperTotality = dic_values['copperTotality'] || '-'
        let zincTotality = dic_values['zincTotality'] || '-'
        let time = dic_values['reportTime'] || '-'

        let htmls = '<div class="dialog-main">'
                    + '<div class="title text-overflow"><span>' +  title + '</span> </div>'
                    + '<div class="text-overflow"><span>监控点：</span><span>' + monitoring + '</span></div>'
                    + '<div><span>运行状态：</span>' + statusDom + '</div>'
                    + '<div><span>COD：</span><span>' + cod + '</span></div>'
                    + '<div><span>ph：</span><span>' + ph + '</span></div>'
                    + '<div><span>氨氮：</span><span>' + ammoniaNitrogen + '</span></div>'
                    + '<div><span>污水流速：</span><span>' + sewageFlow + '</span></div>'
                    + '<div><span>总铜：</span><span>' + copperTotality + '</span></div>'
                    + '<div><span>总锌：</span><span>' + zincTotality + '</span></div>'
                    + '<div><span>最新通信时间：</span><span>' + time + '</span></div>'
                    + '</div>'
        var coor = ol.proj.transform(point,'EPSG:3857','EPSG:4326');
        // 这里的-80和-27是弹框相对于点的x,y偏移值，可以根据具体需要调整，比如弹框可以在点的正上方或者右上方
		    this.popOverlay=this.myMap2.addOverlay(htmls, coor, [0, 0]);
    },
    /**
     * 移出时清除地图tooltip
     */
    clearInfo() {
      this.myMap2.removeOverlay(this.popOverlay);
    },
    /**
     * 地图刷新
     */
    refreshSource() {
      var myLayer = this.myMap2.getVectorLayer(this.layerNameCommon);
      var geojson = this.myMap2.points2Geojson(this.pointData);
      var newfeatures = (new ol.format.GeoJSON()).readFeatures(geojson, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      });
      var oldfeatures = myLayer.getSource().getFeatures();
      var featurecount = oldfeatures.length;
      //删除旧数据
      for (var i = featurecount - 1; i >= 0; i--) {
        myLayer.getSource().removeFeature(oldfeatures[i]);
      }
      //批量加载新数据
      myLayer.getSource().addFeatures(newfeatures);
    },
    /**
     * 点击切换
     */
    handleClick(type) {
      if (type === 'air') {
        this.bAirFlag = true
        this.layerNameCommon = 'air'
        this.requestType = '气类'
        this.myMap2.getVectorLayer(this.layerNameAir).setVisible(true);
        this.myMap2.getVectorLayer(this.layerNamePoll).setVisible(false);
      } else {
        this.bAirFlag = false
        this.layerNameCommon = 'poll'
        this.requestType = '水类'
        this.myMap2.getVectorLayer(this.layerNameAir).setVisible(false);
        this.myMap2.getVectorLayer(this.layerNamePoll).setVisible(true);
      }

      // 更新数据
      this.updateMapData()
    },
    /**
     * 刷新地图数据
     */
    updateMapData() {
      requestMonitoringPoint({ monitoringType: this.requestType})
        .then(res => {
          this.pointData = res.data
          this.refreshSource()
        })
        .catch(() => {

        })
    },
  },
}
</script>

<style lang="scss">
.ly-map {
  width: 100%;
  height: 100%;
}
.dialog-main {
  width: 317px;
  height: 385px;
  background: url('../../../icons/imgly/dialog.png') no-repeat !important;
  // z-index: 10000 !important;
  padding: 1.5rem 2.1rem;
  font-size: 14px;
  color: #efefef;
  > div {
    margin-top: 0.4rem;
  }

  .title {
    font-size: 18px;
    color: #2DC2FD;
  }
  .normal {
    color: #00FCB8;
    font-weight: bold;
  }
  .ng {
    color: #FE1C1E;
    font-weight: bold;
  }
  .outline {
    color: #D4D7D8;
    font-weight: bold;
  }
}

.overview {
  position: absolute;
  width: 39.4rem;
  height: 3.84rem;
  background: #041947;
  top: 4rem;
  left: 30.42%;
  z-index: 102;

  .info-main {
    display: flex;
    height: inherit;
    align-items: center;
    .company {
      display: flex;
      width: 33.33%;
      .num {
        color: #2DC2FD;
        font-size: 2rem;
      }
    }
    .uploaded {
      display: flex;
      width: 33.33%;
      .num {
        color: #00FCB8;
        font-size: 2rem;
      }
    }
    .uploading {
      display: flex;
      width: 33.33%;
      .num {
        color: #D0EAF4;
        font-size: 2rem;
      }
    }

    .gif {
      width: 66px;
      height: 66px;
    }
    .common-des {
      color: #fff;
      font-size: 0.9rem;
    }
    .margin-l {
      margin-left: 0.9rem;
    }
  }
}
.type-transform {
  position: absolute;
  left: 40.83%;
  bottom: 3.7rem;
  display: flex;
  z-index: 102;

  .type-content {
    width: 9.526rem;
    height: 6.158rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .select-des {
    color: #2DC2FD !important;
    font-weight: bold;
    background: rgba(255,0,0,0);
    // border: 1px solid rgba(0, 0, 0, 1);
    border-radius: 4px;
  }

  .air-station,
  .pollution-company {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
  }
  .air-station {
    &:hover {
      .air-type {
        color: #2DC2FD;
        font-weight: bold;
        background: rgba(255,0,0,0);
        // border: 1px solid rgba(0, 0, 0, 1);
        border-radius: 4px;
      }
    }
  }
  .pollution-company {
    &:hover {
      .pollution-type {
        color: #2DC2FD;
        font-weight: bold;
        background: rgba(255,0,0,0);
        // border: 1px solid rgba(0, 0, 0, 1);
        border-radius: 4px;
      }
    }
  }

  .common {
    // width: 5.68rem;
    // height: 1.79rem;
    font-size: 1rem;
    color: #fff;
    margin-top: 0.5rem;
  }
}
</style>

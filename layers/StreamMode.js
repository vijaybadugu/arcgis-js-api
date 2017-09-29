// COPYRIGHT © 2017 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/Deferred","dojo/has","../kernel","../SpatialReference","../tasks/query","../tasks/QueryTask","../geometry/jsonUtils","./RenderMode"],function(e,t,r,a,i,s,n,u,h,d,o){var f=e([o],{declaredClass:"esri.layers._StreamMode",constructor:function(e,r){this.featureLayer=e,this._featureMap={},this._setRefreshRate(),this._drawBuffer={adds:[],updates:[]},this._timeoutId=null,this._flushDrawBuffer=t.hitch(this,this._flushDrawBuffer),this._featuresByTime={},this._lastEndTimeCheck=null,this._maxFeatureAge=0,e.purgeOptions&&e.purgeOptions.age&&"number"==typeof e.purgeOptions.age&&(this._maxFeatureAge=1e3*Math.ceil(60*e.purgeOptions.age)),this._drawFeatures=t.hitch(this,this._drawFeatures),this._queryErrorHandler=t.hitch(this,this._queryErrorHandler)},startup:function(){this._started||(this.inherited(arguments),this.featureLayer._collection)},propertyChangeHandler:function(e){this._init&&(0===e?this._applyTimeFilter():3===e?this._redrawAllTracks():console.debug("StreamLayer: Stream Layer only supports changing map time or maximumTrackPoints. Layer id = "+this.featureLayer.id))},destroy:function(){this.inherited(arguments),clearTimeout(this._timeoutId),this._featureMap=null,this._drawBuffer=null,this._featuresByTime=null},drawFeature:function(e){var t,r=this.featureLayer,a=r.objectIdField;this._timeoutId||(this._timeoutId=setTimeout(this._flushDrawBuffer,this._refreshRate)),t=r._joinField?this._getFeature(e.attributes[a]):null,t?this._drawBuffer.updates.push({oid:e.attributes[a],updates:e}):this._drawBuffer.adds.push(e)},resume:function(){this.propertyChangeHandler(0)},refresh:function(){this._pendingRequest&&this._cancelPendingRequest(this._pendingRequest);var e=this.featureLayer;e&&(e._relatedUrl||e._keepLatestUrl?(e._fireUpdateStart(),e._refreshing=!0,e.disconnect(),e.clear(),e._relatedQueried=!1,e._keepLatestQueried=!1,e.connect()):(e._fireUpdateStart(),e.clear(),e._fireUpdateEnd()))},_drawFeatures:function(e,t){var r=e.features||[],a=this.featureLayer;a._create(r),a._fireUpdateEnd(null,t)},_applyTimeFilter:function(e){this.inherited(arguments),this._redrawAllTracks()},_removeFeatures:function(e){var t=this.featureLayer,a=t.objectIdField;e&&r.forEach(e,function(e){var r=e.attributes[a];t._unSelectFeatureIIf(r,this),this._decRefCount(r),this._removeFeatureIIf(r)},this)},_addFeatures:function(e){var t,a,i,s,n=this.featureLayer,u=n._endTimeField,h=n._startTimeField,d=[],o=[],f=[];if(t=n._trackManager,i=n.objectIdField,t){a=t.addFeatures(e);for(s in a)a.hasOwnProperty(s)&&(d.push(s),a[s].adds&&(o=o.concat(a[s].adds)),a[s].deletes&&(f=f.concat(a[s].deletes)))}else o=e;r.forEach(o,function(e){var t,r,a=e.attributes[i];t=u&&e.attributes[u],!t&&this._maxFeatureAge&&(t=h&&e.attributes[h]?e.attributes[h]+this._maxFeatureAge:Date.now()+this._maxFeatureAge),t&&(r=1e3*Math.ceil(t/1e3),this._featuresByTime[r]?this._featuresByTime[r].push(a):this._featuresByTime[r]=[a]),this._addFeatureIIf(a,e),this._incRefCount(a)},this),f.length&&this._removeFeatures(f),t&&t.refreshTracks(d)},_updateFeatures:function(e){var t,a,i,s=this.featureLayer,n=[];t=s._trackManager,a=s.objectIdField,i=s._trackIdField,r.forEach(e,function(e){var r,a,u=e.updates,h=e.oid,d=this._getFeature(h);if(d){u.geometry&&d.setGeometry(u.geometry),r=u.attributes||{};for(a in r)r.hasOwnProperty(a)&&(d.attributes[a]=r[a]);d.setAttributes(d.attributes),d.visible=this._checkFeatureTimeIntersects(d),t&&d.attributes[i]?n.push(d.attributes[i]):s._repaint(d,null,!0)}},this),n.length&&t.refreshTracks(n)},_redrawAllTracks:function(){var e,t=this.featureLayer,r=t._trackManager;r&&(e=r.trimTracks(),e&&e.length>0&&(this._removeFeatures(e),r.refreshTracks()))},_flushDrawBuffer:function(){clearTimeout(this._timeoutId);var e,t=this._drawBuffer,r=t.adds.splice(0,t.adds.length),a=t.updates.splice(0,t.updates.length),i=this.featureLayer;return i?(i.updating||i._fireUpdateStart(),this._addFeatures(r),this._updateFeatures(a),e=this._getExpiredFeatures(),e&&e.length&&(this._removeFeatures(e),i._trackManager&&i._trackManager.removeFeatures(e)),i._purge(),i._fireUpdateEnd(),void(this._timeoutId=null)):!1},_clearDrawBuffer:function(){var e=this._timeoutId,t=this._drawBuffer,r=t.adds,a=t.updates;e&&clearTimeout(e),r.splice(0,r.length),a.splice(0,a.length),this._timeoutId=null},_clearTimeBin:function(){this._featuresByTime={},this._lastEndTimeCheck=1e3*Math.ceil(Date.now()/1e3)},_clearFeatureMap:function(){this._featureMap={}},_setRefreshRate:function(e){e=e||0===e?e:200,0>e&&(e=200),this._refreshRate=e},_checkFeatureTimeIntersects:function(e){var t,r=this.featureLayer,a=r.getMap(),i=a?a.timeExtent:null;return i&&r.timeInfo&&(r.timeInfo.startTimeField||r.timeInfo.endTimeField)?(t=r._filterByTime([e],i.startTime,i.endTime),t.match.length>0):!0},_fetchArchive:function(e){var t,r,i,s,o,f,l,_=new a,c=this.featureLayer;return this._pendingRequest&&this._cancelPendingRequest(this._pendingRequest),c._fireUpdateStart(),e&&this.map?(t=new h(e),r=new u,i=this.map,s=c.getFilter()||{},o=s.where||"1=1",f=s.geometry?d.fromJson(s.geometry):null,l=s.outFields?s.outFields.split(","):["*"],r.geometry=f,r.where=o,r.outFields=l,r.returnGeometry=!0,r.outSpatialReference=new n(i.spatialReference.toJson()),this._pendingRequest=t.execute(r).then(function(e){this._pendingRequest=null;var t=this._fixFieldNameCasing(c,e);e.features=t,this._drawFeatures(e),c._fireUpdateEnd(),_.resolve()}.bind(this)).otherwise(function(e){this._pendingRequest=null,c._errorHandler(e),c._fireUpdateEnd(e),_.reject(e)}.bind(this))):_.resolve(),_.promise},_queryErrorHandler:function(e){var t=this.featureLayer;t._errorHandler(e),t._fireUpdateEnd(e)},_fixFieldNameCasing:function(e,t){var r=t.features||[],a=t.fields,i=e.fields;if(!a||!r.length)return r;for(var s,n,u=this._mapFieldNameDifferences(i,a),h=[],d=0,o=t.features.length;o>d;d++)s=r[d],n=this._swizzleResponseAttributes(s.attributes,u),h.push({geometry:s.geometry,attributes:n});return h},_mapFieldNameDifferences:function(e,t){var r,a,i=[],s={};for(r=0,a=t.length;a>r;r++)i.push(t[r].name);for(r=0,a=e.length;a>r;r++){var n=e[r].name,u=this._checkForStreamFieldName(n,i);u&&(s[u]=n)}return s},_checkForStreamFieldName:function(e,t){for(var r,a=e.toLowerCase(),i=0,s=t.length;s>i;i++)if(t[i].toLowerCase()===a){r=t[i];break}return r},_swizzleResponseAttributes:function(e,t){var r={};for(var a in e)if(e.hasOwnProperty(a)){var i=e[a];t.hasOwnProperty(a)?r[t[a]]=i:r[a]=i}return r},_getExpiredFeatures:function(){var e,t,a,i,s=this.featureLayer,n=s._endTimeField,u=[],h=[];if(!n&&!this._maxFeatureAge)return h;if(e=1e3*Math.floor(this._lastEndTimeCheck/1e3),t=1e3*Math.ceil(Date.now()/1e3),this._lastEndTimeCheck=t,e&&e!==t)for(i=this._featuresByTime,a=e;t>=a;a+=1e3)i[a]&&(u=u.concat(i[a]),delete i[a]);return r.forEach(u,function(e){var t=this._getFeature(e);t&&h.push(t)},this),h}});return i("extend-esri")&&t.setObject("layers._StreamMode",f,s),f});
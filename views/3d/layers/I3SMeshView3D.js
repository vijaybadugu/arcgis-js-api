// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.12/esri/copyright.txt for details.

define(["require","exports","../../../core/tsSupport/assignHelper","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/tsSupport/generatorHelper","../../../core/tsSupport/awaiterHelper","../../../Color","../../../Graphic","../../../core/asyncUtils","../../../core/Collection","../../../core/Evented","../../../core/HandleOwner","../../../core/has","../../../core/iteratorUtils","../../../core/Logger","../../../core/mathUtils","../../../core/maybe","../../../core/Promise","../../../core/promiseUtils","../../../core/requireUtils","../../../core/scheduling","../../../core/string","../../../core/typedArrayUtil","../../../core/unitUtils","../../../core/watchUtils","../../../core/workers","../../../core/accessorSupport/decorators","../../../core/libs/gl-matrix-2/mat4f64","../../../core/libs/gl-matrix-2/vec3","../../../core/libs/gl-matrix-2/vec3f64","../../../geometry/support/aaBoundingBox","../../../layers/graphics/controllers/I3SOnDemandController","../../../renderers/visualVariables/support/visualVariableUtils","../../../support/arcadeUtils","../../../symbols/Symbol3D","../../../symbols/support/unitConversionUtils","./SceneLayerWorker","./graphics/graphicUtils","./i3s/Highlights","./i3s/I3SElevationProvider","./i3s/I3SProjectionUtil","./i3s/I3SUtil","./i3s/IDBCache","./support/attributeUtils","./support/edgeUtils","./support/layerViewUpdatingProperties","./support/symbolColorUtils","../support/mathUtils","../support/orientedBoundingBox","../support/projectionUtils","../support/buffer/glUtil","../webgl-engine/Stage","../webgl-engine/lib/Geometry","../webgl-engine/lib/Layer","../webgl-engine/lib/Object3D","../webgl-engine/lib/PreinterleavedGeometryData","../webgl-engine/lib/Texture","../webgl-engine/lib/Util","../webgl-engine/lib/TextureBackedBuffer/BufferManager","../webgl-engine/materials/component/index","module"],function(e,t,r,n,i,o,a,s,l,d,u,c,h,p,g,f,y,m,_,b,v,C,x,I,O,w,S,M,E,D,T,A,j,V,R,P,G,F,N,U,B,L,k,H,q,K,z,W,J,Y,X,Q,Z,$,ee,te,re,ne,ie,oe,ae,se){function le(e,t){for(var r=0,n=e;r<n.length;r++){var i=n[r];if(m.isSome(i)&&i.i3sTexId===t)return i}return null}function de(e){return m.isSome(e)&&I.isArrayBuffer(e.data)}function ue(e,t){for(var r=1024,n=0,i=e;n<i.length;n++){var o=i[n];r+=o.interleavedVertexData.byteLength+(o.indices?o.indices.byteLength:0),r+=o.positionData.data.byteLength+o.positionData.indices.byteLength}if(m.isSome(t))for(var a=0,s=t;a<s.length;a++){var l=s[a];m.isSome(l)&&I.isArrayBuffer(l.data)&&(r+=l.data.byteLength)}return r}function ce(e,t){return t.byteSize>me?(pe.warn("Node is too big to store in IndexedDB cache: "+e.id+" ("+t.byteSize+" bytes)"),!1):t.byteSize>0}Object.defineProperty(t,"__esModule",{value:!0});var he=Z.ModelContentType,pe=f.getLogger("esri.views.3d.layers.SceneLayerView3D"),ge=[1,1,1,1],fe=[.8,.8,.8],ye=function(){function e(){}return e}(),me=104857600,_e=function(t){function s(){var e=null!==t&&t.apply(this,arguments)||this;return e._layerUid="",e._highlights=new U(e),e._elevationProvider=null,e._worker=new F,e._workerThread=null,e._nodeId2Meta=new Map,e._addTasks=new Map,e._rendererVersion=0,e._rendererFields=null,e._colorVariable=null,e._opacityVariable=null,e._symbolInfos=new Map,e._idbCache=new H.IDBCache("esri-scenelayer-cache","geometries"),e._cancelCount=0,e._hasColors=!1,e._hasTextures=!1,e._hasData=!1,e.slicePlaneEnabled=!1,e._layerUrl="",e._cacheKeySuffix=null,e._tmpAttributeOnlyGraphic=new l(null,null,{}),e}return n(s,t),Object.defineProperty(s.prototype,"hasTexturesOrVertexColors",{get:function(){return this._hasData?this._hasTextures||this._hasColors?"yes":"probably-not":"unknown"},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"rendererNeedsTextures",{get:function(){return k.rendererNeedsTextures(this._currentRenderer)},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"elevationOffset",{get:function(){var e=null!=this.layer?this.layer.elevationInfo:null;if(null!=e&&"absolute-height"===e.mode){var t=O.getMetersPerVerticalUnitForSR(this.layer.spatialReference),r=G.getMetersPerUnit(e.unit);return(e.offset||0)*r/t}return 0},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"uncompressedTextureDownsamplingEnabled",{get:function(){return this.view.qualitySettings.sceneService.uncompressedTextureDownsamplingEnabled&&!this.useCompressedTextures},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"useCompressedTextures",{get:function(){var e=this.layer.version,t=!p("trident")||e.major>1||1===e.major&&e.minor>3;return this.view._stage.renderView.has("s3tc")&&t},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"_enableMipMaps",{get:function(){return!this.uncompressedTextureDownsamplingEnabled},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"_enableAtlasMipMaps",{get:function(){return this._enableMipMaps},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"_atlasBiasCompensationEnabled",{get:function(){return this.view&&this.view._stage&&!this.view._stage.renderView.has("shaderTextureLOD")&&this._enableAtlasMipMaps},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"_disableAtlasAnisotropy",{get:function(){return this._atlasBiasCompensationEnabled},enumerable:!0,configurable:!0}),s.prototype.initialize=function(){var t=this;if(S.open(v.getAbsMid("./SceneLayerWorker",e,se)).then(function(e){t.destroyed?e.close():t._workerThread=e}),k.checkSceneLayerValid(this.layer),k.checkSceneLayerCompatibleWithView(this.layer,this.view),this._layerUid=this.layer.uid,this._layerUrl=this.layer.parsedUrl.path,this._controller=new j({layerView:this}),this.gpuMemoryEstimate=0,this.texMemoryEstimate=0,this.geoMemoryEstimate=0,this._stage=this.view._stage,this._isIntegratedMesh||!this.layer.store.defaultGeometrySchema)this._hasSymbolColors=!1;else{var r=this.layer.store.defaultGeometrySchema.featureAttributes;this._hasSymbolColors=!!(r&&r.faceRange&&r.id)}this._hasVertexColors=null!=this.layer.store.defaultGeometrySchema.vertexAttributes.color&&(null==this.layer.cachedDrawingInfo||!this.layer.cachedDrawingInfo.color),this._isIntegratedMesh||(this._edgeView=this._stage.renderView.ensureEdgeView()),this._memCache=this.view.resourceController.memoryController.getMemCache(this.layer.uid,function(e){return t._deleteNodeStageData(e)}),this._addThisLayerToStage(),this._elevationProvider=new B({layerView:this,stageLayer:this._stageLayer}),this.handles.add([w.init(this.view,"clippingArea",function(){return t._clippingAreaChanged()}),w.watch(this,"fullOpacity",function(e){return t._opacityChange(e)}),w.watch(this,"slicePlaneEnabled",function(e){return t._slicePlaneEnabledChange(e)}),w.watch(this,"elevationOffset",function(e,r){return t._reloadAll(r)}),w.init(this,"filter",function(){return t._filterChange()}),w.watch(this,["rendererNeedsTextures","uncompressedTextureDownsamplingEnabled"],function(){t._reloadAll(),t._memCache.clear()}),w.init(this,"suspended",function(e){return t._suspendedChange(e)})],"sceneLayerHandles"),this._cacheKeySuffix=k.getCacheKeySuffix(this.layer.spatialReference,this.view.renderSpatialReference),this._idbCache.init().catch(function(e){return pe.warn("Failed to initialize IndexedDB cache: "+e)}),this._componentColorManager=this._hasSymbolColors?new oe.BufferManager(this._stage.renderView.renderingContext):null},s.prototype.destroy=function(){this.handles.remove("sceneLayerHandles"),this._workerThread&&(this._workerThread.close(),this._workerThread=null),this._removeAllNodeDataFromStage(),this._memCache.destroy(),this._memCache=null,this._removeThisLayerFromStage(),this._stage=null,this._idbCache&&(this._idbCache.destroy(),this._idbCache=null),null!=this._controller&&(this._controller.destroy(),this._controller=null),this._highlights.destroy(),this._nodeId2Meta=null,this.emit("visible-geometry-changed"),this._visibleGeometryChangedSchedulerHandle&&(this._visibleGeometryChangedSchedulerHandle.remove(),this._visibleGeometryChangedSchedulerHandle=null)},s.prototype.memEstimateTextureAdded=function(e){var t=e.getEstimatedTexMemRequired();return this.gpuMemoryEstimate+=t,this.texMemoryEstimate+=t,t},s.prototype.memEstimateTextureRemoved=function(e){var t=e.getEstimatedTexMemRequired();this.gpuMemoryEstimate-=t,this.texMemoryEstimate-=t},s.prototype.memEstimateGeometryAdded=function(e){var t=e.estimateGpuMemoryUsage();return this.gpuMemoryEstimate+=t,this.geoMemoryEstimate+=t,t},s.prototype.memEstimateGeometryRemoved=function(e){var t=e.estimateGpuMemoryUsage();this.gpuMemoryEstimate-=t,this.geoMemoryEstimate-=t},s.prototype.isNodeLoaded=function(e){return this._nodeId2Meta.has(e)},s.prototype.getUsedMemory=function(){var e=0;return this._nodeId2Meta.forEach(function(t){return e+=t.node.memory}),e},s.prototype.getUnloadedMemory=function(){return this._controller?this._controller.unloadedMemoryEstimate:0},s.prototype.ignoresMemoryFactor=function(){return!1},s.prototype._suspendedChange=function(e){e?(this._removeAllNodeDataFromStage(),this.view.elevationProvider.unregister(this._elevationProvider)):this.view.elevationProvider.register(this._elevationContext,this._elevationProvider)},s.prototype.getStats=function(){var e={index:0,nodes:this._nodeId2Meta.size.toString(),"Total GPU Memory Estimate":(this.gpuMemoryEstimate/1048576).toFixed(1)+"MB","Geometry Memory Estimate":(this.geoMemoryEstimate/1048576).toFixed(1)+"MB","Texture Memory Estimate":(this.texMemoryEstimate/1048576).toFixed(1)+"MB"};return this._controller&&(this._cachingEnabled()&&(e.IDBCache=Math.round(100*this._idbCache.getHitRate())+"% hit"),this._controller.updateStats(e)),e},s.prototype._addThisLayerToStage=function(){for(var e=this._stage,t=new Uint8Array(256),r=0;r<t.length;r++)t[r]=255;var n=""+this.layer.uid,i=new ee(n,{},n);this._stageLayer=i,e.add(he.LAYER,i),this._stage.addToViewContent([i.id])},s.prototype._removeThisLayerFromStage=function(){if(null!=this._stageLayer){var e=this._stage;this._removeAllNodeDataFromStage(),ie.verify(0===this._nodeId2Meta.size),e.remove(he.LAYER,this._stageLayer.id),this._stageLayer=void 0,this.gpuMemoryEstimate=0}},s.prototype.getLoadedAttributes=function(e){var t=this._nodeId2Meta.get(e);if(t&&t.attributeInfo)return t.attributeInfo.loadedAttributes},s.prototype.getAttributeData=function(e){var t=this._nodeId2Meta.get(e);if(t&&t.attributeInfo)return t.attributeInfo.attributeData},s.prototype.setAttributeData=function(e,t){var r=this._nodeId2Meta.get(e);r&&(r.attributeInfo=t,r.cachedRendererVersion=this._getInvalidRendererVersion(),r.filteredIds=null,this._updateEngineObject(r))},s.prototype.getLoadedNodeIds=function(){var e=[];return this._nodeId2Meta.forEach(function(t){return e.push(t.node.id)}),e.sort()},s.prototype.getLoadedNodeIndices=function(e){this._nodeId2Meta.forEach(function(t,r){return e.push(r)})},s.prototype._calcEngineMaterialTransparencyParams=function(e,t,r){if(this._isIntegratedMesh)return{forceTransparency:!1};var n=this.fullOpacity,i=1-y.clamp(ie.fallbackIfUndefined(t.transparency,0),0,1);return{baseColorOpacity:i,layerOpacity:n,forceTransparency:!!(i<1||n<1||e&&x.endsWith(e.channels,"a")||!0===t.useVertexColorAlpha||r)}},s.prototype._calcEngineMaterialDoubleSidedParams=function(e){return null==e.doubleSided||e.doubleSided},s.prototype._calcEngineMaterialCullFaceParams=function(e){return e.cullFace?e.cullFace:null!=e.doubleSided?e.doubleSided?"none":"back":"none"},s.prototype._getMaterialParameters=function(e,t,n){var i=t.params,o=ie.fallbackIfUndefined(i.diffuse,fe);"standard"!==t.type&&pe.warn("Unknown material type '"+t.type+"', must be 'standard'");var a=this._isIntegratedMesh,s=this._calcEngineMaterialTransparencyParams(e,i);return r({baseColor:o,baseColorTexture:n,doubleSidedShading:this._calcEngineMaterialDoubleSidedParams(i),cullFace:this._calcEngineMaterialCullFaceParams(i),writeStencil:a,receiveSSAO:!a,normals:a?"ground":"vertex"},s)},s.prototype._getGeometryParameters=function(e){return{textureCoordinates:e.hasTexture,textureCoordinateRegions:e.hasTexture&&e.hasRegions,colors:this._hasVertexColors,componentData:this._hasSymbolColors,normals:this._isIntegratedMesh?"none":e.hasNormals?"compressed":"screen-space"}},s.prototype._createTexture=function(e,t,r,n,i){if(null==t||m.isNone(n))return null;var o=le(n,r),a=o.data,s=o.encoding;if(null==a)return null;var l,d="none"!==t.wrap[0]||"none"!==t.wrap[1],u="rgba"===t.channels,c=!0;if(s===k.DDS_ENCODING_STRING)l=ne.DDS_ENCODING;else{var h=a;c=J.isPowerOfTwo(h.width)&&J.isPowerOfTwo(h.height)}var p=i||!0===t.atlas,g=(p?this._enableAtlasMipMaps:this._enableMipMaps)&&c,f=p||!d,y=p&&g&&this._disableAtlasAnisotropy,_=f?{s:33071,t:33071}:{s:10497,t:10497},b={mipmap:g,wrap:_,disableAnisotropy:y,encoding:l,noUnpackFlip:!0,components:u?4:3},v=new ne(a,r,b);return this._stage.add(he.TEXTURE,v),e.memory+=this.memEstimateTextureAdded(v),v},s.prototype._getVertexBufferLayout=function(e,t,r){var n=e.params.textureID||"none",i={hasTexture:"none"!==n&&null!=t.textureDefinitions[n],hasNormals:null!=r.vertexAttributes.normal,hasRegions:null!=r.vertexAttributes.region};return Q.glLayout(ae.ComponentMaterial.vertexBufferLayout(this._getGeometryParameters(i)))},s.prototype._createEngineMaterial=function(e,t,r,n,i){var o=t.params.materialID,a=r.materialDefinitions[o];ie.assert(void 0!==a,"geometry wants unknown material "+o);var s,l=t.params.textureID||"none";"none"!==l&&(null!=r.textureDefinitions&&null!=r.textureDefinitions[l]||pe.warn("textureDefinitions missing in shared resource"),s=r.textureDefinitions[l]);var d=a.params.vertexRegions,u=null!=s?this._createTexture(e,s,l,n,d):null,c=this._getMaterialParameters(s,a,u&&u.id),h=this._getGeometryParameters({hasTexture:null!=s,hasRegions:i.some(function(e){return"region"===e.name}),hasNormals:i.some(function(e){return"normal"===e.name||"normalCompressed"===e.name})}),p=ae.ComponentMaterial.create(c,h,o);return p.metadata={i3sTex:s,i3sMatParams:a.params,engineTex:u},p},s.prototype._getObjectIdField=function(){return this.layer.objectIdField||"OBJECTID"},s.prototype._findGraphicNodeAndIndex=function(e){var t=q.attributeLookup(e.attributes,this._getObjectIdField()),r=null;return g.everyMap(this._nodeId2Meta,function(e,n){var i=e.featureIds.indexOf(t);return-1===i||(r={node:e.node,index:i},!1)}),r},s.prototype._getGraphicIndices=function(e,t){var r=this._nodeId2Meta.get(e.index);if(!r)return[];for(var n=[],i=this._getObjectIdField(),o=0,a=t;o<a.length;o++){var s=a[o],l=q.attributeLookup(s.attributes,i),d=r.featureIds.indexOf(l);-1!==d&&n.push(d)}return n},s.prototype.whenGraphicBounds=function(e){var t=this._findGraphicNodeAndIndex(e);if(!t)return b.reject();var r=this._nodeId2Meta.get(t.node.index).engineObject,n=this._boundingBoxCornerPoints(t.index,r,new Float64Array(24));if(X.bufferToBuffer(n,this.view.renderSpatialReference,0,n,this.view.spatialReference,0,8)){var i=A.empty();return A.expandWithBuffer(i,n,0,8),b.resolve({boundingBox:i,screenSpaceObjects:[]})}},s.prototype.whenGraphicAttributes=function(e,t){var r=this,n=function(e){for(var t=new Map,n=[],i=0,o=e;i<o.length;i++){var a=o[i],s=r._findGraphicNodeAndIndex(a),l=t.get(s.node);l||(l={node:s.node,indices:[],graphics:[]},n.push(l)),l.indices.push(s.index),l.graphics.push(a)}return n};return k.whenGraphicAttributes(this.layer,e,this._getObjectIdField(),t,n,{ignoreUnavailableFields:!0,populateObjectId:!0})},s.prototype.getGraphicFromStageObject=function(e,t){if(this._isIntegratedMesh)return null;var r=this._getMetadata(e),n=e.getComponentFromTriangleNr(0,t);return null!=n&&null!=r.featureIds&&n<r.featureIds.length?this._createGraphic(n,r):null},s.prototype.hasStageObject=function(e){var t=e.getMetadata(),r=this._nodeId2Meta.get(t.nodeIndex);return r&&r.engineObject===e},s.prototype._getMetadata=function(e){var t=e.getMetadata();return this._nodeId2Meta.get(t.nodeIndex)},s.prototype._getCacheKey=function(e){return this._layerUrl+"/v2/"+e.id+this._cacheKeySuffix},s.prototype._getMemCacheKey=function(e,t){return void 0===t&&(t=this.elevationOffset),e+"#"+t},s.prototype._cachingEnabled=function(){return!this._controller.disableIDBCache&&0===this.elevationOffset&&null!=this._cacheKeySuffix},s.prototype.additionalCancelNodeLoadingHandler=function(){this._cancelCount=k.addWraparound(this._cancelCount,1)},s.prototype._handleCancelled=function(e){if(k.addWraparound(this._cancelCount,-e)>0)throw b.createAbortError()},s.prototype.loadCachedGPUData=function(e){return this._memCache.pop(this._getMemCacheKey(e.index))},s.prototype.loadCachedNodeData=function(e,t){var r=this,n=this._cancelCount;return this._cachingEnabled()?this._idbCache.get(this._getCacheKey(e)).then(function(i){if(null==i)return null;if(r._handleCancelled(n),i.nodeVersion!==e.version)return r._idbCache.remove(r._getCacheKey(e)),null;e.obb||(e.obb=Y.clone(i.nodeObb),r._controller.updateVisibility(e.index));return r.rendererNeedsTextures&&function(e,t){for(var n=0;n<e.length;n++){if(m.isNone(t))return!0;var i=k.selectEncoding(e[n].encodings,r.useCompressedTextures),o=t[n];if(m.isNone(o)||null==o.data||i&&o.encoding!==i.encoding)return!0}return!1}(i.requiredTextures,i.textureData)?t(i.requiredTextures).then(function(t){return i.textureData=t,i.byteSize=ue(i.transformedGeometries,i.textureData),t.every(de)&&ce(e,i)&&r._idbCache.initialized&&r._idbCache.put(r._getCacheKey(e),i).catch(function(t){return pe.warn("Failed to update node with textures in IndexedDB cache: "+e.id+": "+t)}),r._handleCancelled(n),i}):i}):b.resolve(null)},s.prototype.addNodeData=function(e,t){var n=this;return 0===t.allGeometryData.length||0===t.allGeometryData[0].geometries.length?b.resolve():(1!==t.allGeometryData.length&&console.warn("Node with",t.allGeometryData.length,"geometries is unsupported"),this._addData(e,t.attributeDataInfo,function(){return n._transformNode(e,t).then(function(t){return n._controller.reschedule(e.index,t)}).then(function(i){e.obb||(e.obb=i.obb,n._controller.updateVisibility(e.index)),t.allGeometryData[0].componentOffsets=i.componentOffsets,i.featureIds&&(t.allGeometryData[0].featureIds=Array.prototype.slice.call(i.featureIds));var o={geometryData:t.allGeometryData[0],transformedGeometries:i.transformedGeometries,requiredTextures:t.requiredTextures,textureData:t.textureData,sharedResource:t.sharedResource,nodeVersion:e.version,nodeObb:e.obb,byteSize:n._cachingEnabled()?ue(i.transformedGeometries,t.textureData):0};if(ce(e,o)&&n._idbCache.initialized){var a=m.isSome(o.textureData)?o.textureData.map(function(e){return de(e)?e:null}):null;n._idbCache.put(n._getCacheKey(e),r({},o,{textureData:a})).catch(function(t){return pe.warn("Failed to store node in IndexedDB cache: "+e.id+": "+t)})}return n._addCachedNodeData(e,o)})}))},s.prototype._transformNode=function(e,t){for(var r=this,n=t.allGeometryData[0].geometries,i=new Array(n.length),o=0;o<n.length;++o)i[o]=this._getVertexBufferLayout(n[o],t.sharedResource,t.geometryIndex);var a={geometryBuffer:t.geometryBuffer,geometryData:t.allGeometryData[0],geometryIndex:t.geometryIndex,layouts:i,mbs:e.mbs,obb:e.obb,elevationOffset:this.elevationOffset,needNormals:!this._isIntegratedMesh&&this._controller.isMeshPyramid,normalReferenceFrame:this.layer.normalReferenceFrame||"none",indexSR:this._controller.crsIndex.toJSON(),vertexSR:this._controller.crsVertex.toJSON(),renderSR:this.view.renderSpatialReference.toJSON()};return this._workerThread?this._workerThread.invoke("process",a,{transferList:[t.geometryBuffer]}):F.ensureDracoDecoder(a).then(function(){return r._controller.reschedule(e.index,a).then(function(e){return r._worker.transform(e)})})},s.prototype.addCachedGPUData=function(e,t,r){if(!this._controller.isGeometryVisible(e)){var n=this._controller.indexDepth-e.level+1;return void this._memCache.put(this._getMemCacheKey(e.index),t,e.memory,n)}this._nodeId2Meta.set(e.index,t),this.updateNodeStatus(e.index,r),t.engineObject.setHidden(t.engineObject.geometryRecords[0],!1);for(var i=0,o=t.engineObject.getGeometryRecords();i<o.length;i++){o[i].material.updateParameters({slicePlaneEnabled:this.slicePlaneEnabled})}this._updateEngineObject(t),this._highlights.objectCreated(t.engineObject)},s.prototype.addCachedNodeData=function(e,t,r){var n=this;return this._addData(e,r,function(){return n._addCachedNodeData(e,t)})},s.prototype._addCachedNodeData=function(e,t){var r=this;if(this.suspended||!this._controller.isGeometryVisible(e))return b.resolve();var n=t.geometryData,i=t.transformedGeometries,o=t.sharedResource,a=this.rendererNeedsTextures?t.textureData:null,s={};s[he.OBJECT]={},s[he.GEOMETRY]={},s[he.MATERIAL]={};var l=0,d=!1;e.memory=0;var u=n.componentOffsets,c=n.geometries,h=n.featureIds,p=null,g=null;if(this._hasSymbolColors){p=this._componentColorManager.getBuffer(h.length),g=new Uint16Array(h.length);for(var f=0;f<h.length;f++)g[f]=p.acquireIndex()}for(var y,m=e.id+"|"+h[0],_=new Array,v=new Array,C=new Array,x=new Array,I=this.view,O=0,w=c;O<w.length;O++){var S=w[O],M=i[l++],D=this._createEngineMaterial(e,S,o,a,M.layout);y=M.corMatrices.globalTrafo,d=d||M.hasColors;var T=new re(new Float32Array(M.interleavedVertexData),M.layout,M.positionData,u||re.DefaultOffsets,M.indices||re.DefaultIndices);this._hasSymbolColors&&this._setComponentIndices(T,g);var A=null!=S.transformation?E.mat4f64.clone(S.transformation):be,j=_.length,V=m+(j>0?"_"+j:""),R=new $(T,V),P=I.renderSpatialReference;_.push(R),C.push(A),x.push(D);var G=L.createOrigin(e.mbs,this.elevationOffset,this._controller.crsIndex,P);v.push(G),e.memory+=this.memEstimateGeometryAdded(R.data),s[he.MATERIAL][D.id]=D,s[he.GEOMETRY][R.id]=R}var F={nodeIndex:e.index,layerUid:this._layerUid},N=new te({idHint:e.id,name:m,geometries:_,materials:x,transformations:C,origins:v,castShadow:!0,metadata:F});N.objectTransformation=y,s[he.OBJECT][N.id]=N;var U=this._addTasks.get(e.index),B=new ye;B.node=e,B.engineObject=N,B.featureIds=h,B.componentColorBuffer=p,B.componentIndices=g,B.cachedRendererVersion=this._getInvalidRendererVersion(),B.cachedSymbolInfos=[],B.attributeInfo=U.attributeInfo,!this._hasTextures&&e.resources.texture&&(this._hasTextures=!0),this._hasColors||(this._hasColors=d),this._hasData=!0,this.notifyChange("hasTexturesOrVertexColors");var k=this.slicePlaneEnabled;return this._addOrUpdateEdgeRendering(B).then(function(){var t=r._stageLayer,n=r._stage,i=s[he.OBJECT];for(var o in i)i.hasOwnProperty(o)&&t.addObject(i[o]);for(var a in s)if(s.hasOwnProperty(a)){var l=s[a];for(var d in l)l.hasOwnProperty(d)&&null==n.get(a,d)&&n.add(a,l[d])}if(r._nodeId2Meta.set(e.index,B),r.suspended)return void r._removeNodeStageData(e.index);B.attributeInfo=U.attributeInfo,B.cachedRendererVersion===r._rendererVersion&&k===r.slicePlaneEnabled||r._addOrUpdateEdgeRendering(B),r._setObjectSymbology(B),r._applyFiltersToNode(B)&&r._updateEdgeRendering(B),r.visibleGeometryChanged(N),r._highlights.objectCreated(N);for(var u=0,c=B.engineObject.getGeometryRecords();u<c.length;u++){c[u].material.updateParameters({slicePlaneEnabled:r.slicePlaneEnabled})}r._markParentsAsHole(e.index)})},s.prototype._addData=function(e,t,n){var i=this,o=this._addTasks.get(e.index);return o?o.attributeInfo=t:(o=r({},b.createResolver(),{attributeInfo:t}),this._addTasks.set(e.index,o),n().then(o.resolve,o.reject).then(function(){return i._addTasks.delete(e.index)}).catch(function(t){throw i._addTasks.delete(e.index),t})),o.promise},s.prototype._markParentsAsHole=function(e){if(this._isIntegratedMesh)for(var t=this._controller,r=t.getParentIndex(e);r;r=t.getParentIndex(r))this.updateNodeStatus(r,"hole")},s.prototype._clippingAreaChanged=function(){var e=A.create();X.extentToBoundingBox(this.view.clippingArea,e,this.view.renderSpatialReference)?this._clippingArea=e:this._clippingArea=null,this._filterChange(),this._controller&&this._controller.updateClippingArea(this.view.clippingArea)},s.prototype._filterChange=function(){this._applyFilters(!1)},s.prototype._applyFilters=function(e){var t=this;this._filters=this.getFilters(),e?this._controller&&this._controller.requestUpdate():this._nodeId2Meta.forEach(function(e){t._applyFiltersToNode(e)&&(t._addOrUpdateEdgeRendering(e),t.visibleGeometryChanged(e.engineObject))})},s.prototype.getFilters=function(){var e=this,t=[];return this._clippingArea&&t.push(function(t,r){return e._boundingboxFilter(t,r,e._clippingArea)}),t},s.prototype.addSqlFilter=function(e,t,r,n){var i=this;t&&r&&e.push(function(e,o){return i._sqlFilter(e,o,t,r,n)})},s.prototype._sqlFilter=function(e,t,r,n,i){var o={},a=this._createLayerGraphic(o),s=this.layer.objectIdField,l=t.featureIds,d=t.attributeInfo.attributeData;n.every(function(e){return null!=d[e]||e===s})&&k.filterInPlace(e,l,function(e){o[s]=l[e];for(var t=0,u=n;t<u.length;t++){var c=u[t];c!==s&&(o[c]=k.getCachedAttributeValue(d[c],e))}try{return r.testFeature(a)}catch(e){return i(e),!1}})},s.prototype._boundingboxNodeTest=function(e,t){return X.mbsToMbs(e.node.mbs,this._controller.crsIndex,we,this.view.renderSpatialReference),k.intersectBoundingBoxWithMbs(t,we)},s.prototype._boundingboxFeatureTest=function(e,t,r){var n=e.engineObject.geometryRecords[0].geometry;return A.intersects(r,n.getComponentAABB(t,xe))},s.prototype._boundingboxFilter=function(e,t,r){var n=this,i=this._boundingboxNodeTest(t,r);if(3!==i){if(0===i)return void(e.length=0);if(t.engineObject.geometryRecords[0].geometry.componentCount===t.featureIds.length){var o=k.getClipAABB(r,t.engineObject);k.filterInPlace(e,t.featureIds,function(e){return n._boundingboxFeatureTest(t,e,o)})}}},s.prototype._addOrUpdateEdgeRendering=function(e,t){if(void 0===t&&(t=!0),!this._edgeView)return b.resolve();var r=e.engineObject,n=this._edgeView.hasObject(r),i=this._extractObjectEdgeMaterials(e),o=i.hasEdges,a=i.perFeatureEdgeMaterials,s={slicePlaneEnabled:this.slicePlaneEnabled};if(o){var l=!r.isHidden(r.geometryRecords[0]);if(n)this._edgeView.updateAllComponentMaterials(r,a,s,t),this._edgeView.updateObjectVisibility(r,l);else if(l)return d.safeCast(this._edgeView.addObject(r,a,s,!1))}else n&&this._edgeView.removeObject(r);return b.resolve()},s.prototype._removeEdgeRendering=function(e){this._edgeView&&this._edgeView.hasObject(e.engineObject)&&this._edgeView.removeObject(e.engineObject)},s.prototype._applyFiltersToNode=function(e){var t=e.engineObject,r=t.areAllComponentsVisible();if(t.unhideAllComponents(),0===this._filters.length)return!r;var n=e.featureIds;null!=e.filteredIds&&e.appliedFilters===this._filters||(e.filteredIds=this._computeFilteredIds(e),e.appliedFilters=this._filters);var i=e.filteredIds;if(i===n)return!r;for(var o=t.getGeometryRecords()[0],a=0,s=0;s<n.length;s++){var l=n[s];a>=i.length||i[a]!==l?t.setComponentVisibility(o,s,!1):a++}return!0},s.prototype._computeFilteredIds=function(e){for(var t=e.featureIds.slice(),r=0,n=this._filters;r<n.length;r++){(0,n[r])(t,e)}return t.length===e.featureIds.length?e.featureIds:t},s.prototype._removeAllNodeDataFromStage=function(e){var t=this;void 0===e&&(e=this.elevationOffset),this._nodeId2Meta.forEach(function(r,n){return t._removeNodeStageData(n,e)})},s.prototype.removeNodeData=function(e,t){for(;e.length>0&&!t.done;){var r=e.pop();this._removeNodeStageData(r),t.madeProgress()}},s.prototype._removeNodeStageData=function(e,t){void 0===t&&(t=this.elevationOffset);var r=this._nodeId2Meta.get(e);if(r){var n=r.engineObject;n.setHidden(n.geometryRecords[0],!0),this.visibleGeometryChanged(n),this._removeEdgeRendering(r),this._nodeId2Meta.delete(e),this._highlights.objectDeleted(n);var i=this._controller.indexDepth-r.node.level+1;this._memCache.put(this._getMemCacheKey(e,t),r,r.node.memory,i)}},s.prototype._deleteNodeStageData=function(e){var t=this._stage,r=this._stageLayer,n=e.engineObject;this._edgeView&&this._edgeView.removeObject(n),r.removeObject(n);for(var i=0,o=n.getGeometryRecords();i<o.length;i++){var a=o[i];this.memEstimateGeometryRemoved(a.geometry.data),t.remove(he.GEOMETRY,a.geometry.id),this._removeMaterial(a.material,t)}if(e.componentIndices){for(var s=0;s<e.componentIndices.length;s++)e.componentColorBuffer.releaseIndex(e.componentIndices[s]);this._componentColorManager.garbageCollect()}t.remove(he.OBJECT,n.id)},s.prototype._removeMaterial=function(e,t){t.remove(he.MATERIAL,e.id);var r=e.metadata.engineTex;r&&(this.memEstimateTextureRemoved(r),t.remove(he.TEXTURE,r.id))},s.prototype.updateNodeStatus=function(e,t){var r=this._nodeId2Meta.get(e);if(r)for(var n="hole"===t,i=0,o=r.engineObject.getGeometryRecords();i<o.length;i++){var a=o[i],s=a.material;s.updateParameters({polygonOffsetEnabled:!this._isIntegratedMesh&&n,readStencil:!!this._isIntegratedMesh&&n})}},s.prototype._getInvalidRendererVersion=function(){return k.addWraparound(this._rendererVersion,-1)},s.prototype._rendererChange=function(e){return a(this,void 0,void 0,function(){var t,r,n,i,a,s,l,d;return o(this,function(o){switch(o.label){case 0:return this._currentRenderer=e,(this.notifyChange("rendererNeedsTextures"),this._rendererVersion=k.addWraparound(this._rendererVersion,1),this._rendererFields=null,this._colorVariable=null,this._opacityVariable=null,e)?(t=this,r=k.findFieldsCaseInsensitive,[4,e.getRequiredFields(this.layer.fields)]):[3,2];case 1:t._rendererFields=r.apply(void 0,[o.sent(),this.layer.fields]),o.label=2;case 2:if(e&&"visualVariables"in e&&e.visualVariables)for(n=0,i=e.visualVariables;n<i.length;n++)a=i[n],"color"===a.type?this._colorVariable=a:"opacity"===a.type?this._opacityVariable=a:pe.warn("Unsupported visual variable type for 3D Object Scene Services: "+a.type);if(e)for(s=0,l=e.getSymbols();s<l.length;s++)d=l[s],"mesh-3d"!==d.type&&pe.error("Symbols of type '"+d.type+"' are not supported for 3D Object Scene Services.");return this._controller&&this._controller.requestUpdate(),[2]}})})},s.prototype._getSymbolInfos=function(e){return this._hasSymbolColors&&e.cachedRendererVersion!==this._rendererVersion&&this._updateCachedRendererData(e),e.cachedSymbolInfos},s.prototype._getSymbolColors=function(e){return this._hasSymbolColors&&e.cachedRendererVersion!==this._rendererVersion&&this._updateCachedRendererData(e),e.cachedSymbolColors},s.prototype._updateCachedRendererData=function(e){if(e.cachedRendererVersion=this._rendererVersion,this._hasSymbolColors){var t=e.featureIds?e.featureIds.length:1,r={},n=this._tmpAttributeOnlyGraphic;n.attributes=r;var i=this._currentRenderer,o=e.attributeInfo.attributeData,a=null!=e.featureIds?this.layer.objectIdField:null,s=null!=o?this._rendererFields:null;null==e.cachedSymbolColors&&(e.cachedSymbolColors=new Uint8Array(4*e.featureIds.length));for(var l=e.cachedSymbolColors,d=!0,u=0;u<t;u++){if(null!=a&&(r[a]=e.featureIds[u]),null!=s)for(var c=0,h=s;c<h.length;c++){var p=h[c];o[p]&&(r[p]=k.getCachedAttributeValue(o[p],u))}var g=i&&i.getSymbol(n,{arcadeUtils:R}),f=null;g instanceof P&&(this._symbolInfos.has(g.id)||this._symbolInfos.set(g.id,k.getSymbolInfo(g)),f=this._symbolInfos.get(g.id)),e.cachedSymbolInfos[u]=f;var y=null,m=null,_=!0,b=!0;if(i&&"visualVariables"in i){if(this._colorVariable){var v=V.getColor(this._colorVariable,n,{color:Oe});v&&(y=Ie,y[0]=v.r/255,y[1]=v.g/255,y[2]=v.b/255,this._opacityVariable||null===v.a||(m=v.a))}this._opacityVariable&&(m=V.getOpacity(this._opacityVariable,n))}if(f&&f.material){var C=f.material;y=null==y||null==m?N.overrideColor(y,m,C.color,C.alpha,ge,Ie):N.overrideColor(y,m,null,null,ge,Ie),W.encodeSymbolColor(y,C.colorMixMode,l,4*u),_=f.castShadows}else W.encodeSymbolColor(null,null,l,4*u),_=!0;if(u>0&&d){for(var x=4*(u-1);x<4*u;x++)l[x]!==l[x+4]&&(d=!1);_!==b&&(d=!1)}b=_}e.uniformSymbolColor=d}},s.prototype._extractObjectEdgeMaterials=function(e){for(var t=[],r=e.engineObject,n=e.featureIds?e.featureIds.length:1,i={opacity:this.fullOpacity},o=this._edgeView.createSolidEdgeMaterial({color:[0,0,0,0],opacity:0}),a=!1,s=null,l=null,d=this._getSymbolInfos(e),u=0;u<n;u++){var c=d[u];r.getComponentVisibility(r.getGeometryRecords()[0],u)&&c?(l!==c&&(l=c,(s=K.createMaterialFromEdges(this._edgeView,c.edges,i))&&(a=!0)),t.push(m.isSome(s)?s:o)):t.push(o)}return{hasEdges:a,
perFeatureEdgeMaterials:t}},s.prototype._setObjectSymbology=function(e){if(this._hasSymbolColors){var t=e.featureIds?e.featureIds.length:1,r=this._getSymbolColors(e);if(e.uniformSymbolColor){var n=W.decodeSymbolColor(r,0),i=n.color,o=n.colorMixMode,a=!0;e.cachedSymbolInfos[0]&&(a=e.cachedSymbolInfos[0].castShadows);for(var s=0,l=e.engineObject.getGeometryRecords();s<l.length;s++){var d=l[s],u=d.material;u.updateParameters({componentData:{castShadows:a,externalColor:i,externalColorMixMode:o}})}var c=i[3]<1;this._updateObjectOpacity(e.engineObject,c)}else{for(var h=e.componentColorBuffer.textureBuffer,p=!0,g=0;g<t;g++){var f=4*g,y=e.componentIndices[g],m=1;e.cachedSymbolInfos[g]&&(m=!0===e.cachedSymbolInfos[g].castShadows?1:0),h.setData(y,0,r[f],r[f+1],254&r[f+2]|m,r[f+3]),p=p&&W.isOpaqueSymbolColor(r,f)}for(var _=0,b=e.engineObject.getGeometryRecords();_<b.length;_++){var d=b[_],u=d.material;u.updateParameters({componentData:h})}this._updateObjectOpacity(e.engineObject,!p),this._stage.renderView.setNeedsRender()}}},s.prototype._setComponentIndices=function(e,t){for(var r=e.getAttribute(ie.VertexAttrConstants.COMPONENTINDEX),n=r.data,i=r.offsetIdx,o=r.strideIdx,a=e.getIndices(ie.VertexAttrConstants.COMPONENTINDEX),s=0;s<t.length;s++)for(var l=e.componentOffsets[s],d=e.componentOffsets[s+1],u=l;u<d;u++){var c=i+a[u]*o;n[c]=t[s]}},s.prototype._reloadAll=function(e){void 0===e&&(e=this.elevationOffset),this._removeAllNodeDataFromStage(e),null!=this._controller&&this._controller.restartNodeLoading()},s.prototype._opacityChange=function(e){var t=this;this._nodeId2Meta.forEach(function(e){t._updateObjectOpacity(e.engineObject),t._updateEdgeRendering(e)})},s.prototype._updateObjectOpacity=function(e,t){for(var r=0,n=e.getGeometryRecords();r<n.length;r++){var i=n[r],o=i.material,a=o.metadata;void 0!==t&&(a.symbolIsTransparent=t);var s=this._calcEngineMaterialTransparencyParams(a.i3sTex,a.i3sMatParams,a.symbolIsTransparent);o.updateParameters(s)}},s.prototype._updateEngineObject=function(e){this._setObjectSymbology(e),this._applyFiltersToNode(e),this._addOrUpdateEdgeRendering(e),this.visibleGeometryChanged(e.engineObject)},s.prototype._slicePlaneEnabledChange=function(e){var t=this,r={slicePlaneEnabled:e};this._stageLayer.isSliceable=e,this._nodeId2Meta.forEach(function(e){for(var n=0,i=e.engineObject.getGeometryRecords();n<i.length;n++){i[n].material.updateParameters(r)}t._updateEdgeRendering(e,!1)})},s.prototype._updateEdgeRendering=function(e,t){void 0===t&&(t=!0),this._edgeView&&this._edgeView.hasObject(e.engineObject)&&this._addOrUpdateEdgeRendering(e,t)},s.prototype._forAllFeatures=function(e,t,r){var n=this;void 0===r&&(r=0),g.everyMap(this._nodeId2Meta,function(i,o){if(m.isSome(t)){switch(t(i)){case 0:return!1;case 2:return!0}}return 0!==n._forAllFeaturesOfNode(i,e,r)})},s.prototype._forAllFeaturesOfNode=function(e,t,r){void 0===r&&(r=0);var n=e.featureIds,i=e.engineObject.geometryRecords[0],o=2===r&&this._clippingArea?k.getClipAABB(this._clippingArea,e.engineObject):null,a=o?this._boundingboxNodeTest(e,this._clippingArea):3;if(0===a)return 1;for(var s=0;s<n.length;s++){if(e.engineObject.getComponentVisibility(i,s)||1===r||2===r&&(3===a||this._boundingboxFeatureTest(e,s,o))){var l=n[s],d=t(l,s,e,i);switch(d){case 0:return d}}}return 1},s.prototype._createGraphic=function(e,t){var r={};null!=t.featureIds&&(r[this._getObjectIdField()]=t.featureIds[e]);var n=t.attributeInfo.attributeData;if(null!=n)for(var i=0,o=Object.keys(n);i<o.length;i++){var a=o[i];r[a]=k.getCachedAttributeValue(n[a],e)}return this._createLayerGraphic(r)},s.prototype._boundingBoxCornerPoints=function(e,t,r){for(var n=t.geometries[0].getComponentAABB(e,Ce),i=0;i<8;++i)ve[0]=1&i?n[0]:n[3],ve[1]=2&i?n[1]:n[4],ve[2]=4&i?n[2]:n[5],D.vec3.transformMat4(ve,ve,t.objectTransformation),r[3*i]=ve[0],r[3*i+1]=ve[1],r[3*i+2]=ve[2];return r},s.prototype.highlight=function(e,t){var r=this;void 0===t&&(t={});var n=this._highlights;if("number"==typeof e?e=[e]:e instanceof l?e=[e]:e instanceof u&&(e=e.toArray()),Array.isArray(e)&&e.length>0){if(e[0]instanceof l){var i=e,o=i.map(function(e){return q.attributeLookup(e.attributes,r._getObjectIdField())}),a=n.acquireSet(t),s=a.set,d=a.handle;return n.setFeatureIds(s,o),d}if("number"==typeof e[0]){var o=e,c=n.acquireSet(t),s=c.set,d=c.handle;return n.setFeatureIds(s,o),d}}return Se},s.prototype.visibleGeometryChanged=function(e){var t=this;e?this._elevationProvider.objectChanged(e):this._elevationProvider.layerChanged(),null==this._visibleGeometryChangedSchedulerHandle&&(this._visibleGeometryChangedSchedulerHandle=C.schedule(function(){t.emit("visible-geometry-changed"),t._visibleGeometryChangedSchedulerHandle=null}))},s.prototype.test=function(){var e=this;return{controller:this._controller,get visibleObjectIds(){var t=[];return e._forAllFeatures(function(e,r,n,i){return n.engineObject.isHidden(i)||n.engineObject.areAllComponentsHidden()||!n.engineObject.getComponentVisibility(i,r)||t.push(e),1}),t.sort(function(e,t){return e-t}),t},get numNodes(){return e._nodeId2Meta.size}}},i([M.property()],s.prototype,"view",void 0),i([M.property()],s.prototype,"layer",void 0),i([M.property()],s.prototype,"_controller",void 0),i([M.property({dependsOn:["_controller.updating"]})],s.prototype,"updating",void 0),i([M.property({dependsOn:["_controller.rootNodeVisible"]})],s.prototype,"suspended",void 0),i([M.property(z.updatingPercentage)],s.prototype,"updatingPercentage",void 0),i([M.property({readOnly:!0,aliasOf:"_controller.updatingPercentage"})],s.prototype,"updatingPercentageValue",void 0),i([M.property({readOnly:!0})],s.prototype,"hasTexturesOrVertexColors",null),i([M.property({readOnly:!0})],s.prototype,"rendererNeedsTextures",null),i([M.property({readOnly:!0,dependsOn:["layer.elevationInfo"]})],s.prototype,"elevationOffset",null),i([M.property({type:Boolean})],s.prototype,"slicePlaneEnabled",void 0),i([M.property({dependsOn:["view.qualitySettings.sceneService.uncompressedTextureDownsamplingEnabled","useCompressedTextures"]})],s.prototype,"uncompressedTextureDownsamplingEnabled",null),i([M.property({dependsOn:["layer.version"]})],s.prototype,"useCompressedTextures",null),s=i([M.subclass("esri.views.3d.layers.I3SMeshView3D")],s)}(M.declared(h,c,_));t.I3SMeshView3D=_e;var be=E.mat4f64.create(),ve=T.vec3f64.create(),Ce=A.create(),xe=A.create(),Ie=[0,0,0,0],Oe=new s([0,0,0,0]),we=[0,0,0,0],Se={remove:function(){},pause:function(){},resume:function(){}}});
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <div class="w-100 h-100">
    <l-map
      ref="map"
      v-model:zoom="zoom"
      v-model:center="center"
      :use-global-leaflet="false"
      :max-zoom="200"
      @mousemove="(e) => {
        if(!editController.mapMouseMove) {
          return
        }
        editController.mapMouseMove({ event: e, featureList })
      }"
      @click="(e: any) => {
        if(!editController.mapCallback || e.originalEvent.target !== map.$el) {
          return
        }
        editController.mapCallback({
          event: e,
          featureList
        })
      }"

      @mouseup="() => {
        if(!editController.markerMouseUp) {
          return
        }
        editController.markerMouseUp({})
      }"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />
      <div
        v-for="(markerGroup, i) in editController.markerGroupList"
        :key="i"
      >
        <div
          v-for="(marker, j) in markerGroup"
          :key="j"
        >
          <l-circle-marker
            :lat-lng="new LatLng(marker.lat, marker.lng)"
            :radius="5"
            :color="editController.selectedFeatureColor ?? 'blue'"
            :opacity="1"
            :fill-opacity="1"

            @mousedown="(e: any) => {
              if(!editController.markerMouseDown) {
                return
              }
              editController.markerMouseDown({ event: e, marker })
            }"

            @click="(e) => {
              if(!editController.onMarkerClick) {
                return
              }
              editController.onMarkerClick({ event: e, featureList, index: j, markerGroupIndex:i })
            }"
          />
        </div>
      </div>
      <div
        v-for="(lineGroup, i) in editController.lineGroupList"
        :key="i"
      >
        <div
          v-for="(line, j) in lineGroup"
          :key="j"
        >
          <l-polyline
            :color="editController.selectedFeatureColor ?? 'blue'"
            :lat-lngs="line"

            @click="(event) => {
              if(!editController.onLineClick) return
              editController.onLineClick({event, index: j, lineGroupIndex: i, featureList})
            }"
          />
        </div>
      </div>
      <div 
        v-if="featureList"
      >
        <div
          v-for="(feature, i) in featureList"
          :key="i"
        >
          <l-polygon
            v-if="!editController.deletedFeatureIndexList.includes(i)"
            :lat-lngs="feature.geometry.coordinates.map((coordinates: number[][][]) => {
              return coordinates.map((coordinate: number[][]) => {
                return coordinate.map(values => new LatLng(values[1], values[0]))
              })
            })"
            :color="editController.selectedFeatureIndex === i ? editController.selectedFeatureColor : 'blue'"

            @mousedown="(e: any) => {
              if(!editController.featureMouseDown) {
                return
              }
              editController.featureMouseDown({event: e, feature: feature.geometry.coordinates })
            }"
            @mouseup="() => {
              if(!editController.featureMouseUp) {
                return
              }
              editController.featureMouseUp({})
            }"
            @click="(e: any) => {
              e.originalEvent.stopPropagation()
              if(!editController.callback) {
                return
              }
              editController.callback({
                event: e,
                featureList,
                index: i,
                feature: feature.geometry.coordinates
              })
            }"
          />
        </div>
      </div>
    </l-map>
  </div>
</template>

<script setup lang="ts">
// eslint-disable @typescript-eslint/no-explicit-any
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LPolygon, LCircleMarker, LPolyline } from "@vue-leaflet/vue-leaflet"
import { LatLng } from "leaflet";
import type { EditController } from "@/stores/edit-controller";

type Props = {
  editController: EditController
}

const { editController } = defineProps<Props>()

const map = ref<any>()

const zoom = ref(6)
const center = ref<[number, number]>([0, 0])

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resultado = defineModel<any>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const featureList = ref<any[]>([])

editController.$subscribe((_, state) => {
  if(state.locked) {
    map.value.leafletObject.dragging.disable()
    map.value.leafletObject.scrollWheelZoom.disable()
  } else {
    map.value.leafletObject.dragging.enable()
    map.value.leafletObject.scrollWheelZoom.enable()
  }
})

watch([resultado], () => {
  featureList.value = resultado.value.features
  const point = featureList.value[0].geometry.coordinates[0][0][0]
	const latlng = new LatLng(point[1], point[0])
  
	setTimeout(() => {
    center.value = [latlng.lat, latlng.lng]
    zoom.value = 14
	}, 10)
})

</script>
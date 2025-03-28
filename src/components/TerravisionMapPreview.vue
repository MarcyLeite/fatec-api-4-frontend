<template>
	<div class="w-100 h-100">
		<l-map ref="map" v-model:zoom="zoom" :center="center" :use-global-leaflet="false" @click="(e: any) => {
		}">
			<l-tile-layer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				layer-type="base"
				name="OpenStreetMap"
			/>
			<div
				v-if="geojson"
				:key="i"
				v-for="(feature, i) in geojson.features"
			>
				<div
					:key="j"
					v-for="(coordinates, j) in feature.geometry.coordinates"
				>
					<l-polygon
						:lat-lngs="coordinates.map(
							(coordinate: number[][]) => {
								return coordinate.map(values => new LatLng(values[1], values[0]))
							})"
							color="blue"
					>
				
						<l-tooltip>
							<div class="d-flex ga-2 pa-2">
								<div class="d-flex ga-2 flex-column justify-end align-end">
									<div class="font-weight-bold">
										Fazenda:
									</div>
									<div class="font-weight-bold">
										Area:
									</div>
									<div class="font-weight-bold">
										Talhão:
									</div>
									<div class="font-weight-bold">
										Solo:
									</div>
									<div class="font-weight-bold">
										Cultura:
									</div>	
								</div>
								<div class="d-flex ga-2 flex-column">
									<div>
										{{ feature.properties['FAZENDA'] }}
									</div>
									<div>
										{{ feature.properties['AREA_HA_TL'] }}
									</div>
									<div>
										{{ feature.properties['MN_TL'] }}
									</div>
									<div>
										{{ feature.properties['SOLO'] }}
									</div>				
									<div>
										{{ feature.properties['CULTURA'] }}
									</div>
								</div>
							</div>
						</l-tooltip>
					</l-polygon>
				</div>
			</div>
		</l-map>
	</div>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LatLng } from "leaflet";
import { LMap, LTileLayer, LPolygon, LTooltip } from "@vue-leaflet/vue-leaflet"
const zoom = ref(6)

const geojson = defineModel<any>()
const center = ref<[number, number]>([0, 0])

watch(geojson, () => {
	const point = geojson.value.features[0].geometry.coordinates[0][0][0]
	const latlng = new LatLng(point[1], point[0])
	center.value = [latlng.lat, latlng.lng]

	setTimeout(() => {
		zoom.value = 14
	}, 10)
})

</script>
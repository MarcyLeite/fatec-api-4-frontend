<template>
	<div class="w-100 h-100">
		<l-map ref="map" v-model:zoom="zoom" :center="center" :use-global-leaflet="false" @click="(e: any) => {}">
			<l-tile-layer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				layer-type="base"
				name="OpenStreetMap"
			/>
			<div
				v-if="talhao"
				:key="i"
				v-for="(feature, i) in talhao.geojson"
			>
				<div
					:key="j"
					v-for="(coordinates, j) in feature"
				>
					<l-polygon
						:lat-lngs="coordinates.map(value => {
							return new LatLng(value[1], value[0])
						})"
						color="blue"
					>
						<l-tooltip>
							<div class="d-flex ga-2 pa-2">
								<div class="d-flex ga-2 flex-column justify-end align-end">
									<!-- todo: vou tratar como talhão mas talhao.talhao fica redundante -->
									<template v-if="talhao.nome">
										<div class="font-weight-bold">talhão:</div>
									</template>  
									<template v-if="talhao.area">
										<div class="font-weight-bold">Area:</div>
									</template>
									<template v-if="talhao.talhao">
										<div class="font-weight-bold">Talhão:</div>
									</template>
									<template v-if="talhao.solo">
										<div class="font-weight-bold">Solo:</div>
									</template>
									<template v-if="talhao.cultura">
										<div class="font-weight-bold">Cultura:</div>
									</template>	
								</div>
								<div class="d-flex ga-2 flex-column">
									<template v-if="talhao.nome">
										<div>{{ talhao.nome }}</div>
									</template>
									<template v-if="talhao.area">
										<div>{{ talhao.area }}</div>
									</template>
									<template v-if="talhao.talhao">
										<div>{{ talhao.talhao }}</div>
									</template>
									<template v-if="talhao.solo">
										<div>{{ talhao.solo }}</div>
									</template>
									<template v-if="talhao.cultura">
										<div>{{ talhao.cultura }}</div>
									</template>
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

export type TalhaoInMap = {
	nome?: string
	cultura?: string
	area?: string
	talhao?: string
	solo?: string
	geojson: ((([number, number])[])[])[]
}

const zoom = ref(6)

const talhao = defineModel<TalhaoInMap | null>()
const center = ref<[number, number]>([0, 0])

watch(talhao, () => {
	if(!talhao.value) return
	const point = talhao.value.geojson[0][0][0]
	const latlng = new LatLng(point[1], point[0])
	center.value = [latlng.lat, latlng.lng]

	setTimeout(() => {
		zoom.value = 14
	}, 10)
})
</script>
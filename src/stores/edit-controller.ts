import { LatLng, marker, point } from "leaflet"
import { defineStore } from "pinia"

type Coords = [number, number]
type CoordsGroup = Coords[]
type Feature = CoordsGroup[][]
type Callback = (props: {
	event?: any
	featureList?: Feature[],
	index?: number
	feature?: Feature
	marker?: LatLng
	lineGroupIndex?: number
	markerGroupIndex?: number
}) => void


export const useMapEditStore = defineStore('mapEdit', () => {
	const featureOption = ref<number>()

	const locked = ref(false)

	const markerGroupList = ref<LatLng[][]>([])
	const lineGroupList = ref<[LatLng, LatLng][][]>([])
	
	const selectedFeatureColor = ref<string>()
	const selectedFeatureIndex = ref<number>()
	const selectedFeature = ref<Feature>()
	const selectedMarker = ref<LatLng>()

	const deletedFeatureIndexList = ref<number[]>([])
	
	const clickPoint = ref<LatLng>()
	
	const mapCallback = ref<Callback>()
	const callback = ref<Callback>()
	const onMarkerClick = ref<Callback>()
	
	const markerMouseUp = ref<Callback>()
	const markerMouseDown = ref<Callback>()

	const onLineClick = ref<Callback>()

	const featureMouseUp = ref<Callback>()
	const featureMouseDown = ref<Callback>()
	const mapMouseMove = ref<Callback>()
	
	const buildLine = () => {
		const lineGroup: [LatLng, LatLng][][] = []
		for(const markerGroup of markerGroupList.value) {
			let lastMarker: LatLng | undefined = undefined
			const lineList: [LatLng, LatLng][] = []

			for(const marker of markerGroup) {
				if(lastMarker) {
					lineList.push([lastMarker, marker])
				}
				lastMarker = marker
			}
			lineGroup.push(lineList)
		}
		lineGroupList.value = lineGroup
	}

	const buildFeature = (featureList: any) => {
		if(!selectedFeature.value) return
		selectedFeature.value = [markerGroupList.value.map((markerGroup) => 
			markerGroup.map(point => [point.lng, point.lat])
		)]

		featureList[selectedFeatureIndex.value ?? 0].geometry.coordinates = selectedFeature.value
	}


	const updatePointOption = (optionId?: number) => {
		markerGroupList.value = []
		lineGroupList.value = []

		selectedFeatureColor.value = '#2e86c1'
		selectedMarker.value = undefined

		callback.value = undefined
		mapCallback.value = undefined
		onMarkerClick.value = undefined

		onLineClick.value = undefined

		markerMouseUp.value = undefined
		markerMouseDown.value = undefined

		featureMouseUp.value = undefined
		featureMouseDown.value = undefined
		mapMouseMove.value = undefined

		locked.value = false

		locked.value = false
		
		switch (optionId) {
			case 0:
				setTimeout(() => {
					createFeatureMarkers()
				}, 1)

				markerMouseDown.value = startMovingMarker
				markerMouseUp.value = stopMovingMarker
				mapMouseMove.value = moveMarker
				break
			case 1:
				callback.value = addMarker
				onMarkerClick.value = confirmCutting
				break
			case 2:
				createFeatureMarkers()
				buildLine()
				onLineClick.value = addPoint
				break
			case 3:
				createFeatureMarkers()
				onMarkerClick.value = deletePoint
				break
		}
	}

	const updateFeatureOption = (featureId: number | undefined) => {
		featureOption.value = featureId

		markerGroupList.value = []
		lineGroupList.value = []

		selectedFeatureColor.value = 'blue'
		selectedFeatureIndex.value = undefined
		selectedFeature.value = undefined
		selectedMarker.value = undefined

		callback.value = undefined
		mapCallback.value = undefined
		onMarkerClick.value = undefined

		onLineClick.value = undefined

		markerMouseUp.value = undefined
		markerMouseDown.value = undefined

		featureMouseUp.value = undefined
		featureMouseDown.value = undefined
		mapMouseMove.value = undefined

		locked.value = false
		
		switch (featureId) {
			case 0:
				callback.value = selectFeature
				selectedFeatureColor.value = '#2e86c1'

				break
			case 1:
				mapCallback.value = addMarker
				onMarkerClick.value = confirmAdd
				selectedFeatureColor.value = '#a04000'
				break
			case 2:
				callback.value = deleteCallback
				selectedFeatureColor.value = '#e74c3c'
				break
			case 3:
				featureMouseDown.value = startMovingFeature
				mapMouseMove.value = moveFeature
				featureMouseUp.value = stopMovingFeature
				break
		}
	}

	const selectFeature: Callback = ({ feature, index }) => {
		selectedFeatureIndex.value = index
		selectedFeature.value = feature
	}

	const createFeatureMarkers = () => {
		if(!selectedFeature.value) return
		const markers = selectedFeature.value.map((coordinates) => {
			return coordinates.map((coordinate) => {
				return coordinate.map((point) => new LatLng(point[1], point[0]))
			})
		})

		markerGroupList.value = markers[0]
	}

	const moveMarker: Callback = ({ event, featureList }) => {
		if(clickPoint.value === undefined || selectedMarker.value === undefined || markerGroupList.value === undefined || !featureList) return
		const point = event.latlng
		const diff = {
			lat: point.lat - clickPoint.value.lat,
			lng: point.lng - clickPoint.value.lng
		}

		selectedMarker.value.lat += diff.lat
		selectedMarker.value.lng += diff.lng

		for(const markerGroup of markerGroupList.value) {
			if([0, markerGroup.length-1].includes(markerGroup.indexOf(selectedMarker.value))) {
				markerGroup[0].lat = selectedMarker.value.lat
				markerGroup[0].lng = selectedMarker.value.lng
				markerGroup[markerGroup.length-1].lat = selectedMarker.value.lat
				markerGroup[markerGroup.length-1].lng = selectedMarker.value.lng
			}
		}

		buildLine()
		buildFeature(featureList)
		clickPoint.value = point
	}

	const startMovingMarker: Callback = ({ event, marker }) => {
		locked.value = true
		
		clickPoint.value = event.latlng
		selectedMarker.value = marker


	}

	const stopMovingMarker: Callback = () => {

		locked.value = false
		clickPoint.value = undefined
		selectedMarker.value = undefined
	}

	const moveFeature: Callback = ({ event }) => {
		if(clickPoint.value === undefined || selectedFeature.value === undefined) return
		const point = event.latlng
		const diff = {
			lat: point.lat - clickPoint.value.lat,
			lng: point.lng - clickPoint.value.lng
		}

		for (const coordinates of selectedFeature.value) {
			for (const coordinate of coordinates) {
				for (const point of coordinate) {

					point[0] = point[0] + diff.lng
					point[1] = point[1] + diff.lat
				}
			}
		} 

		clickPoint.value = point
	}

	const startMovingFeature: Callback = ({ event, feature }) => {
		locked.value = true
			
		clickPoint.value = event.latlng
		selectedFeature.value = feature
	}

	const stopMovingFeature: Callback = () => {
		locked.value = false
		clickPoint.value = undefined
		selectedFeature.value = undefined
	}

	const addMarker: Callback = ({ event }) => {
		markerGroupList.value = [[...(markerGroupList.value[0] ?? []), event.latlng]]
		buildLine()
	}

	const confirmCutting: Callback = ({ index, featureList }) => {
		if (index !== 0 || !featureList || selectedFeatureIndex.value === undefined) {
			return
		}
		featureList[selectedFeatureIndex.value].geometry.coordinates[0].push([
			...markerGroupList.value[0].map(value => {
			const p = point(value.lng, value.lat)
			return [p.x, p.y]
		}),
		(() => {
			const value = markerGroupList.value[0][markerGroupList.value[0].length - 1]
			const p = point(value.lng, value.lat)
			return [p.x, p.y]
		})()
	])

		markerGroupList.value = []
		lineGroupList.value = []
	}

	const addPoint: Callback = ({ event, index, lineGroupIndex, featureList }) => {
		if(lineGroupIndex === undefined || index === undefined) return

		const line = lineGroupList.value[lineGroupIndex][index]
		const firstPoint = line[0]

		console.log(event)

		for(let i = 0; i < markerGroupList.value[lineGroupIndex].length; i++) {
			const marker = markerGroupList.value[lineGroupIndex][i]
			if(firstPoint.lat !== marker.lat || firstPoint.lng !== marker.lng) {
				continue
			}

			markerGroupList.value[lineGroupIndex].splice(i + 1, 0, event.latlng)
			break
		}
		markerGroupList.value = [... markerGroupList.value]
		buildLine()
		buildFeature(featureList)
	}

	const confirmAdd: Callback = ({ index, featureList }) => {
		if (index !== 0) {
			return
		}
		
		featureList.push({
			geometry: {
				coordinates: 
				[ 
					markerGroupList.value.map(markerGroup => {
						return [...markerGroup.map(value => {
							const p = point(value.lng, value.lat)
							return [p.x, p.y]
						}), (() => {
							const value = markerGroup[markerGroup.length - 1]
							const p = point(value.lng, value.lat)
							return [p.x, p.y]
						})()]
					})

				]
			}
		})

		markerGroupList.value = []
		lineGroupList.value = []
	}

	const deletePoint: Callback = ({ index, markerGroupIndex, featureList }) => {
		const group = markerGroupList.value[markerGroupIndex ?? 0]

		group.splice(index ?? 0, 1)

		if(group.length <= 2) {
			markerGroupList.value.splice(markerGroupIndex ?? 0)
		}
		
		markerGroupList.value = [...markerGroupList.value]


		buildLine()
		buildFeature(featureList)
	}

	const deleteCallback: Callback = ({ index }) => {
		if(index !== selectedFeatureIndex.value) {
			selectedFeatureIndex.value = index
		} else {
			deletedFeatureIndexList.value = [...deletedFeatureIndexList.value, index!]
			selectedFeatureIndex.value = undefined
		}
	}

	return {
		markerGroupList,
		lineGroupList,
		deletedFeatureIndexList,
		selectedFeatureColor,
		selectedFeatureIndex,
		featureOption,
		mapCallback,
		callback,
		onMarkerClick,
		featureMouseUp,
		featureMouseDown,
		onLineClick,
		markerMouseUp,
		markerMouseDown,
		mapMouseMove,
		updateFeatureOption,
		updatePointOption,
		locked
	}
})

export type EditController = ReturnType<typeof useMapEditStore>
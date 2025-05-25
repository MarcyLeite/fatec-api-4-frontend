<template>
  <div class="h-100 d-flex flex-grow-1">
    <div>
      <v-sheet width="18rem" class="pa-8 h-100">
        <div class="d-flex flex-column justify-space-between h-100">
          <div>
            <div>Missão:</div>
            <v-autocomplete
              v-model:model-value="selectedMissao"
              :items="missaoList.map((e) => e.id)"
            />
            <div>Talhão</div>
            <v-autocomplete
              v-model:model-value="selectedTalhao"
              :items="talhaoList ?? []"
            />
          </div>
          <div
            v-if="
              !editController.enabled &&
              selectedMissao !== null &&
              resultFrom === 'ai'
            "
            class="d-flex ga-2 flex-column"
          >
            <div class="d-flex w-100">
              <v-btn
                class="w-100"
                color="deep-purple-darken-1"
                @click="
                  () => {
                    editController.toggleEnable(true);
                  }
                "
              >
                Editar
              </v-btn>
            </div>
            <div class="d-flex ga-2">
              <v-btn
                color="red-darken-4"
                @click="
                  () => {
                    axios.post(
                      `http://localhost:8080/relatorio/salvar?token=${token}`,
                      {
                        dataInicioRelatorio: date,
                        status: 'Reproved',
                        userId: id,
                        missaoId: selectedMissao,
                      }
                    );
                    saveMissao();
                  }
                "
              >
                Reprovar
              </v-btn>
              <v-btn
                color="green-darken-3"
                @click="
                  () => {
                    axios.post(
                      `http://localhost:8080/relatorio/salvar?token=${token}`,
                      {
                        dataInicioRelatorio: date,
                        status: 'Aproved',
                        userId: id,
                        missaoId: selectedMissao,
                      }
                    );
                    saveMissao();
                  }
                "
              >
                Aprovar
              </v-btn>
            </div>
          </div>
          <div
            v-if="
              editController.enabled &&
              selectedMissao !== null &&
              selectedTalhao !== null
            "
            class="w-100"
          >
            <v-btn
              class="w-100"
              @click="
                () => {
                  axios.post(
                    `http://localhost:8080/relatorio/salvar?token=${token}`,
                    {
                      dataInicioRelatorio: date,
                      status: 'Edited',
                      userId: id,
                      missaoId: selectedMissao,
                    }
                  );
                  saveMissao();
                }
              "
            >
              Salvar Edição
            </v-btn>
          </div>
        </div>
      </v-sheet>
    </div>
    <div class="d-flex flex-column flex-grow-1">
      <EditToolbar :edit-controller="editController" />
      <div class="flex-grow-1">
        <TerravisionMapEdit
          :edit-controller="editController"
          :model-value="features"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { useMapEditStore } from "@/stores/edit-controller";
import axios from "axios";

const features = ref<any>(null);

const editController = useMapEditStore();

const selectedMissao = ref<number | null>(null);
const selectedTalhao = ref<number | null>(null);

const missaoList = ref<any[]>([]);
const talhaoList = ref<number[]>([]);
const resultFrom = ref<string>();

const { token } = useAppStore();

const talhaoFeatureDict = ref<Record<number, any>>({});

const date = ref(new Date().toISOString().replace("Z", ""));

const { id } = useAppStore();

const fetchResultado = async () => {
  if (selectedMissao.value === null || selectedTalhao.value === null) {
    features.value = null;
    return;
  }

  if (!!talhaoFeatureDict.value[selectedTalhao.value]) {
    features.value = talhaoFeatureDict.value[selectedTalhao.value];
    return;
  }

  let result;
  try {
    result = await axios.get(
      `http://localhost:8080/result/${selectedMissao.value}/QA/${selectedTalhao.value}?token=${token}`
    );
    resultFrom.value = "qa";
  } catch {
    result = await axios.get(
      `http://localhost:8080/result/${selectedMissao.value}/AI/${selectedTalhao.value}?token=${token}`
    );
    resultFrom.value = "ai";
  }
  features.value = result.data.daninhasDTO.features;
};

const fetchMissaoList = async () => {
  const result = await axios.get(
    `http://localhost:8080/missao/all?token=${token}`
  );
  missaoList.value = result.data;
};

const saveMissao = async () => {
  const qaJson: any = {
    type: "FeatureCollection",
    name: "QA",
    crs: {
      type: "name",
      properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
    },
    features: [],
  };
  for (const id of talhaoList.value) {
    let featureList = talhaoFeatureDict.value[id];
    if (!featureList) {
      let result;
      try {
        result = await axios.get(
          `http://localhost:8080/result/${selectedMissao.value}/QA/${id}?token=${token}`
        );
      } catch {
        result = await axios.get(
          `http://localhost:8080/result/${selectedMissao.value}/AI/${id}?token=${token}`
        );
      }
      featureList = result.data.daninhasDTO.features;
    }
    qaJson.features.push(...featureList);
  }

  const blob = new Blob([JSON.stringify(qaJson)], {
    type: "multipart/form-data",
  });

  const file = new File([blob], "file.geojson");

  const data = new FormData();
  data.append("missao_id", selectedMissao.value?.toString() ?? "");
  data.append("file", file);

  await axios.post(`http://localhost:8080/result/qa?token=${token}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  window.location.reload();
};

editController.$subscribe((_, state) => {
  if (state.saving) {
    const newFeatureList = features.value.reduce((list, feature, i) => {
      if (state.deletedFeatureIndexList.includes(i)) return list;
      if (feature.geometry.length === 0) {
        return list;
      }
      if (feature.geometry.coordinates.length === 0) {
        return list;
      }
      list.push(feature);
      return list;
    }, [] as any[]);

    features.value = newFeatureList;
    talhaoFeatureDict.value[selectedTalhao.value ?? 0] = newFeatureList;

    editController.toggleSave(false);
  }
});

watch([selectedMissao], () => {
  if (selectedMissao.value === null) {
    talhaoList.value = [];
    return;
  }

  const missao = missaoList.value.find((e) => e.id === selectedMissao.value);
  talhaoList.value = missao.talhoes_id;
});

watch([selectedTalhao], () => {
  fetchResultado();
});

onMounted(() => {
  fetchResultado();
  fetchMissaoList();
});
</script>

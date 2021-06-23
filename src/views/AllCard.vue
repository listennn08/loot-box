<template>
  <div>
    <div class="mb-2">
      <nav>
        <a
          v-for="tab in tabs"
          :key="tab"
          href="#"
          class="p-2"
          :class="{ 'text-green-600': tab === currentTab }"
          @click.prevent="changeTab(tab)"
        >{{ tab }}</a>
      </nav>
    </div>
    <div>
      <nav>
        <a
          href="#"
          class="py-1 px-2 text-sm text-center"
          :class="{ 'border border-gray-600 rounded-sm': !currentStar }"
          @click.prevent="changeStar(null)"
        >
          全部
        </a>
        <a
          v-for="star in 3"
          :key="star"
          href="#"
          class="p-1"
          :class="{ 'border border-gray-600 rounded-sm': star === currentStar }"
          @click.prevent="changeStar(star)"
        >
          <span
            v-for="s in star + 2"
            :key="s"
            class="material-icons text-sm text-yellow-300"
          >star</span>
        </a>
      </nav>
    </div>
    <div class="flex flex-wrap">
      <template
        v-for="d in displayCards"
        :key="d"
      >
        <div
          v-for="card in d.card"
          :key="`${d.level}${card.name}`"
          class="w-60 lg:mx-3 md:mx-2 my-5 flex justify-center"
        >
          <div
            class="img-container"
            :style="`background-image: url('${imgPath(typeCheck(d.level), card.imgName)}')`"
          >
            <div class="transform translate-y-32">
              <span
                v-for="n in getNumber(d.level)"
                :key="n"
                class="material-icons text-sm text-yellow-300"
              >
                star
              </span><br>
              {{ card.name }}
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'vuex';

type Card = {
  name: string,
  level: string,
  probability: number,
};

interface Cards<T> extends Array<T> {
  level: string
  card: Card[]
}

export default defineComponent({
  setup() {
    const store = useStore();
    const data: Array<Cards<Card>> = store.state.cards;
    const { imgBasePath } = store.state;

    const currentStar = ref<number | null>(null);

    /**
     * 轉換星數頁面。
     *
     * @param star - 星數。
     */
    const changeStar = (star: number) => {
      currentStar.value = star;
    };

    const tabs = ['英雄', '月光', '神器'];
    const currentTab = ref('英雄');

    /**
     * 轉換分類頁面。
     *
     * @param tab - 點選分頁。
     * @returns N/A
     */
    const changeTab = (tab: string) => {
      currentTab.value = tab;
    };

    /**
     * 取得星數。
     *
     * @param str - level 字串。
     * @returns 星數
     */
    const getNumber = (str: string) => Number(str.match(/\w/));

    const displayCards = computed(() => data
      .filter((el) => (currentStar.value
        ? el.level.includes(currentTab.value) && getNumber(el.level) === currentStar.value + 2
        : el.level.includes(currentTab.value)
      )));

    const typeCheck = computed(() => (type: string) => (type.includes('英雄') || type.includes('月光')
      ? 'heros'
      : 'artifacts'
    ));

    const imgPath = computed(() => (type: string, name: string) => `${imgBasePath}${type}/${name}.webp`);

    return {
      tabs,
      currentTab,
      currentStar,
      changeTab,
      changeStar,
      displayCards,
      typeCheck,
      imgPath,
      getNumber,
    };
  },
});
</script>

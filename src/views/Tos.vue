<template>
  <div class="container mx-auto">
    <div class="w-100">
      <select
        class="selector mb-2"
        v-model="drawTime"
      >
        <option value="1">1</option>
        <option value="10">10</option>
      </select><br>
      <div class="custon-checkbox mb-1">
        <input
          type="checkbox"
          id="ignore"
          class="form-custon h-3 w-3"
          v-model="bHasIgnoreAnimate"
        >
        <label for="ignore">
          Skip Animate
        </label>
      </div>
      <button
        class="btn btn-green mb-10 mx-1"
        @click="draw"
        :disabled="drawing"
      >
        Draw
      </button>
      <button
        class="btn btn-green mb-10 mx-1"
        @click="skip = true"
      >
        Skip
      </button>
      <transition-group
        class="flex flex-row flex-wrap md:flex-row justify-center"
        name="list"
        tag="div"
      >
        <div
          class="list-item"
          v-for="(card, idx) in displayCards"
          :key="`${card.name}${idx}${randomId}`"
          :class="{
            'moon': card.level.includes('月光') && getNumber(card?.level) > 3,
            'star-5': getNumber(card?.level) === 5
          }"
        >
          {{ card }}
          <div
            class="img-outside py-1"
          >
            <div
              class="img-container mb-6"
              :style="`background-image: url('${imgPath(typeCheck(card.level), card.imgName)}')`"
            >
              <div
                class="transform 2xl:translate-y-32 lg:translate-y-44 sm:translate-y-44
                translate-y-44"
              >
                <span
                  v-for="n in getNumber(card.level)"
                  :key="n"
                  class="material-icons text-sm text-yellow-300"
                >
                  star
                </span><br>
                {{ card.name }}
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import Timer from '../utils/timer';

type TCard = {
  name: string
  level: string
  probability: number
  imgName: string
};

type TCards = {
  level: string
  card: TCard[]
};

const parr = [
  {
    p: 1.25,
    level: '5星英雄',
  },
  {
    p: 4.5,
    level: '4星英雄',
  },
  {
    p: 41,
    level: '3星英雄',
  },
  {
    p: 0.15,
    level: '月光5星',
  },
  {
    p: 0.5,
    level: '月光4星',
  },
  {
    p: 4.35,
    level: '月光3星',
  },
  {
    p: 1.75,
    level: '5星神器',
  },
  {
    p: 6.5,
    level: '4星神器',
  },
  {
    p: 40,
    level: '3星神器',
  },
];

export default defineComponent({
  async setup() {
    const store = useStore();
    const data: Array<TCards> = store.state.cards;
    const { imgBasePath } = store.state;
    const displayCards = ref<Array<TCard>>([]);
    const drawTime = ref(1);
    const drawing = ref(false);
    const skip = ref(false);
    const bHasIgnoreAnimate = ref(false);

    const randomId = computed(() => (bHasIgnoreAnimate.value ? Math.random().toString(36).substring(2, 9) : ''));

    const typeCheck = computed(() => (type: string) => (type.includes('英雄') || type.includes('月光')
      ? 'heros'
      : 'artifacts'));

    const imgPath = computed(() => (type: string, name: string) => `${imgBasePath}${type}/${name}.webp`);

    /**
     * 取得星數。
     *
     * @param str - level 字串。
     * @returns 星數
     */
    const getNumber = (str: string) => Number(str.match(/\w/));

    const delayDisplay = (cards: Array<TCard>): void => {
      const timer = new Timer(() => {
        displayCards.value.push(cards.shift() as TCard);
        if (skip.value || !cards.length) {
          if (cards.length !== 0) {
            displayCards.value.push(...cards);
          }

          drawing.value = false;
          skip.value = false;
          clearInterval(timer.timer);
        }
      }, 500);

      timer.setInterval();
    };

    /**
     * 抽卡。
     *
     * @returns N/A
     */
    const draw = () => {
      displayCards.value = [];
      // 將機率同乘 1000，再 repeat 機率個數塞進同一個 array
      const box = parr.map((el) => Array.from({ length: el.p * 1000 }).fill(el.p)).flat();
      let t = 0;
      const cards: Array<TCard> = [];
      while (t < drawTime.value) {
        // 將 box 打亂取第一個值
        const n = box.sort(() => Math.random() - 0.5)[0];
        // 取得抽到的星數
        const { level } = parr[parr.findIndex((el) => el.p === n)];
        // 再從星數物件裡的卡片隨機抽取一張卡片
        const getCard = data[data.findIndex((el) => el.level === level)]
          .card
          .sort(() => Math.random() - 0.5)[0];
        const c: TCard = {
          ...getCard,
          level,
        };

        cards.push(c);
        t += 1;
      }

      if (bHasIgnoreAnimate.value) {
        displayCards.value.push(...cards);
        console.log(displayCards.value);
        return;
      }

      displayCards.value.push(cards.shift() as TCard);
      drawing.value = true;
      delayDisplay(cards);
    };

    return {
      data,
      draw,
      drawing,
      drawTime,
      displayCards,
      imgPath,
      typeCheck,
      getNumber,
      skip,
      bHasIgnoreAnimate,
      randomId,
    };
  },
});
</script>
<style lang="scss" scoped>

.list-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 0.25rem;
  margin: 0.5rem 0.25rem;
  transition: all 1s;

  @media (max-width: 1440px) {
    width: calc((100% / 5) - 0.5rem);
  }

  @media (max-width: 414px) {
    width: calc((100% / 2) - 0.5rem);

    &.star-5 {
      animation: flashing-goldenrod 2s infinite ease-out;
    }

    &.moon {
      animation: flashing-purple 2s infinite ease-out;
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.2s;
}

.list-enter-from,
.list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.custon-checkbox {
  & label {
    margin-left: 1.25rem;
    position: relative;
    cursor: pointer;
    user-select: none;

    &::before {
      content: '';
      width: 1rem;
      height: 1rem;
      border-radius: 0.25rem;
      border: 1px solid #ddd;
      position: absolute;
      top: 0;
      bottom: 0;
      left: -1.25rem;
      transform: translateY(20%);
    }

    &::after {
      content: '';
      width: 0.3rem;
      height: 0.5rem;
      position: absolute;
      top: 0.3rem;
      bottom: 0;
      left: -0.86rem;
      transform: translateY(20%) rotate(45deg);
      border-style: solid;
      border-color: transparent;
      border-width: 0 0.16rem 0.16rem 0;
    }

    &:hover::before {
      background-color: #eee;
    }
  }

  & input[type=checkbox] {
    display: none;

    &:checked {
      & + label::before {
        background-color: rgba(16, 185, 129, 1);
      }

      & + label::after {
        border-color: white;
      }
    }
  }
}
</style>

<template>
  <div class="container">
    <select
      class="selector"
      v-model="drawTime"
    >
      <option value="1">1</option>
      <option value="10">10</option>
    </select><br>
    <button class="btn" @click="draw">Draw</button>
    <transition-group class="inner-container" name="list" tag="div">
      <div
        class="v"
        v-for="(card, idx) in displayCards"
        :key="`${card.name}${idx}${Math.random().toString(36).substring(2, 9)}`"
      >
        {{ card.name }}<br>
        {{ card.level }}
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import dataProvider from '@/apis/cors';
import converter from '@/utils/convertCSVToArray';
import { defineComponent, ref } from 'vue';

type Card = {
  name: string,
  level: string,
  probability: number,
};

type Cards = Card[] | [];

export default defineComponent({
  async setup() {
    const resp: string = (await dataProvider).data;
    const data = converter(resp);
    const displayCards = ref<Cards>([]);
    const drawTime = ref(1);

    const draw = () => {
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

      const box = parr.map((el) => Array.from({ length: el.p * 100 }).fill(el.p)).flat();
      let t = 0;
      const res = [];
      while (t < drawTime.value) {
        const n = box.sort(() => Math.random() - 0.5)[0];
        const { level } = parr[parr.findIndex((el) => el.p === n)];
        const getCard = data[data.findIndex((el) => el.level === level)]
          .card
          .sort(() => Math.random() - 0.5)[0];
        const c: Card = {
          ...getCard,
          level,
        };
        res.push(c);
        t += 1;
      }
      displayCards.value = res;
    };

    return {
      data,
      drawTime,
      draw,
      displayCards,
    };
  },
});
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.selector {
  padding: .25rem .75rem;
  margin-bottom: 1rem;
}

.btn {
  margin-bottom: 1rem;
  background: #fff;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  border: 1px solid #2e2e2e;
  font-weight: bold;
  color: #c27e18;

  &:hover {
    border-color: #8e5c11;
    background-color: #c27e18;
    color: #fff;
    transition: .2s;
    cursor: pointer;
  }
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.inner-container {
  width: 60%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.v {
  width: calc((100% / 5) - 0.5rem) ;
  border: 1px solid #eee;
  border-radius: 0.25rem;
  padding: .5rem 1rem;
  margin: 0 .25rem .25rem;

  &:hover {
    border-color: #aaa;
    background: #eee;
    transition: .2s ease-out;
    cursor: pointer;
  }
}

.list-item {
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter {
  opacity: 0;
}
.list-enter-to {
  opacity: 1;
  transform: translateY(-30px);
}
.list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-30px);
}

</style>

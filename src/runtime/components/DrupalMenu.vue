<script setup lang="ts">
import { useDrupal } from '../composables/useDrupal'

const props = defineProps<{
  id: string
}>()

const { menu } = useDrupal()
const { data } = await menu(props.id)

// buildMenuTree(
//     links: DrupalMenuLinkContent[],
//     parent: DrupalMenuLinkContent["id"] = ""
//   ) {
//     if (!links?.length) {
//       return {
//         items: [],
//       }
//     }

//     const children = links.filter((link) => link?.parent === parent)

//     return children.length
//       ? {
//           items: children.map((link) => ({
//             ...link,
//             ...this.buildMenuTree(links, link.id),
//           })),
//         }
//       : {}
//   }

</script>

<template>
  <nav role="navigation">
    <ul>
      <DrupalMenuItem
        v-for="item in data"
        :id="item.id"
        :key="item.id"
        :attributes="item.attributes"
        :type="item.type"
      />
    </ul>
  </nav>
</template>

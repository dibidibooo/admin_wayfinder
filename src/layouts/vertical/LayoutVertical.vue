<template>
  <layout-vertical>

    <router-view />

    <app-customizer
      v-if="showCustomizer"
      slot="customizer"
    />

  </layout-vertical>
</template>

<script>
import LayoutVertical from '@core/layouts/layout-vertical/LayoutVertical.vue'
import { $themeConfig } from '@themeConfig'

export default {
  components: {
    LayoutVertical,
  },
  data() {
    return {
      showCustomizer: $themeConfig.layout.customizer,
    }
  },
}
</script>

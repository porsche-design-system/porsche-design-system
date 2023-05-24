<ComponentMetaOverview />

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ComponentMetaOverview from './ComponentMetaOverview.vue';

@Component({
  components: {
    ComponentMetaOverview
  },
})
export default class Code extends Vue {}
</script>
